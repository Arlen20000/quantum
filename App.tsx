
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, BookOpen, Trophy, Users, Info, Mail, Download, Menu, X, 
  ChevronRight, Calculator, Atom, FlaskConical, Dna, Brain, 
  Smartphone, CheckCircle2, Hexagon, MessageSquare, Send, Sparkles,
  TrendingUp, Award, Zap, Globe, Star, ClipboardList, Clock, Calendar,
  Activity, GraduationCap, Lightbulb, ShieldCheck, Rocket, Map, Target,
  List
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { COURSES, OLYMPIADS, TEACHERS, QUIZZES } from './constants';
import QuizPlayer from './components/QuizPlayer';
import { UserProgress } from './types';

const QuantumLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="opacity-20" />
    <path d="M30 20C35 30 35 70 30 80M70 20C65 30 65 70 70 80" stroke="#2DD4BF" strokeWidth="3" strokeLinecap="round" />
    <path d="M30 35H70M30 50H70M30 65H70" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="4 4" />
    <ellipse cx="50" cy="50" rx="40" ry="15" stroke="#6366F1" strokeWidth="2" transform="rotate(45 50 50)" />
    <ellipse cx="50" cy="50" rx="40" ry="15" stroke="#6366F1" strokeWidth="2" transform="rotate(-45 50 50)" />
    <rect x="42" y="42" width="16" height="16" rx="4" fill="#6366F1" />
    <text x="50" y="53" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">EC</text>
  </svg>
);

const LevelBadge = ({ level, rank }: { level: number, rank: string }) => (
  <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-xl flex items-center justify-center font-black text-white shadow-lg">
      {level}
    </div>
    <div className="flex flex-col">
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Ранг</span>
      <span className="text-[10px] font-bold text-teal-400 leading-none">{rank}</span>
    </div>
  </div>
);

