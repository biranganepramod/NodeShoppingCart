const express = require("express");
const connectToMongoDB = require("./config/mongoDB");
const productsRouter = require("./routes/productRoutes");
const categoriesRouter = require("./routes/categoriesRoutes");
const usersRouter = require("./routes/authRoutes");
const fallbackRouter = require("./routes/fallbackRoutes");

const app = express();
app.use( express.json() );
app.use( productsRouter );
app.use( categoriesRouter );
app.use( usersRouter );
app.use( fallbackRouter );

connectToMongoDB()
.then( () => {
    console.log( "Connected to database" );
    app.listen( process.env.APP_PORT, ( error ) => {
        if( error ){
            console.log("Server can not be started");
        } else {
            console.log("Server started at port 3000");
        }
    } );
} )
.catch( ( error ) => {
    console.log( "Can not connect to DB" );
    process.exit;
} )



