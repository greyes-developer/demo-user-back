const { Router } = require("express");

const { login } = require("../controllers/auth");

const router = Router();

router.post("/login", (req, res) => {
  const userData = req.body;
  login(userData, (err, data) => {
    if (err) {
      res.status(err).json(data);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
