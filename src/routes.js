import express from 'express';
import { verifyAuthHeader } from './middleware';
import { handleAuthenticate, listUsers, describeUser, listGroups } from './controllers';

const router = express.Router();

router.use(verifyAuthHeader);

router.post('/authenticate', handleAuthenticate);
router.post('/users', listUsers);
router.post('/user', describeUser);
router.post('/groups', listGroups);

export default router;
