
export const authMiddleWare = (req, res, next) => {
    try {
        console.log(req.cookies.accessToken);
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(402).json("Користувача не знайдено!");
        }
        next();
    } catch (err) {
        return res.status(403).json("Користувача не знайдено!");
    }
};
