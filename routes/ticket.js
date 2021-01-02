const express = require("express");
const router = express.Router();
const { userPropertyToken,isToken,requireSignin,isAuth } = require("../controllers/auth");

const {
    create,
    ticketById,
    read,
    update,
    remove,
    list
} = require("../controllers/ticket");

const { userById } = require("../controllers/user");
const {validaCategory} = require("../validator");

// routes
router.get("/tickets/:userId",userPropertyToken,isToken,requireSignin,list);
router.get("/ticket/:ticketId",userPropertyToken,isToken, read);
router.post("/ticket/create/:userId",userPropertyToken, isToken,requireSignin, isAuth, validaCategory,create);
router.put( "/ticket/:ticketId/:userId", userPropertyToken,isToken,requireSignin, isAuth,update);
router.delete( "/ticket/:ticketId/:userId", userPropertyToken, isToken,requireSignin,isAuth,remove);


// params
router.param("ticketId", ticketById);
router.param("userId", userById);

module.exports = router;

