const jwt = require("jsonwebtoken");
const vehicleAdmin = require("../model/VehicleAdminDetails");

const authenticateAdmin = async (req,res,next) => {
    try{

        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await vehicleAdmin.findOne({_id:verifyToken._id, "tokens.token":token });

        if(!rootUser){
            throw new Error('vehicleAdmin Not Found');
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