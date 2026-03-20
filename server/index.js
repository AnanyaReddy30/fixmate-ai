import express from "express";
import cors from "cors";
import debugRoute from "./routes/debugRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/debug", debugRoute);

// ✅ CHANGE PORT HERE
const PORT = 5005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});