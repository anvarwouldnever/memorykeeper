import jwt from "jsonwebtoken";
import TokenModel from "../models/token-model.js";
import dotenv from 'dotenv';
dotenv.config()

class TokenService {
    generateTokens(payload) {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '30m' }) 
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '30d' })
      return {
        accessToken,
        refreshToken
      }
    }

    validateAccessToken(accessToken) {
      try {
          dotenv.config()
          const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN)
          return userData
      } catch (error) {
          return null;
      }
    }

    validateRefreshToken(token) {
      try {
          dotenv.config()
          const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN)
          return userData
      } catch (error) {
          return null;
      }
    }

    async saveToken(userId, refreshToken) {

        const tokenData = await TokenModel.findOne({userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
        }

        const token = await TokenModel.create({user: userId, refreshToken})
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({refreshToken});
        return tokenData;
    }

    async findToken(refreshToken) {
      const tokenData = await TokenModel.findOne({refreshToken});
      return tokenData;
  }
}

export default new TokenService();