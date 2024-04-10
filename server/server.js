import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import dotenv from "dotenv";
import http from "http"; // Import http for creating a web server
import ngrok from "@ngrok/ngrok"; // Import ngrok for creating a tunnel to the web server
import chalk from "chalk"; // Import chalk for colored console logs

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, "..", ".env");
dotenv.config({ path: envPath });

const app = express();
const port = process.env.PORT || 8000;

import userRouter from "./routes/userRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import guestRouter from "./routes/guestRoutes.js";

main()
  .then(() =>
    console.log(chalk.green("Connected successfully to Hostel database"))
  )
  .catch((err) => console.log(chalk.red(err))); // Color the error log in red

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Hostel");
}

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/students", studentRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/guests", guestRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(chalk.blue(`Listening at http://localhost:${port}`)); // Color the listening message in blue
});

// if (process.env.NGROK_AUTHTOKEN) {
//   http
//     .createServer((req, res) => {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end("Congrats you have created an ngrok web server");
//     })
//     .listen(3000, () =>
//       console.log(`Node.js web server at 3000 is running...`)
//     );

//   // Get your endpoint online
//   ngrok
//     .connect({ addr: 3000, authtoken: process.env.NGROK_AUTHTOKEN })
//     .then((listener) =>
//       console.log(`Ingress established at: ${listener.url()}`)
//     );

//   // Close the ngrok tunnel and the web server when the process is terminated
//   process.on("SIGINT", () => {
//     ngrok
//       .kill()
//       .then(() => console.log("Ngrok tunnel closed"))
//       .then(() => process.exit(0));
//   });
// }
