import { 
  BookOpen, 
  Video, 
  MessageSquare, 
  TrendingUp, 
  Star,
  CheckCircle,
  Shield,
  Zap,
  Users,
  PlayCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/Card";
import { motion } from "motion/react";

export function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Vibrant Background with Animated Gradients */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[#F8FAFC]"></div>
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary-blue/20 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -45, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-primary-purple/20 rounded-full blur-[100px]"
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-right"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-blue/10 text-primary-blue rounded-full font-bold text-sm">
              <Zap className="w-4 h-4" />
              أكبر منصة تعليمية في الجزائر
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-tight text-gray-900">
              مستقبلك يبدأ <br />
              <span className="text-primary-blue drop-shadow-sm">بخطوة واحدة</span>
            </h1>
            <p className="text-2xl text-gray-600 leading-relaxed max-w-xl font-medium">
              انضم إلى نخبة الأساتذة والطلبة في الجزائر. بيئة تعليمية ذكية، تفاعلية، ومحفزة على الإبداع والنجاح.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-16 px-10 text-xl gap-2 shadow-lg shadow-primary-blue/20 bg-primary-blue hover:bg-vibrant-blue" onClick={onStart}>
                ابدأ رحلة النجاح الآن
                <ArrowRight className="w-6 h-6" />
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 text-xl border-2 border-primary-blue text-primary-blue hover:bg-primary-blue/5">
                تصفح الأساتذة
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-6">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-gray-900">+10K</span>
                <span className="text-sm font-bold text-gray-500">تلميذ طموح</span>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-4xl font-black text-gray-900">+500</span>
                <span className="text-sm font-bold text-gray-500">أستاذ متميز</span>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-4xl font-black text-gray-900">+1K</span>
                <span className="text-sm font-bold text-gray-500">مورد تعليمي</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -10 }}
                className="space-y-4 pt-12"
              >
                <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/5]">
                  <img src="https://picsum.photos/seed/study1/400/500" alt="Study" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-square">
                  <img src="https://picsum.photos/seed/study2/400/400" alt="Study" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: 10 }}
                className="space-y-4"
              >
                <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-square">
                  <img src="https://picsum.photos/seed/study3/400/400" alt="Study" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/5]">
                  <img src="https://picsum.photos/seed/study4/400/500" alt="Study" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </motion.div>
            </div>
            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary-purple/10 flex items-center justify-center text-primary-purple">
                <Star className="w-6 h-6 fill-primary-purple" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500">الأعلى تقييماً</p>
                <p className="text-sm font-black">أساتذة متميزون</p>
              </div>
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500">ضمان النجاح</p>
                <p className="text-sm font-black">محتوى موثق</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-black text-gray-900">لماذا تختار دزيري تعليم؟</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">نقدم لك كل ما تحتاجه للنجاح في مسارك الدراسي بأحدث التقنيات</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 space-y-6 hover:shadow-xl transition-all border-none bg-white">
            <div className="w-16 h-16 rounded-2xl bg-primary-blue/10 flex items-center justify-center text-primary-blue">
              <Video className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">بث مباشر تفاعلي</h3>
            <p className="text-gray-500 leading-relaxed">
              احضر حصصاً مباشرة مع أساتذتك، اطرح أسئلتك، وشارك في النقاشات تماماً كما في القسم.
            </p>
          </Card>

          <Card className="p-8 space-y-6 hover:shadow-xl transition-all border-none bg-white">
            <div className="w-16 h-16 rounded-2xl bg-primary-purple/10 flex items-center justify-center text-primary-purple">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">محتوى غني ومتنوع</h3>
            <p className="text-gray-500 leading-relaxed">
              آلاف الدروس المسجلة، ملفات PDF، واختبارات تفاعلية تغطي جميع المواد والمستويات.
            </p>
          </Card>

          <Card className="p-8 space-y-6 hover:shadow-xl transition-all border-none bg-white">
            <div className="w-16 h-16 rounded-2xl bg-vibrant-blue/10 flex items-center justify-center text-vibrant-blue">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">أساتذة موثقون</h3>
            <p className="text-gray-500 leading-relaxed">
              نخبة من أفضل الأساتذة في الجزائر، يتم اختيارهم وتوثيق حساباتهم بعناية لضمان جودة التعليم.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="vibrant-gradient rounded-[40px] p-12 md:p-20 text-white text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <h2 className="text-4xl md:text-5xl font-black">هل أنت مستعد للبدء؟</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            انضم إلى آلاف التلاميذ والأساتذة في دزيري تعليم وابدأ رحلتك نحو النجاح اليوم.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="h-16 px-12 text-xl bg-white text-primary-blue hover:bg-gray-100" onClick={onStart}>
              سجل مجاناً الآن
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-12 text-xl border-white text-white hover:bg-white/10">
              تواصل معنا
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
