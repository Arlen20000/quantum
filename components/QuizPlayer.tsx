
import React, { useState } from 'react';
import { Quiz } from '../types';
import { ChevronRight, RefreshCw, Trophy, Sparkles, X, Brain, Target } from 'lucide-react';

interface QuizPlayerProps {
  quiz: Quiz;
  onClose: () => void;
  onFinish?: (score: number) => void;
}

const QuizPlayer: React.FC<QuizPlayerProps> = ({ quiz, onClose, onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    if (currentStep < quiz.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
      const score = newAnswers.reduce((acc, ans, idx) => 
        ans === quiz.questions[idx].correctAnswer ? acc + 1 : acc, 0
      );
      if (onFinish) onFinish(score);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const score = answers.reduce((acc, ans, idx) => 
      ans === quiz.questions[idx].correctAnswer ? acc + 1 : acc, 0
    );
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const xpGain = score * 50;

    return (
      <div className="glass-panel p-16 rounded-[5rem] shadow-[0_0_100px_rgba(99,102,241,0.2)] max-w-3xl w-full mx-auto animate-in zoom-in duration-500 border border-white/10 text-center space-y-12">
        <div className="relative">
          <div className="w-32 h-32 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(245,158,11,0.2)] animate-pulse">
            <Trophy size={64} />
          </div>
          <div className="absolute top-0 right-1/4 animate-bounce"><Sparkles className="text-teal-400" /></div>
        </div>

        <div className="space-y-4">
           <h2 className="text-5xl font-black tracking-tighter uppercase text-white">ТЕСТ ЗАВЕРШЕН</h2>
           <p className="text-slate-500 font-black uppercase text-xs tracking-[0.4em]">Quantum Assessment Protocol</p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
           <div className="glass-card p-10 rounded-[3rem] border-white/5">
              <div className="text-7xl font-black text-indigo-400 mb-2">{percentage}%</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Точность данных</div>
           </div>
           <div className="glass-card p-10 rounded-[3rem] border-white/5">
              <div className="text-7xl font-black text-teal-400 mb-2">+{xpGain}</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Получено XP</div>
           </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <button 
            onClick={restart}
            className="flex-1 bg-white text-slate-900 py-6 rounded-[2.5rem] font-black text-lg uppercase tracking-tighter shadow-2xl hover:bg-teal-400 transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <RefreshCw size={24} /> Перезапуск
          </button>
          <button 
            onClick={onClose}
            className="flex-1 bg-indigo-600 text-white py-6 rounded-[2.5rem] font-black text-lg uppercase tracking-tighter shadow-2xl hover:bg-indigo-500 transition-all active:scale-95"
          >
            К списку тестов
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentStep];

  return (
    <div className="glass-panel p-16 md:p-24 rounded-[5rem] shadow-2xl max-w-4xl w-full mx-auto border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-slate-900">
        <div 
          className="bg-gradient-to-r from-teal-400 via-indigo-600 to-purple-500 h-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
          style={{ width: `${((currentStep + 1) / quiz.questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center mb-16">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
             <Target size={24} />
           </div>
           <div className="flex flex-col">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Шаг Протокола</span>
             <span className="text-lg font-black text-white">{currentStep + 1} / {quiz.questions.length}</span>
           </div>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors group">
          <X size={32} className="group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </div>

      <div className="min-h-[140px] mb-16 space-y-4">
        <div className="text-xs font-black uppercase text-teal-400 tracking-[0.3em]">Вопрос системы:</div>
        <h3 className="text-4xl font-black text-white leading-[1.1] tracking-tighter">{currentQuestion.text}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className="w-full text-left p-8 rounded-[2.5rem] glass-card border-white/5 hover:border-indigo-500 hover:bg-white/10 flex items-center justify-between group active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center font-black text-slate-500 group-hover:text-white group-hover:bg-indigo-600 transition-all uppercase text-sm">
                 {String.fromCharCode(65 + idx)}
               </div>
               <span className="font-bold text-slate-300 text-lg group-hover:text-white">{option}</span>
            </div>
            <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-2 transition-all" />
          </button>
        ))}
      </div>
      
      <div className="mt-16 flex justify-center items-center gap-4 opacity-20 group">
         <div className="h-[1px] w-20 bg-slate-500"></div>
         <Brain size={24} className="text-slate-500" />
         <div className="h-[1px] w-20 bg-slate-500"></div>
      </div>
    </div>
  );
};

export default QuizPlayer;
