const mongoose = require("mongoose");
const validator = require("validator");

const usersSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    id: {
        type: String,
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("not valid email")
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    gender: {
        type: String,
        required: true,
    },
    status: {
        type: String,

    },
    profile: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    datecreated: Date,
    dateUpdated: Date
});

// model
const users = new mongoose.model("users", usersSchema);

module.exports = users;