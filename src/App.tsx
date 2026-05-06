/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  CheckCircle, 
  Calendar, 
  User, 
  Edit2, 
  ChevronRight, 
  Settings, 
  Bell, 
  Palette, 
  LogOut, 
  Search, 
  Briefcase, 
  Backpack, 
  Clock, 
  Plus, 
  ArrowLeft, 
  Save, 
  Archive,
  CloudUpload,
  X,
  FileText,
  Camera
} from 'lucide-react';

// --- Types ---

type AppTab = 'Tasks' | 'Plan' | 'Profile';

interface Task {
  id: string;
  title: string;
  description: string;
  time: string;
  category: 'Work' | 'Study' | 'Personal' | 'Urgent';
  completed: boolean;
  progress?: number;
}

// --- Mock Data ---

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Quarterly Review Meeting',
    description: 'Prepare slides and budget reports for Q4.',
    time: '09:00 AM',
    category: 'Work',
    completed: false,
    progress: 65,
  },
  {
    id: '2',
    title: 'Client Call: TechNexus',
    description: 'Discuss project scope and final deadlines.',
    time: '11:30 AM',
    category: 'Urgent',
    completed: false,
  },
  {
    id: '3',
    title: 'UX Design Course',
    description: 'Module 4: Accessibility and inclusive design.',
    time: '03:00 PM',
    category: 'Study',
    completed: false,
  },
  {
    id: '4',
    title: 'Morning Yoga Session',
    description: 'Daily stretching and meditation.',
    time: '08:00 AM',
    category: 'Personal',
    completed: true,
  }
];

const CATEGORIES = [
  { name: 'Trabajo', count: 12, icon: <Briefcase size={16} />, color: 'bg-tertiary' },
  { name: 'Personal', count: 5, icon: <User size={16} />, color: 'bg-primary' },
  { name: 'Estudio', count: 8, icon: <Backpack size={16} />, color: 'bg-secondary' },
];

// --- Components ---

const TopBar = ({ onMenuClick }: { onMenuClick?: () => void }) => (
  <header id="top-bar" className="fixed top-0 z-50 w-full h-16 px-5 flex justify-between items-center bg-white shadow-sm">
    <div className="flex items-center gap-4">
      <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95">
        <Menu className="text-primary" size={24} />
      </button>
      <h1 className="text-lg font-bold text-primary font-headline">TaskFlow</h1>
    </div>
    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
      <img 
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" 
        alt="User" 
        className="w-full h-full object-cover"
      />
    </div>
  </header>
);

