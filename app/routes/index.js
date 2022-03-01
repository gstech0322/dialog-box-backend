const { Controllers } = require("../controllers");

module.exports = function (app) {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Get Auth
    app.get("/api/auth", Controllers.AuthController.auth);
    // Get Collections
    app.get("/api/collections", Controllers.CollectionController.getCollections);
    // NFT Image Upload
    app.post("/api/file_upload", Controllers.NFTController.uploadNFT.single('file'), (req, res, next) => {
        const file_path = req.file.destination.substr(9) + "/" + req.file.filename;
        res.status(200).send({
            success: true,
            file: file_path
        });
    });
    // NFT Image Delete
    app.post("/api/file_remove", Controllers.NFTController.removeImage);
    // Save New NFT
    app.post("/api/nft", Controllers.NFTController.saveNFT);
    // Update NFT
    app.put("/api/nft", Controllers.NFTController.updateNFT);
    // Get NFTs
    app.get("/api/nfts", Controllers.NFTController.getNFTs);

    // Dashboard
    app.post("/api/tiny_image_upload", Controllers.ArticleController.tinyImageUpload.single('file'), (req, res, next) => {
        const file_path = req.file.destination.substr(9) + "/" + req.file.filename;
        res.status(200).send(file_path);
    });
    app.get("/api/aboutus", Controllers.ArticleController.getAboutus);
    app.post("/api/aboutus", Controllers.ArticleController.saveAboutus);
    app.get("/api/charity", Controllers.ArticleController.getCharity);
    app.post("/api/charity", Controllers.ArticleController.saveCharity);
    app.get("/api/admins", Controllers.AdminController.getAllAdmins);
    app.post("/api/admin", Controllers.AdminController.saveAdmin);
    app.delete("/api/admin", Controllers.AdminController.delAdmin);
    app.post("/api/collection_image_upload",
        Controllers.CollectionController.uploadCollectionImage.single('file'), (req, res, next) => {
            const file_path = req.file.destination.substr(9) + "/" + req.file.filename;
            res.status(200).send({
                success: true,
                file: file_path
            });
        }
    );
    app.post("/api/collection", Controllers.CollectionController.addCollection);
    app.put("/api/collection", Controllers.CollectionController.updateCollection);
    app.delete("/api/collection", Controllers.CollectionController.deleteCollection);
}