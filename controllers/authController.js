const User = require("../models/User");
const { getFormattedMongooseValidationErrors } = require("../utils/utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async ( req, resp ) => {
    const plainPassword = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    
    if( plainPassword !== confirmPassword ){
        resp.status(422).json({
            success: false,
            errorType: 'ValidationError',
            message: 'Invalid input data',
            errors: [
                {
                    "field": "confirmPassword",
                    "message": "Password and Confirm Password do not match.",
                    "value": null
                }
            ],
        });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
        });
        if( user ){
            resp.send({
                success: true,
                data: user.getDisplayUserDetails(),
            });
        }
    } catch (error) {
        resp.status(400).json({
            success: false,
            errorType: 'ValidationError',
            message: 'Invalid input data',
            errors: getFormattedMongooseValidationErrors( error ),
        });
    }
};

exports.login = async ( req, resp ) => {
    const username = req.body.username;
    const reqPassword = req.body.password;
    const user = await User.findOne({ username });
    
    if( user ){
        const validPassword = await bcrypt.compare( reqPassword, user.password )
        if( validPassword ){
            const userPayload = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email
            };
            const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
            resp.json( {status: "success", message: 'Login successful.', data: token} );
        }
    }
    resp.status(401).send({ status: 'fail', message: 'Invalid username or password' });
};

exports.verifyToken = async ( req, resp, next ) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader && authorizationHeader.split(" ")[1];
    if( !token ){
        resp.status(401).send( { status: 'fail', message: 'Authorization token required.' });
    }
    try {
        const decodedUser = await jwt.verify( token, process.env.JWT_SECRET );
        req.user = decodedUser;
        next();
    } catch (error) {
        resp.status(401).send( { status: 'fail', message: 'Invalid authorization token required.' });
    }
};