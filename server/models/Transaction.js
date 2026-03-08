const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive"],
    },
    category: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
    date: {
      type: String, // "YYYY-MM-DD" string for easy filtering
      required: true,
    },
    recurring: {
      type: Boolean,
      default: false,
    },
    freq: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "Yearly", ""],
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);