const AI_Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: 'user'|'bot', text: string}[]>([
    {role: 'bot', text: 'Привет! Я Quantum Core. Готов ответить на любые научные вопросы. Что обсудим?'}
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "You are the Quantum EC Assistant. Expert in STEM. Keep responses high-quality, professional, and in Russian.",
        },
      });
      setMessages(prev => [...prev, {role: 'bot', text: response.text || "Ошибка данных."}]);
    } catch (error) {
      setMessages(prev => [...prev, {role: 'bot', text: "Ошибка связи с ядром."}]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-110 transition-transform flex items-center gap-2 group"
        >
          <Sparkles className="group-hover:animate-pulse" />
          <span className="font-bold pr-2 hidden md:inline uppercase text-xs">Quantum Core</span>
        </button>
      ) : (
        <div className="glass-panel w-[350px] md:w-[400px] h-[550px] rounded-[2.5rem] flex flex-col border-white/10 overflow-hidden animate-in slide-in-from-bottom-10 shadow-2xl">
          <div className="bg-slate-900/50 p-6 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg"><Brain size={18} /></div>
              <div className="flex flex-col">
                <span className="font-black text-xs uppercase tracking-widest text-white leading-none">Quantum AI</span>
                <span className="text-[8px] text-teal-400 font-bold uppercase mt-1">Status: Operational</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors"><X size={20}/></button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                  m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/10'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-[10px] text-indigo-400 animate-pulse font-black uppercase tracking-widest ml-2">Анализ запроса...</div>}
          </div>
          <div className="p-5 border-t border-white/5 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Введите научный запрос..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none text-white transition-all"
            />
            <button onClick={handleSend} className="bg-indigo-600 text-white p-3 rounded-2xl hover:bg-indigo-500 transition-colors shadow-lg"><Send size={18} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ progress }: { progress: UserProgress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Главная', path: '/', icon: <Home size={18} /> },
    { name: 'Курсы', path: '/courses', icon: <BookOpen size={18} /> },
    { name: 'Тесты', path: '/tests', icon: <ClipboardList size={18} /> },
    { name: 'Олимпиады', path: '/olympiads', icon: <Trophy size={18} /> },
    { name: 'Наставники', path: '/teachers', icon: <Users size={18} /> },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
      <div className="glass-panel px-8 py-4 rounded-[2rem] flex justify-between items-center border-white/10 shadow-2xl">
        <Link to="/" className="flex items-center gap-3 group">
          <QuantumLogo className="w-10 h-10 group-hover:rotate-[360deg] transition-transform duration-1000" />
          <div className="flex flex-col">
            <span className="text-xl font-black text-gradient tracking-tighter">QUANTUM EC</span>
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.4em]">Foundation</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all ${
                location.pathname === link.path ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:block">
             <LevelBadge level={progress.level} rank={progress.rank} />
          </div>
          <Link to="/download" className="bg-white text-slate-900 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-400 transition-all shadow-xl active:scale-95">
            Access App
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white ml-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden mt-4 glass-panel rounded-[2rem] p-6 space-y-3 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 text-xs font-black p-4 rounded-2xl uppercase tracking-widest ${
                location.pathname === link.path ? "bg-indigo-600 text-white" : "text-slate-400"
              }`}
            >
              {link.icon} {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const HomePage = ({ progress }: { progress: UserProgress }) => (
  <div className="pt-40 pb-20 space-y-40 overflow-hidden">
    <section className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-20">
      <div className="flex-1 space-y-10 animate-in fade-in slide-in-from-left duration-1000">
        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em]">
           <Rocket size={16} /> Протокол обучения активирован
        </div>
        <h1 className="text-7xl lg:text-9xl font-black leading-[0.9] tracking-tighter">
          РАЗУМ <br />
          <span className="text-gradient">БЕЗ ГРАНИЦ.</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-xl leading-relaxed font-medium">
          Мы объединили академическую базу и технологии будущего. Проходите тесты, готовьтесь к олимпиадам и станьте частью интеллектуальной элиты.
        </p>
        <div className="flex flex-wrap gap-6 pt-4">
          <Link to="/tests" className="bg-indigo-600 text-white px-12 py-6 rounded-[2rem] font-black text-lg shadow-[0_20px_50px_rgba(99,102,241,0.3)] hover:bg-indigo-500 hover:-translate-y-1 transition-all flex items-center gap-3 uppercase tracking-tighter">
            Начать путь <ChevronRight />
          </Link>
          <div className="bg-white/5 border border-white/10 p-4 px-8 rounded-[2rem] flex items-center gap-6">
             <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Текущий XP</span>
               <span className="text-2xl font-black text-white">{progress.xp}</span>
             </div>
             <div className="w-[1px] h-10 bg-white/10"></div>
             <TrendingUp className="text-teal-400" />
          </div>
        </div>
      </div>
      <div className="flex-1 relative group">
         <div className="glass-panel p-5 rounded-[4rem] border-white/10 shadow-2xl relative z-10 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200" className="rounded-[3rem] opacity-70 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Main" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-12 left-12 right-12">
               <div className="text-xs font-black uppercase text-teal-400 tracking-[0.3em] mb-2">Научный факт дня</div>
               <div className="text-xl font-bold text-white leading-snug">Квантовая запутанность позволяет частицам оставаться связанными на любых расстояниях.</div>
            </div>
         </div>
         <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-indigo-600/10 blur-[150px] rounded-full"></div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Анализ Данных', value: 'Instant', icon: <Activity className="text-teal-400" />, desc: 'Мгновенные результаты тестов' },
          { label: 'Мировой Ранг', value: 'Global', icon: <Globe className="text-indigo-400" />, desc: 'Участие в международных олимпиадах' },
          { label: 'ИИ Наставник', value: '24/7', icon: <Brain className="text-purple-400" />, desc: 'Поддержка на каждом этапе' },
          { label: 'Безопасность', value: 'Quantum', icon: <ShieldCheck className="text-amber-400" />, desc: 'Ваши данные под защитой EC' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-10 rounded-[3rem] space-y-4 hover:border-white/20">
             <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 shadow-inner">{s.icon}</div>
             <div className="text-4xl font-black text-white leading-none">{s.value}</div>
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</div>
             <p className="text-xs text-slate-400 font-medium leading-relaxed pt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 py-32 bg-indigo-900/10 rounded-[5rem] relative overflow-hidden">
       <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/5 blur-[100px] rounded-full"></div>
       <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-xl space-y-8">
             <h2 className="text-6xl font-black tracking-tighter leading-tight">КАК ЭТО РАБОТАЕТ?</h2>
             <div className="space-y-10">
                {[
                  { step: '01', title: 'Выберите специализацию', text: 'Математика, Физика или ИИ. Начните с того, что вам ближе.' },
                  { step: '02', title: 'Прокачайте XP на тестах', text: 'Каждый тест открывает доступ к более сложным материалам.' },
                  { step: '03', title: 'Покорите Олимпиады', text: 'Участвуйте в глобальных турнирах и выигрывайте гранты.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="text-3xl font-black text-indigo-500 opacity-30">{item.step}</div>
                    <div className="space-y-2">
                       <h4 className="text-xl font-bold text-white uppercase tracking-tight">{item.title}</h4>
                       <p className="text-slate-400 font-medium">{item.text}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
          <div className="flex-1 w-full lg:max-w-md glass-card p-10 rounded-[4rem] border-white/10 space-y-8">
             <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase text-slate-500 tracking-widest">Твоя Карта Пути</span>
                <Map className="text-indigo-400" />
             </div>
             <div className="space-y-4">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-teal-400 w-1/3 shadow-[0_0_10px_#2dd4bf]"></div>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                   <span>Начинающий</span>
                   <span>Мастер</span>
                </div>
             </div>
             <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-3">
                <div className="flex items-center gap-3">
                   <Target size={16} className="text-teal-400" />
                   <span className="text-sm font-bold text-white">Следующая цель:</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">Пройти 5 тестов по физике для открытия модуля "Квантовая Механика".</p>
             </div>
          </div>
       </div>
    </section>
  </div>
);

const CoursesPage = () => (
  <div className="pt-40 pb-20 max-w-7xl mx-auto px-4">
    <div className="mb-24 space-y-6 text-center">
      <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-5 py-2 rounded-full text-teal-400 font-black text-[10px] uppercase tracking-widest">
         <GraduationCap size={16} /> Академический Блок
      </div>
      <h1 className="text-7xl font-black tracking-tighter uppercase">БИБЛИОТЕКА <span className="text-gradient">КУРСОВ</span></h1>
      <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">Наши программы разработаны ведущими экспертами и адаптированы под современный темп обучения.</p>
    </div>
    
    <div className="grid grid-cols-1 gap-12">
      {COURSES.map((course, i) => (
        <div key={course.id} className={`glass-panel p-12 rounded-[4rem] flex flex-col lg:flex-row gap-16 border-white/5 group hover:border-white/20 transition-all ${i % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-indigo-400 shadow-2xl group-hover:rotate-12 transition-transform">
                {course.id === 'math' && <Calculator size={40} />}
                {course.id === 'physics' && <Atom size={40} />}
                {course.id === 'ai' && <Brain size={40} />}
                {course.id === 'biology' && <Dna size={40} />}
                {course.id === 'chemistry' && <FlaskConical size={40} />}
              </div>
              <div>
                <h3 className="text-5xl font-black tracking-tighter text-white uppercase">{course.title}</h3>
                <div className="text-[10px] font-black uppercase text-teal-400 tracking-[0.4em] mt-2">Course Module ID: {course.id.toUpperCase()}</div>
              </div>
            </div>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">{course.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
               <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                     <List size={14} /> Программа обучения
                  </h4>
                  <ul className="space-y-3">
                     {course.syllabus?.map((item: string, idx: number) => (
                       <li key={idx} className="flex items-center gap-3 text-slate-300 font-bold text-sm">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                          {item}
                       </li>
                     ))}
                  </ul>
               </div>
               <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 space-y-4">
                  <h4 className="text-xs font-black uppercase text-teal-400 tracking-widest flex items-center gap-2">
                     <Target size={14} /> Результаты
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{course.outcomes}</p>
               </div>
            </div>

            <div className="pt-8">
               <Link to="/tests" className="bg-white text-slate-900 px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-teal-400 transition-all shadow-2xl inline-flex items-center gap-3">
                  Перейти к тестам <ChevronRight />
               </Link>
            </div>
          </div>
          <div className="flex-1 relative rounded-[3rem] overflow-hidden min-h-[400px] shadow-2xl border border-white/10 group-hover:border-indigo-500/50 transition-colors">
             <img src={course.image} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={course.title} />
             <div className="absolute inset-0 bg-indigo-900/20 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all"></div>
             <div className="absolute top-6 right-6 px-4 py-2 bg-slate-950/80 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black uppercase text-white tracking-widest">HD Quality</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TestsPage = ({ onQuizStart }: { onQuizStart: (id: string) => void }) => (
  <div className="pt-40 pb-20 max-w-7xl mx-auto px-4">
    <div className="text-center mb-24 space-y-6">
      <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-5 py-2 rounded-full text-indigo-400 font-black text-[10px] uppercase tracking-widest">
         <ClipboardList size={16} /> Протоколы тестирования
      </div>
      <h1 className="text-7xl font-black tracking-tighter uppercase">ЦЕНТР <span className="text-gradient">ЗНАНИЙ</span></h1>
      <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">Проверьте свои навыки и получите XP для разблокировки новых модулей системы.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Object.entries(QUIZZES).map(([id, quiz]) => (
        <div key={id} className="glass-panel p-10 rounded-[3.5rem] border-white/5 hover:border-indigo-500/30 transition-all group flex flex-col justify-between">
           <div className="space-y-6">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-teal-400 group-hover:rotate-6 transition-transform">
                 <Brain size={32} />
              </div>
              <div className="space-y-2">
                 <div className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">{quiz.subject}</div>
                 <h3 className="text-3xl font-black text-white tracking-tight leading-tight">{quiz.title}</h3>
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-3">{quiz.description}</p>
           </div>
           <div className="mt-10 pt-8 border-t border-white/5">
              <button 
                onClick={() => onQuizStart(id)}
                className="w-full bg-white text-slate-900 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-teal-400 transition-all shadow-xl active:scale-[0.98]"
              >
                Запустить тест
              </button>
           </div>
        </div>
      ))}
    </div>
  </div>
);

