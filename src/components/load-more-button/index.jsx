import { useEffect, useState } from "react";

const LoadMoreButton = () => {
  const [items, setItems] = useState([]);
  // const [limit, setLimit] = useState(12);
  const limit = 12;
  const [clickCount, setClickCounr] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=${
            limit * clickCount
          }&skip=10&select=title,price,description,images,category`
        );
        const data = await response.json();
        const products = data.products;
        setItems(products);
        console.log(products);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [limit, clickCount]);

  return (
    <div className="grid grid-cols-4 gap-5 p-4">
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <div key={index} className=" border-1 border-gray-500 text-left p-2">
            {/* <img src={item.image} alt={item.title} /> */}
            <p className="text-2xl font-bold pb-4 text-gray-600">
              {item.title}
            </p>
            <p>
              <span className="font-bold ">price</span> : {item.price} $
            </p>
            <p>
              <span className="font-bold">categori</span> : {item.category}
            </p>
            <p className="text-sm pt-5 text-justify">{item.description}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-5xl col-span-4 py-10 ">
          ... داده ای یافت نشد{" "}
        </p>
      )}
      <div className="col-span-4 ">
        <button
          onClick={() => setClickCounr(clickCount + 1)}
          className="px-4 py-2 rounded-2xl shadow-xl bg-gray-800 text-white text-xl"
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default LoadMoreButton;
