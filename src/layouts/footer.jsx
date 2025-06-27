import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold mb-4">ميا العقارية</h3>
            <p className="text-sm">
              وجهتك الموثوقة للعقارات والاستثمارات العقارية. نقدم لك أفضل الفرص
              العقارية مع ضمان الجودة والموثوقية.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fi fi-brands-facebook text-xl"></i>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fi fi-brands-instagram text-xl"></i>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fi fi-brands-twitter text-xl"></i>
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-sm hover:text-white transition-colors"
                >
                  جميع العقارات
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm hover:text-white transition-colors"
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm hover:text-white transition-colors"
                >
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-sm hover:text-white transition-colors"
                >
                  الأسئلة الشائعة
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">خدمة العملاء</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shipping"
                  className="text-sm hover:text-white transition-colors"
                >
                  سياسة الحجز
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-sm hover:text-white transition-colors"
                >
                  شروط الإلغاء
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm hover:text-white transition-colors"
                >
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm hover:text-white transition-colors"
                >
                  الشروط والأحكام
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">ابق على اطلاع</h3>
            <p className="text-sm mb-4">
              اشترك في نشرتنا الإخبارية للحصول على آخر العروض العقارية.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                اشتراك
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              © {currentYear} ميا العقارية. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-6">
              {/* <img src="/visa.svg" alt="Visa" className="h-6" />
              <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
              <img src="/paypal.svg" alt="PayPal" className="h-6" /> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
