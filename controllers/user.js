const User = require("../models/user");


exports.list = async (req, res) => {
    try {
        const users = await User.find({});

        res.json({
            success: true,
            users
        });


    } catch ({message}) {
        res.status(400).json({
            success: false,
            message,
            msg: "Error al buscar todos los usuarios"
        })
    }
}

exports.create = async (req, res) => {
    try {
        const user = await User.create(req.body);

        user.save();

        res.json({
            success: true,
            user    
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        });
    }   
}

exports.update = async (req, res) => {
    try {
        const {name, email} = req.body;
        const newUser = await User.findOneAndUpdate(
            {email},
            {name},
            {new: true}
        );

        res.json({
            success: true,
            user: newUser
        });

    } catch (error) {
        
        res.status(400).json({
            success: false,
            error
        })
    }
}
