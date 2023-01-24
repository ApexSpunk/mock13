const express = require('express');
const app = express.Router();
const Job = require('../models/job.model');

app.get('/', async (req, res) => {
    try {
        const jobs = await Job.find()
        res.status(200).send(jobs)
    } catch (error) {
        res.status(500).send({ message: "Error Fetching Jobs" })
    }
})

app.post('/', async (req, res) => {
    const { name, position, contract, location } = req.body;
    try {
        const job = await Job.findOne({ name, position, contract, location })
        if (job) {
            res.status(401).send({ message: "Job already exists" })
        }
        else {
            const newJob = new Job({
                name,
                position,
                contract,
                location
            })
            await newJob.save()
            res.status(200).send({ message: "Job Added Successfully", job: { name: newJob.name, position: newJob.position, contract: newJob.contract, location: newJob.location } })
        }
    } catch (error) {
        res.status(500).send({ message: "Error Adding Job" })
    }
})

module.exports = app;
