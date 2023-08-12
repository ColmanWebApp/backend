const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users.controller');
const initializePassport = require('../config/passport-config');
const validations = require('../validations/index')
initializePassport(passport, email => {
    return userController.getUserByEmail(email);
}, id => {
    return userController.getUserById(id);
});

router
.post("/login",userController.userLogin)
.post("/register", validations.registerAuth, userController.createUser)

//.delete("/logout",validations.logoutAuth, userController.userLogout)

  


// async (req, res) => {
//   try {
//     // const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const checkUser = await userController.getUserByEmail(req.body.email);
//     console.log(req.body)
//     if (checkUser) {
//       return res.status(402).json({ error: "Email already exists" });
//     }
//     userController.createUser(
//         {
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//         }
//     )
//     console.log("User has registered: ",user);
//     res.sendStatus(200);
//   } catch {
//     res.sendStatus(500);
//   }
// }



// req.logout(function (err) {
//   if (err) {
//     return next(err);
//   }
//   console.log("User has logged out: ");
//   res.redirect("/login");
//   });

  module.exports = router;