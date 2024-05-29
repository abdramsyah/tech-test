'use strict';

const casual = require('casual');
const moment = require('moment');
const { hashPassword } = require('../helpers/generalHelpers');

const user = require('../source/data-users.json');

// https://pravatar.cc/images
const fakeImageId = [5, 9, 11, 12, 13, 14, 19, 26, 28, 40, 53, 58, 62];

user.forEach;

user.forEach((e, idx) => {
  e.password = hashPassword(e.password);
  e.avatar = 'https://i.pravatar.cc/150?img=' + casual.random_element(fakeImageId);
  e.phone = casual.phone;
  e.address = casual.address;

  e.createdAt = new Date();
  e.updatedAt = new Date();
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', user, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