const OlympiadsPage = () => (
  <div className="pt-40 pb-20 max-w-7xl mx-auto px-4">
    <div className="text-center mb-32 space-y-6">
       <div className="inline-block px-5 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 font-black text-xs uppercase tracking-[0.4em]">Elite Scientific Tournament</div>
       <h1 className="text-8xl font-black tracking-tighter uppercase">АРЕНА <span className="text-amber-500">ПОБЕД</span></h1>
       <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">Твой билет в лучшие университеты мира. Участвуй, побеждай и забирай награды EC Foundation.</p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {OLYMPIADS.map((olymp) => (
        <div key={olymp.id} className="glass-card p-12 rounded-[4rem] relative overflow-hidden group border-white/5 hover:border-amber-500/30">
           <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 group-hover:opacity-10 transition-all"><Trophy size={180} /></div>
           <div className="flex justify-between items-start mb-12 relative z-10">
              <div className="w-20 h-20 bg-amber-500/20 text-amber-500 rounded-3xl flex items-center justify-center shadow-[0_10px_30px_rgba(245,158,11,0.2)]"><Trophy size={40} /></div>
              <div className="text-right">
                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Статус Регистрации</div>
                 <div className="text-sm font-bold text-teal-400">Открыта до {olymp.date.split(' ').slice(0, 2).join(' ')}</div>
              </div>
           </div>
           <div className="space-y-8 relative z-10">
              <h3 className="text-5xl font-black tracking-tighter uppercase text-white leading-none">{olymp.title}</h3>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">{olymp.description}</p>
              
              <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
                 <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-6">Этапы турнира</h4>
                 <div className="flex justify-between items-center relative">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2"></div>
                    {olymp.roadmap?.map((step: string, idx: number) => (
                       <div key={idx} className="relative z-10 flex flex-col items-center gap-3 group/step">
                          <div className="w-4 h-4 rounded-full bg-slate-900 border-2 border-indigo-500 group-hover/step:scale-125 transition-transform group-hover/step:bg-indigo-500"></div>
                          <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 text-center max-w-[60px]">{step}</span>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                 <button className="flex-1 bg-white text-slate-900 py-6 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-teal-400 transition-all shadow-2xl active:scale-95">
                    Участвовать
                 </button>
                 <button className="flex-1 bg-white/5 text-white py-6 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all border border-white/10">
                    Регламент PDF
                 </button>
              </div>
           </div>
        </div>
      ))}
    </div>

    <section className="mt-40 glass-panel p-20 rounded-[5rem] text-center space-y-12 relative overflow-hidden">
       <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
       <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="text-5xl font-black tracking-tighter uppercase">Советы от чемпионов</h2>
          <p className="text-xl text-slate-400 font-medium leading-relaxed">«Главное — это не объем знаний, а умение применять их в нестандартных ситуациях. Начинайте подготовку за 3 месяца и фокусируйтесь на базовых принципах.»</p>
          <div className="pt-6 flex justify-center items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-amber-500 overflow-hidden">
                <img src="https://picsum.photos/seed/winner/100/100" />
             </div>
             <div className="text-left">
                <div className="text-sm font-black text-white">Артем Васильев</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Золотой призер IPhO 2023</div>
             </div>
          </div>
       </div>
    </section>
  </div>
);

