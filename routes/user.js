const { Router } = require("express");

const { newUser, deleteUser } = require("../controllers/user");

const router = Router();

router.post("/new-user", (req, res) => {
  const userData = req.body;
  newUser(userData, (err, data) => {
    if (err) res.status(err).json(data);
    else res.json(data);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  deleteUser(id, (err, data) => {
    if (err) res.status(500).json(data);
    else res.json(data);
  });
});

module.exports = router;
