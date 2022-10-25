import jwt from "jsonwebtoken";

const verifyJWT = (token) =>
    new Promise((resolve, reject) =>
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) reject(err);
            resolve(decodedToken);
        })
    );

const authenticateUser = async (req, res, next) => {
    try {
        if (!req.cookies?.userToken) {
            res.status(401).send("Not authorized");
            return;
        }
        const token = req.cookies.userToken.replace("Bearer ", "");
        const decodedToken = await verifyJWT(token);
        if (decodedToken?._id) {
            req.user = { PASID: decodedToken.PASID, _id: decodedToken._id };
            next();
        } else {
            throw Error('Invalid token')
        }
    } catch (error) {
        res.status(401).send({ success: false, msg: "Token not valid!" });
        return;
    }
};

export default authenticateUser;
