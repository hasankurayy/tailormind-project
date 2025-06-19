// middlewares/responseInterceptor.js
const responseInterceptor = (req, res, next) => {
    // i can use res.success in end of controller and all routes will be formatted like this:
    // for example i used in only get-all-students 
    res.success = function(data) {
        return this.status(200).json({
            status: 'success',
            data
        });
    };
    next();
};

module.exports = { responseInterceptor };