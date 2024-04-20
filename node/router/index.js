import Router  from "express";
import UserController from "../controllers/user-controller.js";
import { body } from "express-validator";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = new Router()

router.post('/registration', 
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/addrelative', UserController.addRelative)
router.get('/activate/:link', UserController.activate);
router.get('/verification', UserController.verification)
router.get('/refresh', UserController.resfresh);

export default router 