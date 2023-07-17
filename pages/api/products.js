import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import mongoose from "mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import axios from "axios";
import products from "../products";
import { toast } from "react-toastify";

export default async function handle(req, res) {
  //res.json(req.method);

  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res); //This is a protection that checks that the request is from an admin invoked from the ...next-auth class

  if (method == "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  const uploadCloudnaryImage = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "hhy_online_store_upload_preset_name");
    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/dyjwpkbzc/image/upload",
      formData
    );
    return { publicId: data?.public_id, url: data?.secure_url };
  };
 
  if (method === "POST") {
    //former Codes
    try {
      const { title, description, price, category, catProperties, images_url, noInstock, images_asset_id } = req.body;
        const productDoc = await Product.create({
        title,
        price,
        category,
        catProperties,
        description,
        noInstock,
        images_url,       
        images_asset_id,
      });

      res.json(productDoc);
      console.log(productDoc);
      if(productDoc.error) {
        toast.success(`Error occured: ${error}. Thank you.`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }else{

      }
    } catch (error) {
      console.log(error);
    }

   }

  if (method === "PUT") {
    const { title, description, price, category, catProperties, noInstock, _id, images_asset_id } = req.body; //,category
    //Now you can upte the product after getting its information
    await Product.updateOne(
      { _id: _id },
      { title: title, description: description, price: price, category: category, catProperties, noInstock, images_asset_id}
    ); //, category: category

    if(res.error){
      console.log(res.error);
      toast.error(`Error Occured; ${res.error}`, {position: toast.POSITION.TOP_RIGHT});
    }else{
    res.json(true);
    toast.success(` ${title} Edited successfully. Thank you`, {position: toast.POSITION.TOP_RIGHT});
  }

  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
