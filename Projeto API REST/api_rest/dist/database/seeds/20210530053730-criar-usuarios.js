"use strict";const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'users',
    [
      {
        nome: 'Vini',
        email: 'vinithielem@gmail.com',
        password_hash: await bcryptjs.hash('12345678', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        nome: 'Vini 2',
        email: 'vini2thielem@gmail.com',
        password_hash: await bcryptjs.hash('78451200', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        nome: 'Vini 3',
        email: 'vini3thielem@gmail.com',
        password_hash: await bcryptjs.hash('02154877', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: () => {},
};
