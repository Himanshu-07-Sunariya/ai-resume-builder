const loggerMiddleware = (req, res, next) => {
    console.log("Request Received");
    console.log("Method:", req.method);
    console.log("URL:", req.url);

    next();
    // REQUEST->MIDDLEWARE->CONTROLLER->RESPONSE
};

module.exports = loggerMiddleware;