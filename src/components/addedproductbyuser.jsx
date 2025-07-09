import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../service/queryfn";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { generatePDF } from "../service/generatePDF";

export default function AddedProductByUser() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  // Fetch cart data
  const { data: cartData, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}/api/cart/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("فشل في جلب محتويات السلة");
      }
      return response.json();
    },
  });

  // Update cart item quantity
  const updateCartMutation = useMutation({
    mutationFn: async ({ productId, quantity, color }) => {
      const response = await fetch(`${BACKEND_URL}/api/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity, productId, color }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "فشل في تحديث السلة");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("تم تحديث السلة بنجاح");
    },
  });

  // Remove item from cart
  const removeFromCartMutation = useMutation({
    mutationFn: async (productId) => {
      const response = await fetch(
        `${BACKEND_URL}/api/cart/remove/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "فشل في إزالة العقار");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("تم إزالة العقار من السلة");
    },
  });

  // Clear cart
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${BACKEND_URL}/api/cart/clear`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "فشل في تفريغ السلة");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("تم تفريغ السلة بنجاح");
    },
  });

  // Checkout
  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${BACKEND_URL}/api/cart/checkout`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "فشل في إتمام الطلب");
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      if (data.availableProducts?.length > 0) {
        toast.success(
          `تم طلب ${data.availableProducts.length} عقار بنجاح. المجموع: ${data.totalAmount} جنيه مصري`
        );
      }

      if (data.unavailableProducts?.length > 0) {
        data.unavailableProducts.forEach((product) => {
          toast.warning(`${product.name}: ${product.reason}`);
        });
      }
    },
    onError: (error) => {
      toast.error(error.message || "فشل في إتمام الطلب");
    },
  });

  const handleCheckoutClick = () => {
    // Direct checkout since colors can be selected directly in the cart
    checkoutMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-gray-600">جاري تحميل السلة...</p>
        </div>
      </div>
    );
  }

  if (!cartData?.cart?.length) {
    return (
      <div className="h-full">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <div className="text-6xl mb-4">🏠</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              السلة فارغة
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              أضف بعض العقارات إلى سلتك لرؤيتها هنا.
            </p>
            <Link
              to="/products"
              className="inline-block bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
            >
              استمر في التصفح
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              سلة العقارات
            </h1>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (window.confirm("هل أنت متأكد من تفريغ السلة؟")) {
                  clearCartMutation.mutate();
                }
              }}
              disabled={clearCartMutation.isPending}
              className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
            >
              <span>تفريغ السلة</span>
              <span>🗑️</span>
            </motion.button>
          </div>

          <div className="space-y-6">
            <AnimatePresence>
              {cartData.cart.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    {(() => {
                      const images =
                        item.product.images && item.product.images.length > 0
                          ? item.product.images
                          : [item.product.image];
                      const mainImage = images[0];
                      return (
                        <div className="relative w-24 h-24 flex items-center justify-center">
                          <img
                            src={mainImage.url}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover rounded-xl shadow-sm"
                          />
                          {images.length > 1 && (
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-0.5 bg-white/80 rounded px-1 py-0.5 shadow">
                              {images.slice(0, 3).map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img.url}
                                  alt={
                                    item.product.name + " مصغرة " + (idx + 1)
                                  }
                                  className="w-4 h-4 object-cover rounded"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })()}
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        {item.product.name}
                      </h3>
                      <p className="text-primary font-bold text-lg">
                        {item.product.price} جنيه مصري
                      </p>
                      {item.product.address && (
                        <p className="text-gray-600 text-sm mt-1">
                          📍 {item.product.address}
                        </p>
                      )}
                      {item.product.size && (
                        <p className="text-gray-600 text-sm">
                          📐 المساحة: {item.product.size}
                        </p>
                      )}
                      {item.product.color &&
                        Array.isArray(item.product.color) &&
                        item.product.color.length > 0 && (
                          <div className="mt-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              اللون:
                            </label>
                            <div className="flex flex-wrap gap-1">
                              {item.product.color.map((color) => (
                                <button
                                  key={color}
                                  onClick={() =>
                                    updateCartMutation.mutate({
                                      productId: item.product._id,
                                      quantity: item.quantity,
                                      color: color,
                                    })
                                  }
                                  disabled={updateCartMutation.isPending}
                                  className={`px-2 py-1 rounded text-xs border transition-all duration-200 ${
                                    item.color === color
                                      ? "border-primary bg-primary text-white"
                                      : "border-gray-300 hover:border-primary/50"
                                  }`}
                                >
                                  {color}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      {item.product.stock < item.quantity && (
                        <p className="text-red-500 text-sm mt-1">
                          متوفر {item.product.stock} عقار فقط
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateCartMutation.mutate({
                            productId: item.product._id,
                            quantity: Math.max(1, item.quantity - 1),
                            color: item.color,
                          })
                        }
                        disabled={updateCartMutation.isPending}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </motion.button>
                      <span className="w-8 text-center font-bold text-lg">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateCartMutation.mutate({
                            productId: item.product._id,
                            quantity: item.quantity + 1,
                            color: item.color,
                          })
                        }
                        disabled={
                          updateCartMutation.isPending ||
                          item.quantity >= item.product.stock
                        }
                        className={`w-8 h-8 flex items-center justify-center rounded-full border transition-colors ${
                          item.quantity >= item.product.stock
                            ? "border-gray-200 text-gray-400 cursor-not-allowed"
                            : "border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        +
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        removeFromCartMutation.mutate(item.product._id)
                      }
                      disabled={removeFromCartMutation.isPending}
                      className="text-red-600 hover:text-red-700 flex items-center gap-1 font-medium"
                    >
                      <span>إزالة</span>
                      <span>×</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-800">
                إجمالي العقارات:
              </span>
              <span className="text-lg font-bold text-gray-800">
                {cartData.totalQuantity}
              </span>
            </div>
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-gray-800">
                إجمالي السعر:
              </span>
              <span className="text-2xl font-bold text-primary">
                {cartData.totalPrice} جنيه مصري
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <Link
                to="/products"
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-center font-medium"
              >
                استمر في التصفح
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckoutClick}
                disabled={checkoutMutation.isPending}
                className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg font-bold text-lg"
              >
                {checkoutMutation.isPending ? (
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
                    جاري المعالجة...
                  </span>
                ) : (
                  "إتمام الطلب"
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
