const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SG_KEY);

module.exports = sgMail;