const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const skillRoutes = require("./routes/skills");

const app = express();

app.use(cors());
app.use(express.json());


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});