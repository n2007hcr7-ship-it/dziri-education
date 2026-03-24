import { 
  Bell, 
  User, 
  Menu, 
  X,
  Home,
  BookOpen,
  Video,
  MessageSquare,
  CreditCard,
  LogOut,
  Search
} from "lucide-react";
import { Button } from "./ui/Button";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Navbar({ 
  isLoggedIn, 
  role, 
  onLogout 
}: { 
  isLoggedIn: boolean; 
  role?: "teacher" | "student";
  onLogout: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="glass-morphism sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 vibrant-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl">د</div>
        <span className="text-2xl font-black text-primary-blue hidden sm:block">دزيري تعليم</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="font-semibold text-gray-600 hover:text-primary-blue transition-colors">الرئيسية</a>
        <a href="#" className="font-semibold text-gray-600 hover:text-primary-blue transition-colors">الأساتذة</a>
        <a href="#" className="font-semibold text-gray-600 hover:text-primary-blue transition-colors">الدروس</a>
        <a href="#" className="font-semibold text-gray-600 hover:text-primary-blue transition-colors">عن المنصة</a>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold">محمد الجزائري</p>
                <p className="text-[10px] text-gray-500">{role === "teacher" ? "أستاذ موثق" : "تلميذ"}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                <User className="w-full h-full p-2 text-gray-400" />
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout} className="text-red-500 hover:bg-red-50">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-primary-blue hover:text-vibrant-blue">تسجيل الدخول</Button>
            <Button className="bg-primary-blue hover:bg-vibrant-blue">إنشاء حساب</Button>
          </div>
        )}
        
        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 top-[72px] bg-white z-40 p-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <a href="#" className="text-xl font-bold text-gray-700 flex items-center gap-3">
                <Home className="w-6 h-6 text-primary-blue" />
                الرئيسية
              </a>
              <a href="#" className="text-xl font-bold text-gray-700 flex items-center gap-3">
                <User className="w-6 h-6 text-primary-blue" />
                الأساتذة
              </a>
              <a href="#" className="text-xl font-bold text-gray-700 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary-blue" />
                الدروس
              </a>
              <a href="#" className="text-xl font-bold text-gray-700 flex items-center gap-3">
                <Video className="w-6 h-6 text-primary-blue" />
                البث المباشر
              </a>
              <hr className="border-gray-100" />
              <div className="flex flex-col gap-4">
                {!isLoggedIn && (
                  <>
                    <Button className="w-full h-12 text-lg bg-primary-blue hover:bg-vibrant-blue">إنشاء حساب</Button>
                    <Button variant="outline" className="w-full h-12 text-lg border-primary-blue text-primary-blue">تسجيل الدخول</Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
