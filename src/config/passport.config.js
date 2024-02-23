import passport from "passport";
import local from "passport-local";
import UserManager from "../UserManager.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";
import GithubStrategy from "passport-github2";

const LocalStrategy = local.Strategy;
const sessionsService = new UserManager();

const initializePassport = () => {
  //----------REGISTRO PASSPORT------------//
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email } = req.body;
        try {
          let user = await sessionsService.getUserBy({ email });
          if (user) return done(null, false);

          let newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
          };

          let result = await sessionsService.createUser(newUser);
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //----------LOGIN PASSPORT------------//

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await sessionsService.getUserBy({ email: username });
          if (!user) {
            console.log("El usuario no existe");
            return done(null, false);
          }
          if (!isValidPassword(password, user.password))
            return done(null, false);

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //----------SERIALIZE PASSPORT------------//

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await sessionsService.getUserID({ _id: id });
    done(null, user);
  });
};

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: "Iv1.a5f3d912476df1b1",
      clientSecret: "447e44e76275f8dbb93f115f16ee2e171289542f",
      callbackURL: "http://localhost:8080/api/sessions/githubcallback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile:", profile);
      try {
        let user = await sessionsService.getUserBy({email: profile._json.email})
        if (!user) {
          let newUser = {
            first_name: profile._json.name,
            last_name: profile._json.name,
            email: profile._json.email,
            password: ""
          }

          let result = await sessionsService.createUser(newUser)
          return done(null, result)
        }

        return done(null, user)
      } catch (error) {
        done(error);
      }
    }
  )
);

export default initializePassport;
