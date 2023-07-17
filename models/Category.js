import mongoose,{ Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String,
  required: [true, 'Please add a category name'],
   },
 parent: { type: mongoose.Types.ObjectId, ref: "Category" },
 //parent: { type: String },
  category_properties: {type: String},
});

export const Category = models?.Category || model("Category", CategorySchema);
