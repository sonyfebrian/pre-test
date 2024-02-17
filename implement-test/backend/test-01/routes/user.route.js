const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/all", controller.allAccess);

  app.get(
    "/api/v1/customer",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.customerBoard
  );

  app.get(
    "/api/v1/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
