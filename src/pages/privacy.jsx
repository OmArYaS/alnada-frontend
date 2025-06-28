import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Privacy() {
  const privacySections = [
    {
      icon: "📊",
      title: "جمع المعلومات",
      content:
        "نقوم بجمع المعلومات الأساسية مثل الاسم، البريد الإلكتروني، رقم الهاتف، والعنوان لتقديم خدماتنا العقارية. كما نجمع معلومات تقنية لتحسين تجربة المستخدم.",
    },
    {
      icon: "🔒",
      title: "حماية البيانات",
      content:
        "نستخدم أحدث تقنيات التشفير لحماية بياناتك الشخصية. جميع المعاملات تتم عبر قنوات آمنة ومشفرة، ولا نشارك بياناتك مع أي طرف ثالث دون موافقتك.",
    },
    {
      icon: "🎯",
      title: "استخدام المعلومات",
      content:
        "نستخدم معلوماتك لتقديم خدماتنا العقارية، التواصل معك بخصوص الصفقات، إرسال العروض المخصصة، وتحسين خدماتنا بناءً على تفضيلاتك.",
    },
    {
      icon: "📧",
      title: "التواصل الإلكتروني",
      content:
        "قد نرسل لك رسائل إلكترونية حول العروض الجديدة، التحديثات المهمة، والخدمات الجديدة. يمكنك إلغاء الاشتراك في أي وقت.",
    },
  ];

  const userRights = [
    "الحق في الوصول لبياناتك الشخصية",
    "الحق في تصحيح البيانات غير الدقيقة",
    "الحق في حذف بياناتك الشخصية",
    "الحق في تقييد معالجة البيانات",
    "الحق في نقل البيانات",
    "الحق في الاعتراض على المعالجة",
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
              سياسة الخصوصية
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              نحمي خصوصيتك ونضمن أمان بياناتك الشخصية
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
          <div className="text-6xl mb-6">🛡️</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            التزامنا بحماية خصوصيتك
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
            في الندي للتسويق العقاري، نعتبر حماية خصوصيتك وأمان بياناتك الشخصية
            من أهم أولوياتنا. نلتزم باتباع أعلى معايير الأمان والشفافية في جمع
            واستخدام وحماية معلوماتك الشخصية.
          </p>
        </motion.div>

        {/* Privacy Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {privacySections.map((section, index) => (
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

        {/* User Rights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            حقوقك كعميل
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userRights.map((right, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 font-medium">{right}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Security */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-4xl mb-6">🔐</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              أمان البيانات
            </h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>تشفير SSL/TLS لجميع البيانات المنقولة</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>حماية قوية ضد الهجمات الإلكترونية</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>نسخ احتياطية منتظمة للبيانات</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>مراقبة مستمرة لسلامة النظام</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-4xl mb-6">📞</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              التواصل معنا
            </h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>للاستفسارات حول الخصوصية: privacy@alnada.com</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>الهاتف: +20 123 456 7890</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>العنوان: القاهرة، مصر</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>ساعات العمل: الأحد - الخميس 9 ص - 6 م</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Updates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">تحديثات سياسة الخصوصية</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            قد نقوم بتحديث هذه السياسة من وقت لآخر. سنقوم بإشعارك بأي تغييرات
            مهمة عبر البريد الإلكتروني أو إشعار على موقعنا.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors font-bold"
            >
              تواصل معنا
            </Link>
            <Link
              to="/terms"
              className="border-2 border-white text-white px-8 py-3 rounded-xl hover:bg-white/10 transition-colors font-bold"
            >
              الشروط والأحكام
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
