import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {User} from "../models/user.model.js"; 

passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async( accessToken,refreshToken,profile,done)=>{
            try {
                let user=await User.findOne({email:profile.emails[0].value});
                if(!user){
                    user=await User.create({
                        name:profile.displayName,
                        email:profile.emails[0].value,
                        isVerified: true, // Google users are trusted
                        provider: "google",
                    })
                }
            return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);
passport.serializeUser((user,done)=>done(null,user.id))
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});