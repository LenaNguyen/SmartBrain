const handleSignIn = (db, bcrypt, Joi) => (req, res) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .required()
  });

  const { email, password } = req.body;
  const validation = Joi.validate(req.body, schema);
  if (validation.error) return res.status(400).json("invalid fields");

  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then(user => {
            res.json(user[0]);
          });
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch(err => res.status(400).json("unable to get users"));
};

module.exports = {
  handleSignIn: handleSignIn
};
