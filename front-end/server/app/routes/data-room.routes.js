const { authJwt } = require("../middleware");
const controller = require("../controllers/data-room.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // table data_rooms

  // สร้างข้อมูลของห้องนั้นๆ
  app.post(
    "/api/data_room/create",
    [authJwt.verifyToken, authJwt.isOwner],
    controller.create_data_room
  );

  app.get(
    "/api/data_room/find-data-room-by-uid/:uid",
    [authJwt.verifyToken, authJwt.isOwner],
    controller.findDataRoomByUID
  );

  app.get(
    "/api/data_room/find-data-room-by-id/:id",
    [authJwt.verifyToken, authJwt.isOwner],
    controller.findDataRoomByID
  );

  // อัพเดทข้อมูลของห้องนั้น
  app.put(
    "/api/data_room/update/:id",
    [authJwt.verifyToken, authJwt.isOwner],
    controller.updateDataRoom
  );

  // ลบข้อมูลห้องนั้นๆโดยใช้ id PK
  app.delete(
    "/api/data_room/delete/:id",
    [authJwt.verifyToken, authJwt.isOwner],
    controller.deleteDataRoom
  );
};
