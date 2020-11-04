require("dotenv").config();

const emp = require("./empmodel");
const users = require("./usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// register
const userRegister = async (userData, role, res) =>{
    
    try{
        // validate username
        let user = await users.findOne({name: userData.name});
        if(user){
            return res.status(400).json({
                message: "Username already exists",
                success: false
            });
        }

        // hashed password
        const hashedPassword = await bcrypt.hash(userData.password, 12);

        //create a new user
        const newUser = new users({
            ...userData,
            password: hashedPassword,
            role
        });
        await newUser.save();
    
        return res.status(201).json({
            message: "Logged in",
            success: true
        });
    }catch(err)
    {
        res.json({
            message: err.meessage
        })
    }
};

//login
const userLogin = async (userCreds, role, res) =>{
    let {name, password} = userCreds;
    try{
        const user = await users.findOne({name}); 
    
    //check name
    if(!user){
        res.status(404).json({
            message: "Invalid name!",
            success: false
        });
    }

    //check role
    if(user.role != role)
    {
        res.status(404).json({
        message: "Invalid role!",
        success: false
        });
    }

    //check password
    let isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        
        let userData;
        const tempData = await emp.findOne({name: user.name});
        if(tempData){
            userData = tempData;
        }
        else{
            userData = null;
        }

        //sign in and send token to user
        let token = jwt.sign(
            { user_id: user._id, name: user.name, role: user.role },
            process.env.SECRET,
            {expiresIn: "7 days"}
        );

        let result = {
            name: user.name,
            user_id: user._id,
            role: user.role,
            token: `Bearer ${token}`,
            expiresIn: 168, //hours
            userData: userData
        }

        return res.status(200).json({
            ...result,
            message: "You are logged in",
            success: true
        });
    }
    else{
        res.status(404).json({
            message: "Invalid password!",
            success: false
        }); 
    }
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// Protect routes
const userAccess = passport.authenticate("jwt", { session: false });

module.exports = {
    userRegister,
    userLogin,
    userAccess
};