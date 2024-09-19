import { IoCloseSharp } from "react-icons/io5";
import FormInput from "../helper/FormInput";
import { productCategory } from "../utils/constants";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useRef, useState } from "react";
import uploadImage from "../utils/uploadImage";
import { MdDelete } from "react-icons/md";

const UploadProduct = ({ onClose }) => {
  const imageRef = useRef(null);
  const [uploadProduct, setUploadProduct] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    originalPrice: "",
    sellingPrice: "",
    description: "",
  });

  const handleChangeUploadProduct = (e) => {
    setUploadProduct({ ...uploadProduct, [e.target.name]: e.target.value });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const { asset_id: imageId, url: imagePath } = await uploadImage(file);
    const newProductImages = [...uploadProduct.productImage, { imageId, imagePath }];
    const newData = { ...uploadProduct, productImage: newProductImages };
    setUploadProduct(newData);
  };

  const handleDeleteImage = (id) => {
    const newProductImages = uploadProduct.productImage.filter((image) => image.imageId !== id);
    const newData = { ...uploadProduct, productImage: newProductImages };
    setUploadProduct(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jsonResponse = await fetch("/api/product/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(uploadProduct),
    });

    const jsoData = await jsonResponse.json();
    console.log("jsoData,", jsoData);
    if (jsoData.success === false) return;
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-slate-200 bg-opacity-70 flex justify-center items-center">
      <div className="bg-white w-full h-full border-2  max-h-[70%] max-w-[80%] p-3 overflow-hidden">
        <div className="flex justify-between">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <button onClick={onClose}>
            <IoCloseSharp size="20px" color="red" />
          </button>
        </div>
        <form className="overflow-y-scroll h-full p-7 flex flex-col gap-2" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="productName"
            label="Product Name:"
            placeholder="Enter product name"
            onChange={handleChangeUploadProduct}
          />
          <FormInput
            type="text"
            name="brandName"
            label="Brand Name:"
            placeholder="Enter brand name"
            onChange={handleChangeUploadProduct}
          />
          <div className="flex flex-col">
            <label>Category:</label>
            <select
              className="w-full border-[1px] py-2 my-2 focus-within:outline-none px-3 "
              name="category"
              onChange={handleChangeUploadProduct}
            >
              <option value="">Select category</option>
              {productCategory.map((category) => {
                return (
                  <option key={category.id} value={category.value} className="p-3">
                    {category.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="grid gap-2">
            <label>Product Image:</label>
            <div
              className="bg-slate-100 h-20 flex items-center justify-center cursor-pointer"
              onClick={() => imageRef.current.click()}
            >
              <div className=" flex flex-col items-center gap-1 text-gray-600">
                <FaCloudUploadAlt size="30px" />
                <p>Upload Product Image</p>
                <input type="file" ref={imageRef} className="hidden" onChange={handleUploadImage} />
              </div>
            </div>
            {uploadProduct.productImage.length === 0 && (
              <p className="text-red-600 text-sm">* Please upload product image</p>
            )}
            <div className="flex gap-2">
              {uploadProduct.productImage.map((image) => {
                const { imageId, imagePath } = image;
                return (
                  <div key={imageId} className="relative group">
                    <img src={imagePath} className="h-20 w-20" alt="product-image" />
                    <div
                      className="absolute top-0 right-0 bg-white rounded-full p-1 hidden group-hover:block cursor-pointer "
                      onClick={() => handleDeleteImage(imageId)}
                    >
                      <MdDelete color="red" size="15px" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <FormInput
            type="number"
            name="originalPrice"
            label="Original Price"
            placeholder="Enter original price"
            onChange={handleChangeUploadProduct}
          />
          <FormInput
            type="number"
            name="sellingPrice"
            label="Selling Price"
            placeholder="Enter selling price"
            onChange={handleChangeUploadProduct}
          />
          <textarea
            name="description"
            className="min-h-28 bg-slate-100 border resize-none p-3 focus:outline-none"
            placeholder="Enter product description"
            rows={3}
            onChange={handleChangeUploadProduct}
          />
          <button className="w-full p-3 bg-green-600 rounded-lg text-white font-bold text-lg mt-2 ">
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
