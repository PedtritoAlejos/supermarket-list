const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();
const {isJsonValidRequest} = require("./validator/index");
//const swaggerJsDoc = require("swagger-jsdoc");
//const swaggerUi = require("swagger-ui-express");


const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

const app = express();

const db = async () => {
    try {
        const success = await mongoose.connect(process.env.DATABASE,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        });

        console.log("DB Connected");

    } catch (error) {
        console.log("DB Connection Error",error);
    }
}

db();

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(isJsonValidRequest);
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());



app.use("/api",authRoutes);
app.use("/api",categoryRoutes);
app.use("/api",userRoutes);
app.use("/api",productRoutes);



const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


