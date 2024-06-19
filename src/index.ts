import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

import myUserRouter from "./routes/MyUserRoutes";
import myrestaurantRouter from "./routes/MyRestaurantRoutes";
import restaurantRoute from "./routes/RestaurantRoute";
import orderRoutes from "./routes/OrderRoutes";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to DB");
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));
app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health OK." });
});

app.use("/api/my/user", myUserRouter);
app.use("/api/my/restaurant", myrestaurantRouter);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoutes);

app.listen(8000, () => {
  console.log("Server started on localhost: 8000");
});
