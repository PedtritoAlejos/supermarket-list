const express = require("express");
const router = express.Router();

const { userPropertyToken,isToken,requireSignin,isAuth } = require("../controllers/auth");

const {userById,read,update,remove} = require("../controllers/user");

// routes


router.get("/user/:userId", userPropertyToken,isToken,requireSignin, isAuth,read);
router.put( "/user/:userId", userPropertyToken, isToken,requireSignin, isAuth,update);
router.delete( "/user/:userId", userPropertyToken, isToken,requireSignin, isAuth,remove);



// params
router.param("userId", userById);

module.exports = router;