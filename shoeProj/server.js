import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy data for demo
let users = [
    { email: 'test@example.com', fullName: 'Test User', dateOfBirth: '1990-01-01', password: 'password' }
];

// Secret for JWT
const JWT_SECRET = 'your-secret-key';

// Routes
app.post('/api/auth/check-email', (req, res) => {
    const { email } = req.body;
    const user = users.find(u => u.email === email);
    if (user) {
        // Generate token for existing user
        const token = jwt.sign({ email: user.email }, JWT_SECRET);
        res.json({ exists: true, token });
    } else {
        res.json({ exists: false });
    }
});

app.post('/api/auth/send-code', (req, res) => {
    // Dummy send code
    console.log('Sending code to', req.body.email);
    res.json({ message: 'Code sent' });
});

app.post('/api/auth/verify-code', (req, res) => {
    const { email, code } = req.body;
    console.log('Verifying code for', email, 'code:', code);
    // Dummy verify, accept any code for demo
    if (code) {
        // Create new user
        const newUser = { email, fullName: '', dateOfBirth: '' };
        users.push(newUser);
        const token = jwt.sign({ email }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(400).json({ message: 'Invalid code' });
    }
});

// Protected route for user profile
app.get('/api/users/me', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = users.find(u => u.email === decoded.email);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

app.put('/api/users/me', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = users.find(u => u.email === decoded.email);
        if (user) {
            user.fullName = req.body.fullName || user.fullName;
            user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
            res.json({ message: 'Profile updated' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});