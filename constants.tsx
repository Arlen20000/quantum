
import { Course, Teacher, Olympiad, Quiz } from './types';

export const COURSES: Course[] = [
  { 
    id: 'math', 
    title: 'Математика', 
    icon: 'Calculator', 
    color: 'bg-teal-500', 
    description: 'От основ алгебры до квантового исчисления. Погрузитесь в мир чисел с Quantum EC.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd482180c?auto=format&fit=crop&q=80&w=1000',
    syllabus: ['Линейная алгебра', 'Математический анализ', 'Теория вероятностей', 'Дискретная математика'],
    outcomes: 'Вы научитесь решать задачи олимпиадного уровня и анализировать сложные системы данных.'
  },
  { 
    id: 'physics', 
    title: 'Физика', 
    icon: 'Atom', 
    color: 'bg-indigo-600', 
    description: 'Законы вселенной, механика и основы квантовой физики в доступном формате.',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=1000',
    syllabus: ['Классическая механика', 'Термодинамика', 'Оптика и волны', 'Квантовые системы'],
    outcomes: 'Понимание физических процессов на макро и микро уровнях, подготовка к техническим ВУЗам.'
  },
  { 
    id: 'chemistry', 
    title: 'Химия', 
    icon: 'FlaskConical', 
    color: 'bg-teal-500', 
    description: 'Реакции, элементы и молекулярные структуры. Химический анализ в цифровой среде.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d397191a?auto=format&fit=crop&q=80&w=1000',
    syllabus: ['Неорганическая химия', 'Органический синтез', 'Физическая химия', 'Биохимия'],
    outcomes: 'Навыки проведения виртуальных лабораторий и глубокое понимание структуры вещества.'
  },
  { 
    id: 'biology', 
    title: 'Биология', 
    icon: 'Dna', 
    color: 'bg-indigo-600', 
    description: 'Изучение генетического кода и биосистем. От молекулы до целого организма.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=1000',
    syllabus: ['Цитология', 'Генетика', 'Эволюционная биология', 'Физиология'],
    outcomes: 'Освоение принципов работы живых систем и подготовка к медицинским олимпиадам.'
  },
  { 
    id: 'ai', 
    title: 'Искусственный интеллект', 
    icon: 'Brain', 
    color: 'bg-purple-600', 
    description: 'Нейросети и машинное обучение. Технологии будущего доступны уже сегодня.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
    syllabus: ['Основы Python', 'Машинное обучение', 'Глубокое обучение', 'Этика ИИ'],
    outcomes: 'Создание собственных моделей ИИ и работа с современными фреймворками.'
  },
];

export const OLYMPIADS: Olympiad[] = [
  { id: 'math-olymp', title: 'Quantum Math Challenge', date: '15 Сентября 2024', description: 'Всероссийский турнир юных математиков Quantum EC.', details: 'Уровень: Сложный. Призовой фонд: Гранты на обучение и мощные ноутбуки.', roadmap: ['Регистрация', 'Отборочный тест', 'Финальный этап', 'Награждение'] },
  { id: 'phys-olymp', title: 'Quantum Physics Open', date: '22 Октября 2024', description: 'Международный конкурс экспериментальной физики.', details: 'Уровень: Профи. Фокус на квантовой механике и термодинамике.', roadmap: ['Подача заявки', 'Решение кейсов', 'Презентация', 'Призы'] },
  { id: 'chem-olymp', title: 'Quantum Chem Cup', date: '05 Ноября 2024', description: 'Химический марафон будущего: синтез и анализ.', details: 'Уровень: Средний. Требуется знание органической химии.', roadmap: ['Подготовка', 'Лабораторный тур', 'Теория', 'Результаты'] },
  { id: 'bio-olymp', title: 'Quantum Bio Cup', date: '12 Декабря 2024', description: 'Биологический олимп: генетика и биотехнологии.', details: 'Уровень: Олимпиадный. Работа с реальными кейсами лабораторий.', roadmap: ['Квалификация', 'Исследование', 'Защита проекта', 'Гранты'] },
];

export const TEACHERS: Teacher[] = [
  { id: '1', name: 'Александр Петров', subject: 'Математика', bio: 'Доктор физико-математических наук, ведущий методист Quantum EC. Победитель IMO 2005.', quote: 'Математика — это язык, на котором говорит вселенная.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200' },
  { id: '2', name: 'Мария Сидорова', subject: 'Химия', bio: 'Эксперт в области органической химии, автор курса "Цифровая Лаборатория".', quote: 'В каждой реакции скрыта магия порядка.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' },
  { id: '3', name: 'Иван Кузнецов', subject: 'Физика', bio: 'Исследователь квантовых систем, готовит к олимпиадам мирового уровня.', quote: 'Понять физику — значит увидеть невидимое.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
  { id: '4', name: 'Елена Белова', subject: 'Биология', bio: 'Кандидат биологических наук, специалист по генной инженерии.', quote: 'Жизнь — это самая сложная и красивая программа.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200' },
];

export const QUIZZES: Record<string, Quiz> = {
  'math-base': {
    id: 'math-base',
    title: 'Основы Алгебры',
    subject: 'Математика',
    description: 'Вводный тест по линейным уравнениям и функциям. Идеально для разминки перед олимпиадой.',
    questions: [
      { id: 1, text: 'Решите уравнение: 2x + 5 = 13', options: ['x = 4', 'x = 3', 'x = 6', 'x = 8'], correctAnswer: 0 },
      { id: 2, text: 'Что такое дискриминант в квадратном уравнении?', options: ['Число корней', 'Показатель функции', 'Параметр уравнения', 'Коэффициент'], correctAnswer: 0 }
    ]
  },
  'physics-mech': {
    id: 'physics-mech',
    title: 'Классическая Механика',
    subject: 'Физика',
    description: 'Проверка знаний законов Ньютона, энергии и импульса.',
    questions: [
      { id: 1, text: 'Второй закон Ньютона гласит:', options: ['F = ma', 'E = mc²', 'v = s/t', 'P = UI'], correctAnswer: 0 },
      { id: 2, text: 'В чем измеряется сила?', options: ['В Джоулях', 'В Ваттах', 'В Ньютонах', 'В Паскалях'], correctAnswer: 2 }
    ]
  },
  'ai-intro': {
    id: 'ai-intro',
    title: 'Введение в ML',
    subject: 'Искусственный интеллект',
    description: 'Основы машинного обучения и нейронных сетей для начинающих.',
    questions: [
      { id: 1, text: 'Что такое обучение с учителем?', options: ['Обучение на размеченных данных', 'Обучение без обратной связи', 'Самообучение системы', 'Обучение робота человеком'], correctAnswer: 0 },
      { id: 2, text: 'Какая функция активации чаще всего используется в нейросетях?', options: ['ReLU', 'Sin', 'Cos', 'Linear'], correctAnswer: 0 }
    ]
  }
};
