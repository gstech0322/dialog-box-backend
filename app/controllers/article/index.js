const multer = require('multer');
const Aboutus = require("../../models/aboutus");
const Charity = require("../../models/charity");

exports.tinyImageUpload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './public/images/article');
        },
        filename(req, file, cb) {
            cb(null, `article_${new Date().getTime()}.png`);
        }
    }),
    limits: {
        fileSize: 24000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.*$/)) {
            return cb(
                new Error(
                    'only upload image files.'
                )
            );
        }
        cb(undefined, true);
    }
});

exports.getAboutus = (req, res) => {
    Aboutus.find((err, result) => {
        if (err) {
            res.status(500).send({ success: false });
        }
        res.status(200).send({
            success: true,
            data: result
        });
    });
};

exports.saveAboutus = (req, res) => {
    Aboutus.find((err, result) => {
        if (err) {
            res.status(500).send(false);
        }
        if (result.length > 0) {
            let filter = { _id: result[0]._id };
            let update = { 
                // title: req.body.title, 
                content: req.body.content 
            };
            Aboutus.findOneAndUpdate(filter, update, (error, result1) => {
                if (error) {
                    res.status(500).send(false);
                }
                res.status(200).send(true);
            });
        } else {
            try {
                const data = new Aboutus({
                    // title: req.body.title,
                    content: req.body.content
                });
                data.save();
                res.status(200).send(true);
            } catch (error) {
                console.log(error);
                res.status(500).send();
            }
        }
    });
};

exports.getCharity = (req, res) => {
    Charity.find((err, result) => {
        if (err) {
            res.status(500).send({ success: false });
        }
        res.status(200).send({
            success: true,
            data: result
        });
    });
};

exports.saveCharity = (req, res) => {
    Charity.find((err, result) => {
        if (err) {
            res.status(500).send(false);
        }
        if (result.length > 0) {
            let filter = { _id: result[0]._id };
            let update = { content: req.body.content };
            Charity.findOneAndUpdate(filter, update, (error, result1) => {
                if (error) {
                    res.status(500).send(false);
                }
                res.status(200).send(true);
            });
        } else {
            try {
                const data = new Charity({
                    content: req.body.content
                });
                data.save();
                res.status(200).send(true);
            } catch (error) {
                console.log(error);
                res.status(500).send();
            }
        }
    });
}