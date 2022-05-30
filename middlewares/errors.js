exports.flashErrors = (req, res, next) => {
    res.locals.messages = req.flash();
    next();
};