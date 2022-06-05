const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
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

customerSchema.pre("save", function () {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

const CustomerModel = mongoose.model("Customer", customerSchema);
module.exports = CustomerModel;
