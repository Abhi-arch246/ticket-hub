const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
      enum: ["User", "Organiser"],
    },
    // if type is User
    name: {
      type: String,
      required: function () {
        if (this.userType == "User") {
          return true;
        }
        return false;
      },
    },
    // if type is Org
    ownername: {
      type: String,
      required: function () {
        if (this.userType == "Organiser") {
          return true;
        }
        return false;
      },
    },
    orgname: {
      type: String,
      required: function () {
        if (this.userType == "Organiser") {
          return true;
        }
        return false;
      },
    },
    website: {
      type: String,
      required: function () {
        if (this.userType == "Organiser") {
          return true;
        }
        return false;
      },
    },
    orgid: {
      type: String,
      required: function () {
        if (this.userType == "Organiser") {
          return true;
        }
        return false;
      },
    },
    phone: {
      type: String,
      required: function () {
        if (this.userType == "Organiser") {
          return true;
        }
        return false;
      },
    },
    //   Both user and org
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
