const handleRegister = (db, bcrypt, Joi) => (req, res) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .max(255)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .required()
  });

  const validation = Joi.validate(req.body, schema);
  if (validation.error) return res.status(400).json("invalid fields");

  const { email, name, password } = req.body;

  const hash = bcrypt.hashSync(password);

  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: email
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(users => {
            res.json(users[0]);
          });
      })
      .then(trx.commit)
      .catch(() => trx.rollback);
  }).catch(err => {
    console.log(err);
    res.status(400).json("unable to register");
  });
};

module.exports = {
  handleRegister: handleRegister
};
