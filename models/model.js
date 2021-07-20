const mongoose = require("mongoose");

//-----Workout-----\\

const WorkoutSchema = new mongoose.Schema({
    day: { type: Date, default: Date.now },
    exercises: [{
        type: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number,
    }]
});

WorkoutSchema.virtual("totalDuration").get(function() {
    return this.exercises.reduce((acumulator, exercise) => {
        return acumulator + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;