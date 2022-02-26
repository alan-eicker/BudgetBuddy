const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const ExpenseSchema = new Schema({
  title: String,
  balance: Number,
  isPaid: Boolean,
  notes: String,
});

const ExpenseGroupSchema = new Schema({
  title: String,
  totalBudget: Number,
  expenses: [ExpenseSchema],
});

const ExpenseGroup = model('ExpenseGroups', ExpenseGroupSchema);

module.exports = ExpenseGroup;
