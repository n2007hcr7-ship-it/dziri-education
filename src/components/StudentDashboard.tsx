import { 
  BookOpen, 
  Video, 
  MessageSquare, 
  TrendingUp, 
  Search, 
  Star,
  Clock,
  PlayCircle,
  Download,
  CheckCircle,
  AlertCircle,
  Zap,
  Gift,
  CreditCard,
  ArrowRight
} from "lucide-react";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/Card";
import { Input } from "./ui/Input";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useGamification } from "../lib/GamificationContext";
import { REWARDS } from "../constants";
import { VideoPlayer } from "./VideoPlayer";

export function StudentDashboard() {
  const navigate = useNavigate();
  const { points, redeemReward, activeRewards } = useGamification();

  const handleRedeem = (rewardKey: string) => {
    const success = redeemReward(rewardKey);
    if (success) {
      alert("تم استبدال النقاط بنجاح! 🎉");
    } else {
      alert("نقاطك غير كافية لاستبدال هذا العرض.");
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Gamification Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="vibrant-gradient text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 fill-current" />
              نقاطي (الكريدي)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-black">{points}</span>
              <span className="text-xl font-bold opacity-80 mb-1">نقطة</span>
            </div>
            <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((points / 100) * 100, 100)}%` }}
                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              />
            </div>
            <p className="text-xs mt-2 opacity-80">اجمع 100 نقطة للحصول على شات مجاني!</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-primary-purple/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-primary-purple">
              <Gift className="w-5 h-5" />
              المكافآت النشطة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeRewards.length > 0 ? (
              activeRewards.map(reward => (
                <div key={reward.id} className="flex items-center justify-between p-3 bg-primary-purple/5 rounded-xl border border-primary-purple/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-purple/10 flex items-center justify-center text-primary-purple">
                      {reward.type === 'monthly_sub' ? <CreditCard className="w-4 h-4" /> : 
                       reward.type === 'free_chat' ? <MessageSquare className="w-4 h-4" /> : 
                       <Video className="w-4 h-4" />}
                    </div>
                    <span className="text-sm font-bold">
                      {Object.values(REWARDS).find(r => r.id === reward.type)?.title}
                    </span>
                  </div>
                  {reward.expiresAt && (
                    <span className="text-[10px] text-gray-400">
                      ينتهي في {new Date(reward.expiresAt).toLocaleDateString('ar-DZ')}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-400">
                <p className="text-xs">لا توجد مكافآت نشطة حالياً</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-primary-blue/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-primary-blue">
              <TrendingUp className="w-5 h-5" />
              مستوى التقدم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-primary-blue/20 flex items-center justify-center text-2xl font-black text-primary-blue">
                1
              </div>
              <div>
                <p className="font-bold">المستوى الأول</p>
                <p className="text-xs text-gray-500">باقي {10 - (points % 10)} دروس للمستوى التالي</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reward Store */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Gift className="w-6 h-6 text-primary-purple" />
            متجر المكافآت (استبدل نقاطك)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(REWARDS).map(([key, reward]) => (
            <Card key={reward.id} className="hover:shadow-xl transition-all border-none bg-white overflow-hidden group">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    reward.id === 'monthly_sub' ? 'bg-blue-100 text-blue-600' :
                    reward.id === 'free_chat' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {reward.id === 'monthly_sub' ? <CreditCard className="w-6 h-6" /> : 
                     reward.id === 'free_chat' ? <MessageSquare className="w-6 h-6" /> : 
                     <Video className="w-6 h-6" />}
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-gray-900">{reward.cost}</span>
                    <span className="text-xs font-bold text-gray-500 mr-1">نقطة</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold">{reward.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {reward.duration > 0 ? `صالح لمدة ${reward.duration} يوم` : 'استخدام لمرة واحدة'}
                  </p>
                </div>
                <Button 
                  className="w-full h-12 gap-2" 
                  variant={points >= reward.cost ? "default" : "outline"}
                  disabled={points < reward.cost}
                  onClick={() => handleRedeem(key)}
                >
                  استبدال الآن
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lesson Player Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">درس اليوم المقترح</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VideoPlayer 
              src="https://www.w3schools.com/html/mov_bbb.mp4" 
              lessonId="lesson_123" 
            />
            <div className="mt-6 p-6 bg-white rounded-3xl shadow-sm space-y-4">
              <h3 className="text-xl font-bold">الدرس الأول: مقدمة في الرياضيات الحديثة</h3>
              <p className="text-gray-500">
                في هذا الدرس سنتعرف على أساسيات الرياضيات الحديثة وكيفية تطبيقها في حياتنا اليومية. شاهد 70% من الفيديو للحصول على نقطة!
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">قائمة الدروس</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {[1, 2, 3, 4].map(i => (
                  <button key={i} className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors text-right border-b last:border-0">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                      {i}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">عنوان الدرس رقم {i}</p>
                      <p className="text-[10px] text-gray-400">15:00 دقيقة</p>
                    </div>
                    {i === 1 && <CheckCircle className="w-5 h-5 text-primary-blue" />}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input className="pr-12 h-14 text-lg" placeholder="ابحث عن أستاذ أو مادة دراسية..." />
        </div>
        <Button className="h-14 px-8 text-lg gap-2 bg-primary-blue hover:bg-vibrant-blue">
          <TrendingUp className="w-6 h-6" />
          تصفح الأساتذة
        </Button>
      </div>

      {/* Recommended Teachers */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">الأساتذة المقترحون لك</h2>
          <Button variant="ghost" className="text-primary-blue">عرض الكل</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border-2 border-dashed border-gray-200 text-gray-400 col-span-full">
            <Star className="w-16 h-16 mb-4 opacity-20 text-primary-purple" />
            <p className="text-lg font-bold">لا يوجد أساتذة مقترحون حالياً</p>
            <p className="text-sm">ابدأ بالبحث عن أساتذة لموادك الدراسية</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Subscriptions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">اشتراكاتي الحالية</h2>
            <Button variant="ghost" className="text-primary-blue">عرض الكل</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-blue/10 flex items-center justify-center text-primary-blue">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">شات الأستاذ محمد</h4>
                  <p className="text-[10px] text-gray-400">اشتراك نشط حتى 24 أفريل</p>
                </div>
                <Button 
                  onClick={() => navigate('/chat/teacher_123')}
                  size="sm" 
                  className="bg-primary-blue hover:bg-vibrant-blue"
                >
                  فتح
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow border-2 border-red-100 bg-red-50/30">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-500">
                  <Video className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">بث مباشر الآن!</h4>
                  <p className="text-[10px] text-red-500 font-bold animate-pulse">مراجعة الرياضيات</p>
                </div>
                <Button 
                  onClick={() => navigate('/live/session_123')}
                  size="sm" 
                  className="bg-red-500 hover:bg-red-600"
                >
                  دخول
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border-2 border-dashed border-gray-200 text-gray-400">
            <BookOpen className="w-16 h-16 mb-4 opacity-20 text-primary-blue" />
            <p className="text-lg font-bold">لا توجد اشتراكات أخرى</p>
            <p className="text-sm">اشترك مع أساتذتك المفضلين للبدء في التعلم</p>
          </div>
        </div>

        {/* Live Streams */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">البث المباشر القادم</h2>
            <Button variant="ghost" className="text-primary-blue">عرض الكل</Button>
          </div>
          
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-primary-purple">
                <Video className="w-5 h-5" />
                حصص اليوم
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl text-gray-400 text-center">
                <Clock className="w-10 h-10 mb-2 opacity-20" />
                <p className="text-sm font-bold">لا توجد حصص بث مباشر مجدولة لليوم</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Download className="w-5 h-5 text-primary-blue" />
                الدروس المحملة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-gray-500">يمكنك مشاهدة الدروس المحملة حتى بدون اتصال بالإنترنت</p>
              <Button variant="outline" className="w-full border-primary-blue text-primary-blue hover:bg-primary-blue/5">عرض التحميلات</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
