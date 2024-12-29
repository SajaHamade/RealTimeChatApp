import express from 'express'
import  Register  , {upload , login , verify} from '../controllers/auth.controller.js'
import verifyUser from '../middleware/VerifyUser.js';
import users from '../controllers/user.controller.js';


const router = express.Router()

router.post('/register', upload.single('image'), Register);
router.post('/login', login);

router.get('/verify', verifyUser , verify)








export default router ;