const TeachersPage = () => (
  <div className="pt-40 pb-20 max-w-7xl mx-auto px-4">
    <div className="text-center mb-32 space-y-6">
       <h1 className="text-7xl font-black tracking-tighter uppercase">НАШИ <span className="text-gradient">ЭКСПЕРТЫ</span></h1>
       <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">В Quantum EC преподают только те, кто сам прошел путь от олимпиадника до ведущего ученого.</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {TEACHERS.map((teacher) => (
        <div key={teacher.id} className="glass-panel p-10 rounded-[4rem] flex flex-col md:flex-row gap-12 items-center border-white/5 hover:border-indigo-500/30 transition-all group">
          <div className="w-64 h-64 shrink-0 rounded-[3.5rem] overflow-hidden border-4 border-white/5 group-hover:border-indigo-500/30 transition-all duration-700">
            <img src={teacher.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
               <h3 className="text-4xl font-black tracking-tight text-white">{teacher.name}</h3>
               <div className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em]">{teacher.subject} Specialist</div>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed italic text-lg">«{teacher.quote}»</p>
            <div className="space-y-4">
               <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Область экспертизы & Биография</div>
               <p className="text-sm text-slate-500 leading-relaxed font-medium">{teacher.bio}</p>
            </div>
            <div className="flex gap-4 pt-4">
               <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer"><Mail size={16} /></div>
               <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-teal-500 transition-colors cursor-pointer"><Globe size={16} /></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AboutPage = () => (
  <div className="pt-40 pb-20 max-w-7xl mx-auto px-4 space-y-40">
    <section className="text-center space-y-12 max-w-4xl mx-auto">
       <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/10 shadow-2xl mb-12">
          <QuantumLogo className="w-16 h-16" />
       </div>
       <h1 className="text-8xl font-black tracking-tighter uppercase leading-[0.9]">ЭВОЛЮЦИЯ <br /> <span className="text-gradient">ЗНАНИЙ.</span></h1>
       <p className="text-2xl text-slate-400 font-medium leading-relaxed">Мы не просто школа. Мы — исследовательский центр, который дает инструменты для покорения будущего. Quantum EC был основан в 2024 году группой ученых из MIT и МГУ.</p>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
       {[
         { title: 'Доступность', text: 'Мы верим, что качественное научное образование должно быть доступно каждому, независимо от географии.', icon: <Globe /> },
         { title: 'Инновации', text: 'Наши ИИ-алгоритмы персонализируют обучение, находя пробелы в знаниях за миллисекунды.', icon: <Lightbulb /> },
         { title: 'Результат', text: '98% наших студентов показывают рост результатов на олимпиадах уже через 2 месяца обучения.', icon: <Award /> },
       ].map((item, i) => (
         <div key={i} className="glass-card p-12 rounded-[3.5rem] space-y-6 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto text-indigo-400">{item.icon}</div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">{item.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{item.text}</p>
         </div>
       ))}
    </section>

    <section className="glass-panel p-20 rounded-[5rem] flex flex-col lg:flex-row items-center gap-16 border-white/10">
       <div className="flex-1 space-y-8">
          <h2 className="text-5xl font-black tracking-tighter uppercase">Наш Технологический Стек</h2>
          <p className="text-lg text-slate-400 font-medium leading-relaxed">Мы используем самые современные технологии для обеспечения стабильности и интеллекта нашей платформы. От квантовых вычислений для анализа тестов до нейросетей Gemini для генерации контента.</p>
          <div className="flex flex-wrap gap-4">
             {['Google GenAI', 'Three.js', 'React 19', 'Tailwind', 'Edge Computing'].map(tech => (
               <span key={tech} className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase text-indigo-400 tracking-widest">{tech}</span>
             ))}
          </div>
       </div>
       <div className="flex-1 w-full grid grid-cols-2 gap-4">
          <div className="aspect-square bg-white/5 rounded-[3rem] p-10 border border-white/10 flex flex-col justify-end">
             <div className="text-5xl font-black text-white mb-2">10ms</div>
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Response Latency</div>
          </div>
          <div className="aspect-square bg-indigo-600 rounded-[3rem] p-10 flex flex-col justify-end shadow-2xl">
             <div className="text-5xl font-black text-white mb-2">99.9%</div>
             <div className="text-[10px] font-black text-indigo-200 uppercase tracking-widest leading-none">Uptime Protocol</div>
          </div>
       </div>
    </section>
  </div>
);

