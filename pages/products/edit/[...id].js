import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    //fetching the produtcs from the databse
    axios.get("/api/products?id=" + id).then((response) => {
      //            console.log(response?.data);
      setProductInfo(response.data);
        if(response.error){
       //   toast.error(` ${response.error} NOT Edited.`, {position: toast.POSITION.TOP_RIGHT});
        }else{
       //   toast.success(` ${response.data} Edited successfully. Thank you.`, {position: toast.POSITION.TOP_RIGHT});
        }
    });
  }, [id]);

  return (
    <Layout>
      <h1> Edit Product </h1>
      {/*** the below code will ONLY display product if its inforation exist*/}
       
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
