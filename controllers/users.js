const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.profile = function (req, res) {
  User.findOne({ _id: req.userId }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(401).send("error");
    } else {
      userResponse = {
        email: user.email,
        username: user.username,
        isSocial: user.isSocial,
        verified: user.verified,
        mobile: user.mobile,
      };
      res.json(userResponse);
    }
  });
};

exports.edit = async function (req, res) {
  const emailExit = await User.findOne({ email: req.body.email });
  if (emailExit) {
    if (JSON.stringify(emailExit._id) !== JSON.stringify(req.userId)) {
      return res.status(400).send("Email already exists");
    }
  }
  let userData = {
    email: req.body.email,
    username: req.body.username,
  };

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    userData["password"] = hashedPassword;
  }
  User.findOneAndUpdate({ _id: req.userId }, userData, (err, user) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send({ message: "sucess" });
    }
  });
};
