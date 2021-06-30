import express from 'express';
import * as auth from '../controllers/auth.js';
import expressjwt from 'express-jwt';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

/* Simple check to see if signature matches the one
 * from our authetication server. In a real world scenario
 * with AuthO, you would use the configurations provided
 * from your account.
 */

const jwtCheck = expressjwt({
  secret: process.env.SECRET_KEY,
  algorithms: ['sha1', 'RS256', 'HS256']
});

router.post('/sign-up', auth.signUp);
router.post('/sign-in', auth.signIn);
router.get('/me', jwtCheck, auth.profile);

export default router;
