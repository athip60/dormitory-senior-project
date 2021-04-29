const db = require("../models");
const Blog = db.blog;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Blog.findAll({ order: [["createdAt", "DESC"]] })
    .then((dataFindAll) => {
      res.json(dataFindAll);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAllForGuest = (req, res) => {
  Blog.findAll({
    where: {
      [Op.or]: [{ send_from: req.params.id }, { send_from: null }],
    },
    order: [["createdAt", "DESC"]],
  })
    .then((dataFindAll) => {
      res.json(dataFindAll);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// post function

exports.create = (req, res) => {
  Blog.create(req.body)
    .then((createPost) => {
      res.send({ message: "โพสต์สำเร็จ" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updatePost = (req, res) => {
  Blog.update(req.body, {
    where: { id: req.params.id },
  })
    .then((updatePost) => {
      res.send({ status: true });
    })
    .catch((err) => {
      res.status(500).send({ status: false });
    });
};

exports.deletePost = (req, res) => {
  Blog.destroy({
    where: { id: req.params.id },
  })
    .then((afterDelete) => {
      res.send({ status: true });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
