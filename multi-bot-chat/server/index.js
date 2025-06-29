const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const chatRoutes = require("./routes/chat");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
