import express from "express";
import { __dirname, uploader } from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import connectBD from "./config/connectDB.js";
import logger from "morgan";
import cookieParser from "cookie-parser";

import appRouter from "./routers/index.js";

import ProductManager from "./ProductManager.js";

import session from "express-session";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import MongoStore from "connect-mongo";

//-------------------------SERVIDOR------------------------------//
const app = express();
const PORT = 8080 || process.env.PORT;
connectBD();
const httpServer = app.listen(PORT, () =>
  console.log("Listening on PORT 8080")
);
const socketServer = new Server(httpServer);

//-------------------------PLANTILLAS------------------------------//

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://mathiasrizzi:RKeOEkVxlSxjZn0E@cursocorder.geg6fej.mongodb.net/ecommerce",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTOpology: true,
      },
      ttl: 15,
    }),
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(appRouter);

//-------------------------SOCKET SERVIDOR------------------------------//

const products = new ProductManager("products.json");
const productList = await products.getProducts();

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.emit("lista-de-productos", productList);

  socket.on("id-producto-eliminado", (data) => {
    products.deleteProduct(parseInt(data));
  });

  socket.on("producto-creado", (data) => {
    const newProduct = {
      title: data.inputTitleValue,
      description: data.inputDescriptionValue,
      price: data.inputPriceValue,
      thumbnail: data.inputThumbnailValue,
      stock: data.inputStockValue,
      code: data.inputCodeValue,
    };
    products.addProduct(newProduct);
  });
});
