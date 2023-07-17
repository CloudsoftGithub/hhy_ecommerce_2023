import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import mongoose from "mongoose";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
  
    await isAdminRequest(req, res);//This is a protection that checks that the request is from an admin invoked from the ...next-auth class


    if (method === "GET") {
              res.json( await Category.find({}, {category_properties:1,_id:0}));

          
    // try {
    //   res.json(await Category.find().populate('parent'));

    //   const categoryProperties =  await Category.find().populate("parent");
    //   res.status(201).json({ 
    //     success: true,
    //     categoryProperties
    //   });
      
    // } catch (error) {
    //   console.log("category properties error:"+ error);
    //  }
        //res.json( await Category.find({}, {category_properties:1,_id:0}));
       // res.json(await Category.find());
  
      //  res.json( await Category.find({}, {category_properties:1 , _id:1}));
  //    res.json(await Category.find().populate('parent'));

    }

}  