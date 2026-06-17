const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Root health check
app.get('/', (req, res) => {
  res.json({ message: 'API Running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: err.message,
  });
});
app.use("/api/atm", require("./routes/atmRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});