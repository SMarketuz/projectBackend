const client = require("../utils/client");
const jwtService = require("../services/jwt.service");


class AuthService {
    async login(name, password) {
        const condidate = await client.admin.findUnique({
            where: {
                name: name
            }
        })

        if (!condidate) return null;
        if (condidate.password != password) return null;

        const tokens = await jwtService.generateToken(condidate);

        await jwtService.saveToken(condidate.id, tokens.refreshToken);

        return { ...tokens, admin: condidate }
    }

    async logout(refreshToken) {
        if (!refreshToken) return null;

        const data = await jwtService.removeToken(refreshToken);

        if (!data) return null

        return true
    }

    async refresh(refreshToken) {
        if (!refreshToken) return null

        const userData = await jwtService.validateToken(refreshToken);
        const tokenFromDb = await client.token.findFirst({ where: { refreshToken: refreshToken } });

        if (!userData || !tokenFromDb) return null


        const user = await client.admin.findUnique({ where: { id: userData.id } });
        const tokens = await jwtService.generateToken(user);

        await jwtService.saveToken(user.id, tokens.refreshToken);
        return { ...tokens, user: user }
    }

}

module.exports = new AuthService();