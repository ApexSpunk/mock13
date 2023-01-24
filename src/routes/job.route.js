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
            res.status(200).send({ message: "Job Added Successfully", newJob })
        }
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
