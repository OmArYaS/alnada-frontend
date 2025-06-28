import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Terms() {
  const termsSections = [
    {
      icon: "📋",
      title: "قبول الشروط",
      content:
        "باستخدام خدمات الندي للتسويق العقاري، فإنك توافق على هذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا.",
    },
    {
      icon: "🏠",
      title: "خدماتنا",
      content:
        "نقدم خدمات التسويق العقاري، الاستشارات العقارية، إدارة العقارات، وتسهيل عمليات البيع والشراء. نحن نعمل كوسيط بين البائعين والمشترين.",
    },
    {
      icon: "💰",
      title: "الأسعار والمدفوعات",
      content:
        "جميع الأسعار المعروضة شاملة الضرائب المطبقة. يجب دفع جميع المبالغ بالعملة المصرية أو الدولار الأمريكي حسب الاتفاق. نحتفظ بحق تغيير الأسعار دون إشعار مسبق.",
    },
    {
      icon: "⚖️",
      title: "المسؤولية القانونية",
      content:
        "نلتزم بتقديم معلومات دقيقة عن العقارات، لكن لا نضمن دقة المعلومات المقدمة من البائعين. العميل مسؤول عن التحقق من جميع التفاصيل قبل إتمام الصفقة.",
    },
  ];

  const userObligations = [
    "تقديم معلومات صحيحة ودقيقة",
    "الالتزام بمواعيد المعاينات والاجتماعات",
    "دفع جميع المبالغ المتفق عليها في الوقت المحدد",
    "عدم إساءة استخدام خدماتنا",
    "احترام حقوق الملكية الفكرية",
    "عدم مشاركة معلومات حساباتهم مع الآخرين",
  ];

  const companyObligations = [
    "تقديم خدمات عالية الجودة",
    "حماية معلومات العملاء",
    "الشفافية في جميع المعاملات",
    "الرد على الاستفسارات في الوقت المناسب",
    "توفير الدعم الفني المطلوب",
    "الالتزام بمعايير الصناعة",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              الشروط والأحكام
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              شروط استخدام خدمات الندي للتسويق العقاري
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16 text-center"
        >
          <div className="text-6xl mb-6">📜</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            شروط الاستخدام
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
            هذه الشروط والأحكام تحكم استخدامك لخدمات الندي للتسويق العقاري. يرجى
            قراءة هذه الشروط بعناية قبل استخدام خدماتنا. استخدامك لخدماتنا يعني
            موافقتك على هذه الشروط بالكامل.
          </p>
        </motion.div>

        {/* Terms Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {termsSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{section.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {section.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Obligations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* User Obligations */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-4xl mb-6">👤</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              التزامات العميل
            </h3>
            <div className="space-y-4">
              {userObligations.map((obligation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{obligation}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Company Obligations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-4xl mb-6">🏢</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              التزامات الشركة
            </h3>
            <div className="space-y-4">
              {companyObligations.map((obligation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{obligation}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Important Clauses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            بنود مهمة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  🔒 الأمان
                </h3>
                <p className="text-gray-600">
                  نلتزم بحماية معلوماتك الشخصية وبياناتك المالية. جميع المعاملات
                  تتم عبر قنوات آمنة ومشفرة.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  📞 الدعم
                </h3>
                <p className="text-gray-600">
                  نوفر دعم فني متواصل على مدار الساعة لمساعدتك في أي استفسار أو
                  مشكلة تواجهها.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  ⚖️ القانون
                </h3>
                <p className="text-gray-600">
                  تخضع هذه الشروط لقوانين جمهورية مصر العربية. أي نزاع سيتم حله
                  عبر المحاكم المصرية.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  📝 التعديلات
                </h3>
                <p className="text-gray-600">
                  نحتفظ بحق تعديل هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات
                  مهمة عبر البريد الإلكتروني.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">لديك استفسار حول الشروط؟</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            فريقنا القانوني متاح للإجابة على جميع استفساراتك حول الشروط والأحكام
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors font-bold"
            >
              تواصل معنا
            </Link>
            <Link
              to="/privacy"
              className="border-2 border-white text-white px-8 py-3 rounded-xl hover:bg-white/10 transition-colors font-bold"
            >
              سياسة الخصوصية
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
