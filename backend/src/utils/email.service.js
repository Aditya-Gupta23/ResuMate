import nodemailer from "nodemailer";

const transport=nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT||587,
    secure:false,
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
    }

});

export async function sendJobAlertEmail(to,jobs){
    const from = process.env.SMTP_FROM || `ResuMate Alerts <${process.env.SMTP_USER}>`;
     const html = `
    <h2>🔔 Your Job Alerts</h2>
    <p>Here are the latest job postings matching your preferences:</p>
    <ul>
      ${jobs
        .map(
          (j) => `
        <li>
          <strong>${j.title}</strong> — ${j.company} (${j.location})<br/>
          <a href="${j.url}" target="_blank">Apply Here</a>
        </li>
      `
        )
        .join("")}
    </ul>
    <p style="margin-top:20px; font-size:12px; color:#777;">
      You received this alert because it's enabled in your ResuMate profile.
    </p>
  `;
  return transporter.sendMail({
    from,
    to,
    subject: `${jobs.length} New Job Matches Found`,
    html
  });
}

