const bcrypt = require('bcrypt')
const { BCRYPT_ROUNDS, SEED_PASSWORD } = require('../../../utils/env-fallbacks')



exports.seed =   function (knex) {
  const password = bcrypt.hashSync(SEED_PASSWORD, BCRYPT_ROUNDS)

    return knex('users').insert([
      {user_username: 'Homer', user_password: password, user_email: "thesimpsons@email.com"},
      {user_username: 'Marge', user_password: password, user_email: "thesimpsons@email.com"},
      {user_username: 'Bart', user_password: password, user_email: "thesimpsons@email.com"},
      {user_username: 'Lisa', user_password: password, user_email: "thesimpsons@email.com"},
      {user_username: 'Maggie', user_password: password, user_email: "thesimpsons@email.com"},
    ]);
  };