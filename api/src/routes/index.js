import express from 'express';
import * as auth from '../controllers/auth.js';
import expressjwt from 'express-jwt';

const router = express.Router();

/* Simple check to see if signature matches the one from our authetication server.
 * In a real authentication server, you'd check for the issuer, audience and more to
 * validate the integrity of the server
 */
const jwtCheck = expressjwt({
  secret: 'tempPrivateKey',
  algorithms: ['sha1', 'RS256', 'HS256']
});

router.get('/user', auth.getPublicResource);
router.get('/user/loggedIn', jwtCheck, auth.getPrivateResource);

export default router;
