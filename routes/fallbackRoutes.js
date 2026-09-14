const express = require("express");
const router = express.Router();
router.use( ( req, resp, next ) => {
    resp.status( 404 ).send( "No resources found" );
} );

module.exports = router;