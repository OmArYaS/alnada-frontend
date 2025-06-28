import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";

export default function FAQ() {
  const [openItem, setOpenItem] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "كيف يمكنني حجز عقار من الندي للتسويق العقاري؟",
      answer:
        "يمكنك حجز العقار بسهولة من خلال موقعنا الإلكتروني أو تطبيق الهاتف المحمول. اختر العقار المناسب لك، ثم اتبع خطوات الحجز البسيطة. يمكنك أيضاً التواصل معنا مباشرة عبر الهاتف أو البريد الإلكتروني للحصول على المساعدة.",
    },
    {
      id: 2,
      question: "ما هي طرق الدفع المتاحة؟",
      answer:
        "نوفر عدة طرق دفع مرنة: الدفع النقدي، التحويل البنكي، والدفع بالتقسيط. كما نتعاون مع البنوك لتوفير قروض عقارية بأسعار منافسة. يمكنك اختيار الطريقة الأنسب لك بعد استشارة فريقنا المختص.",
    },
    {
      id: 3,
      question: "هل العقارات مضمونة قانونياً؟",
      answer:
        "نعم، جميع العقارات التي نعرضها مضمونة قانونياً ومؤمنة بالكامل. نتحقق من جميع المستندات القانونية قبل عرض أي عقار، ونضمن لك الأمان التام في جميع المعاملات.",
    },
    {
      id: 4,
      question: "ما هي مدة تسليم العقار؟",
      answer:
        "تختلف مدة التسليم حسب نوع العقار وحالته. العقارات الجاهزة يتم تسليمها فوراً، بينما العقارات قيد الإنشاء يتم تسليمها حسب الجدول الزمني المحدد. نضمن لك الشفافية الكاملة في مواعيد التسليم.",
    },
    {
      id: 5,
      question: "هل يمكنني إلغاء الحجز؟",
      answer:
        "نعم، يمكنك إلغاء الحجز خلال فترة محددة مع استرداد المبلغ المدفوع كاملاً. راجع سياسة الإلغاء الخاصة بنا للحصول على التفاصيل الكاملة حول شروط الإلغاء والاسترداد.",
    },
    {
      id: 6,
      question: "ما هي الضمانات المقدمة؟",
      answer:
        "نقدم ضمانات شاملة تشمل: ضمان جودة البناء، ضمان الأمان القانوني، ضمان استرداد الأموال، وضمان خدمة ما بعد البيع. هدفنا هو رضاك التام وثقتك الكاملة.",
    },
    {
      id: 7,
      question: "هل تقدمون خدمات الاستشارة العقارية؟",
      answer:
        "نعم، لدينا فريق من الخبراء العقاريين الذين يقدمون استشارات مجانية في مجال الاستثمار العقاري. يساعدونك في اختيار أفضل الفرص الاستثمارية وتقديم النصائح المالية والقانونية.",
    },
    {
      id: 8,
      question: "كيف يمكنني التواصل مع خدمة العملاء؟",
      answer:
        "يمكنك التواصل معنا عبر: الهاتف على الرقم المجاني، البريد الإلكتروني، الدردشة المباشرة على موقعنا، أو زيارة أحد فروعنا. فريق خدمة العملاء متاح على مدار الساعة لمساعدتك.",
    },
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

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
              الأسئلة الشائعة
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              إجابات على أكثر الأسئلة شيوعاً حول خدماتنا العقارية
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <motion.button
                onClick={() => toggleItem(item.id)}
                className="w-full px-8 py-6 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-primary font-bold text-lg">
                    {String(item.id).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openItem === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary"
                >
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </motion.button>

              <motion.div
                initial={false}
                animate={{
                  height: openItem === item.id ? "auto" : 0,
                  opacity: openItem === item.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <div className="text-6xl mb-6">💬</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            لم تجد إجابة لسؤالك؟
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            فريق خدمة العملاء لدينا متاح على مدار الساعة لمساعدتك في أي استفسار
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors font-bold"
            >
              اتصل بنا الآن
            </Link>
            <a
              href="tel:+201234567890"
              className="border-2 border-primary text-primary px-8 py-3 rounded-xl hover:bg-primary/10 transition-colors font-bold"
            >
              📞 اتصل فوراً
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
