const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Nice try, but that email belongs in a sci-fi movie. Let’s get a real one.")
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("That’s a baby password. Level up.")
        }
      }
    },
    age: {
      type: Number,
      required: true,
      min: [18, "User must be at least 18 years old."],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "Gender must be either 'male', 'female', or 'others'.",
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
        validate(value){
        if(!validator.isURL(value)){
          throw new Error("You just sent a ghost URL")
        }
      }
    },
    about: {
      type: String,
      default: "This is the default about section of the User!!!",
      maxlength: 500,
    },
    skills: {
      type: [String],
      default: [],
      validate: {
        validator: function (skillsArray) {// In place of this i can also do something like file :- app.js line number:- 83 
          return (
            Array.isArray(skillsArray) &&
            skillsArray.length <= 10 &&
            skillsArray.every(
              (skill) => typeof skill === "string" && skill.trim() !== ""
            )
          );
        },
        message:
          "Each skill must be a non-empty string, and total skills must not exceed 10.",
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
