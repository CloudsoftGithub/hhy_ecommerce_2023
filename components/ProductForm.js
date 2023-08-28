import products from "@/pages/products";
import axios, { Axios } from "axios";
import { headers } from "next/dist/client/components/headers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
  
export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  noInstock: existingNoInstock,
  images: existingImages,
  category: assignedCategory,
  catProperties: existingCatProperties,
  images_url: existingImagesUrl,
  uploadData: existingUploadData,
  images_asset_id: existingImages_asset_id,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [price, setPrice] = useState(existingPrice || "");
 const [noInstock, setNoInstock] = useState(existingNoInstock || "");
  const [images, setImages] = useState(existingImages || []);
  const [catProperties, setCatProperties] = useState(
    existingCatProperties || ""
  );
  const [uploadData, setUploadData] = useState(existingUploadData || []);

  let [images_url, setImages_url] = useState(existingImagesUrl || "");
  let [images_asset_id, setImages_asset_id] = useState(existingImages || "");

  const [goToProducts, setGoToProducts] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category_properties, setCategory_properties] = useState([]);
  const [links, setLinks] = useState([]);
  const [media, setMedia] = useState("");

  const router = useRouter();

  //use effect 
  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
        
      //Retrieving the Category_Properties
      fetchCategoy_Properties();
    });
  }, []);

  //Retrieving the
  function fetchCategoy_Properties() {
    axios.get("/api/categoryproperties").then((result) => {
      setCategory_properties(result.data);
    });
  }

  async function saveProduct(e) {
    e.preventDefault();

   if(!title || !description || !price ||!category || !catProperties || !images_url || !noInstock) {

     // res.status(422).json({error:"Please add all the fields"})
      toast.error(`Please, fill in all fields. They are important FIELDS!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      
      return;
    }

    const data = {
      title,
      description,
      price,
      category,
      catProperties,
      noInstock,
      images_url,
      images_asset_id,
    };

    if (_id) {
      //Update product
      await axios.put("/api/products", { ...data, _id });
    } else {
       
      //Create new product
    await axios.post("/api/products", data);
     toast.success(`${title} is addeded successfully`, {position: toast.POSITION.TOP_RIGHT});
     }
    setGoToProducts(true); //Make the direct to TRUE, for the redirect after creating/updating a product
  }
  //CHECK if the goToProduct is true and redirect

  if (goToProducts) {
    //if true, then redirect to /products
    router.push("/products");
  }

  async function saveProduct2(e) {
    e.preventDefault();
    const data = { title, description, price, category, catProperties, images };
    //Create new product
    await axios.post("/api/products", data);
  }

  // async function uploadImagesMthd(e) {
  //   const files = e.target?.files;

  //   if (files?.length > 0) {
  //     const data = new FormData();

  //     for (const file of files) {
  //       data.append("file", file);
  //     }

  //     //files.forEach(file =>  );

  //     // const res = await axios.post('/api/upload', data,
  //     //  {headers:{'Accept': 'multipart/form-data',
  //     // 'Content-Type': 'multipart/form-data'}});

  //     // await fetch('/api/upload',{headers:{'Accept': 'multipart/form-data',
  //     // 'Content-Type': 'multipart/form-data'}},{
  //     //   method: 'POST',
  //     //   body: data,
  //     // })
  //     //console.log(res.data);
  //   }
  // }

  async function uploadImages(e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      //then we have something to uploadp

      //conversting the images/photo to FormData, for easy saving on the backend side
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      const res = await axios.post("/api/upload", data);
      //console.log(res.data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
    }
  }

  //handle nd convert the Images to base64

  const handleImages = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImages(reader.result);
    };
  };

  //second methods of submitting form
  // const submitFormMth2 = async (e) => {
  //   e.preventDefault();
  //   const data = { title, description, price, category, catProperties, images };

  //   try {
  //     const { dataCapture } = await axios.post("/api/products", { data });
  //     if (dataCapture.success === true) {
  //       toast.success(`${products.title} is addeded successfully`, {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });

  //       console.log(`Products Data Capture Success: ${products.title}`);
  //       // setTitle("");
  //       // setDescription("");
  //       // setPrice("");
  //       // setCategory("");
  //       // setCategory_properties("");
  //       // setImages([]);
  //     }
  //   } catch (error) {
  //     console.log("Products Data Capture error: " + error);
  //     console.log("Products Data Capture error-stack: " + error.stack);
  //   }
  // };

  // const properpiesToFill = [];
  // if (categories.length > 0 && category) {
  //   let catInfo = categories.find(({ _id }) => _id === category);
  //   properpiesToFill.push(...catInfo.properties);
  //   while (catInfo?.parent?._id) {
  //     const parentCat = categories.find(
  //       ({ _id }) => _id === catInfo?.parent?._id
  //     );
  //     properpiesToFill.push(...parentCat.properties);

  //     catInfo = parentCat; //we later set catInfo to parentCat.properties
  //   }
  // }

  //Uplaoding Images for nextjs 13
  /**
   * handleOnChange
   * @description; triggers when the file  input changes (exampe when a filw is selected) * **/
  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImages(onLoadEvent.target.result);
      setUploadData(undefined);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handlesOnsubmit
   * @description; triggers when the main form is submitted
   * **/
  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "hhy_online_store_upload_preset_name");

    const data = await axios.post(
      "https://api.cloudinary.com/v1_1/dyjwpkbzc/image/upload",
      formData
    );
    setUploadData(data.data);
    setImages_url(data.data.secure_url);
    setImages_asset_id(data.data.asset_id); 
    
    console.log(data);
    toast.success(`image/file is addeded successfully`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  //  const res2 = await data.json();

    //return res2.url;

    //Creating Products afeter the uploas of the images
    //  const Productsdata = { title, description, price, category, catProperties, images_url };

    // // setTitle("");
    // setDescription("");
    // setPrice("");
    // setCategory("");
    // setCategory_properties("");
    // setImages([]);
  }

  async function saveProductsDetals() {
    //images_url = await handleOnSubmit(e);//invoked

    //Create new product
    const res = await axios.post(
      "/api/products",
      title,
      description,
      price,
      category,
      catProperties,
      images_url,
      images_asset_id,
    );
    const res2 = await res.json();
    if (res2.error) {
      toast.error(`Error Occured; ${res2.error}`);
    } else {
      toast.success(`${title} is addeded successfully`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  const handlemySubmit = async (e) => {
    e.preventDefault();
    imageUpoad_cloudinary();
    //   const res = await fetch('/api/products', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       title,
    //       description,
    //       price,
    //       category,
    //       catProperties,
    //       images_url:"",
    //     })
    //   })

    // const res2 = await res.json();
    // if(res2.error){
    //   toast.error(`Error Occured; ${res2.error}`);
    // }else{
    //   toast.success(`Product: ${title} uploaded successfully`, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // }
  };

  const imageUpoad_cloudinary = async () => {
    const formData = new FormData();
    //const files = e.target?.files;
    //
    formData.append("file", media);
    formData.append("upload_preset", "hhy_online_store_upload_preset_name");
    formData.append("cloud_name", "dyjwpkbzc");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dyjwpkbzc/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const res2 = await res.json();
    console.log(res2);
    toast.success(`${title} is addeded successfully`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    // saveProduct
    <form onSubmit={handleOnSubmit} method="post">
      <label>Photos</label>
      <div className="mb-2">
        {images?.length > 0}
        <label
          className="w-24 h-24 border cursor-pointer
         text-center flex flex-col gap-1 items-center 
         justify-center text-gray-1200 text-sm rounded-xl bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" onChange={handleOnChange} name="file" />
        </label>
        <div className="flex">
        <img className="flex flex-col items-center border-[20px]" src={images} />

        </div>

        {!images?.length && <div> No photos in this product </div>}
      </div>
      <div className="flex  mt-2 my-4">
        <button type="submit" className="btn-primary ">
          SaveImages
        </button>
      </div>
      <div>
         
        <div>
          <h1>
            Checking for Secure_url:
            <pre>{JSON.stringify(uploadData?.secure_url, null, 2)}</pre>
          </h1>
          <h1>
            Checking for asset_id:
            <pre>{JSON.stringify(uploadData?.asset_id, null, 2)}</pre>
          </h1>
          
        </div>
      </div>

      <label> Product Name </label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <label>Category </label>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value=""> Uncategorized </option>
        {categories.length > 0 &&
          categories.map((c) => <option value={c._id}> {c.name}</option>)}
      </select>

      <label>Category Properties </label>
      <select
        value={catProperties}
        onChange={(e) => setCatProperties(e.target.value)}
      >
        <option value=""> No Properties </option>
        {category_properties.length > 0 &&
          category_properties.map((c) => (
            <option key={c._id} value={c._id}>
              {" "}
              {c.category_properties}{" "}
            </option>
          ))}
      </select>

      {/*   {properpiesToFill.length > 0 &&
        properpiesToFill.map((p) => (
          <div className="flex gat-1">
            <div>{p.name}</div>
            <select>
              {properpiesToFill.values.map((v) => (
                <option value={v}>{v}</option>
              ))}
              
            </select>
          </div>
        ))()} */}

      <label> Description </label>

      <textarea
        placeholder="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      >
        {" "}
        description
      </textarea>
      <label> Price (in Naira) </label>

      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
      <label> No in-stock (Qty for the product) </label>

      <input
        type="number"
        placeholder="qty"
        value={noInstock}
        onChange={(event) => setNoInstock(event.target.value)}
      />
      <label>Image Url </label>
      <input
        type="text"
        placeholder="image url. NOTE: This is automatically generated! Please, donot type/write anything here!"
        value={images_url}
        onChange={(event) => setImages_url(event.target.value)}
      />
 <label> Images_asset_id </label>
      <input
        type="text"
        placeholder="images_asset_id. NOTE: This is automatically generated! Please, donot type/write anything here!"
        value={images_asset_id}
        onChange={(event) => setImages_asset_id(event.target.value)}
      />
      <button type="button" onClick={saveProduct} className="btn-primary cursor:pointer text-blue-900 w-17 h-20">
        Save Product Details
      </button>
    </form>
  );
}
