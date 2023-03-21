import jwt from "jsonwebtoken";

export const roleMiddleWare = (roles) => {
    return function (req, res, next) {
        try {
            const token = req.cookies.accessToken;
            if (!token) {
                return res.status(402).json('Користувача не знайдено!');
            }
            const decodedDataRoles = jwt.verify(token, 'jwtkey').roles;

            let hasRole = false;
            decodedDataRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });

            if (!hasRole) {
                return res.status(403).json({message: "В доступі відмовлено!"});
            }
            next();
        } catch (err) {
            return res.status(403).json('Користувача не знайдено!');
        }
    };
};