import { 
  Plus, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Video, 
  FileText, 
  Settings,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  ArrowUpRight,
  Calendar,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/Card";
import { Input } from "./ui/Input";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function TeacherDashboard() {
  const navigate = useNavigate();
  const [chatPrice, setChatPrice] = useState(500);
  const [livePrice, setLivePrice] = useState(200);
  const [isScheduling, setIsScheduling] = useState(false);

  // Mock data for earnings
  const totalEarnings = 15000; // DZD
  const teacherShare = totalEarnings * 0.7; // 70%
  const platformShare = totalEarnings * 0.3; // 30%
  const totalSubscribers = 124;

  return (
    <div className="p-6 space-y-8 bg-[#F8FAFC]">
      {/* Earnings & Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="blue-gradient text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              أرباحي (70%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{teacherShare.toLocaleString()} دج</div>
            <p className="text-white/80 text-xs mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              إجمالي المداخيل: {totalEarnings.toLocaleString()} دج
            </p>
          </CardContent>
        </Card>

        <Card className="purple-gradient text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Users className="w-5 h-5" />
              المشتركون
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{totalSubscribers}</div>
            <p className="text-white/80 text-xs mt-2">تلميذ حقيقي مشترك</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm group hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-primary-blue">
              <MessageSquare className="w-5 h-5" />
              سعر الشات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Input 
                type="number" 
                value={chatPrice} 
                onChange={(e) => setChatPrice(Number(e.target.value))}
                className="h-10 text-lg font-bold text-primary-blue bg-primary-blue/5 border-none"
              />
              <span className="text-xs font-bold text-gray-400">دج/شهر</span>
            </div>
            <Button variant="ghost" size="sm" className="w-full text-[10px] font-bold text-primary-blue hover:bg-primary-blue/5">تحديث السعر</Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm group hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-primary-purple">
              <Video className="w-5 h-5" />
              سعر اللايف
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Input 
                type="number" 
                value={livePrice} 
                onChange={(e) => setLivePrice(Number(e.target.value))}
                className="h-10 text-lg font-bold text-primary-purple bg-primary-purple/5 border-none"
              />
              <span className="text-xs font-bold text-gray-400">دج/حصة</span>
            </div>
            <Button variant="ghost" size="sm" className="w-full text-[10px] font-bold text-primary-purple hover:bg-primary-purple/5">تحديث السعر</Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Live Scheduling */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-wrap gap-4">
            <Button className="h-14 px-8 text-lg gap-2 bg-primary-blue hover:bg-vibrant-blue shadow-lg shadow-primary-blue/20">
              <Plus className="w-6 h-6" />
              نشر درس جديد
            </Button>
            <Button 
              onClick={() => setIsScheduling(!isScheduling)}
              variant="secondary" 
              className="h-14 px-8 text-lg gap-2 bg-primary-purple text-white hover:bg-vibrant-purple shadow-lg shadow-primary-purple/20"
            >
              <Calendar className="w-6 h-6" />
              جدولة بث مباشر
            </Button>
            <Button 
              onClick={() => navigate('/chat/teacher_123')}
              variant="outline" 
              className="h-14 px-8 text-lg gap-2 border-primary-blue text-primary-blue hover:bg-primary-blue/5"
            >
              <MessageSquare className="w-6 h-6" />
              فتح الشات
            </Button>
          </div>

          <AnimatePresence>
            {isScheduling && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-2 border-primary-purple/20 bg-primary-purple/5">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-2 text-primary-purple">
                      <Video className="w-6 h-6" />
                      إعداد البث المباشر (Agora)
                    </CardTitle>
                    <CardDescription>سيتم خصم تكاليف البث من رصيدك تلقائياً عند البدء</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500">مدة البث (بالدقائق)</label>
                      <Input type="number" placeholder="60" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500">عدد الحاضرين الأقصى</label>
                      <Input type="number" placeholder="100" className="h-12 rounded-xl" />
                    </div>
                    <div className="flex items-end">
                      <Button 
                        onClick={() => navigate('/live/session_123')}
                        className="w-full h-12 bg-primary-purple hover:bg-vibrant-purple text-white font-bold"
                      >
                        بدء البث الآن
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent Lessons */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">آخر الدروس المنشورة</h2>
              <Button variant="ghost" className="text-primary-blue">عرض الكل</Button>
            </div>
            
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border-2 border-dashed border-gray-200 text-gray-400">
              <FileText className="w-16 h-16 mb-4 opacity-20 text-primary-blue" />
              <p className="text-lg font-bold">لا توجد دروس منشورة بعد</p>
              <p className="text-sm">ابدأ بنشر أول درس لك الآن</p>
            </div>
          </div>
        </div>

        {/* Sidebar: Plan & Verification */}
        <div className="space-y-6">
          <Card className="overflow-hidden border-none shadow-sm">
            <div className="vibrant-gradient p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-xl"></div>
              <h3 className="text-xl font-bold mb-2">باقتك الحالية</h3>
              <div className="text-3xl font-black">مجانية</div>
            </div>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-600 text-sm">قم بترقية حسابك للحصول على ميزات إضافية وظهور أكثر</p>
              <Button variant="secondary" className="w-full bg-primary-purple text-white hover:bg-vibrant-purple shadow-lg shadow-primary-purple/20">ترقية الحساب</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-blue" />
                حالة التوثيق
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-yellow-50 text-yellow-700 rounded-xl text-sm border border-yellow-100">
                <AlertCircle className="w-4 h-4" />
                حسابك غير موثق بعد
              </div>
              <p className="text-xs text-gray-500">ارفع شهاداتك وخبراتك ليتم توثيق حسابك من طرف الإدارة</p>
              <Button variant="outline" className="w-full border-primary-blue text-primary-blue hover:bg-primary-blue/5">رفع الوثائق</Button>
            </CardContent>
          </Card>

          {/* Platform Share Info */}
          <Card className="bg-gray-900 text-white border-none shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary-blue">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white/60">عمولة المنصة</p>
                  <p className="text-lg font-black text-primary-blue">30% فقط</p>
                </div>
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed">
                نحن نأخذ 30% من إجمالي المداخيل لتغطية تكاليف السيرفرات، Agora، وخدمات الدفع. أنت تحصل على 70% صافية.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
