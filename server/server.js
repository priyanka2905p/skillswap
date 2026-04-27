const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const skillRoutes = require("./routes/skills");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));