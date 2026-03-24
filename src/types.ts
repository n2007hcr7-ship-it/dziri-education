export type UserRole = "teacher" | "student";

export interface User {
  id: string;
  name: string;
  phone: string;
  wilaya: string;
  role: UserRole;
  photoUrl: string;
  createdAt: number;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  levels: string[];
  wilaya: string;
  bio: string;
  photoUrl: string;
  certificationUrl: string;
  isVerified: boolean;
  plan: "free" | "bronze" | "silver" | "gold";
  planExpiry: number;
  balance: number;
  totalStudents: number;
  totalViews: number;
  rating: number;
  totalRatings: number;
  ccp: string;
  edahabia: string;
  monthlyPrice: number;
  createdAt: number;
}

export interface Student {
  id: string;
  name: string;
  wilaya: string;
  level: string;
  balance: number;
  downloadedLessons: string[];
  createdAt: number;
}

export interface Lesson {
  id: string;
  teacherId: string;
  title: string;
  description: string;
  subject: string;
  level: string;
  month: number;
  type: "video" | "pdf" | "quiz";
  access: "free" | "paid";
  price: number;
  videoUrl: string;
  pdfUrl: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
  allowDownload: boolean;
  createdAt: number;
}

export interface LiveStream {
  id: string;
  teacherId: string;
  title: string;
  subject: string;
  level: string;
  price: number;
  isFree: boolean;
  scheduledAt: number;
  startedAt?: number;
  endedAt?: number;
  duration?: number;
  status: "scheduled" | "live" | "ended";
  agoraChannel: string;
  viewersCount: number;
  recordingUrl?: string;
  createdAt: number;
}

export interface Subscription {
  id: string;
  studentId: string;
  teacherId: string;
  amount: number;
  startDate: number;
  endDate: number;
  status: "active" | "expired";
  monthsUnlocked: number[];
}
