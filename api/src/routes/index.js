import express from 'express';
import * as auth from '../controllers/auth.js';

const router = express.Router();

router.get('/user', auth.getPublicResource);
router.get('/user/loggedIn', auth.getPrivateResource);

export default router;
