const protect = (req, res, next) => {

    console.log("Authentication Middleware Executed ✅");

    next();

}

export default protect;