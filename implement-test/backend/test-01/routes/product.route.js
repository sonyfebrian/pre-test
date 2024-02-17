const { authJwt } = require("../middleware");
const controller = require("../controllers/product.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/v1/products",
    [authJwt.verifyToken],
    controller.findAllProductCategories
  );

  app.get(
    "/api/v1/products/:id",
    [authJwt.verifyToken],
    controller.findProductCategoryById
  );

  app.post(
    "/api/v1/products",
    [authJwt.verifyToken],
    controller.createProductCategory
  );

  app.put(
    "/api/v1/products/:id",
    [authJwt.verifyToken],
    controller.updateProductCategoryById
  );

  app.delete(
    "/api/v1/products/:id",
    [authJwt.verifyToken],
    controller.deleteProductCategoryById
  );
};