const Footer = () => (
  <footer className="pt-40 pb-16 px-4">
    <div className="max-w-7xl mx-auto border-t border-white/5 pt-20 grid grid-cols-1 md:col-span-4 gap-20 flex flex-wrap justify-between">
      <div className="md:w-1/2 space-y-10">
        <Link to="/" className="flex items-center gap-4 group">
          <QuantumLogo className="w-16 h-16 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col">
             <span className="text-3xl font-black text-gradient tracking-tighter">QUANTUM EC</span>
             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.5em]">Education Redefined</span>
          </div>
        </Link>
        <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-lg">Мы строим мост в будущее, где каждый разум может раскрыть свой потенциал через науку и технологии.</p>
      </div>
      <div className="space-y-8">
        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Навигация</h4>
        <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <li><Link to="/courses" className="hover:text-indigo-400 transition-all">Библиотека Курсов</Link></li>
          <li><Link to="/tests" className="hover:text-indigo-400 transition-all">Центр Тестов</Link></li>
          <li><Link to="/olympiads" className="hover:text-indigo-400 transition-all">Олимпиадный План</Link></li>
          <li><Link to="/teachers" className="hover:text-indigo-400 transition-all">Состав Экспертов</Link></li>
        </ul>
      </div>
      <div className="space-y-8">
        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Служба Поддержки</h4>
        <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <li className="flex items-center gap-3"><Mail size={14} /> info@quantum-ec.ru</li>
          <li className="flex items-center gap-3"><MessageSquare size={14} /> @quantum_support</li>
          <li className="flex items-center gap-3"><Globe size={14} /> quantum-ec.ru/docs</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-24 text-center text-[10px] font-black text-slate-700 uppercase tracking-[0.6em] border-t border-white/5 pt-10">
       © 2024 QUANTUM EC FOUNDATION. ALL SYSTEMS NOMINAL. HUMANITY UPGRADED.
    </div>
  </footer>
);

