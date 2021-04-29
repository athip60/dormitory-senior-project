const db = require("../models");
const Data_room = db.data_room;


// ลบข้อมูลห้องใน table Data_room
exports.deleteDataRoom = (req, res) => {
  Data_room.destroy({
    where: { id: req.params.id },
  })
    .then((afterDeleteDataRoom) => {
      res.send({
        message: "ลบข้อมูลห้องสำเร็จ",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

// ค้นข้อมูลของ user คนนั้นๆใน table Data_room
exports.findDataRoomByUID = (req, res) => {
  Data_room.findAll({ where: { user_id: req.params.uid } }).then((data) => {
    if (data.length) {
      res.json(data);
    } else {
      res.json(data);
    }
  });
};

exports.findDataRoomByID = (req, res) => {
  Data_room.findByPk(req.params.id).then((data) => {
    if (data.length) {
      res.json(data);
    } else {
      res.json(data);
    }
  });
};

// สร้างห้องพักและ ข้อมูลห้องพักใหม่
exports.create_data_room = (req, res) => {
  Data_room.create(req.body)
    .then((afterCreate) => {
      res.json(afterCreate);
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

// แก้ไข Data room
exports.updateDataRoom = (req, res) => {
  Data_room.update(req.body, { where: { id: req.params.id } })
    .then((afterUpdate) => {
      res.send({ message: "แก้ไขข้อมูลห้องสำเร็จ" });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};