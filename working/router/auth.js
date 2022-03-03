const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require('../db/conn');
const SignUserAdmin = require('../model/UserAdminDetails');
const SignVehicleAdmin = require('../model/VehicleAdminDetails');
const SignSuperAdmin = require('../model/SuperAdmin');
// const UserDetails = require('../model/userDetails');
// const VehicleDetails = require('../model/vehicleDetails');
const authenticateUserAdmin = require('../middleware/authenticateUserAdmin');
const authenticateVehicleAdmin = require('../middleware/authenticateVehicleAdmin');
const authenticateSuperAdmin = require('../middleware/authenticateSuperAdmin');

router.get('/', (req,res)=>{
    res.send("Hello World!");
});

//UserAdmin SIGNIN AND REGISTER Portal
router.post('/RegisterUserAdmin', async (req,res)=>{

    const { firstName, lastName, email, password } = req.body;

    if( !firstName || !lastName || !email || !password ){
        return res.status(422).json({error: "Plz fill the required Fields"});
    }

    try{
        const userAdminExist = await SignUserAdmin.findOne({ email: email });

        if(userAdminExist){
            return res.status(422).json({error: "User Admin's Email Already Exists"});
        }
        
        const sign_UserAdmin = new SignUserAdmin({firstName, lastName, email, password});

        const UserNameRegister = await sign_UserAdmin.save();

        if(UserNameRegister){        
            res.status(201).json( {message: "User Admin Details Saved Successfully"} );
        }
        else{ 
            res.status(500).json( {error: "Failed"} );
        }
    }
    catch(err){
        console.log(err);
    }

});

router.post('/LoginUserAdmin', async (req,res) => {
    try{
        let AdminToken;
        const { email, password } = req.body;
        
        if(!email || !password){
            return res.status(400).json({error: "Please fill the required Fields"});
        }

        const userAdminLogin = await SignUserAdmin.findOne({ email: email});
        
        
        
        if(userAdminLogin){
            const isMatchAdmin = await bcrypt.compare(password, userAdminLogin.password);
            
            AdminToken = await userAdminLogin.generateAuthToken();

            res.cookie("jwtoken",AdminToken,{
                expires: new Date(Date.now() + 258920000),
                httpOnly:true
            });
            
            if(!isMatchAdmin){
                res.status(400).json({error: "Invalid Credentials"});
            } else{
                res.json({ message: "Sign In Sucessful" });
            }
        }
        else{
            res.status(400).json({error: "Invalid Credentials"});
        } 

    }
    catch (err){
        console.log(err);
    }
});

//UserAdmin SIGNIN AND REGISTER Portal
router.post('/WhosGOD', async (req,res)=>{

    const { email, password } = req.body;

    if( !email || !password ){
        return res.status(422).json({error: "Plz fill the required Fields"});
    }

    try{
        const superAdminExist = await SignSuperAdmin.findOne({ email: email });

        if(superAdminExist){
            return res.status(422).json({error: "Super Admin's Email Already Exists"});
        }
        
        const sign_superAdmin = new SignSuperAdmin({email, password});

        const UserNameRegister = await sign_superAdmin.save();

        if(UserNameRegister){        
            res.status(201).json( {message: "Super Admin Details Saved Successfully"} );
        }
        else{ 
            res.status(500).json( {error: "Failed"} );
        }
    }
    catch(err){
        console.log(err);
    }

});
router.post('/MeetGOD', authenticateSuperAdmin, async (req,res) => {
    try{
        let AdminToken;
        const { email, password } = req.body;
        
        if(!email || !password){
            return res.status(400).json({error: "Please fill the required Fields"});
        }

        const SuperAdminLogin = await SignSuperAdmin.findOne({ email: email});
        
        
        
        if(SuperAdminLogin){
            const isMatchAdmin = await bcrypt.compare(password, SuperAdminLogin.password);
            
            AdminToken = await SuperAdminLogin.generateAuthToken();
            res.cookie("jwtoken",AdminToken,{
                expires: new Date(Date.now() + 258920),
                httpOnly:true
            });
            
            if(!isMatchAdmin){
                res.status(400).json({error: "Invalid Credentials"});
            } else{
                res.json({ message: "Sign In Sucessful" });
            }
        }
        else{
            res.status(400).json({error: "Invalid Credentials"});
        } 

    }
    catch (err){
        console.log(err);
    }
});
router.get('/IAMTHEGOD', authenticateSuperAdmin, (req,res) =>{
    console.log("I amd GOD");
    res.send(req.rootSuperAdmin);
})

