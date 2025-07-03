import nodemailer from "nodemailer";

interface SendEmailParams {
  to: string;
  name: string;
  contactName: string;
  category: string;
}

export const sendApprovalEmail = async ({
  to,
  name,
  contactName,
  category,
}: SendEmailParams): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head><meta charset="UTF-8" /></head>
    <body style="font-family: Roboto, sans-serif">
      <div style="background: #f9f9f9; padding: 30px;">
        <h2 style="color: #05c08f;">You're Approved</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Great news — your account has been approved! You can now start listing your services and receiving bookings.</p>
        
        <div style="background: #fff; padding: 15px; border-radius: 8px;">
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${to}</p>
          <p><strong>Contact person:</strong> ${contactName}</p>
          <p style="color: #05c08f;"><strong>Status:</strong> Approved</p>
        </div>

        <div style="margin-top: 20px;">
          <p><strong>Tips:</strong></p>
          <ul>
            <li>Make sure your listings are detailed and accurate</li>
            <li>Add high-quality photos to attract more travelers</li>
            <li>Respond to customer questions & concerns quickly</li>
          </ul>
        </div>

        <div style="margin-top: 20px;">
          <a href="https://travelninja.pk/dashboard" style="padding: 10px 20px; background-color: #008558; color: white; border-radius: 4px; text-decoration: none;">Go to Dashboard</a>
        </div>
      </div>
    </body>
  </html>
  `;

  await transporter.sendMail({
    from: '"TravelNinja" <no-reply@travelninja.pk>',
    to,
    subject: "Your Supplier Account Has Been Approved",
    html,
  });
};
