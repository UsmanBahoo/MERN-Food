import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Link } from 'react-router-dom'

const About = () => {  
  const cards = [
    { id: 1, img: "Image/pic-1.png", paragraph: "If you choose us, we will provide you a best online service you can orderd your favourite food we will make sure that you have best experiance with us!", logo: "src/Svg/star-solid.svg", heading:"UM" },
    { id: 2, img: "Image/pic-2.png", paragraph: "If you choose us, we will provide you a best online service you can orderd your favourite food we will make sure that you have best experiance with us!", logo: "src/Svg/star-solid.svg", heading:"UM"  },
    { id: 3, img: "Image/pic-3.png", paragraph: "If you choose us, we will provide you a best online service you can orderd your favourite food we will make sure that you have best experiance with us!", logo: "src/Svg/star-solid.svg", heading:"UM" },
    { id: 4, img: "Image/pic-4.png", paragraph: "If you choose us, we will provide you a best online service you can orderd your favourite food we will make sure that you have best experiance with us!", logo: "src/Svg/star-solid.svg", heading:"UM"  },
    { id: 5, img: "Image/pic-5.png", paragraph: "If you choose us, we will provide you a best online service you can orderd your favourite food we will make sure that you have best experiance with us!", logo: "src/Svg/star-solid.svg", heading:"UM"  },
    { id: 6, img: "Image/pic-6.png", paragraph: "If you choose us, we will provide you a best online service you can orderd your favourite food we will make sure that you have best experiance with us!", logo: "src/Svg/star-solid.svg", heading:"UM"  },
  ];
  return (  
    <div>
      <section className="header">
      <div className="w-full bg-gray-900 text-white text-center py-8">  
           <div className="container mx-auto px-4">
              <h1 className="font-semibold text-6xl md:text-6xl text-s">About Us</h1>
              <div className="mt-5 flex justify-center items-center space-x-2 text-sm text-gray-300">
                <Link to="/home" className="text-2xl text-yellow-400 hover:text-yellow-500 transition">home</Link>
                <em className="text-2xl not-italic text-md text-gray-200">/ about</em>
              </div>
           </div>     
        </div> 
      </section>
       <section className="banner">
       <div className="container mx-auto px-8 py-8">
          <div className="flex justify-between items-center flex-col md:flex-row">
              <div className="mt-2">
                <img src="Svg\about-img.svg" className="h-[600px] w-[600px]" alt="image-description" />
              </div>
              <div className="">
                <h1 className="mt-2 text-4xl font-semibold text-center">why choose us?</h1>
                <p className="mt-2 text-base md:text-lg lg:text-xl font-semibold max-w-full md:max-w-[700px] text-center md:text-left">If you choose us, we will provide you a best online service you can orderd your favourite food we will make sure that you have best experiance with us!</p>
                <div className="flex justify-center mt-5">
                  <Link to="/menu">
                <button className="bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-semibold text-lg rounded-full px-5 text-center py-2 dark:foucs:ring-yellow-900">Our Menu</button>
                  </Link>
                </div>      
              </div>
          </div>
        </div>
       </section> 
       <section className="Card">
       <div className="container w-full max-w-screen-xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 underline decoration-rose-600 underline-offset-8">
            SIMPLE TEST
            </h1>
            <div className="flex justify-center items-center flex-col md:flex-row gap-5">
              <div className="bg-white boder boder-black-200 rounded-lg p-8 shadow-lg">
                <div className="flex justify-center items-center">
                  <img src="Image\step-1.png" className="h-[100px] w-[100px]" alt="" />
                </div>
                <h1 className="mt-5 text-center text-xl font-bold">Choose Order</h1>
                <p className="mt-5 text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 leading-relaxed max-w-full sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] text-center md:text-left">
                  If you choose us, we will provide you the best online service. You can order your favorite food, and we will make sure you have the best experience with us!
                </p>

              </div>
              <div className="bg-white boder boder-black-200 rounded-lg p-8 shadow-lg">
                <div className="flex justify-center items-center">
                  <img src="Image\step-2.png" className="h-[100px] w-[100px]" alt="" />
                </div>
                <h1 className="mt-5 text-center text-xl font-bold">Fast Delivery</h1>
                <p className="mt-5 text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 leading-relaxed max-w-full sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] text-center md:text-left">
                  If you choose us, we will provide you the best online service. You can order your favorite food, and we will make sure you have the best experience with us!
                </p>
              </div>
              <div className="bg-white boder-1  boder-black rounded-lg p-8 shadow-lg">
                <div className="flex justify-center items-center">
                  <img src="Image\step-3.png" className="h-[100px] w-[100px]" alt="" />
                </div>
                <h1 className="mt-5 text-center text-xl font-bold">Enjoy Food</h1>
                <p className="mt-5 text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 leading-relaxed max-w-full sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] text-center md:text-left">
                  If you choose us, we will provide you the best online service. You can order your favorite food, and we will make sure you have the best experience with us!
                </p>
              </div>
            </div>
        </div>
       </section>
        <section className="slider">
        <div className="container w-full max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 underline decoration-rose-600 underline-offset-8">
      CUSTOMER'S REIVEWS
      </h1>
      <Swiper
        slidesPerView={1}  // Default for mobile
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2 },  // 2 cards on small screens
          1024: { slidesPerView: 3 }, // 3 cards on larger screens
        }}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="w-full"
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id} className="flex justify-center">
            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg max-w-[350px]">
              <img src={card.img} alt={card.title} className="h-24 mx-auto rounded-full" />
              <p className="text-gray-500 text-center mt-2">
                {card.paragraph}
              </p>
              <div className="flex justify-center items-center mt-4">
              <img src={card.logo} alt={card.logo} className="h-4 w-4" />
              <img src={card.logo} alt={card.logo} className="h-4 w-4" />
              <img src={card.logo} alt={card.logo} className="h-4 w-4" />
              <img src={card.logo} alt={card.logo} className="h-4 w-4" />
              <img src={card.logo} alt={card.logo} className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-center mt-4">{card.heading}</h2>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination !relative !mt-20"></div>
      </Swiper>
        </div>
        </section>
    </div>
  );  
};  

export default About;
