const express = require("express");
const mongoose = require("mongoose");
const Workout = require("./models/models.js");
const path = require('path');

const PORT = process.env.PORT || 3000;

//-----Express-Server-----\\

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//-----Mongoose-Connection-----\\
mongoose.connect("mongodb://localhost:27017/workout", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true });

//Static Routes-----\\

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/stats", (req, res) => {
    res.sendFile(`${__dirname}/public/stats.html`);
});

app.get("/exercise", (req, res) => {
    res.sendFile(`${__dirname}/public/exercise.html`);
});

//-----Routes-----\\

//-----Get Workouts-----\\
app.get("/api/workouts", async(req, res) => {
    try {
        const workoutsData = await Workout.find({});
        if (!workoutsData.length) {
            res.status(404).json({ message: "No Workouts found in the database" });
        } else {
            res.status(200).json(workoutsData);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


app.listen(PORT, () => {
    console.log("Server running!");
});