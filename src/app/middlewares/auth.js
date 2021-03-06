const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        console.log(token)

        if(!token) return res.status(401).redirect('/auth/login');

        const verified = jwt.verify(token, 'gmndshhrjvjhsw4bnds221a');

        req.user = verified.user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({
            error: "Unauthorized"
        })
    }
}

module.exports = auth;