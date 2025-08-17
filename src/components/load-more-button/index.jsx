import { useEffect, useState, useRef } from "react";
import ImageSlider from "../image-slider";

const LoadMoreButton = () => {
  const [products, setProducts] = useState([]);
  const [clickCount, setClickCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const didFetch = useRef(false); // کنترل بار اول

  const limit = 12;

  useEffect(() => {
    if (clickCount === 1 && didFetch.current) return; // جلوگيری از دوبار fetch
    didFetch.current = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${
            (clickCount - 1) * limit
          }&select=title,price,description,images,category`
        );
        const data = await response.json();

        const items = data.products;
        setProducts((prev) => [...prev, ...items]);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [clickCount]);

  if (loading) {
    return <div>Loading Data ! Please wait ....</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7 p-4 ">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="hover:scale-105 hover:shadow-4xl hover:bg-pink-100  transition duration-500 shadow-xl rounded-md  border-1 border-gray-500 text-left px-3 py-2"
          >
            <ImageSlider images={product.images} />
            <p className="text-2xl font-bold pb-4 text-gray-600 ">
              {product.title}
            </p>
            <p className="">
              <span className="font-bold ">price</span> : {product.price} $
            </p>
            <p>
              <span className="font-bold">categori</span> : {product.category}
            </p>
            <p className="text-sm pt-5 text-justify h-1/3 ">
              {product.description}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-5xl col-span-4 py-10 ">
          ... داده ای یافت نشد{" "}
        </p>
      )}
      <div className=" col-span-2 md:col-span-3 xl:col-span-4 ">
        <button
          onClick={() => setClickCount(clickCount + 1)}
          className="px-4 py-2 rounded-2xl shadow-xl bg-gray-800 text-white text-xl mt-5"
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default LoadMoreButton;
