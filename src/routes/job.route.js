const express = require('express');
const app = express.Router();
const Job = require('../models/job.model');
const Applied = require('../models/applied.model');

app.get('/', async (req, res) => {
    try {
        const jobs = await Job.find()
        res.status(200).send({ message: "Jobs Fetched Successfully", jobs })
    } catch (error) {
        res.status(500).send({ message: "Error Fetching Jobs" })
    }
})

app.get('/applied', async (req, res) => {
    try {
        const { email } = req.query
        const applied = await Applied.find({ "user.email": email }).populate("job")
        res.status(200).send({ message: "Applied Jobs Fetched Successfully", applied })
    } catch (error) {
        res.status(500).send({ message: "Error Fetching Applied Jobs" })
    }
})

app.post('/apply', async (req, res) => {
    try {
        const { job, user } = req.body
        const applied = await Applied.create({ job, user })
        res.status(200).send({ message: "Applied Successfully", applied })
    } catch (error) {
        res.status(500).send({ message: "Error Applying" })
    }
})




app.post('/', async (req, res) => {
    const { name, position, contract, location } = req.body;
    try {
        const newJob = new Job({
            name,
            position,
            contract,
            location
        })
        await newJob.save()
        res.status(200).send({ message: "Job Added Successfully", newJob })
    } catch (error) {
        res.status(500).send({ message: "Error Adding Job" })
    }
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findByIdAndDelete(id)
        if (job) {
            res.status(200).send({ message: "Job Deleted Successfully", job })
        } else {
            res.status(401).send({ message: "Job Not Found" })
        }
    } catch (error) {
        res.status(500).send({ message: "Error Deleting Job" })
    }
})

app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, position, contract, location } = req.body;
    try {
        const job = await Job.findByIdAndUpdate
            (id, { name, position, contract, location }, { new: true })
        if (job) {
            res.status(200).send({ message: "Job Updated Successfully", job })
        } else {
            res.status(401).send({ message: "Job Not Found" })
        }
    } catch (error) {
        res.status(500).send({ message: "Error Updating Job" })
    }
})

module.exports = app;
