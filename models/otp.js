const mongoose = require("../services/database");

const Schema = mongoose.Schema;

const otpSchema = new Schema(
  {
    userid: String,
    otp: String,
  }
  // { timestamps: true }
);

// otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 20 });

module.exports = mongoose.model("otp", otpSchema);
