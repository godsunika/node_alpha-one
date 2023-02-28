import express from 'express';
import { signInHandler, signUpHandler } from '../controllers/auth.controller';

const router = express.Router();

// Register user route
router.post('/register', signUpHandler);

// Login user route
router.post('/login', signInHandler);

// // Refresh access toke route
// router.get('/refresh', refreshAccessTokenHandler);

// // Logout User
// router.get('/logout', deserializeUser, requireUser, logoutHandler);

export default router;
