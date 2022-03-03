const jwt = require("jsonwebtoken");
const userAdmin = require("../model/UserAdminDetails");

const authenticateAdmin = async (req,res,next) => {
    try{

        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await userAdmin.findOne({_id:verifyToken._id, "tokens.token":token });

        if(!rootUser){
            throw new Error('UserAdmin Not Found');
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();

    }
    catch(err){
        res.status(401).send("Unauthorized: No token Provided");
    }
}
module.exports = authenticateAdmin;