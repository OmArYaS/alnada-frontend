import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../service/queryfn.js";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Hero() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: () => fetchProducts({ limit: 5, featured: "true" }),
    onError: (error) => {
      console.error("Hero fetch error:", error);
      toast.error("فشل في تحميل العقارات المميزة");
    },
  });

  const products = data?.data || [];

  // Debug: طباعة البيانات للتحقق
  console.log("Hero products:", products);
  console.log("Hero data:", data);
  console.log("Hero isLoading:", isLoading);
  console.log("Hero error:", error);

  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex justify-center items-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل العقارات المميزة...</p>
        </div>
      </div>
    );
  }

  if (error || !products.length) {
    return (
      <div className="w-full min-h-[60vh] flex justify-center items-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            لا توجد عقارات مميزة
          </h2>
          <p className="text-gray-600 mb-6">
            يرجى العودة لاحقاً للاطلاع على عقاراتنا المميزة.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
          >
            تصفح جميع العقارات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full min-h-[70vh] bg-gradient-to-br from-primary/5 via-white to-secondary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 lg:mb-12"
        >
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-4">
            عقارات مميزة
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشف أفضل العقارات المميزة في مصر مع الندي للتسويق العقاري
          </p>
        </motion.div>

        {/* Hero Slider */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination, A11y]}
            spaceBetween={10}
            slidesPerView={1}
            navigation={{
              nextEl: ".hero-next",
              prevEl: ".hero-prev",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={products.length > 1}
            pagination={{
              clickable: true,
              el: ".hero-pagination",
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            className="hero-swiper"
            breakpoints={{
              640: {
                spaceBetween: 20,
              },
              1024: {
                spaceBetween: 30,
              },
            }}
          >
            {products.map((item, index) => {
              console.log("Rendering product:", item);
              return (
                <SwiperSlide key={item._id || index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      {(() => {
                        // معالجة آمنة للصور - تدعم جميع الحالات المحتملة
                        let images = [];

                        if (
                          Array.isArray(item.images) &&
                          item.images.length > 0
                        ) {
                          // إذا كانت images مصفوفة، تأكد أن كل عنصر له url
                          images = item.images
                            .map((img) => {
                              if (typeof img === "string") {
                                // إذا كان عنصر نصي (رابط قديم)
                                return { url: img };
                              } else if (
                                img &&
                                typeof img === "object" &&
                                img.url
                              ) {
                                // إذا كان كائن فيه url
                                return img;
                              } else {
                                // إذا كان undefined أو null
                                return { url: "" };
                              }
                            })
                            .filter((img) => img.url); // إزالة الصور الفارغة
                        } else if (item.image) {
                          // إذا كان هناك image واحد
                          images = [
                            {
                              url:
                                typeof item.image === "string"
                                  ? item.image
                                  : item.image.url || "",
                            },
                          ];
                        }

                        // إذا لم توجد صور، استخدم صورة افتراضية
                        if (images.length === 0) {
                          images = [{ url: "/default-property.jpg" }];
                        }

                        const mainImage = images[0];
                        console.log("Main image:", mainImage);

                        return (
                          <div className="w-full h-full relative">
                            <img
                              src={mainImage.url}
                              alt={String(item.name || "عقار مميز")}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // إذا فشل تحميل الصورة، استخدم صورة افتراضية
                                e.target.src = "/default-property.jpg";
                              }}
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

                            {/* Image Gallery Indicator */}
                            {images.length > 1 && (
                              <div className="absolute top-4 right-4 z-10">
                                <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                                  <div className="flex gap-1">
                                    {images.slice(0, 3).map((img, idx) => (
                                      <img
                                        key={idx}
                                        src={img.url}
                                        alt={`${String(
                                          item.name || "عقار مميز"
                                        )} ${idx + 1}`}
                                        className="w-6 h-6 object-cover rounded border border-white shadow-sm"
                                        onError={(e) => {
                                          e.target.src =
                                            "/default-property.jpg";
                                        }}
                                      />
                                    ))}
                                  </div>
                                  {images.length > 3 && (
                                    <span className="text-xs text-gray-600 bg-gray-100 px-1 py-0.5 rounded">
                                      +{images.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center">
                      <div className="p-6 sm:p-8 lg:p-12 w-full max-w-2xl">
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="space-y-4 sm:space-y-6"
                        >
                          {/* Badge */}
                          <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-lg"
                          >
                            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                            عقار مميز #{index + 1}
                          </motion.div>

                          {/* Title */}
                          <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight drop-shadow-lg"
                          >
                            {String(item.name || "عقار مميز")}
                          </motion.h2>

                          {/* Description */}
                          <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-sm sm:text-base lg:text-lg text-gray-100 leading-relaxed drop-shadow-md line-clamp-2 lg:line-clamp-3"
                          >
                            {String(
                              item.description || "عقار مميز في موقع استراتيجي"
                            )}
                          </motion.p>

                          {/* Features */}
                          <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-2 sm:gap-3"
                          >
                            {item.category?.name && (
                              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm border border-white/30">
                                {String(item.category.name)}
                              </span>
                            )}
                            {item.address && (
                              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm border border-white/30">
                                📍 {String(item.address)}
                              </span>
                            )}
                          </motion.div>

                          {/* Price and CTA */}
                          <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 sm:pt-4"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
                                <span className="text-sm sm:text-lg font-normal">
                                  جنيه
                                </span>{" "}
                                {typeof item.price === "number"
                                  ? item.price.toLocaleString()
                                  : String(item.price || 0)}
                              </span>
                            </div>
                            <Link
                              to={`/product/${item._id}`}
                              className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl font-medium backdrop-blur-sm border border-white/20"
                            >
                              <span>عرض التفاصيل</span>
                              <svg
                                className="w-4 h-4 mr-2 rtl:rotate-180"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </Link>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hero-prev bg-white/90 hover:bg-white flex justify-center items-center text-lg sm:text-xl rounded-full w-10 h-10 sm:w-12 sm:h-12 shadow-lg transition-all duration-300 backdrop-blur-sm"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hero-next bg-primary hover:bg-primary/90 flex justify-center items-center text-lg sm:text-xl rounded-full w-10 h-10 sm:w-12 sm:h-12 shadow-lg transition-all duration-300 text-white"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>

          {/* Custom Pagination */}
          <div className="hero-pagination flex justify-center mt-4 sm:mt-6 space-x-2 rtl:space-x-reverse"></div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 sm:mt-8 lg:mt-12"
        >
          <Link
            to="/products"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-xl font-medium text-sm sm:text-base"
          >
            <span>تصفح جميع العقارات</span>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2 rtl:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Custom CSS for Swiper */}
      <style>{`
        .hero-swiper {
          padding-bottom: 2rem;
        }
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(156, 163, 175, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: var(--primary-color, #3b82f6);
          transform: scale(1.2);
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .hero-swiper .swiper-slide {
            padding: 0.5rem;
          }
          .hero-swiper .swiper-slide > div {
            min-height: 350px;
          }
          .hero-swiper .swiper-slide .relative {
            border-radius: 1rem;
          }
        }

        @media (min-width: 641px) {
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
          }
        }

        /* Text shadow for better readability */
        .drop-shadow-lg {
          filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
            drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
        }

        .drop-shadow-md {
          filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
            drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
        }
      `}</style>
    </section>
  );
}
