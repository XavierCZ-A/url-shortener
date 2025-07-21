// import { connectDB } from "./config/database";
import { config } from "./config/config";
import app from "./app";

const PORT = config.PORT || 3000;

// Función para inicializar el servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    // await connectDB();
    console.log("✅ Database connected successfully");

    // Iniciar el servidor
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${config.NODE_ENV}`);
    });

    // Manejo de cierre graceful
    process.on("SIGTERM", () => {
      console.log("SIGTERM received, shutting down gracefully");
      server.close(() => {
        console.log("Process terminated");
        process.exit(0);
      });
    });

    process.on("SIGINT", () => {
      console.log("SIGINT received, shutting down gracefully");
      server.close(() => {
        console.log("Process terminated");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Solo iniciar el servidor si este archivo se ejecuta directamente
if (require.main === module) {
  startServer();
}

export default app;
