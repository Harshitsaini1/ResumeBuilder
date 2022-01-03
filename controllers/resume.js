const Resume = require("../models/resume");

exports.resume = async function(req, res) {
    let resumeData = {
        userid: req.userId,
        fullname: req.body.fullname,
        position: req.body.position,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        skills: req.body.skills,
        profile: req.body.profile,
        linkedin: req.body.linkedin,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        languages: req.body.languages,
        objective: req.body.objective,
        experience: req.body.experience,
        project: req.body.project,
        certification: req.body.certification,
        education: req.body.education,
    };

    const resumeExit = await Resume.findOne({ userid: req.userId });
    if (resumeExit) {
        Resume.findOneAndUpdate({ userid: req.userId }, resumeData, (err, user) => {
            if (err) {
                res.status(401).send(err);
            } else {
                res.status(200).send({ message: "sucess" });
            }
        });
        return;
    }

    let resume = new Resume(resumeData);

    resume.save((error, savedResume) => {
        if (error) {
            res.status(401).send(err);
        } else {
            // console.log(savedResume);
            res.status(200).send({ message: "success" });
        }
    });
};

exports.template = function(req, res) {
    Resume.findOne({ userid: req.userId }, (err, template) => {
        if (err) {
            // console.error(err);
            res.status(400).send(err);
        } else {
            // console.log("template");
            // console.log(template);
            res.status(200).send(template);
        }
    });
};