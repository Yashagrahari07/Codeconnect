const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");

dotenv.config();

const port = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB)
  .then((con) => {
    console.log("DB CONNECTED SUCCESSFULLY!");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
