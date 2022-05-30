const passport = require("passport");

exports.authUser = passport.authenticate('local', {
    successRedirect: '/user/login-successful',
    failureRedirect: '/user/login-no-successful',
    failureFlash: true
});


// verify user is authenticated
exports.verifyUser = (req, res, next) => {
    if(req.isAuthenticated()) {
        
        return next();
    }

    res.status(404).json({
        success: false,
        msg: "You are not authenticated"
    })
}


exports.logoutSession = (req, res) => {
    
    try {
        req.logout(function(err) {
            if (err) { 
                return next(err); 
            }

            res.status(200).json({
                success: true,
                msg: "You are logged out"
            })

          });
    } catch (error) { 
        res.status(400).json({
            success: false,
            msg: "You are not logged out"
        })
    }

}

// verify if the user is admin or not
exports.verifyIfUserBlogger = (req, res, next) => {
    if(req.user.role === 'blogger') {
        return next();
    }

    res.status(404).json({
        success: false,
        msg: "You are not an blogger and dont have permission to do this"
    })
}

exports.logginSuccessful = (req, res) => {
    res.status(200).json({
        success: true,
        msg: "You are logged in"
    })
} 