const express = require("express");
const router = express.Router();

const { userPropertyToken,isToken,requireSignin,isAuth,isAdmin} = require("../controllers/auth");

const {userById,read,update,remove,list} = require("../controllers/user");

// routes


router.get("/user/:userId", userPropertyToken,isToken,requireSignin, isAuth,read);
router.get("/users/:userId", userPropertyToken,isToken,requireSignin, isAuth,isAdmin,list);
router.put( "/user/:userId", userPropertyToken, isToken,requireSignin, isAuth,update);
router.delete( "/user/:userId", userPropertyToken, isToken,requireSignin, isAuth,remove);



// params
router.param("userId", userById);

module.exports = router;