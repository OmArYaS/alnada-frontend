import { useState, useEffect } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { BACKEND_URL } from "../service/queryfn";

export default function Product() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const data = useLoaderData();
  const [quantity, setQuantity] = useState(1);

  // معالجة آمنة للصور - تدعم جميع الحالات المحتملة
  const getSafeImages = () => {
    let images = [];

    if (Array.isArray(data.images) && data.images.length > 0) {
      // إذا كانت images مصفوفة، تأكد أن كل عنصر له url
      images = data.images
        .map((img) => {
          if (typeof img === "string") {
            // إذا كان عنصر نصي (رابط قديم)
            return { url: img };
          } else if (img && typeof img === "object" && img.url) {
            // إذا كان كائن فيه url
            return img;
          } else {
            // إذا كان undefined أو null
            return { url: "" };
          }
        })
        .filter((img) => img.url); // إزالة الصور الفارغة
    } else if (data.image) {
      // إذا كان هناك image واحد
      images = [
        {
          url:
            typeof data.image === "string" ? data.image : data.image.url || "",
        },
      ];
    }

    // إذا لم توجد صور، استخدم صورة افتراضية
    if (images.length === 0) {
      images = [{ url: "/default-property.jpg" }];
    }

    return images;
  };

  const images = getSafeImages();
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      if (!token) {
        navigate("/auth/login");
        throw new Error("يرجى تسجيل الدخول لإضافة العقار إلى السلة");
      }

      const response = await fetch(`${BACKEND_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "فشل في إضافة العقار إلى السلة");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (error) => {
      setError(error.message);
      setTimeout(() => setError(null), 3000);
    },
  });

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(data.stock, value));
    setQuantity(newQuantity);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section with Background Image */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${
              selectedImage?.url || "/default-property.jpg"
            })`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Content Overlay */}
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-shadow-lg">
                {data.name}
              </h1>
              <div className="flex items-center gap-6 text-lg lg:text-xl">
                <span className="bg-primary/90 px-4 py-2 rounded-full font-bold">
                  {data.price} جنيه مصري
                </span>
                {data.state && (
                  <span
                    className={`px-4 py-2 rounded-full font-medium ${
                      data.state === "متاح"
                        ? "bg-green-500/90 text-white"
                        : "bg-red-500/90 text-white"
                    }`}
                  >
                    {data.state}
                  </span>
                )}
                {data.featured && (
                  <span className="px-4 py-2 rounded-full font-medium bg-yellow-500/90 text-white">
                    ⭐ مميز
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Main Image */}
              <div className="relative aspect-[4/3] bg-gray-100">
                <img
                  src={selectedImage?.url || "/default-property.jpg"}
                  alt={data.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/default-property.jpg";
                  }}
                />
                {data.state && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {data.state}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="p-6 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    معرض الصور
                  </h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImage(image)}
                        className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          selectedImage === image
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-gray-200 hover:border-primary/50"
                        }`}
                        style={{ width: 80, height: 60 }}
                      >
                        <img
                          src={image?.url || "/default-property.jpg"}
                          alt={`${data.name} - ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/default-property.jpg";
                          }}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Details & Actions */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                معلومات سريعة
              </h2>

              <div className="space-y-4">
                {data.address && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-primary"
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
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">الموقع</p>
                      <p className="font-medium text-gray-900">
                        {data.address}
                      </p>
                    </div>
                  </div>
                )}

                {data.size && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-primary"
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
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">المساحة</p>
                      <p className="font-medium text-gray-900">{data.size}</p>
                    </div>
                  </div>
                )}

                {data.state && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">الحالة</p>
                      <p className="font-medium text-gray-900">{data.state}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Add to Cart Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                إضافة إلى السلة
              </h3>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    addToCartMutation.mutate({
                      productId: data._id,
                      quantity,
                    })
                  }
                  disabled={addToCartMutation.isPending || data.stock === 0}
                  className={`w-full px-6 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 ${
                    data.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {addToCartMutation.isPending ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      جاري الإضافة...
                    </span>
                  ) : (
                    "إضافة إلى السلة"
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                وصف العقار
              </h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {data.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg z-50"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-medium">
                  تم إضافة العقار إلى السلة بنجاح!
                </span>
              </div>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg z-50"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/*
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
*/
