import express from 'express';
import { verifyAuthHeader } from './middleware';
import { getUpdatedUsers, handleAuthenticate, getUserByEmail, getAllGroups } from './controllers';

const router = express.Router();

router.use(verifyAuthHeader);

router.post('/authenticate', handleAuthenticate);
router.post('/users', getUpdatedUsers);
router.post('/user', getUserByEmail);
router.post('/groups', getAllGroups);

export default router;
