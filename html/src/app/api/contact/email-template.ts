interface EmailTemplateProps {
  name: string;
  email: string;
  type: string;
  message: string;
  siteUrl: string;
  locale: string;
}

const i18n = {
  en: {
    dir: "ltr",
    newMessage: "New message",
    from: "From",
    emailLabel: "Email",
    typeLabel: "Type",
    messageLabel: "Message",
    reply: "Reply",
    footer: "Sent via the contact form at",
  },
  ar: {
    dir: "rtl",
    newMessage: "رسالة جديدة",
    from: "الاسم",
    emailLabel: "البريد الإلكتروني",
    typeLabel: "نوع الاستفسار",
    messageLabel: "الرسالة",
    reply: "الرد",
    footer: "أُرسلت عبر نموذج التواصل في",
  },
} as const;

export function contactEmailHtml({
  name,
  email,
  type,
  message,
  siteUrl,
  locale,
}: EmailTemplateProps): string {
  const t = locale === "ar" ? i18n.ar : i18n.en;
  const logoUrl = `${siteUrl}/logo-dark.svg`;
  const domain = siteUrl.replace(/^https?:\/\//, "");

  const safeMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html lang="${locale}" dir="${t.dir}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;padding:32px 16px;">
  <tr><td align="center">
  <table width="520" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;width:100%;">

    <!-- Logo -->
    <tr>
      <td align="center" style="padding-bottom:24px;">
        <img src="${logoUrl}" alt="Solven Syntrix" height="28" style="display:block;height:28px;width:auto;" />
      </td>
    </tr>

    <!-- Card -->
    <tr>
      <td style="background:#ffffff;border-radius:10px;border:1px solid #e4e4e7;padding:32px;">

        <!-- Tag -->
        <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:#09090b;">${t.newMessage}</p>

        <!-- Name as headline -->
        <h1 style="margin:0 0 24px;font-size:20px;font-weight:700;color:#09090b;line-height:1.3;">${name}</h1>

        <!-- Meta rows -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #e4e4e7;font-size:12px;color:#71717a;width:38%;">${t.emailLabel}</td>
            <td style="padding:8px 0;border-bottom:1px solid #e4e4e7;font-size:13px;color:#09090b;">
              <a href="mailto:${email}" style="color:#09090b;text-decoration:none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:12px;color:#71717a;">${t.typeLabel}</td>
            <td style="padding:8px 0;font-size:13px;color:#09090b;">${type || "—"}</td>
          </tr>
        </table>

        <!-- Message label -->
        <p style="margin:0 0 8px;font-size:12px;color:#71717a;">${t.messageLabel}</p>

        <!-- Message body -->
        <div style="background:#fafafa;border:1px solid #e4e4e7;border-radius:6px;padding:16px;font-size:14px;line-height:1.7;color:#3f3f46;">
          ${safeMessage}
        </div>

        <!-- Reply button -->
        <table cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;${t.dir === "rtl" ? "margin-right:auto;" : "margin-left:auto;"}">
          <tr>
            <td align="${t.dir === "rtl" ? "right" : "left"}">
              <a href="mailto:${email}" style="display:inline-block;padding:10px 24px;background:#09090b;color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;border-radius:6px;">
                ${t.reply} — ${name}
              </a>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td align="center" style="padding-top:20px;">
        <p style="margin:0;font-size:11px;color:#a1a1aa;">
          ${t.footer} <a href="${siteUrl}" style="color:#a1a1aa;text-decoration:underline;">${domain}</a>
        </p>
      </td>
    </tr>

  </table>
  </td></tr>
</table>

</body>
</html>`;
}
