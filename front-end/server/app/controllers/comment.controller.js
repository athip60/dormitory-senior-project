const db = require("../models");
const Comment = db.comment;

// comment function

exports.createComment = (req, res) => {
  Comment.create(req.body)
    .then((createPost) => {
      res.send({ message: "คอมเม้นต์สำเร็จ" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findComment = (req, res) => {
  Comment.findAll({
    where: { post_id: req.params.id },
    order: [["createdAt", "DESC"]],
  }).then((dataFindComment) => {
    res.json(dataFindComment);
  });
};

exports.updateComment = (req, res) => {
  Comment.update(req.body, {
    where: { id: req.params.id },
  })
    .then((updateComment) => {
      res.send({ status: true });
    })
    .catch((err) => {
      res.status(500).send({ status: false });
    });
};

exports.deleteComment = (req, res) => {
  Comment.destroy({
    where: { id: req.params.id },
  })
    .then((afterDelete) => {
      res.send({ status: true });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.deleteCommentAll = (req, res) => {
  Comment.destroy({
    where: { post_id: req.params.id },
  })
    .then((afterDelete) => {
      res.send({ status: true });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
