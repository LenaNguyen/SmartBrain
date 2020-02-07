const knex = require("knex");

const handleGetProfile = db => (req, res) => {
  const { id } = req.params;

  db.select("*")
    .where({ id })
    .from("users")
    .then(user => {
      if (user.length) {
        res.json(user);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch(err => res.status(400).json("error getting user"));
};

const handleUpdateProfile = db => (req, res) => {
  const { id } = req.params;
  const { incrementEntries, ...rest } = req.body;
  const newInfo = { ...rest };

  if (incrementEntries) {
    newInfo.entries = knex.raw("entries + 1");
  }

  db("users")
    .where("id", "=", id)
    .update(newInfo)
    .returning("*")
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json("unable to update profile");
    });
};

const handleGetImages = db => async (req, res) => {
  const { id } = req.params;
  try {
    const imageUrls = await db("images")
      .select("location")
      .where({ user_id: id });

    res.send(JSON.stringify(imageUrls));
  } catch (error) {
    console.log(error);
    res.status(500).json("error getting image urls");
  }
};

module.exports = {
  handleGetProfile,
  handleGetImages,
  handleUpdateProfile
};
