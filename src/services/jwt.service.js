const jwt = require('jsonwebtoken');
const client = require('../utils/client');

class JwtService {

    async validateToken(token) {
        try {
            const data = jwt.verify(token, process.env.SECRET_TOKEN);
            return data;
        } catch (e) {
            return null;
        }
    }

    async generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '1800s' });
        const refreshToken = jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '2628000s' });

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const token = await client.token.findFirst({ where: { userId: userId } });


        if (token) {
            token.refreshToken = refreshToken;
            return await client.token.update({ where: { userId: userId }, data: token });
        }

        return await client.token.create({
            data: {
                userId: userId,
                refreshToken: refreshToken
            }
        })
    }

    async removeToken(refreshToken) {
        return await client.token.deleteMany({ where: { refreshToken: refreshToken } })
    }
}

module.exports = new JwtService()