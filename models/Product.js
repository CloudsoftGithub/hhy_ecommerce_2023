import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
  //category: { type: String, required: true },
  catProperties: { type: String },
  description: { type: String, required: true },
  noInstock: { type: Number, required: true },
  images_url: { type: String, required: true },
  images_asset_id: { type: String, required: true },
},
{
  timestamps: true,
});

export const Product = models.Product || model("Product", ProductSchema);
