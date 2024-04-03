const authService = require("../services/auth.service");


class AuthRouter {
    async login(req, res) {
        const { name, password } = req.body;

        const data = await authService.login(name, password);

        if (!data) return res.json({ status: false, message: "Admin not found", data: [] })

        res.cookie('refreshToken', data.refreshToken, { maxAge: 2628000, httpOnly: true })

        return res.json({ status: true, message: "Admin logined", data: data })

    }


    async refresh(req, res) {
        const { refreshToken } = req.cookies;

        const data = await authService.refresh(refreshToken);

        if (data == null) return res.json({ status: false, message: "Unauthorized Error" });

        res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

        return res.json({
            status: true,
            message: "Admin refreshed",
            data: data
        })
    }


    async logout(req, res) {
        const { refreshToken } = req.cookies;

        const data = await authService.logout(refreshToken);

        if (!data) return res.json({ status: false, message: "Unauthorized Error" });

        res.clearCookie('refreshToken');

        return res.json({
            status: true,
            message: "Logout",
            data: []
        })
    }
}

module.exports = new AuthRouter