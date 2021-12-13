import mongoose from "mongoose";

const DB_URL = process.env.DB_URL || "mongodb://mongo:27017/finance-helper";

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((e) => console.error("Database connection error", e.message));

export default mongoose.connection;
