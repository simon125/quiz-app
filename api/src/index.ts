import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";
import bodyParser from "body-parser";
import { usersRouter } from "./routes/users";
import { questionsRouter } from "./routes/questions";
import { attemptsRouter } from "./routes/usersAnswers";

const app = express();

// Body parser
app.use(bodyParser.json());

// Set security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
// app.use(hpp());

// Enable CORS
app.use(cors());

app.use("/api/v1/users", usersRouter);
// app.use("/api/v1/answers");
app.use("/api/v1/questions", questionsRouter);
app.use("/api/v1/users-answers", attemptsRouter);

const PORT = process.env.QUIZ_APP_PORT || 4000;

app.listen(PORT, () => console.log("the app is running"));

process.on("unhandledRejection", (err: { message?: string }) => {
  console.log(`Error: ${err?.message}`);
});
