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
    res.json(await Category.find().populate('parent'));
  }

  if (method === "POST") {
    const { name, parentCategory,category_properties} = req.body; //we grab the name from req.body
     const categoryDoc = await Category.create({ 
        name,
        parent: parentCategory || undefined,
        category_properties,
    }); //creating/saving the category name into the mongoDb database
    res.json(categoryDoc); //response after creating the doc
  }

if(method === 'PUT'){
   
    const { name, parentCategory,category_properties,_id } = req.body; //we grab the name from req.body
    const categoryDoc = await Category.updateOne({_id}, { 
        name,
        parent: parentCategory || undefined,
        category_properties,
    }); //creating/saving the category name into the mongoDb database
    res.json(categoryDoc); //response after creating the doc
}

if(method === 'DELETE'){
    const {_id} = req.query;
      await Category.deleteOne({_id}); //delete by chacking {_id:_id}
        res.json("Ok");

}

}
