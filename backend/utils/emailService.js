const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send welcome email
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Welcome to Quiz App!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">Welcome to Quiz App, ${userName}!</h2>
          <p>Dear ${userName},</p>
          <p>Thank you for signing up with Quiz App! We're excited to have you on board.</p>
          <p>You can now start taking quizzes and improving your knowledge. Enjoy your journey with us!</p>
          <p>Best regards,<br>The Quiz App Team</p>
          <hr>
          <p style="font-size: 12px; color: #888;">This email was sent to ${userEmail}. If you received this in error, please ignore.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

module.exports = {
  sendWelcomeEmail
};