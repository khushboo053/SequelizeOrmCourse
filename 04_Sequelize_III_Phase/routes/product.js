const express = require("express");
const productModel = require("../models").Product;
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const router = express.Router();

router.get("/products", (req, res) => {
  productModel
    .findAll({
      //   attributes: ["id", "name"],
      //   limit: 10, // total count of products we want at request
      //   offset: 4, // setting up first index value
      //   order: [["id", "DESC"]],
      //   order: [["name", "ASC"]]

      where: {
        // id: {
        //   [Op.eq]: 300,
        // },
        // id: {
        //   [Op.between]: [111, 115],
        // },
        // name: {
        //   [Op.and]: [
        //   {
        //       [Op.like]: "H%",
        //   },
        //   {
        //   [Op.like]: "%Bacon%",

        //   }
        //   ]
        // },

        // id: {
        //   [Op.gt]: 300,
        // },

        // id: {
        //   [Op.and]: [
        //     {
        //       [Op.gte]: 250,
        //     },
        //     {
        //       [Op.lt]: 300,
        //     },
        //   ],
        // },

        // id: {
        //   [Op.or]: [
        //     {
        //       [Op.gte]: 250,
        //     },
        //     {
        //       [Op.lt]: 300,
        //     },
        //   ],
        // },

        // [Op.or]: [
        //   {
        //     id: {
        //       [Op.eq]: 300,
        //     },
        //   },
        //   {
        //     name: {
        //       [Op.eq]: "Unbranded Frozen Bacon",
        //     },
        //   },
        // ],

        [Op.and]: [
          {
            id: {
              [Op.eq]: 154,
            },
          },
          {
            name: {
              [Op.eq]: "Unbranded Frozen Bacon",
            },
          },
        ],
      },
    })
    .then((data) => {
      if (data) {
        res.status(200).json({
          status: 1,
          message: "Products Page",
          data: data,
        });
      } else {
        res.status(200).json({
          status: 0,
          message: "No Products Found",
        });
      }
    });
});

module.exports = router;