//VehicleAdmin SIGNIN AND REGISTER Portal
router.post('/RegisterVehicleAdmin', async (req,res)=>{

    const { firstName, lastName, email, password } = req.body;

    if( !firstName || !lastName || !email || !password ){
        return res.status(422).json({error: "Plz fill the required Fields"});
    }
    
    try{
        const VehicleAdminExist = await SignVehicleAdmin.findOne({ email: email });
        
        if(VehicleAdminExist){
            return res.status(422).json({error: "Vehicle Admin Email Already Exists"});
        }
        
        const sign_VehicleAdmin = new SignVehicleAdmin({firstName, lastName, email, password});

        const VehicleAdminRegister = await sign_VehicleAdmin.save();
        
        if(VehicleAdminRegister){        
            res.status(201).json( {message: "Vehicle Admin Details Saved Successfully"} );
        }
        else{ 
            res.status(500).json( {error: "Failed"} );
        }
    }
    catch(err){
        console.log(err);
    }

});

router.post('/LoginVehicleAdmin', async (req,res) => {
    try{
        let AdminToken;
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({error: "Please fill the required Fields"});
        }

        const VehicleAdminLogin = await SignVehicleAdmin.findOne({ email: email});

        if(VehicleAdminLogin){
            const isMatchAdmin = await bcrypt.compare(password, VehicleAdminLogin.password);
            
            AdminToken = await VehicleAdminLogin.generateAuthToken();
            res.cookie("jwtoken",AdminToken,{
                expires: new Date(Date.now() + 258920000),
                httpOnly:true
            });
            
            if(!isMatchAdmin){
                res.status(400).json({error: "Invalid Credentials"});
            } else{
                res.json({ message: "Sign In Sucessful" });
            }
        }
        else{
            res.status(400).json({error: "Invalid Credentials"});
        } 
        
    }
    catch (err){
        console.log(err);
    }
});



// //Hospital SIGNIN AND REGISTER Portal
// router.post('/RegisterHospital', async (req,res)=>{

//     const { hospitalID, password } = req.body;
    
//     if( !hospitalID || !password ){
//         return res.status(422).json({error: "Plz fill the required Fields"});
//     }

//     try{
//         const hospitalExist = await SignHospital.findOne({ hospitalID: hospitalID });

//         if(hospitalExist){
//             return res.status(422).json({error: "Hospital Already Exists"});
//         }
        
//         const sign_Hospital = new SignHospital({hospitalID, password});
        
//         const HospitalRegister = await sign_Hospital.save();

//         if(HospitalRegister){        
//             res.status(201).json( {message: "Hospital Data saved"} );
//         }
//         else{ 
//             res.status(500).json( {error: "Failed"} );
//         }
//     }
//     catch(err){
//         console.log(err);
//     }

// });

// router.post('/LoginHospital', async (req,res) => {
//     try{
//         const { hospitalID, password } = req.body;

//         if(!hospitalID || !password){
//             return res.status(400).json({error: "Please fill the required Fields"});
//         }
        
//         const hospitalLogin = await SignHospital.findOne({ hospitalID: hospitalID});

//         if(hospitalLogin){
//             const isMatchHospital = await bcrypt.compare(password, hospitalLogin.password);
//             if(!isMatchHospital){
//                 res.status(400).json({error: "Invalid Credentials"});
//             } else{
//                 res.json({ message: "Sign In Sucessful" });
//             }
//         }
//         else{
//             res.status(400).json({error: "Invalid Credentials"});
//         } 

//     }
//     catch (err){
//         console.log(err);
//     }
// });


// router.get('/DonationBlogs', (req,res) => {
//     res.send(req.rootDonor);
// });


// router.post('/PatientDetail', async (req,res)=>{
    
//     const { fullName, email, number, UID, PAN, BPL, Disease, Treatment, HospitalID, EthID, cEthID, requestedAmount, date, AmountDonated } = req.body;
    
//     if( !fullName || !email || !number || !UID || !PAN || !Disease || !Treatment || !HospitalID || !EthID || !cEthID || !requestedAmount || !date){
//         return res.status(422).json({error: "Plz fill the required Fields"});
//     }
    
//     try{
//         const patientDetailsExist = await PatientDetail.findOne({ PAN: PAN });
        
//         if(patientDetailsExist){
//             return res.status(422).json({error: "Patient's PAN Already Exists"});
//         }
        
//         const Patient_Details = new PatientDetail({ fullName, email, number, UID, PAN, BPL, Disease, Treatment, HospitalID, EthID, cEthID, requestedAmount, date, AmountDonated
//         });
        
//         const PatientDetailSave = await Patient_Details.save();
        
//         if(PatientDetailSave){        
//             res.status(201).json( {message: "Patient Details Saved Successfully"} );
//         }
//         else{ 
//             res.status(500).json( {error: "Failed"} );
//         }
//     }
//     catch(err){
//         console.log(err);
//     }
    
// });

module.exports = router;