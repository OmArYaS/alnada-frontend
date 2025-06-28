import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Shipping() {
  const policySteps = [
    {
      icon: "🔍",
      title: "اختيار العقار",
      description:
        "تصفح مجموعتنا المتنوعة من العقارات واختر ما يناسب احتياجاتك وميزانيتك",
    },
    {
      icon: "📋",
      title: "حجز مبدئي",
      description: "قم بحجز مبدئي للعقار بدفع عربون صغير لضمان حجز العقار لك",
    },
    {
      icon: "📄",
      title: "إتمام الأوراق",
      description:
        "نقوم بإعداد جميع المستندات القانونية والمطلوبة لإتمام الصفقة",
    },
    {
      icon: "💰",
      title: "إتمام الدفع",
      description: "اختر طريقة الدفع المناسبة لك واكمل باقي المبلغ",
    },
    {
      icon: "🔑",
      title: "تسليم المفاتيح",
      description: "احصل على مفاتيح عقارك فور إتمام جميع الإجراءات",
    },
  ];

  const paymentMethods = [
    {
      icon: "💳",
      title: "بطاقات الائتمان",
      description: "فيزا، ماستركارد، أمريكان إكسبريس",
    },
    {
      icon: "🏦",
      title: "التحويل البنكي",
      description: "تحويل مباشر من حسابك البنكي",
    },
    {
      icon: "📱",
      title: "المحافظ الإلكترونية",
      description: "فودافون كاش، فوري، وغيرها",
    },
    {
      icon: "🏛️",
      title: "قروض بنكية",
      description: "قروض عقارية بأسعار منافسة",
    },
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
              سياسة الحجز والتسليم
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              خطوات بسيطة وآمنة لحجز عقارك المثالي
            </p>
          </motion.div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            خطوات الحجز
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            نضمن لك تجربة حجز سلسة وآمنة مع شفافية كاملة في جميع الخطوات
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {policySteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            طرق الدفع المتاحة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="text-3xl mb-3">{method.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Important Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Delivery Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-4xl mb-6">🚚</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              معلومات التسليم
            </h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>العقارات الجاهزة: تسليم فوري خلال 24-48 ساعة</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>العقارات قيد الإنشاء: حسب الجدول الزمني المحدد</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>نوفر خدمة التوصيل المجاني لجميع المحافظات</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>متابعة مستمرة لحالة التسليم عبر الهاتف والبريد الإلكتروني</p>
              </div>
            </div>
          </motion.div>

          {/* Guarantees */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-4xl mb-6">🛡️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">ضماناتنا</h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>ضمان جودة البناء لمدة 10 سنوات</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>ضمان الأمان القانوني الكامل</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>ضمان استرداد الأموال خلال 30 يوم</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>خدمة ما بعد البيع مجانية لمدة سنة</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            مستعد لبدء رحلة الاستثمار؟
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            ابدأ الآن واستمتع بتجربة حجز آمنة وموثوقة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-primary px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors font-bold"
            >
              تصفح العقارات
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-xl hover:bg-white/10 transition-colors font-bold"
            >
              احصل على استشارة مجانية
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
