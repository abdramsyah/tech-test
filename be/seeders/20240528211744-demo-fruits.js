'use strict';

const fruits = require('../source/data-fruits.json');

fruits.forEach;

fruits.forEach((e, idx) => {
  e.created_at = new Date();
  e.updated_at = new Date();
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Fruits', fruits, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Fruits', null, {});
  },
};
