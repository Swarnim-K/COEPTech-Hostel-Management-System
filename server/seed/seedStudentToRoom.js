import mongoose from "mongoose";
import Student from "../models/studentSchema.js";
import Room from "../models/roomSchema.js";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Hostel");
}

async function seedStudentToRoom() {
  try {
    const students = await Student.find({ gender: "Male" });
    const rooms = await Room.find();

    const maxMembersPerRoom = 4;

    for (const student of students) {
      // Shuffle the rooms to randomize assignment
      const shuffledRooms = shuffleArray(rooms);

      for (const room of shuffledRooms) {
        // Check if the room has less than maximum members
        if (room.members.length < maxMembersPerRoom) {
          // Add the student to the room
          room.members.push(student._id);
          await room.save();

          // Update the student's room assignment
          student.room = room._id;
          await student.save();

          console.log(
            `Student ${student.name} assigned to room ${room.block}${room.floor}-${room.roomNumber}`
          );
          break; // Move to the next student
        }
      }
    }

    console.log("Student assignment to rooms completed successfully.");
  } catch (error) {
    console.error("Error seeding students to rooms:", error.message);
  }

  mongoose.connection.close();
  process.exit(0);
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

seedStudentToRoom();
