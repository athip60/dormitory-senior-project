const { authJwt } = require("../middleware");
const controller = require("../controllers/blog.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //   api here

  app.get(
    "/api/blog",
    [authJwt.verifyToken, authJwt.isOwner],
    controller.findAll
  );

  app.get(
    "/api/blog/:id",
    [authJwt.verifyToken, authJwt.isOwnerOrGuest],
    controller.findAllForGuest
  );

  // post api

  app.post(
    "/api/blog",
    [authJwt.verifyToken, authJwt.isOwnerOrGuest],
    controller.create
  );
  
  app.put(
    "/api/blog/:id",
    [authJwt.verifyToken, authJwt.isOwnerOrGuest],
    controller.updatePost
  );

  app.delete(
    "/api/blog/:id",
    [authJwt.verifyToken, authJwt.isOwnerOrGuest],
    controller.deletePost
  );
};
