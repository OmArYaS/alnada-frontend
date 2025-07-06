import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProductMutationFn } from "../service/mutationFn";
import { useCategories } from "../hooks/useCategories";
import { useAuth } from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../service/queryfn.js";

export default function EditProductModal({ isOpen, onClose, id }) {
  const { token } = useAuth();
  const [form, setForm] = useState({
    name: "",
    address: "",
    size: "",
    price: "",
    description: "",
    category: "",
    state: "",
    featured: false,
    images: [],
  });
  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen && id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/api/products/${id}`);
          if (response.ok) {
            const product = await response.json();
            setForm({
              name: product.name || "",
              address: product.address || "",
              size: product.size || "",
              price: product.price || "",
              description: product.description || "",
              category: product.category?._id || product.category || "",
              state: product.state || "",
              featured: product.featured || false,
              images: [],
            });
            setExistingImages(product.images || [product.image] || []);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    }
  }, [isOpen, id]);

  const editProductMutation = useMutation({
    mutationFn: editProductMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("تم تحديث العقار بنجاح");
      onClose();
      setForm({
        name: "",
        address: "",
        size: "",
        price: "",
        description: "",
        category: "",
        state: "",
        featured: false,
        images: [],
      });
      setPreviews([]);
      setExistingImages([]);
    },
    onError: (error) => {
      toast.error(error.message || "فشل في تحديث العقار");
    },
  });

  const validateForm = () => {
    const newErrors = {};
    // Only validate number fields if they have values
    if (form.price && isNaN(form.price))
      newErrors.price = "يجب أن يكون السعر رقماً";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const fileArray = Array.from(files);
      setForm((prev) => ({
        ...prev,
        images: fileArray,
      }));
      const previewPromises = fileArray.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          })
      );
      Promise.all(previewPromises).then((results) => setPreviews(results));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "images") {
        // Only append images if new ones are selected
        if (value && value.length > 0) {
          value.forEach((img) => {
            formData.append("images", img);
          });
        }
      } else if (value !== "" && value !== null && value !== undefined) {
        // Only append non-empty values
        formData.append(key, value);
      }
    });
    editProductMutation.mutate({ formData, token, id });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">تعديل العقار</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  💡 جميع الحقول اختيارية. سيتم تحديث الحقول المملوءة فقط.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم العقار
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="اسم العقار"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    العنوان
                  </label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="عنوان العقار"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    السعر
                  </label>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    المساحة
                  </label>
                  <input
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.size ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="مساحة العقار"
                  />
                  {errors.size && (
                    <p className="mt-1 text-sm text-red-500">{errors.size}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    النوع
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={categoriesLoading}
                  >
                    <option value="">اختر النوع</option>
                    {Array.isArray(categories) &&
                      categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                  {categoriesError && (
                    <p className="mt-1 text-sm text-red-500">
                      فشل في تحميل الأنواع
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الحالة
                  </label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">اختر الحالة</option>
                    <option value="متاح">متاح</option>
                    <option value="محجوز">محجوز</option>
                    <option value="جديد">جديد</option>
                    <option value="قديم">قديم</option>
                    <option value="تحت التشطيب">تحت التشطيب</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={form.featured}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          featured: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      عقار مميز
                    </span>
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الوصف
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="وصف العقار"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الصور
                  </label>
                  {existingImages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        الصور الحالية:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {existingImages.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`صورة ${idx + 1}`}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-1 flex items-center space-x-4">
                    <input
                      name="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {previews.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {previews.map((src, idx) => (
                          <img
                            key={idx}
                            src={src}
                            alt={`معاينة ${idx + 1}`}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={editProductMutation.isPending}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {editProductMutation.isPending ? (
                    <div className="flex items-center space-x-2">
                      <svg
                        className="animate-spin h-4 w-4"
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
                      <span>جاري التحديث...</span>
                    </div>
                  ) : (
                    "تحديث العقار"
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
