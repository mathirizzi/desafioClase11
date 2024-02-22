import passport from "passport";
import local from "passport-local";
import UserManager from "../UserManager.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";

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

export default initializePassport;
