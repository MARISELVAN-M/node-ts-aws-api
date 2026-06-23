import express, { Request, Response } from "express";
import { config } from "./config";
import mongoose from "mongoose";
import { Product } from "./product/model";

const app = express();
app.use(express.json());

mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.log("DB connection failed" +  err + config.MONGO_URI + 'dfsdf');
  });

app.post(
  "/api/products",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(400).json({ error: "Failed to create product" });
    }
  },
);

app.listen(config.PORT, () => {
  console.log(`App started successfully on port  -  ${config.PORT}`);
});
