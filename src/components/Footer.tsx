import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand & Socials */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 vibrant-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl">د</div>
            <span className="text-2xl font-black text-primary-blue">دزيري تعليم</span>
          </div>
          <p className="text-gray-500 leading-relaxed">
            المنصة التعليمية الجزائرية الأولى التي تجمع بين الأساتذة المتميزين والتلاميذ الطموحين في بيئة تعليمية احترافية وآمنة.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-blue hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-blue hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-blue hover:text-white transition-all"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-blue hover:text-white transition-all"><Youtube className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900">روابط سريعة</h3>
          <ul className="space-y-4">
            <li><a href="#" className="text-gray-500 hover:text-primary-blue transition-colors">الرئيسية</a></li>
            <li><a href="#" className="text-gray-500 hover:text-primary-blue transition-colors">الأساتذة</a></li>
            <li><a href="#" className="text-gray-500 hover:text-primary-blue transition-colors">الدروس</a></li>
            <li><a href="#" className="text-gray-500 hover:text-primary-blue transition-colors">الأسعار</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900">الدعم والمساعدة</h3>
          <ul className="space-y-4">
            <li><a href="#" className="text-gray-500 hover:text-primary-blue transition-colors">مركز المساعدة</a></li>
            <li><a href="#" className="text-gray-500 hover:text-primary-blue transition-colors">سياسة الخصوصية</a></li>
            <li><a href="#" className="text-gray-500 hover:text-primary-blue transition-colors">شروط الاستخدام</a></li>
            <li><a href="#" className="text-gray-500 hover:text-primary-blue transition-colors">تواصل معنا</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900">اتصل بنا</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-500">
              <Phone className="w-5 h-5 text-primary-blue" />
              <span>+213 (0) 555 55 55 55</span>
            </li>
            <li className="flex items-center gap-3 text-gray-500">
              <Mail className="w-5 h-5 text-primary-blue" />
              <span>support@dziriedu.dz</span>
            </li>
            <li className="flex items-center gap-3 text-gray-500">
              <MapPin className="w-5 h-5 text-primary-blue" />
              <span>الجزائر العاصمة، الجزائر</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
        <p>© 2026 دزيري تعليم. جميع الحقوق محفوظة.</p>
        <p className="flex items-center gap-1">
          صنع بكل <Heart className="w-4 h-4 text-red-500 fill-red-500" /> في الجزائر
        </p>
      </div>
    </footer>
  );
}
