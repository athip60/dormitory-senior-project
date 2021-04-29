const { authJwt } = require("../middleware");
const controller = require("../controllers/comment.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // comment api

  app.post(
    "/api/comment",
    [authJwt.verifyToken, authJwt.isOwnerOrGuest],
    controller.createComment
  );

  app.put(
    "/api/comment/:id",
    [authJwt.verifyToken, authJwt.isOwnerOrGuest],
    controller.updateComment
  );

  
  app.get(
    "/api/comment/:id",
    [authJwt.verifyToken, authJwt.isOwnerOrGuest],
    controller.findComment
  );

  app.delete(
    "/api/comment/:id",
    [authJwt.verifyToken, authJwt.isOwnerOrGuest],
    controller.deleteComment
  );

  app.delete(
    "/api/comment/delete/all/:id",
    [authJwt.verifyToken, authJwt.isOwnerOrGuest],
    controller.deleteCommentAll
  );
};
