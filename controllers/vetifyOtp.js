const clientTwilio = require("../services/twilio");

const Otp = require("../models/otp");
const User = require("../models/user");

exports.sendOtp = function (req, res) {
  //   console.log(req.body, "Send");
  const otp5 = Math.random().toString().slice(-5);
  clientTwilio.messages
    .create({
      body: `Your otp for mobile verification is ${otp5}. This otp is valid upto 10 minutes.`,
      messagingServiceSid: "MG7f396cf5d4ffd3ef2c5efc632f197de4",
      to: "+919012740181",
    })
    .then(async (message) => {
      const otpData = {
        userid: req.userId,
        otp: otp5,
      };
      const fetchOtp = await Otp.findOne({ userid: req.userId });
      if (fetchOtp) {
        Otp.findOneAndUpdate({ userid: req.userId }, otpData, (err, otpres) => {
          if (err) {
            res.status(401).send(err);
          } else {
            res.status(200).send({ message: true });
          }
        });
        return;
      }
      const newOtp = new Otp(otpData);
      newOtp.save();
      // console.log(otpData, message.sid);
      res.status(200).send({ message: true });
    })
    .catch((err) => {
      res.status(401).send({ message: false, errMessage: err });
    })
    .done();
};

exports.verifyOtp = async function (req, res) {
  // console.log(req.body, "VErify");
  const { otp, mobile } = req.body.data;
  // console.log(mobile);
  const fetchOtp = await Otp.findOne({ userid: req.userId });
  if (otp === fetchOtp.otp) {
    // console.log("matched");
    await Otp.deleteOne({ userid: req.userId });
    User.findOneAndUpdate(
      { _id: req.userId },
      { verified: true, mobile: mobile },
      (err, user) => {
        if (err) {
          res.status(401).send(err);
        } else {
          clientTwilio.messages
            .create({
              body: `Your OTP verification successfull for Resume Builder.`,
              messagingServiceSid: "MG7f396cf5d4ffd3ef2c5efc632f197de4",
              to: "+919012740181",
            })
            .then((message) => {
              // console.log(message.sid);
            })
            .done();
          res.status(200).send({ message: "sucess" });
        }
      }
    );

    // res.status(200).send({ message: true });
    return;
  }
  res.status(401).send({ message: false });
  // console.log("not matched");
};

exports.checkOtpBack = async function (req, res) {
  const user = await User.findOne({ _id: req.userId });
  // console.log(user);
  if (user) {
    if (user.verified === true) {
      return res.status(200).send({ message: true });
    }
  }
  return res.status(401).send({ message: false });
};
