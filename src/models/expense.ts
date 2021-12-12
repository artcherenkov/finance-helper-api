import mongoose, { Model } from "mongoose";

export interface IExpense {
  type: string;
  title: string;
  amount: number;
  owner: string;
}

interface ExpenseModel extends Model<IExpense> {}

const expenseSchema = new mongoose.Schema<IExpense, ExpenseModel>({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export default mongoose.model<IExpense, ExpenseModel>("expense", expenseSchema);