const App = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('quantum_progress');
    return saved ? JSON.parse(saved) : {
      xp: 0,
      level: 1,
      completedQuizzes: [],
      rank: 'Квант'
    };
  });
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('quantum_progress', JSON.stringify(progress));
  }, [progress]);

  const handleQuizFinish = (score: number) => {
    const xpGain = score * 50;
    setProgress(prev => {
      const newXp = prev.xp + xpGain;
      const newLevel = Math.floor(newXp / 1000) + 1;
      const ranks = ['Квант', 'Наблюдатель', 'Исследователь', 'Магистр', 'Сверхновая'];
      const newRank = ranks[Math.min(newLevel - 1, ranks.length - 1)];
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        rank: newRank,
        completedQuizzes: activeQuizId ? [...prev.completedQuizzes, activeQuizId] : prev.completedQuizzes
      };
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar progress={progress} />
      <main className="flex-grow relative">
        <Routes>
          <Route path="/" element={<HomePage progress={progress} />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/tests" element={<TestsPage onQuizStart={setActiveQuizId} />} />
          <Route path="/olympiads" element={<OlympiadsPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={
            <div className="pt-40 px-4 pb-20 max-w-5xl mx-auto">
               <div className="glass-panel p-20 rounded-[5rem] border-white/10 shadow-2xl flex flex-col items-center space-y-12">
                 <h1 className="text-7xl font-black tracking-tighter uppercase text-center leading-[0.9]">ЕСТЬ <br /> ВОПРОСЫ?</h1>
                 <p className="text-xl text-slate-400 text-center max-w-2xl font-medium">Мы открыты к предложениям и готовы помочь в вашем обучении. Выберите удобный канал связи.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <div className="bg-white/5 p-12 rounded-[4rem] border border-white/5 hover:border-indigo-500/50 transition-all group">
                       <Mail size={48} className="text-indigo-400 mb-8 group-hover:scale-110 transition-transform" />
                       <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Email Protocol</h3>
                       <p className="text-slate-500 font-bold text-lg">info@quantum-ec.ru</p>
                    </div>
                    <div className="bg-white/5 p-12 rounded-[4rem] border border-white/5 hover:border-teal-500/50 transition-all group">
                       <MessageSquare size={48} className="text-teal-400 mb-8 group-hover:scale-110 transition-transform" />
                       <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Direct Support</h3>
                       <p className="text-slate-500 font-bold text-lg">@quantum_hq_support</p>
                    </div>
                 </div>
                 <div className="w-full pt-10 text-center">
                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">Quantum Foundation Comms Unit</div>
                 </div>
               </div>
            </div>
          } />
          <Route path="/download" element={
            <div className="pt-40 px-4 pb-20 max-w-6xl mx-auto">
               <div className="bg-indigo-600 p-24 rounded-[6rem] relative overflow-hidden text-center space-y-16 shadow-[0_0_80px_rgba(99,102,241,0.4)]">
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                 <h1 className="text-8xl font-black tracking-tighter uppercase leading-[0.8] text-white">QUANTUM <br /> MOBILE APP</h1>
                 <p className="text-2xl text-indigo-100 max-w-2xl mx-auto font-medium">Получите полный доступ к курсам, оффлайн тестам и AI-ассистенту прямо на вашем смартфоне.</p>
                 <div className="flex flex-wrap justify-center gap-10 pt-10">
                    <button className="bg-white text-slate-900 px-14 py-8 rounded-[3rem] flex items-center gap-6 hover:scale-105 transition-all shadow-2xl group">
                       <Smartphone size={48} />
                       <div className="text-left leading-none">
                          <div className="text-[11px] font-black uppercase tracking-widest opacity-40 mb-1">Download for</div>
                          <div className="text-2xl font-black">App Store</div>
                       </div>
                    </button>
                    <button className="bg-slate-950 text-white px-14 py-8 rounded-[3rem] flex items-center gap-6 hover:scale-105 transition-all shadow-2xl group border border-white/10">
                       <Smartphone size={48} />
                       <div className="text-left leading-none">
                          <div className="text-[11px] font-black uppercase tracking-widest opacity-40 mb-1">Get it on</div>
                          <div className="text-2xl font-black">Play Market</div>
                       </div>
                    </button>
                 </div>
               </div>
            </div>
          } />
        </Routes>

        {activeQuizId && QUIZZES[activeQuizId] && (
          <div className="fixed inset-0 z-[2000] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
             <div className="w-full max-w-4xl">
               <QuizPlayer 
                 quiz={QUIZZES[activeQuizId]} 
                 onClose={() => setActiveQuizId(null)} 
                 onFinish={handleQuizFinish}
               />
             </div>
          </div>
        )}
      </main>
      <Footer />
      <AI_Assistant />
    </div>
  );
};

export default App;
