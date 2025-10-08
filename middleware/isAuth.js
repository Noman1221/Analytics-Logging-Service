import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const isHeader = req.headers.authorization;
        if (!isHeader || !isHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "user not authenticated" });
        };

        const token = isHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "token not found" });
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default isAuthenticated