const BottomNav = ({ currentTab, onTabChange }: { currentTab: AppTab, onTabChange: (tab: AppTab) => void }) => (
  <nav id="bottom-nav" className="fixed bottom-0 w-full flex justify-around items-center h-20 bg-white border-t border-gray-200 shadow-lg z-50 px-2">
    {(['Tasks', 'Plan', 'Profile'] as AppTab[]).map((tab) => {
      const isActive = currentTab === tab;
      const Icon = tab === 'Tasks' ? CheckCircle : tab === 'Plan' ? Calendar : User;
      
      return (
        <button 
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex flex-col items-center justify-center transition-all duration-200 px-6 py-2 rounded-full ${
            isActive ? 'bg-secondary-container text-primary font-bold' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Icon size={24} className={isActive ? 'fill-primary' : ''} />
          <span className="text-[10px] uppercase tracking-wider mt-1">{tab}</span>
        </button>
      );
    })}
  </nav>
);

// --- Profile Screen ---

const ProfileScreen = () => (
  <div id="profile-screen" className="pt-20 pb-28 px-5 space-y-6 max-w-2xl mx-auto">
    <section className="flex flex-col items-center py-6 text-center">
      <div className="relative mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden shadow-md border-4 border-white">
          <img 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200" 
            alt="Alex Rivera" 
            className="w-full h-full object-cover"
          />
        </div>
        <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg active:scale-90 transition-transform">
          <Edit2 size={16} />
        </button>
      </div>
      <h2 className="text-xl font-bold text-gray-900 font-headline">Alex Rivera</h2>
      <p className="text-sm text-gray-500">alex.rivera@taskflow.com</p>
    </section>

    <section className="space-y-3">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Estadísticas de Productividad</h3>
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] text-gray-500 font-medium">Tareas completadas esta semana</p>
            <p className="text-3xl font-bold text-primary font-headline">24 <span className="text-xs text-gray-400 font-normal">/ 30</span></p>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-primary border border-blue-100 rounded-full text-xs font-bold">
            80% Éxito
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '80%' }}
            className="h-full bg-primary"
          />
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-50">
          {[
            { label: 'Trabajo', value: 12 },
            { label: 'Estudio', value: 8 },
            { label: 'Personal', value: 4 }
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              <p className="text-[10px] text-gray-400 uppercase font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="space-y-3">
      {[
        { icon: <Settings size={20} />, title: 'Configuración de Cuenta', subtitle: 'Privacidad, seguridad, datos', color: 'bg-blue-100 text-blue-600' },
        { icon: <Bell size={20} />, title: 'Preferencias de Notificaciones', subtitle: 'Alertas, sonidos y frecuencia', color: 'bg-indigo-100 text-indigo-600' },
        { icon: <Palette size={20} />, title: 'Apariencia', subtitle: 'Modo oscuro, temas y fuentes', color: 'bg-gray-100 text-gray-600' }
      ].map((item, idx) => (
        <button key={idx} className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-50 hover:bg-gray-50 transition-colors group">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${item.color}`}>
              {item.icon}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900">{item.title}</p>
              <p className="text-[10px] text-gray-500">{item.subtitle}</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
        </button>
      ))}
    </div>

    <button className="w-full mt-4 py-4 bg-gray-100 text-red-600 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50 transition-colors active:scale-95">
      <LogOut size={20} />
      <span>Cerrar sesión</span>
    </button>
  </div>
);

// --- Planning Screen ---

const PlanningScreen = ({ onTaskClick }: { onTaskClick: (task: Task) => void }) => (
  <div id="planning-screen" className="pt-20 pb-28 px-5 max-w-2xl mx-auto space-y-6">
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 font-headline">Planning</h2>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
          <Calendar size={16} className="text-primary" />
          <span className="text-xs font-bold text-gray-600">October 2023</span>
        </div>
      </div>
      <div className="flex justify-between bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
        {[
          { day: 'MON', date: 16 },
          { day: 'TUE', date: 17 },
          { day: 'WED', date: 18, active: true },
          { day: 'THU', date: 19 },
          { day: 'FRI', date: 20 },
          { day: 'SAT', date: 21 },
        ].map(item => (
          <div key={item.date} className={`flex flex-col items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer ${
            item.active ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'
          }`}>
            <span className="text-[10px] font-bold">{item.day}</span>
            <span className="text-lg font-bold">{item.date}</span>
          </div>
        ))}
      </div>
    </section>

    <div className="bg-blue-50/50 rounded-2xl p-4 flex items-center justify-between border border-blue-100">
      <div>
        <p className="text-xs font-bold text-blue-600 mb-1 tracking-tight">Wednesday's Load</p>
        <p className="text-lg font-bold text-gray-900">4 Tasks Scheduled</p>
      </div>
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="24" cy="24" r="20" fill="transparent" stroke="#E2E8F0" strokeWidth="4" />
          <motion.circle 
            initial={{ strokeDashoffset: 125.6 }}
            animate={{ strokeDashoffset: 31.4 }}
            cx="24" cy="24" r="20" fill="transparent" stroke="#004ac6" strokeWidth="4" 
            strokeDasharray="125.6"
          />
        </svg>
        <span className="absolute text-[10px] font-bold text-primary">75%</span>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Upcoming Tasks</h3>
      {MOCK_TASKS.map((task) => (
        <motion.div 
          key={task.id}
          whileHover={{ x: 4 }}
          onClick={() => onTaskClick(task)}
          className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-start gap-4 relative overflow-hidden cursor-pointer transition-all ${
            task.completed ? 'opacity-60 bg-gray-50' : 'hover:shadow-md'
          }`}
        >
          <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
            task.category === 'Work' ? 'bg-indigo-600' :
            task.category === 'Urgent' ? 'bg-red-600' :
            task.category === 'Study' ? 'bg-cyan-600' : 'bg-gray-400'
          }`} />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                task.category === 'Work' ? 'text-indigo-600' :
                task.category === 'Urgent' ? 'text-red-500 bg-red-50 px-2 py-0.5 rounded-full' :
                task.category === 'Study' ? 'text-cyan-600' : 'text-gray-500'
              }`}>
                {task.category}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">{task.time}</span>
            </div>
            <h4 className={`text-base font-bold text-gray-900 ${task.completed ? 'line-through' : ''}`}>{task.title}</h4>
            <p className={`text-sm text-gray-500 mt-0.5 ${task.completed ? 'line-through' : ''}`}>{task.description}</p>
          </div>
          <button className={`mt-1 transition-colors ${task.completed ? 'text-primary' : 'text-gray-200 hover:text-primary'}`}>
            <CheckCircle size={22} className={task.completed ? 'fill-primary text-white' : ''} />
          </button>
        </motion.div>
      ))}
    </div>

    <button className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
      <Plus size={20} />
      <span>Planificar nueva actividad</span>
    </button>
  </div>
);

// --- Tasks (Gallery) Screen ---

const GalleryScreen = ({ onTaskClick }: { onTaskClick: (task: Task) => void }) => (
  <div id="gallery-screen" className="pt-20 pb-28 px-5 max-w-4xl mx-auto space-y-6">
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      <input 
        type="text" 
        placeholder="Buscar en la galería..." 
        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
      />
    </div>

    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-headline">Recientes</h2>
        <button className="text-primary text-xs font-bold hover:underline">Ver todo</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { title: 'Review Report', img: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=300&h=300', category: 'Personal', color: 'bg-primary' },
          { title: 'Q4 Projections', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300&h=300', category: 'Work', color: 'bg-tertiary' },
          { title: 'Study Session', img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=300&h=300', category: 'Study', color: 'bg-secondary' },
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -4 }}
            className="group cursor-pointer"
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-sm relative border border-gray-100">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
                <span className={`text-[8px] text-white font-bold uppercase px-2 py-0.5 rounded-full ${item.color}`}>
                  {item.category}
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs font-bold text-gray-700 flex items-center gap-1.5 px-1">
              <FileText size={14} className="text-gray-400" />
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-xl font-bold font-headline mb-4">Por Categoría</h2>
      <div className="space-y-4">
        {CATEGORIES.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 relative overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${cat.color}`} />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`${cat.color.replace('bg-', 'text-')} p-2 rounded-lg bg-opacity-10`}>
                  {cat.icon}
                </span>
                <h3 className="font-bold text-gray-900">{cat.name}</h3>
              </div>
              <span className="text-[10px] font-bold text-gray-400">{cat.count} imágenes</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                  <img 
                    src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000}?auto=format&fit=crop&q=80&w=150&h=150`} 
                    alt="Category item" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
              <div className="flex-shrink-0 w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center text-primary font-bold text-sm">
                + {cat.count - 3}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-2xl shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-50">
      <Camera size={28} />
    </button>
  </div>
);

// --- Task Detail Screen ---

const TaskDetailScreen = ({ task, onBack }: { task: Task, onBack: () => void }) => (
  <motion.div 
    id="task-detail"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    className="fixed inset-0 bg-white z-[60] overflow-y-auto"
  >
    <header className="sticky top-0 z-10 bg-white px-5 h-16 flex items-center justify-between border-b border-gray-100 shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-primary transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-primary font-headline">TaskFlow</h1>
      </div>
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
        <img 
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" 
          alt="User" 
          className="w-full h-full object-cover"
        />
      </div>
    </header>

    <main className="px-5 py-6 max-w-2xl mx-auto space-y-8">
      <section className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Proyecto Corporativo</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 font-headline">{task.title}</h2>
        <p className="text-sm text-gray-500 leading-relaxed">{task.description}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-1">Categoría</label>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 rounded-full bg-primary text-white text-xs font-bold shadow-md">Trabajo</button>
              <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-500 text-xs font-bold hover:bg-gray-200 transition-colors">Estudio</button>
              <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-500 text-xs font-bold hover:bg-gray-200 transition-colors">Personal</button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-1">Prioridad</label>
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold border border-red-100 shadow-sm">Alta</button>
              <button className="flex-1 py-2 rounded-xl bg-orange-50 text-orange-600 text-xs font-bold border border-orange-100">Media</button>
              <button className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-500 text-xs font-bold">Baja</button>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl text-primary">
                <Bell size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-gray-900">Recordatorio</p>
                <p className="text-[10px] text-gray-400">Mañana, 09:00 AM</p>
              </div>
            </div>
            <div className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-gray-400">Progreso</span>
              <span className="text-[10px] font-bold text-primary">65%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                className="bg-primary h-full rounded-full" 
              />
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-xs font-bold text-gray-900 flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            Notas de la actividad
          </h3>
          <button className="text-primary hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
            <Edit2 size={14} />
          </button>
        </div>
        <textarea 
          className="w-full p-5 min-h-[160px] bg-transparent border-none focus:ring-0 text-sm text-gray-700 leading-relaxed resize-none"
          placeholder="Escribe aquí los detalles importantes..."
          defaultValue="Revisar las métricas de satisfacción del cliente del último trimestre. Es fundamental cruzar los datos con la inversión en marketing digital. No olvidar adjuntar el PDF con el resumen ejecutivo para la reunión del viernes con la junta directiva."
        />
      </section>

      <section className="space-y-4 pb-12">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold font-headline">Subir o visualizar imágenes</h3>
          <button className="text-primary text-xs font-bold flex items-center gap-1.5 hover:underline">
            <Plus size={16} />
            Añadir
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {[
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200&h=200',
            'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=200&h=200'
          ].map((img, idx) => (
            <div key={idx} className="relative group flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <img src={img} alt="Media" className="w-full h-full object-cover" />
              </div>
              <button className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <X size={12} />
              </button>
            </div>
          ))}
          <button className="flex-shrink-0 w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all group">
            <CloudUpload size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold mt-1">Subir</span>
          </button>
        </div>
      </section>

      <footer className="fixed bottom-0 left-0 w-full p-5 bg-white border-t border-gray-100 flex gap-4 max-w-2xl mx-auto left-1/2 -translate-x-1/2">
        <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl hover:bg-blue-700 transition-all active:scale-[0.98]">
          <Save size={20} />
          Guardar cambios
        </button>
        <button className="p-4 bg-gray-100 text-gray-500 rounded-2xl hover:bg-gray-200 transition-colors">
          <Archive size={20} />
        </button>
      </footer>
    </main>
  </motion.div>
);

// --- Main App Component ---

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('Tasks');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <div id="app-container" className="min-h-screen bg-surface selection:bg-primary/10">
      <TopBar />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          {currentTab === 'Tasks' && (
            <motion.div 
              key="tasks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <GalleryScreen onTaskClick={handleTaskClick} />
            </motion.div>
          )}
          
          {currentTab === 'Plan' && (
            <motion.div 
              key="plan"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PlanningScreen onTaskClick={handleTaskClick} />
            </motion.div>
          )}

          {currentTab === 'Profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ProfileScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedTask && (
          <TaskDetailScreen 
            task={selectedTask} 
            onBack={() => setSelectedTask(null)} 
          />
        )}
      </AnimatePresence>

      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
