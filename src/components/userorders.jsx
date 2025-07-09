import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { useState } from "react";
import { BACKEND_URL } from "../service/queryfn";

export default function UserOrders() {
  const { token } = useAuth();
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  // Fetch user's orders
  const { data: orders, isLoading } = useQuery({
    queryKey: ["userOrders", statusFilter, dateRange],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}/api/order/all/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("فشل في جلب الطلبات");
      }
      const data = await response.json();

      // Apply filters
      const filteredOrders = data.filter((order) => {
        const matchesStatus = !statusFilter || order.status === statusFilter;
        const orderDate = new Date(order.orderDate);
        const matchesStartDate =
          !dateRange.startDate || orderDate >= new Date(dateRange.startDate);
        const matchesEndDate =
          !dateRange.endDate || orderDate <= new Date(dateRange.endDate);
        return matchesStatus && matchesStartDate && matchesEndDate;
      });

      return filteredOrders;
    },
  });

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Preparing: "bg-blue-100 text-blue-800",
      Shipped: "bg-purple-100 text-purple-800",
      Delivered: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    const icons = {
      Pending: "⏳",
      Preparing: "👨‍🍳",
      Shipped: "📦",
      Delivered: "✅",
      Cancelled: "❌",
    };
    return icons[status] || "❓";
  };

  const getStatusText = (status) => {
    const texts = {
      Pending: "في الانتظار",
      Preparing: "قيد التحضير",
      Shipped: "تم الشحن",
      Delivered: "تم التسليم",
      Cancelled: "ملغي",
    };
    return texts[status] || status;
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setStatusFilter("");
    setDateRange({ startDate: "", endDate: "" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-gray-600">جاري تحميل طلباتك...</p>
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
              طلباتي
            </h1>
            <Link
              to="/products"
              className="text-primary hover:text-primary/80 font-medium flex items-center gap-2"
            >
              <span>استمر في التصفح</span>
              <span>→</span>
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              تصفية النتائج
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  حالة الطلب
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                >
                  <option value="">جميع الحالات</option>
                  <option value="Pending">في الانتظار</option>
                  <option value="Preparing">قيد التحضير</option>
                  <option value="Shipped">تم الشحن</option>
                  <option value="Delivered">تم التسليم</option>
                  <option value="Cancelled">ملغي</option>
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاريخ البداية
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={dateRange.startDate}
                  onChange={handleDateChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاريخ النهاية
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={dateRange.endDate}
                  onChange={handleDateChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                مسح الفلاتر
              </motion.button>
            </div>
          </div>

          {!orders?.length ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🏠</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                لا توجد طلبات
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {statusFilter || dateRange.startDate || dateRange.endDate
                  ? "لا توجد طلبات تطابق الفلاتر المحددة."
                  : "ستظهر طلباتك هنا بمجرد قيامك بشراء عقار."}
              </p>
              {statusFilter || dateRange.startDate || dateRange.endDate ? (
                <button
                  onClick={clearFilters}
                  className="inline-block bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg font-bold"
                >
                  مسح الفلاتر
                </button>
              ) : (
                <Link
                  to="/products"
                  className="inline-block bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg font-bold"
                >
                  ابدأ التصفح
                </Link>
              )}
            </motion.div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence>
                {orders.map((order) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          طلب رقم #{order._id.slice(-6)}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          📅{" "}
                          {new Date(order.orderDate).toLocaleDateString(
                            "ar-EG"
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}{" "}
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {order.products.map((item) => (
                        <motion.div
                          key={item._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-4 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          {(() => {
                            const images =
                              item.productId.images &&
                              item.productId.images.length > 0
                                ? item.productId.images
                                : [item.productId.image];
                            const mainImage = images[0];
                            return (
                              <div className="relative w-20 h-20 flex items-center justify-center">
                                <img
                                  src={mainImage.url}
                                  alt={item.productId.name}
                                  className="w-20 h-20 object-cover rounded-xl shadow-sm"
                                />
                                {images.length > 1 && (
                                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-0.5 bg-white/80 rounded px-1 py-0.5 shadow">
                                    {images.slice(0, 3).map((img, idx) => (
                                      <img
                                        key={idx}
                                        src={img.url}
                                        alt={
                                          item.productId.name +
                                          " مصغرة " +
                                          (idx + 1)
                                        }
                                        className="w-3 h-3 object-cover rounded"
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 text-lg">
                              {item.productId.name}
                            </h4>
                            <div className="flex flex-wrap gap-4 mt-2">
                              <p className="text-gray-600">
                                <span className="font-medium">الكمية:</span>{" "}
                                {item.quantity}
                              </p>
                              <p className="text-gray-600">
                                <span className="font-medium">السعر:</span>{" "}
                                {item.productId.price} جنيه مصري
                              </p>
                              {item.productId.state && (
                                <p className="text-gray-600">
                                  <span className="font-medium">الحالة:</span>{" "}
                                  {item.productId.state}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-800 text-lg">
                              {(item.quantity * item.productId.price).toFixed(
                                2
                              )}{" "}
                              جنيه مصري
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                          إجمالي العقارات:
                        </span>
                        <span className="font-bold text-gray-800">
                          {order.products.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xl font-bold text-gray-800">
                          إجمالي المبلغ:
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          {order.totalAmount} جنيه مصري
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
