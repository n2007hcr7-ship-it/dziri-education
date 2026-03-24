import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { WILAYAS, LEVELS } from "@/src/constants";

export function Auth({ onAuthSuccess }: { onAuthSuccess: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"teacher" | "student">("student");

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-black text-primary-blue">
            {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
          </CardTitle>
          <CardDescription>
            {isLogin ? "مرحباً بك مجدداً في دزيري تعليم" : "انضم إلى أكبر منصة تعليمية في الجزائر"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isLogin && (
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-4">
              <button
                onClick={() => setRole("student")}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  role === "student" ? "bg-white text-primary-blue shadow-sm" : "text-gray-500"
                }`}
              >
                تلميذ
              </button>
              <button
                onClick={() => setRole("teacher")}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  role === "teacher" ? "bg-white text-primary-blue shadow-sm" : "text-gray-500"
                }`}
              >
                أستاذ
              </button>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">الاسم الكامل</label>
            <Input placeholder="أدخل اسمك الكامل" />
          </div>

          {!isLogin && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">الولاية</label>
                <select className="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-primary-blue outline-none">
                  {WILAYAS.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>
              {role === "student" && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">المستوى الدراسي</label>
                  <select className="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-primary-blue outline-none">
                    {LEVELS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">رقم الهاتف</label>
            <Input placeholder="05XXXXXXXX / 06XXXXXXXX / 07XXXXXXXX" />
          </div>

          <Button className="w-full h-12 text-lg bg-primary-blue hover:bg-vibrant-blue" onClick={onAuthSuccess}>
            {isLogin ? "دخول" : "تسجيل"}
          </Button>

          <div className="text-center mt-4">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary-blue font-bold hover:underline"
            >
              {isLogin ? "ليس لديك حساب؟ سجل الآن" : "لديك حساب بالفعل؟ سجل دخولك"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
