const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();
const {isJsonValidRequest} = require("./validator/index");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const ticketRoutes = require("./routes/ticket");

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
app.use("/api",ticketRoutes);

const port = process.env.PORT || 3000;

/**
 *  CONFIGURACIÓN DOCUMENTACION API
 */
// Extended: https://swagger.io/specification/#infoObject

const swaggerOptions = {
    swaggerDefinition: {
        swagger:"2.0",
        info: {
            version: "1.0.0",
            title: "SUPERMARKET-LIST API",
            description: "Contiene la definición de los end-point del Servicio Rest SUPERMARKET-LIST, para hacer uso de los end-point es necesario enviar el token (bearer authorization). Puedes encontrar el código fuente en el repositorio : [SUPERMARKET-LIST](https://github.com/PedtritoAlejos/supermarket-list)",
            contact: {
                name: "pedroalejosb@gmail.com"
            },
            servers: [`http://localhost:${port}`]
        }
        
    },
    // definition the apis with swagger 
    apis: ['./routes/*.yaml']
}
// final definitions with swagger-express
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/** #################################################### */

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});







