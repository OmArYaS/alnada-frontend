import { NavLink, useNavigate } from "react-router";
import { addToCart } from "../service/addcart.js";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Productcard = ({ item }) => {
  const navigate = useNavigate();
  const isOutOfStock = item.stock <= 0;

  // Determine the main image and image count
  const images =
    item.images && item.images.length > 0 ? item.images : [item.image];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
    >
      {/* Stock Status Badge */}
      {isOutOfStock && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-20 shadow-lg">
          محجوز
        </div>
      )}

      {item.stock <= 5 && item.stock > 0 && (
        <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-20 shadow-lg">
          متبقي {item.stock} فقط!
        </div>
      )}

      {/* Image Section */}
      <NavLink
        to={`/product/${item._id}`}
        className="block relative overflow-hidden"
      >
        <div className="relative h-64 overflow-hidden">
          {images.length > 1 ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                renderBullet: function (index, className) {
                  return '<span class="' + className + ' bg-white/80"></span>';
                },
              }}
              loop={true}
              className="w-full h-full"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={img}
                    alt={item.name || item.title}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              src={images[0]}
              alt={item.name || item.title}
            />
          )}

          {/* Image Count Badge */}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium">
              {images.length} صور
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </NavLink>

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Price */}
        <div className="mb-4">
          <NavLink to={`/product/${item._id}`}>
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {item.name || item.title}
            </h3>
          </NavLink>

          <div className="flex items-center justify-between mb-3">
            <p className="text-2xl font-bold text-primary">
              {item.price} جنيه مصري
            </p>
            <div className="flex items-center gap-1 text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">عقار</span>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-2 mb-6">
          {item.address && (
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-sm line-clamp-1">{item.address}</span>
            </div>
          )}

          {item.size && (
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
              <span className="text-sm">المساحة: {item.size}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-600">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span className="text-sm">
              {item.stock > 0 ? `متوفر ${item.stock} عقار` : "غير متاح"}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={isOutOfStock}
          className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
            isOutOfStock
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl"
          }`}
          onClick={() => !isOutOfStock && addToCart(item._id, 1, navigate)}
        >
          {isOutOfStock ? (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              محجوز
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
              إضافة إلى السلة
            </>
          )}
        </motion.button>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-2xl transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default Productcard;
