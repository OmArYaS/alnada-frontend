import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Returns() {
  const cancellationReasons = [
    {
      icon: "💼",
      title: "تغيير في الظروف المالية",
      description: "في حالة حدوث تغيير مفاجئ في الظروف المالية للعميل",
    },
    {
      icon: "🏠",
      title: "تغيير في المتطلبات",
      description: "عند تغيير متطلبات العقار أو الموقع المطلوب",
    },
    {
      icon: "📋",
      title: "عدم توافق المستندات",
      description: "في حالة عدم توافق المستندات المطلوبة",
    },
    {
      icon: "⏰",
      title: "تأخير في التسليم",
      description: "عند تأخير غير مبرر في موعد تسليم العقار",
    },
  ];

  const refundProcess = [
    {
      step: "01",
      title: "تقديم طلب الإلغاء",
      description: "قم بتقديم طلب الإلغاء عبر موقعنا أو تطبيق الهاتف المحمول",
    },
    {
      step: "02",
      title: "مراجعة الطلب",
      description: "يقوم فريقنا بمراجعة الطلب خلال 24-48 ساعة",
    },
    {
      step: "03",
      title: "موافقة الإلغاء",
      description: "في حالة الموافقة، يتم إصدار رقم تتبع للاسترداد",
    },
    {
      step: "04",
      title: "استرداد المبلغ",
      description: "يتم استرداد المبلغ خلال 5-7 أيام عمل",
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
              سياسة الإلغاء والاسترداد
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              نضمن لك الأمان التام مع سياسة إلغاء مرنة وشفافة
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Cancellation Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            شروط الإلغاء
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cancellationReasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="text-3xl mb-3">{reason.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{reason.title}</h3>
                <p className="text-gray-600 text-sm">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Refund Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            خطوات الاسترداد
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {refundProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {step.step}
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
        </motion.div>

        {/* Important Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Cancellation Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-4xl mb-6">⏰</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              فترات الإلغاء
            </h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>خلال 24 ساعة: استرداد كامل 100%</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>خلال 7 أيام: استرداد 90% من المبلغ</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>خلال 30 يوم: استرداد 75% من المبلغ</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>بعد 30 يوم: حسب الظروف والتفاوض</p>
              </div>
            </div>
          </motion.div>

          {/* Exceptions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-4xl mb-6">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              حالات الاستثناء
            </h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>العقارات المخصصة حسب طلب العميل</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>العقارات التي تم تسليمها بالفعل</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>العقارات التي تم تعديلها حسب طلب العميل</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>العقارات التي تم حجزها بخصم خاص</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">تحتاج مساعدة في الإلغاء؟</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            فريق خدمة العملاء متاح على مدار الساعة لمساعدتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors font-bold"
            >
              تواصل معنا
            </Link>
            <a
              href="tel:+201234567890"
              className="border-2 border-white text-white px-8 py-3 rounded-xl hover:bg-white/10 transition-colors font-bold"
            >
              📞 اتصل فوراً
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
