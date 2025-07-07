import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="">
            <div className="mt-10 container mx-auto my-4 flex flex-col items-center">
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-cols-fr">
                {/* Our Mail */}
                <div className="flex flex-col items-center justify-center p-6 w-48 sm:w-56 md:w-64 bg-white border border-gray-200 hover:border-rose-600 rounded-2xl group min-h-[150px] transition-all duration-300">
                <div className="mb-2 w-32 aspect-square flex items-center justify-center">
                    <img
                    className="max-w-full max-h-full object-contain"
                    src="Image/email-icon.png"
                    alt="Email icon"
                    />
                </div>
                <h5 className="text-center text-lg sm:text-base font-medium text-gray-900 group-hover:text-rose-600">
                    Our Mail
                </h5>
                <span className="text-center text-sm text-gray-700">usmanbahoo381@gmail.com</span>
                </div>

                {/* Opening Hours */}
                <div className="flex flex-col items-center justify-center p-6 w-48 sm:w-56 md:w-64 bg-white border border-gray-200 hover:border-rose-600 rounded-2xl group min-h-[150px] transition-all duration-300">
                <div className="mb-2 w-32 aspect-square flex items-center justify-center">
                    <img
                    className="max-w-full max-h-full object-contain"
                    src="Image/clock-icon.png"
                    alt="Clock icon"
                    />
                </div>
                <h5 className="text-center text-lg sm:text-base font-medium text-gray-900 group-hover:text-rose-600">
                    Opening Hours
                </h5>
                <span className="text-center text-sm text-gray-700">06:00pm to 4:00am</span>
                </div>

                {/* Our Address */}
                <div className="flex flex-col items-center justify-center p-6 w-48 sm:w-56 md:w-64 bg-white border border-gray-200 hover:border-rose-600 rounded-2xl group min-h-[150px] transition-all duration-300">
                <div className="mb-2 w-32 aspect-square flex items-center justify-center">
                    <img
                    className="max-w-full max-h-full object-contain"
                    src="Image/map-icon.png"
                    alt="Map icon"
                    />
                </div>
                <h5 className="text-center text-lg sm:text-base font-medium text-gray-900 group-hover:text-rose-600">
                    Our Address
                </h5>
                <span className="text-center text-sm text-gray-700">Bahawalpur, Pakistan-63100</span>
                </div>

                {/* Our Number */}
                <div className="flex flex-col items-center justify-center p-6 w-48 sm:w-56 md:w-64 bg-white border border-gray-200 hover:border-rose-600 rounded-2xl group min-h-[150px] transition-all duration-300">
                <div className="mb-2 w-32 aspect-square flex items-center justify-center">
                    <img
                    className="max-w-full max-h-full object-contain"
                    src="Image/phone-icon.png"
                    alt="Phone icon"
                    />
                </div>
                <h5 className="text-center text-lg sm:text-base font-medium text-gray-900 group-hover:text-rose-600">
                    Our Number
                </h5>
                <span className="text-center text-sm text-gray-700">0308-7976554</span>
                </div>
            </div>
            </div>
            <div className="w-full bg-gray-900 text-white text-center py-8 mt-20">
                <div className="container mx-auto px-4">
                    <p className="text-lg md:text-xl">
                    &copy; Copyright @ 2025 By{' '}
                    <span className="text-yellow-400 font-semibold">Designed By Usman Bahoo</span> | All Rights Reserved!
                    </p>
                </div>
            </div>
            
        </footer>
    );
}

export default Footer;