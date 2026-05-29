import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  type: z.string().max(80).optional(),
  message: z.string().min(10).max(2000),
});

export async function POST(req: Request) {
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

  const { name, email, type, message } = parsed.data;

  try {
    await resend.emails.send({
      from: `Solven Syntrix <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`,
      to: [process.env.RESEND_TO_EMAIL ?? "s.altout@solvensyntrix.com"],
      replyTo: email,
      subject: `[${type ?? "Contact"}] Message from ${name}`,
      text: `From: ${name} <${email}>\nType: ${type ?? "—"}\n\n${message}`,
    });
  } catch {
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
