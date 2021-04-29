const { sequelize, Sequelize } = require("../models");
const db = require("../models");
const Income = db.income;
const mysql = require("mysql2");

const db1 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "schlaf",
});

exports.create = (req, res) => {
  Income.create(req.body)
    .then((createIncome) => {
      res.send({ message: "สร้างใบแจ้งชำระเงินสำเร็จ" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  Income.findAll({ order: [["date_program", "DESC"]] })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAllSum = (req, res) => {
  db1.query(
    "select year(date_program) as year, month(date_program) as month, sum(debit) as debit, sum(credit) as credit from incomes group by year(date_program), month(date_program)",
    (error, results) => {
      if (error) {
        res.send({ message: error });
      } else {
        res.json(results);
      }
    }
  );
};

exports.update = (req, res) => {
  Income.update(req.body, {
    where: { id: req.params.id },
  })
    .then((afterUpdate) => {
      res.send({ status: true });
    })
    .catch((err) => {
      res.status(500).send({ status: true });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Income.destroy({
    where: { id: id },
  })
    .then((deleteIncome) => {
      res.send({ status: true });
    })
    .catch((err) => {
      res.status(500).send({ status: false });
    });
};
