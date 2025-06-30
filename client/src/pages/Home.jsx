// Home.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import useCart from "../contexts/Cart/UseCart";

const Home = () => {
  const { addItem } = useCart();

  const banners = [
    {
      id: 1,
      img: "src/Image/home-img-1.png",
      heading: "Online Order",
      element: "Delicious Food",
      paragraph:
        "Delicious Food refers to meals that are not only tasty but also satisfying, well-prepared, and enjoyable to eat. It combines fresh ingredients, balanced flavors, and appealing presentation to create a delightful dining experience. Whether it's a home-cooked dish, a gourmet restaurant meal, or a street food favorite, delicious food excites the taste buds and brings comfort and joy. Great food often includes the perfect blend of spices, textures, and aromas, making every bite memorable.",
      buttonText: "See Menu",
    },
    {
      id: 2,
      img: "src/Image/home-img-2.png",
      heading: "Online Order",
      element: "Cheesy Hamburger",
      paragraph:
        "A Cheesy Hamburger is a delicious, juicy burger featuring a perfectly grilled beef patty topped with melted cheese, served in a soft, toasted bun. The cheese, often cheddar, American, or Swiss, adds a creamy, rich flavor that enhances the savory taste of the meat. It’s commonly paired with fresh lettuce, tomatoes, pickles, onions, and sauces like ketchup, mustard, or mayo. Some variations include extra layers of cheese, crispy bacon, or a special sauce, making it an irresistible comfort food loved by many.",
      buttonText: "See Menu",
    },
    {
      id: 3,
      img: "src/Image/home-img-3.png",
      heading: "Online Order",
      element: "Roasted Chicken",
      paragraph:
        "Roasted Chicken is a flavorful and juicy dish made by slow-cooking a whole chicken or chicken pieces in an oven until the skin turns golden brown and crispy. It is typically seasoned with a blend of herbs and spices like garlic, rosemary, thyme, paprika, and black pepper, which infuse the meat with rich, savory flavors. The slow roasting process keeps the chicken tender and moist on the inside while creating a deliciously crispy exterior. Often served with roasted vegetables, mashed potatoes, or a side of gravy, roasted chicken is a classic and comforting meal enjoyed worldwide.",
      buttonText: "See Menu",
    },
  ];

  const dishes = [
    { id: 1, name: "Zinger Burger", price: 550, image: "src/Image/a.png", cartPath: "/cart" },
    { id: 2, name: "Krunch Burger", price: 350, image: "src/Image/bg.png", cartPath: "/cart2" },
    { id: 3, name: "Krunch Chicken Combo", price: 520, image: "src/Image/z1.png", cartPath: "/cart3" },
    { id: 4, name: "Veggie Pizza", price: 1500, image: "src/Image/p1.png", cartPath: "/cart4" },
    { id: 5, name: "Pizza Chicken Tikka", price: 2500, image: "src/Image/p2.png", cartPath: "/cart5" },
    { id: 6, name: "Creamy Chicken Delight", price: 3000, image: "src/Image/p3.png", cartPath: "/cart6" },
  ];

  const handleAddToCart = (dish) => {
    addItem(dish);
    console.log(`${dish.name} added to cart!`);
  };

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
                  src="src/Image/cat-1.png"
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
                  src="src/Image/cat-2.png"
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
                  src="src/Image/cat-3.png"
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
                  src="src/Image/cat-4.png"
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

      {/* Latest Dishes Section */}
      <section className="foodcard">
        <div className="mt-[100px] container mx-auto my-4 flex flex-col items-center">
          <h1 className="mt-2 text-2xl sm:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-6">
            LATEST DISHES
          </h1>
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 auto-cols-fr">
            {dishes.slice(0, 3).map((dish) => (
              <div key={dish.id} className="border rounded-lg p-4 bg-white shadow-lg w-80 relative group">
                <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white p-2 rounded-full shadow-md">
                    <Link to={`/quicknow/${dish.id}`}>
                      <button>
                        <img src="/Svg/eye-solid.svg" alt="View" className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(dish)}
                      className="bg-white p-2 rounded-full shadow-md"
                    >
                      <img src="/Svg/cart-shopping-solid.svg" alt="Add to Cart" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <img src={dish.image} alt={dish.name} className="w-full h-64 object-cover rounded-lg" />
                <h1 className="mt-6 text-gray-700 text-sm">{dish.id <= 3 ? "Burger" : "Pizza"}</h1>
                <h3 className="mt-6 text-lg font-semibold">{dish.name}</h3>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Rs. {dish.price}</span>
                  <input
                    type="number"
                    className="w-16 p-2 border rounded text-center"
                    defaultValue="1"
                    min="1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Dishes Section */}
      <section>
        <div className="container mx-auto my-4 flex flex-col items-center">
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 auto-cols-fr">
            {dishes.slice(3).map((dish) => (
              <div key={dish.id} className="border rounded-lg p-4 bg-white shadow-lg w-80 relative group">
                <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white p-2 rounded-full shadow-md">
                    <Link to={`/quicknow/${dish.id}`}>
                      <button>
                        <img src="/Svg/eye-solid.svg" alt="View" className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(dish)}
                      className="bg-white p-2 rounded-full shadow-md"
                    >
                      <img src="/Svg/cart-shopping-solid.svg" alt="Add to Cart" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <img src={dish.image} alt={dish.name} className="w-full h-64 object-cover rounded-lg" />
                <h1 className="mt-6 text-gray-700 text-sm">Pizza</h1>
                <h3 className="mt-6 text-lg font-semibold">{dish.name}</h3>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Rs. {dish.price}</span>
                  <input
                    type="number"
                    className="w-16 p-2 border rounded text-center"
                    defaultValue="1"
                    min="1"
                  />
                </div>
              </div>
            ))}
          </div>
          <Link to="/menu">
            <button
              type="button"
              className="mt-20 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-lg px-8 py-3.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
            >
              View All
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;