import express from "express";
import productsRouter from "./router/products.router.js";
import cartRouter from "./router/cart.router.js";



//creo una instancia de una aplicación express
const app = express();


/* Configuro el middleware express.json() en mi aplicación Express, para analizar y procesar 
las solicitudes entrantes que tienen datos en formato JSON en su cuerpo */
app.use(express.json());





/* -----------------------------------------------------------------*/
/* ROUTES */

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);




/* -----------------------------------------------------------------*/
/*ESCUCHANDO */

app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
  });