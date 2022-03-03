const jwt = require("jsonwebtoken");
const SuperAdmin = require("../model/SuperAdmin");

const authenticateAdmin = async (req,res,next) => {
    try{

        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootSuperAdmin = await SuperAdmin.findOne({_id:verifyToken._id, "tokens.token":token });

        if(!rootSuperAdmin){
            throw new Error('UserAdmin Not Found');
        }

        req.token = token;
        req.rootSuperAdmin = rootSuperAdmin;
        req.userID = rootSuperAdmin._id;
        next();

    }
    catch(err){
        res.status(401).send("Unauthorized: No token Provided");
    }
}
module.exports = authenticateAdmin;