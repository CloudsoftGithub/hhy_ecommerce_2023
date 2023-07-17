import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
 
export default function DeleteProductPage() {
  const router = useRouter();
  const {id} =  router.query;
const [productInfo, setProductInfo] = useState('');
 useEffect(() => {
    if(!id) {//if id is not defined, then return nothing
        return;
    }
    //otherwise (id is defined), then fetch the product information
    axios.get('/api/products?id=' + id).then(response =>{
        setProductInfo(response.data);
    });


 }, [id]);

async function deleteProductPage(){

   await axios.delete('/api/products?id=' + id);
   goBack();
}
  function goBack() {
    router.push("/products");
  }
  return (
    <Layout>
     <h1 className="text-center"> Do you really want to delete &nbsp; "{productInfo?.title}"?</h1> 
      <div className="flex gap-2 justify-center">
      <button 
      className="btn-red"
      onClick={deleteProductPage}>
        YES
        </button>
      <button 
      className="btn-default" 
      onClick={goBack}> 
      NO
      </button>
      </div>
      
    </Layout>
  );
}
