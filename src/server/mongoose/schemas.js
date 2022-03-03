const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const ExpenseSchema = new Schema({
  title: String,
  balance: Number,
  dueDate: String,
  paid: Boolean,
  note: String,
});

const ExpenseGroupSchema = new Schema({
  title: String,
  startDate: String,
  endDate: String,
  totalBudget: Number,
  expenses: [ExpenseSchema],
});

const ExpenseGroup = model('ExpenseGroups', ExpenseGroupSchema);

module.exports = ExpenseGroup;
