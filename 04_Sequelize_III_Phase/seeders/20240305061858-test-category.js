"use strict";

const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    // await queryInterface.bulkInsert(
    //   "Categories",
    //   [
    //     {
    //       name: "Chocalates",
    //       status: 1,
    //     },
    //     {
    //       name: "Chips",
    //       status: 1,
    //     },
    //     {
    //       name: "Biscuits",
    //       status: 0,
    //     },
    //     {
    //       name: "Plates",
    //       status: 0,
    //     },
    //   ],
    //   {}
    // );

    const items = generateFakeItems(100);

    await queryInterface.bulkInsert("Categories", items, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {});
  },
};

function generateFakeItems(rowsCount) {
  // generate code for fake data
  const data = [];

  for (let k = 0; k < rowsCount; k++) {
    const newItem = {
      name: faker.commerce.department(),
      categoryImage: faker.image.image(),
      status: faker.random.arrayElement([1, 0]),
    };
    data.push(newItem);
  }
  return data;
}
