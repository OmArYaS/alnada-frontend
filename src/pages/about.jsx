import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function About() {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    // Scroll to features section
    const featuresSection = document.querySelector(".features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactUs = () => {
    // Navigate to contact page
    navigate("/contact");
  };

  const handleExploreProperties = () => {
    // Navigate to products page
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-primary text-gray-800">
      {/* Hero Section */}
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-8xl mb-8 block">🏠</span>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-primary leading-tight">
              مرحباً بك في الندي للتسويق العقاري
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              حيث يلتقي الحلم بالواقع
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                مهمتنا
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                ولدت من شغف العقارات والاستثمار، تجلب لك الندي للتسويق العقاري
                أفضل الفرص العقارية. نؤمن أن كل عقار يحكي قصة، ونحن هنا لمساعدتك
                في تحقيق حلمك العقاري.
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLearnMore}
                  className="bg-primary text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-bold"
                >
                  اعرف المزيد
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContactUs}
                  className="border-2 border-primary text-primary px-6 py-3 rounded-full hover:bg-primary/10 transition-all font-bold"
                >
                  اتصل بنا
                </motion.button>
              </div>
            </div>
            <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🎯</div>
                  <h3 className="text-2xl font-semibold text-primary">
                    رؤيتنا
                  </h3>
                </div>
                <p className="text-gray-700">
                  أن نكون الوجهة الأولى للعقارات في مصر، ونقدم تجربة استثمارية
                  فريدة مع ضمان أعلى مستويات الجودة والموثوقية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section py-20 px-4 bg-white/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-16">
            لماذا تختار الندي للتسويق العقاري؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔑",
                title: "تسليم فوري",
                desc: "تسليم مفاتيح العقار فور إتمام الصفقة",
              },
              {
                icon: "🛡️",
                title: "ضمان قانوني",
                desc: "جميع العقارات مضمونة قانونياً ومؤمنة",
              },
              {
                icon: "💎",
                title: "عقارات مميزة",
                desc: "مجموعة مختارة من أفضل العقارات",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "💡",
                title: "الابتكار",
                desc: "نستخدم أحدث التقنيات لتسهيل عملية الاستثمار العقاري",
              },
              {
                icon: "🌟",
                title: "الجودة",
                desc: "نختار فقط أفضل العقارات لضمان عائد استثماري ممتاز",
              },
              {
                icon: "❤️",
                title: "العميل أولاً",
                desc: "رضاك ونجاحك هو هدفنا الأول والأخير",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-6">{value.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-white/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              مستعد لبدء الاستثمار؟
            </h2>
            <p className="text-xl text-gray-700">
              اكتشف مجموعتنا من العقارات المميزة وابدأ رحلة الاستثمار
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExploreProperties}
              className="bg-primary text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all font-bold text-lg"
            >
              استكشف العقارات
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
