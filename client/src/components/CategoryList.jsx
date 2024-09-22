import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  // fetching the unique category from all products and storing in state variable
  const fetchCategoryList = async () => {
    const jsonResponse = await fetch("/api/product/getProductCategories");
    const jsoData = await jsonResponse.json();
    setCategories(jsoData);
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <div className="container mx-auto p-2">
      <div className="overflow-scroll flex flex-col  md:flex-row gap-4 justify-between items-center no-scrollbar">
        {categories.map((category) => {
          const { _id: categoryId, productImage, category: categoryName } = category;
          return (
            <Link key={categoryId} className="cursor-pointer" to={`/category/${categoryName}`}>
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center scrollbar-none ">
                <img
                  src={productImage[0].imagePath}
                  className=" h-full object-scale-down mix-blend-multiply hover:scale-115 transition-all"
                />
              </div>
              <p className="text-sm text-center capitalize">{category.category}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
