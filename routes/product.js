const express = require("express");
const router = express.Router();

const {
    create,
    productById,
    read,
    remove,
    update,
    list
} = require("../controllers/product");
const { userPropertyToken,isToken,requireSignin,isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {validaProducto} = require("../validator");
// routes
router.get("/product/:productId", read);
router.get("/products", list);
router.post("/product/create/:userId", userPropertyToken,isToken,requireSignin, isAuth,validaProducto, create);
router.delete("/product/:productId/:userId",userPropertyToken,isToken,requireSignin,isAuth,remove);
router.put( "/product/:productId/:userId",userPropertyToken,isToken,requireSignin,isAuth,validaProducto,update);




// params
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;