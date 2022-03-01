const Users = require("../../models/user");

exports.getAllAdmins = (req, res) => {
    Users.find().exec((err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send({
                success: true,
                data: result
            });
        }
    });
};

exports.saveAdmin = (req, res) => {
    try {
        const new_Admin = new Users({
            admin: req.body.address.toUpperCase()
        });
        new_Admin.save();
        res.status(200).send(true);
    } catch (error) {
        console.log(error);
        res.status(500).send(false);
    }
};

exports.delAdmin = (req, res) => {
    Users.deleteOne({ admin: req.query.address }).exec((err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(false);
        } else {
            res.status(200).send(true);
        }
    });
};