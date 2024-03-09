const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8000;

const Student = require("./models/studentSchema");
const Room = require("./models/roomSchema");

main()
  .then(() => console.log("Connected successfully to Hostel database"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Hostel");
}

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.raw());
// app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.get("/api/students", async (request, response) => {
  const students = await Student.find().populate("room");
  response.send(students);
});

app.get("/api/rooms", async (request, response) => {
  const rooms = await Room.find().populate("members");
  response.send(rooms);
});

app.post("/api/checkRoom", async (request, response) => {
  const { block, floor, roomNumber } = request.body;
  const room = await Room.findOne({ block, floor, roomNumber }).populate(
    "members"
  );
  response.send(room);
});

app.post("/api/checkStudent", async (request, response) => {
  try {
    const { mis } = request.body;
    const student = await Student.findOne({ mis }).populate("room");
    response.send(student);
  } catch (error) {
    response.status(400).send({ error: "Invalid MIS" });
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
