import { z } from "zod";
import { Resend } from "resend";
import { contactEmailHtml } from "./email-template";

const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  type: z.string().max(80).optional(),
  message: z.string().min(2).max(2000),
  locale: z.enum(["en", "ar"]).optional(),
});

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const { name, email, type, message, locale = "en" } = parsed.data;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://solvensyntrix.com";

  try {
    await resend.emails.send({
      from: `Solven Syntrix <${process.env.RESEND_FROM_EMAIL ?? "info@solvensyntrix.com"}>`,
      to: [process.env.RESEND_TO_EMAIL ?? "info@solvensyntrix.com"],
      replyTo: email,
      subject: `[${type ?? "Contact"}] Message from ${name}`,
      html: contactEmailHtml({
        name,
        email,
        type: type ?? "",
        message,
        siteUrl,
        locale,
      }),
      text: `From: ${name} <${email}>\nType: ${type ?? "—"}\n\n${message}`,
    });
  } catch {
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
