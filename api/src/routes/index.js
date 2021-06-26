import express from 'express';
import * as auth from '../controllers/auth.js';
import expressjwt from 'express-jwt';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

/* Simple check to see if signature matches the one
 * from our authetication server. In a real authentication
 * server, you'd check for the issuer, audience and more to
 * validate the integrity of the server
 */

const jwtCheck = expressjwt({
  secret: process.env.SECRET_KEY,
  algorithms: ['sha1', 'RS256', 'HS256']
});

router.post('/sign-up', auth.signUp);
router.post('/sign-in', auth.signIn);
router.get('/me', jwtCheck, auth.profile);

export default router;
