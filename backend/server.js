const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

let orders = [];
let otps = {}; // email: {code, expires}

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password'
  }
});

// Send OTP
app.post('/api/auth/send-code', (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  otps[email] = { code, expires: Date.now() + 5 * 60 * 1000 }; // 5 min

  transporter.sendMail({
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your code is ${code}`
  }, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to send email' });
    res.json({ message: 'Code sent' });
  });
});

// Verify OTP
app.post('/api/auth/verify-code', (req, res) => {
  const { email, code } = req.body;
  const otp = otps[email];
  if (!otp || otp.code !== code || Date.now() > otp.expires) {
    return res.status(400).json({ error: 'Invalid or expired code' });
  }
  delete otps[email];
  res.json({ message: 'Login successful' });
});

// Get orders
app.get('/api/orders', (req, res) => {
  const { email } = req.query;
  const userOrders = orders.filter(o => o.userEmail === email);
  res.json(userOrders);
});

// Add order
app.post('/orders', (req, res) => {
  const order = req.body;
  orders.push(order);
  res.json({ message: 'Order added' });
});

app.listen(5000, () => console.log('Server running on port 5000'));