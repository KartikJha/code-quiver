const reqResLogger = (req, res, next) => {
    console.log("Request: ", req.method, req.url, req.body, req.query);
    console.log("Response: ", res.status, res.body);
    next();
}

module.exports = reqResLogger;
