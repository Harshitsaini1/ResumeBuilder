const mongoose = require("../services/database");

const Schema = mongoose.Schema;

const resumeSchema = new Schema({
    userid: String,
    fullname: String,
    position: String,
    email: String,
    mobile: String,
    address: String,
    skills: String,
    profile: String,
    linkedin: String,
    facebook: String,
    instagram: String,
    languages: String,
    objective: String,
    experience: Array,
    project: Array,
    certification: Array,
    education: Array,
});

module.exports = mongoose.model("resume", resumeSchema, "resumes");