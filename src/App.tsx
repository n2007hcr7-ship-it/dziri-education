import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { FirebaseProvider, useFirebase } from "./FirebaseProvider";
import { GamificationProvider } from "./lib/GamificationContext";
import ErrorBoundary from "./components/ErrorBoundary";

// Components
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { LandingPage } from "@/src/components/LandingPage";
import { Auth } from "@/src/components/Auth";
import { TeacherDashboard } from "@/src/components/TeacherDashboard";
import { StudentDashboard } from "@/src/components/StudentDashboard";
import { ChatRoom } from "@/src/components/ChatRoom";
import { LiveSession } from "@/src/components/LiveSession";

function AppContent() {
  const { user, isAuthReady } = useFirebase();
  const [userRole, setUserRole] = useState<"teacher" | "student">("student");
  const [showAuth, setShowAuth] = useState(false);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setShowAuth(false);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserRole("student");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <Navbar 
        isLoggedIn={!!user} 
        role={userRole} 
        onLogout={handleLogout} 
      />

      <main className="flex-1">
        <Routes>
          <Route 
            path="/" 
            element={
              user ? (
                userRole === "teacher" ? <TeacherDashboard /> : <StudentDashboard />
              ) : showAuth ? (
                <Auth onAuthSuccess={handleLogin} />
              ) : (
                <LandingPage onStart={() => setShowAuth(true)} />
              )
            } 
          />
          <Route path="/chat/:id" element={user ? <ChatRoom /> : <Navigate to="/" />} />
          <Route path="/live/:id" element={user ? <LiveSession /> : <Navigate to="/" />} />
          <Route path="/auth" element={<Auth onAuthSuccess={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <FirebaseProvider>
        <GamificationProvider>
          <Router>
            <AppContent />
          </Router>
        </GamificationProvider>
      </FirebaseProvider>
    </ErrorBoundary>
  );
}
