require("dotenv").config();

const users = require("./usermodel");
const {Strategy, ExtractJwt} = require("passport-jwt");
const passport = require("passport");
const secret = process.env.SECRET;

// NOTE!!! -> 'jwtFromRequest' & 'secretOrKey' are PREDEFINED required parameter!!
const options= {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret 
}

module.exports = (passport) =>{
    passport.use(new Strategy(options, async (payload, done) =>{
        await users.findById(payload.user_id).then( user =>{
            if(user){
                return done(null, user); //null - no errors
            }
            
            return done(null, false);           
        })
        .catch(err =>{
            return done(null, false);
        })
    }))
}