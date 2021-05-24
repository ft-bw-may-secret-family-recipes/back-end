exports.seed = function(knex) {
    return knex('users').insert([
      {user_username: 'Homer', user_password: "1234", user_email: "thesimpsons@email.com"},
      {user_username: 'Marge', user_password: "1234", user_email: "thesimpsons@email.com"},
      {user_username: 'Bart', user_password: "1234", user_email: "thesimpsons@email.com"},
      {user_username: 'Lisa', user_password: "1234", user_email: "thesimpsons@email.com"},
      {user_username: 'Maggie', user_password: "1234", user_email: "thesimpsons@email.com"},
    ]);
  };