const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const client = require("../services/google");
const sgMail = require("../services/sgMail");
const clientTwilio = require("../services/twilio");

const User = require("../models/user");

exports.login = function (req, res) {
  let userData = req.body;
  User.findOne({ email: userData.email }, async (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send("Invalid email");
      } else {
        const validPass = await bcrypt.compare(
          userData.password,
          user.password
        );
        if (!validPass) {
          res.status(401).send("Invalid password");
        } else {
          let payload = { subject: user._id };
          let token = jwt.sign(payload, process.env.TOKEN_SECERET);
          res.status(200).send({ token });
        }
      }
    }
  });
};

exports.register = async function (req, res) {
  const emailExit = await User.findOne({ email: req.body.email });
  if (emailExit) return res.status(400).send("Email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  let userData = {
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
    verified: false,
  };
  let user = new User(userData);
  user.save((error, registeredUser) => {
    if (error) {
      console.log(error);
    } else {
      let payload = { subject: registeredUser._id };
      let token = jwt.sign(payload, process.env.TOKEN_SECERET);
      clientTwilio.messages
        .create({
          body: `Congratulations! ${userData.username} You have successfully registered into Resume Builder.`,
          messagingServiceSid: "MG7f396cf5d4ffd3ef2c5efc632f197de4",
          to: "+919012740181",
        })
        .then((message) => {
          // console.log(message.sid);
        })
        .done();
      res.status(200).send({ token });
    }
  });
};

exports.google = function (req, res) {
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.GOOGLE_KEY,
    });

    const payload = ticket.getPayload();
    const userDetails = {
      email: payload["email"],
      username: payload["given_name"],
      password: payload["sub"],
    };
    User.findOne({ email: userDetails.email }, async (error, user) => {
      if (error) {
        console.log(error);
      } else {
        if (!user) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(userDetails.password, salt);

          let userData = {
            email: userDetails.email,
            username: userDetails.username,
            password: hashedPassword,
            verified: false,
          };
          let user = new User(userData);
          user.save((error, registeredUser) => {
            if (error) {
              console.log(error);
            } else {
              let payload = { subject: registeredUser._id };
              let token = jwt.sign(payload, process.env.TOKEN_SECERET);
              const firstTime = true;
              res.status(200).send({ token, firstTime });
            }
          });
        } else {
          let payload = { subject: user._id };
          let token = jwt.sign(payload, process.env.TOKEN_SECERET);
          res.status(200).send({ token });
        }
      }
    });
  }
  verify().catch(console.error);
};

exports.forgot = function (req, res) {
  const { email } = req.body;
  User.findOne({ email: email }, async (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send({
          message: "User not registered",
        });
      } else {
        const secret = process.env.TOKEN_SECERET + user.password;
        const payload = {
          email: user.email,
          id: user._id,
        };
        const token = jwt.sign(payload, secret, { expiresIn: "15m" });
        const link = `http://localhost:4200/reset-password/${user._id}/${token}`;
       
        // console.log(link);
        const message = {
          to: email,
          from: "harshitkumarsaini127@gmail.com",
          subject: "Resume Builder Password Reset Link",
          text: link,
          html: `<h1>Hello from Resume Builder</h1>
                    <h3>Here's your password reset link: </h3>
                    ${link} <br>
                    <p>Note: This link will be valid upto next 15 minutes.</p>
                    `,
        };

        sgMail
          .send(message)
          .then((response) => {
            res.status(200).send({
              message: "Password reset link has been sent to your email.",
            });
          })
          .catch((error) => {
            res.status(400).send(error);
          });
      }
    }
  });
};

exports.reset = async function (req, res) {
  const { id, token, password } = req.body;

  const userExit = await User.findOne({
    _id: id,
  });

  if (JSON.stringify(userExit._id) !== JSON.stringify(id)) {
    return res.status(400).send("Invalid Id");
  }

  const secret = process.env.TOKEN_SECERET + userExit.password;

  try {
    const payload = jwt.verify(token, secret);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    User.findOneAndUpdate(
      { _id: id },
      { password: hashedPassword },
      (err, user) => {
        if (err) {
          res.status(401).send(err);
        } else {
          res.status(200).send({ message: "sucess" });
        }
      }
    );
  } catch (error) {
    res.status(400).send(error.message);
  }
};



















































































 // const link = `https://vp-saurabh.herokuapp.com/reset-password/${user._id}/${token}`;