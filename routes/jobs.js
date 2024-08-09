
const express = require('express');
const router = express.Router();
const Job = require("../models/job")


// GET /pjobs/ - List all projects 
router.get("/", async (req, res ,next) => {
  // Use mongoose data model to retrieve all projects
  let jobs = await Job.find().sort([[ "jobDate", "ascending" ]]);
  res.render("jobs/index", { title: "All Jobs", dataset: jobs });
});

// GET /projects/add - Load form to add a new project
router.get("/create", (req, res ,next) => {
  res.render("jobs/create", { title: "Add a New Job" });
});

// POST /projects/add - Save a new project
router.post("/create", async (req, res ,next) => {
  // Use mongoose data model to create a new project object
  let newJob =  new Job({
      jobName: req.body.jobName,
      jobDate: req.body.jobDate,
      jobDescription: req.body.jobDescription,
  });
  // Save the newly created project to the db (async operation)
  await newJob.save();
  // Redirect to the list of projects page
  res.redirect("/jobs");
});

//Load form to edit job
router.get("/edit/:_id", async (req, res, next) => {
  let jobId = req.params._id;
  let jobData = await Job.findById(jobId);
  res.render("jobs/edit", { title: "Update Job Information", job: jobData });
});

//Save an edited job
router.post("/edit/:_id", async (req, res, next) => {
  let jobId = req.params._id;
  await Job.findByIdAndUpdate(
    {_id: jobId},
    {
      jobName: req.body.jobName,
      jobDate: req.body.jobDate,
      jobDescription: req.body.jobDescription,
    }
  );
  res.redirect("/jobs");
});

//Delete project
router.get("/delete/:_id", async(req, res, next) => {
  let jobId = req.params._id;
  await Job.deleteOne({_id: jobId});
  res.redirect("/jobs");
});

module.exports = router;
