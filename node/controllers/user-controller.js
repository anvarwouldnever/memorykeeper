import userService from "../service/user-service.js";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-error.js";
import mailService from "../service/mail-service.js";
import deadUserModel from "../models/dead-user-model.js";

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { email, password, username } = req.body;
            const userData = await userService.registration(email, password, username);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await userService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (error) {
            next(error)
        }
    }

    async resfresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refreshToken(refreshToken)
            res.cookie('refresh', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 100}, httpOnly)
        } catch (error) {
            next(error)
        }
    }

    async activate(req, res, next) {
        try {
            const activattionLink = req.params.link 
            await userService.activate(activattionLink)
            return res.redirect("http://google.com/")
        } catch (error) {
            console.log(error)
        }
    }

    async verification(req, res) {
        try {
            const email = req.query.email
            const min = 1000;
            const max = 9999;
            const code = Math.floor(Math.random() * (max - min + 1)) + min;
            await mailService.sendActivationMail(email, code);
        
            res.json(code)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async addRelative(req, res) {
        try {
            const { name, borndate, deathdate } = req.body;
            const deadUser = await deadUserModel.create({ name, borndate, deathdate })

            const userId = deadUser._id
            res.status(200).json(userId)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

export default new UserController();