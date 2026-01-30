
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  description: string;
  questions: Question[];
}

export interface Course {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  image: string; // Ссылка на изображение курса
  syllabus?: string[];
  outcomes?: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  bio: string;
  image: string;
  quote?: string;
}

export interface Olympiad {
  id: string;
  title: string;
  description: string;
  date: string;
  details: string;
  roadmap?: string[];
}

export interface UserProgress {
  xp: number;
  level: number;
  completedQuizzes: string[];
  rank: string;
}
