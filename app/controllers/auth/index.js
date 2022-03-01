const User = require("../../models/user");

exports.auth = (req, res) => {
    const address = req.query.address;
    User.findOne({ admin: address }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        };
        res.status(200).send({
            address: address,
            role: user !== null ? 'admin' : 'user'
        });
    });
};