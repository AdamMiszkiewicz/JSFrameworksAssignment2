// Import mongoose
const mongoose = require("mongoose");

// Define data schema object (JSON)
const dataSchemaObject = {
    jobName: {
        type: String,
        required: true,
    },
    jobDate: { 
        type: Date 
    },
    jobDescription: { 
        type: String 
    },
};

// Create a mongoose schema object
const mongooseSchema = mongoose.Schema(dataSchemaObject);

// Create and export a mongoose model object
module.exports = mongoose.model("Job", mongooseSchema);