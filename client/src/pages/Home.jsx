// Home.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useCart from "../contexts/Cart/UseCart";
import { fetchLatestProducts } from "../services/productService";
import API_BASE_URL from "../config/api";

const Home = () => {
  const { addItem } = useCart();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadLatestDishes = async () => {
      try {
        setLoading(true);
        // Fetch the latest 6 dishes
        const latestDishes = await fetchLatestProducts(6);
        setDishes(latestDishes);
      } catch (error) {
        console.error('Error loading latest dishes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLatestDishes();
  }, []);


  const handleAddToCart = (product, quantity = 1) => {
    try {
      const item = {
        ...product,
        id: product._id,
        image: `${API_BASE_URL}${product.image}`,
        quantity: quantity,
      };
      addItem(item);
      alert(`${product.name} (${quantity}) added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const banners = [
    {
      id: 1,
      img: "Image/home-img-1.png",
      heading: "Online Order",
      element: "Delicious Food",
      paragraph:
        "Delicious Food refers to meals that are not only tasty but also satisfying, well-prepared, and enjoyable to eat. It combines fresh ingredients, balanced flavors, and appealing presentation to create a delightful dining experience. Whether it's a home-cooked dish, a gourmet restaurant meal, or a street food favorite, delicious food excites the taste buds and brings comfort and joy. Great food often includes the perfect blend of spices, textures, and aromas, making every bite memorable.",
      buttonText: "See Menu",
    },
    {
      id: 2,
      img: "/Image/home-img-2.png",
      heading: "Online Order",
      element: "Cheesy Hamburger",
      paragraph:
        "A Cheesy Hamburger is a delicious, juicy burger featuring a perfectly grilled beef patty topped with melted cheese, served in a soft, toasted bun. The cheese, often cheddar, American, or Swiss, adds a creamy, rich flavor that enhances the savory taste of the meat. It’s commonly paired with fresh lettuce, tomatoes, pickles, onions, and sauces like ketchup, mustard, or mayo. Some variations include extra layers of cheese, crispy bacon, or a special sauce, making it an irresistible comfort food loved by many.",
      buttonText: "See Menu",
    },
    {
      id: 3,
      img: "Image/home-img-3.png",
      heading: "Online Order",
      element: "Roasted Chicken",
      paragraph:
        "Roasted Chicken is a flavorful and juicy dish made by slow-cooking a whole chicken or chicken pieces in an oven until the skin turns golden brown and crispy. It is typically seasoned with a blend of herbs and spices like garlic, rosemary, thyme, paprika, and black pepper, which infuse the meat with rich, savory flavors. The slow roasting process keeps the chicken tender and moist on the inside while creating a deliciously crispy exterior. Often served with roasted vegetables, mashed potatoes, or a side of gravy, roasted chicken is a classic and comforting meal enjoyed worldwide.",
      buttonText: "See Menu",
    },
  ];

  return (
    <div>
      {/* Banner Section with Swiper */}
      <section className="banner">
        <div className="w-full h-auto min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex justify-center items-center px-4 sm:px-8 lg:px-16">
          <Swiper
            loop={true}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="w-full h-full"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id} className="flex items-center justify-center">
                <div className="w-full min-h-[500px] flex justify-center items-center px-4 sm:px-8 lg:px-16">
                  <div className="flex flex-col md:flex-row items-center max-w-6xl w-full gap-8">
                    <div className="text-center md:text-left md:w-1/2">
                      <h1 className="text-3xl py-5 md:text-5xl font-bold text-gray-900">
                        {banner.heading}
                      </h1>
                      <em className="not-italic text-2xl font-semibold text-gray-900">
                        {banner.element}
                      </em>
                      <p className="mt-4 text-lg text-gray-600">{banner.paragraph}</p>
                      <Link to="/menu">
                        <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-6 rounded-full shadow-md">
                          {banner.buttonText}
                        </button>
                      </Link>
                    </div>
                    <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
                      <img
                        src={banner.img}
                        alt={banner.element}
                        className="w-full max-w-[500px] h-auto object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Food Category Section */}
      <section className="foodcategory">
        <div className="mt-10 container mx-auto my-4 flex flex-col items-center">
          <h1 className="mt-2 text-2xl sm:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-6">
            FOOD CATEGORY
          </h1>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 auto-cols-fr">
            <Link
              to="/menu/pizza"
              className="flex flex-col items-center justify-center p-6 w-48 sm:w-56 md:w-64 bg-white border border-gray-200 hover:border-rose-600 rounded-2xl group min-h-[150px] transition-all duration-300"
            >
              <div className="mb-2 w-32 aspect-square flex items-center justify-center">
                <img
                  className="max-w-full max-h-full object-contain"
                  src="Image/cat-1.png"
                  alt="Pizza"
                />
              </div>
              <h5 className="text-center text-lg sm:text-base font-medium text-gray-900 group-hover:text-rose-600">
                Pizza
              </h5>
            </Link>
            <Link
              to="/menu/burger"
              className="flex flex-col items-center justify-center p-6 w-48 sm:w-56 md:w-64 bg-white border border-gray-200 hover:border-rose-600 rounded-2xl group min-h-[150px] transition-all duration-300"
            >
              <div className="mb-2 w-32 aspect-square flex items-center justify-center">
                <img
                  className="max-w-full max-h-full object-contain"
                  src="Image/cat-2.png"
                  alt="Burger"
                />
              </div>
              <h5 className="text-center text-lg sm:text-base font-medium text-gray-900 group-hover:text-rose-600">
                Burger
              </h5>
            </Link>
            <Link
              to="/menu/drink"
              className="flex flex-col items-center justify-center p-6 w-48 sm:w-56 md:w-64 bg-white border border-gray-200 hover:border-rose-600 rounded-2xl group min-h-[150px] transition-all duration-300"
            >
              <div className="mb-2 w-32 aspect-square flex items-center justify-center">
                <img
                  className="max-w-full max-h-full object-contain"
                  src="Image/cat-3.png"
                  alt="Drink"
                />
              </div>
              <h5 className="text-center text-lg sm:text-base font-medium text-gray-900 group-hover:text-rose-600">
                Drink
              </h5>
            </Link>
            <Link
              to="/menu/desserts"
              className="flex flex-col items-center justify-center p-6 w-48 sm:w-56 md:w-64 bg-white border border-gray-200 hover:border-rose-600 rounded-2xl group min-h-[150px] transition-all duration-300"
            >
              <div className="mb-2 w-32 aspect-square flex items-center justify-center">
                <img
                  className="max-w-full max-h-full object-contain"
                  src="Image/cat-4.png"
                  alt="Desserts"
                />
              </div>
              <h5 className="text-center text-lg sm:text-base font-medium text-gray-900 group-hover:text-rose-600">
                Desserts
              </h5>
            </Link>
          </div>
        </div>
      </section>

      <section className="foodcard">
        <div className="mt-[50px] sm:mt-[70px] md:mt-[100px] container mx-auto px-4 sm:px-6 lg:px-8 my-4 flex flex-col items-center">
          <h1 className="mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-6">
            LATEST DISHES
          </h1>

          {loading ? (
            <div className="flex justify-center items-center py-10 sm:py-15 md:py-20">
              <div className="text-lg sm:text-xl text-gray-600">Loading latest dishes...</div>
            </div>
          ) : dishes.length === 0 ? (
            <div className="flex justify-center items-center py-10 sm:py-15 md:py-20">
              <div className="text-lg sm:text-xl text-gray-600">No dishes available at the moment.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
              {dishes.map((dish) => (
                <div key={dish._id} className="border rounded-lg p-4 md:p-5 bg-white shadow-lg relative group hover:shadow-xl transition-shadow duration-300">
                  <div className="absolute top-2 lg:top-3 left-2 lg:left-3 right-2 lg:right-3 flex justify-between opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
                      <Link to={`/quick/${dish._id}`}>
                        <button>
                          <img src="/Svg/eye-solid.svg" alt="View" className="w-5 h-5" />
                        </button>
                      </Link>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(dish)}
                        className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
                      >
                        <img src="/Svg/cart-shopping-solid.svg" alt="Add to Cart" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-48 md:h-52 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                    <img 
                      src={`${API_BASE_URL}${dish.image}`} 
                      alt={dish.name} 
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <h1 className="mt-4 text-gray-700 text-sm capitalize">{dish.category}</h1>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-2">{dish.name}</h3>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Rs. {dish.price}</span>
                    <input
                      type="number"
                      className="w-16 p-2 border border-gray-300 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      defaultValue="1"
                      min="1"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link to="/menu">
            <button
              type="button"
              className="mt-10 sm:mt-15 md:mt-20 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3.5 text-center me-2 mb-2 dark:focus:ring-yellow-900 transition-colors duration-200"
            >
              View All Menu
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;