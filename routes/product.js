const express = require("express");
const router = express.Router();

const {
    create,
    productById,
    read,
    remove,
    update,
    list,
    listRelated
} = require("../controllers/product");
const { userPropertyToken,isToken,requireSignin,isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// routes
router.get("/product/:productId", read);
router.post("/product/create/:userId", userPropertyToken,isToken,requireSignin, isAuth, create);
router.delete("/product/:productId/:userId",userPropertyToken,isToken,requireSignin,isAuth,remove);
router.put( "/product/:productId/:userId",userPropertyToken,isToken,requireSignin,isAuth,update);

router.get("/products", list);
router.get("/products/related/:productId", listRelated);


// params
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;