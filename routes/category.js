const express = require("express");
const router = express.Router();
const { userPropertyToken,isToken,requireSignin,isAuth } = require("../controllers/auth");

const {
    create,
    categoryById,
    read,
    update,
    remove,
    list
} = require("../controllers/category");

const { userById } = require("../controllers/user");
const {validaCategory} = require("../validator");

// routes
router.get("/category/:categoryId",userPropertyToken,isToken, read);
router.post("/category/create/:userId",userPropertyToken, isToken,requireSignin, isAuth, validaCategory,create);
router.put(
    "/category/:categoryId/:userId",
    userPropertyToken,
    isToken,
    requireSignin,
    isAuth,
    update
);
router.delete(
    "/category/:categoryId/:userId",
    userPropertyToken,
    isToken,
    requireSignin,
    isAuth,
    remove
);
router.get("/categories",userPropertyToken,isToken,requireSignin, list);

// params
router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;

