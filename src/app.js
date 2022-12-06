import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import cors from "cors";

// Roles
import { createRoles } from "./libs/initialSetup";

// Import routes
import sorteosRoutes from "./routes/sorteos.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

// Initializations
const app = express();
createRoles();

// Settings
app.set("pkg", pkg);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.json({
    Nombre: app.get("pkg").name,
    Autor: app.get("pkg").author,
    Mensaje: app.get("pkg").description,
    Version: app.get("pkg").version,
  });
});

app.use("/api/sorteos", sorteosRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Export app
export default app;
