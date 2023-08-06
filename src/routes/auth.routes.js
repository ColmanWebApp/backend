const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users.controller');
const initializePassport = require('../config/passport-config');

initializePassport(passport, email => {
    return userController.getUserByEmail(email);
}, id => {
    return userController.getUserById(id);
});

router.post(
    "/login",
    // authMiddleware.validateLogin,
    passport.authenticate("local"),
    (req, res) => {
        console.log("User has logged in: ");
      // If authentication is successful, this callback function will be executed
      res.sendStatus(200); // Send a success status code (e.g., 200)
    }
  );
  
//   router.get("/register", authMiddleware.checkNotAuthenticated, (req, res) => {
//     res.render("register.ejs");
//   });
  
  router.post(
    "/register",
    // authMiddleware.checkNotAuthenticated,
    // authMiddleware.validateFields,
    async (req, res) => {
      try {
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const checkUser = await userController.getUserByEmail(req.body.email);
        if (checkUser) {
          return res.status(402).json({ error: "Email already exists" });
        }
        userController.createUser(
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }
        )
        console.log("User has registered: ",user);
        res.sendStatus(200);
      } catch {
        res.sendStatus(500);
      }
    }
  );
  
  router.delete("/logout", (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      console.log("User has logged out: ");
      res.redirect("/login");
    });
  });

  module.exports = router;