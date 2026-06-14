import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Award, 
  Briefcase, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  ExternalLink, 
  Clock, 
  Search, 
  ArrowRight, 
  Cpu, 
  Check, 
  ShieldCheck, 
  MapPin, 
  DollarSign, 
  Layers 
} from 'lucide-react';
import { Course, Candidate, Job, Project, Lesson } from '@/lib/types';

interface CandidateWorkspaceProps {
  courses: Course[];
  candidate: Candidate;
  jobs: Job[];
  onEnroll: (courseId: string) => void;
  onCompleteCourse: (courseId: string) => void;
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onApplyJob: (jobId: string) => void;
  onUpdateStatus: (status: Candidate['status']) => void;
  appliedJobIds: string[];
}

export default function CandidateWorkspace({
  courses,
  candidate,
  jobs,
  onEnroll,
  onCompleteCourse,
  onAddProject,
  onApplyJob,
  onUpdateStatus,
  appliedJobIds
}: CandidateWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<'learning' | 'profile' | 'opportunities'>('learning');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState('');
  const [showCertModal, setShowCertModal] = useState<Course | null>(null);

  // Search and filter for jobs
  const [jobSearch, setJobSearch] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('All');

  // Interactive project builder form state
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjSkills, setNewProjSkills] = useState('');
  const [newProjLink, setNewProjLink] = useState('');

  // Course completion / progress handlers
  const handleStartCourse = (course: Course) => {
    onEnroll(course.id);
    setSelectedCourse(course);
    setCurrentLessonIndex(0);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setQuizFeedback('');
  };

  const handleNextOrFinish = () => {
    if (!selectedCourse) return;
    const isLastLesson = currentLessonIndex === selectedCourse.lessons.length - 1;

    if (isLastLesson) {
      // Complete Course
      onCompleteCourse(selectedCourse.id);
      setShowCertModal(selectedCourse);
      setSelectedCourse(null);
    } else {
      setCurrentLessonIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setQuizSubmitted(false);
      setQuizFeedback('');
    }
  };

  const handleAnswerSelection = (index: number) => {
    if (quizSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleVerifyQuiz = () => {
    if (!selectedCourse || selectedAnswer === null) return;
    const currentLesson = selectedCourse.lessons[currentLessonIndex];
    if (!currentLesson.quiz) return;

    setQuizSubmitted(true);
    if (selectedAnswer === currentLesson.quiz.correctAnswer) {
      setQuizFeedback('Correct! Verification node verified your understanding. Your skills are validated.');
    } else {
      setQuizFeedback(`Oops! That's incorrect. Review the lesson materials and try again.`);
    }
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim() || !newProjDesc.trim()) return;

    onAddProject({
      title: newProjTitle,
      description: newProjDesc,
      skills: newProjSkills.split(',').map(s => s.trim()).filter(s => s !== ''),
      link: newProjLink.trim() || undefined
    });

    // Reset Form
    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjSkills('');
    setNewProjLink('');
    setIsAddingProject(false);
  };

  // Get list of all skills available in the ecosystem
  const allSkills = Array.from(new Set(courses.flatMap(c => c.skillsGranted)));

  // Calculate Match Score for a job listing
  const calculateMatchScore = (jobSkills: string[]) => {
    if (jobSkills.length === 0) return 100;
    const matched = jobSkills.filter(s => candidate.skills.includes(s));
    return Math.round((matched.length / jobSkills.length) * 100);
  };

  // Filtered jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(jobSearch.toLowerCase()) || 
                          job.company.toLowerCase().includes(jobSearch.toLowerCase()) ||
                          job.description.toLowerCase().includes(jobSearch.toLowerCase());
    
    const matchesSkill = selectedSkillFilter === 'All' || job.skillsNeeded.includes(selectedSkillFilter);
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="space-y-8" id="candidate-workspace">
      {/* Workspace Sub-Header Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-4" id="candidate-subnav">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Welcome back, {candidate.name}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified Candidate
            </span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">Develop verified proof-of-ability and get matched immediately with hiring-ready pipelines.</p>
        </div>

        {/* Local Workspace Tabs */}
        <div className="flex space-x-1.5 bg-slate-100/80 p-1 rounded-lg self-stretch sm:self-auto">
          <button
            onClick={() => { setActiveTab('learning'); setSelectedCourse(null); }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'learning'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-indigo-500 animate-pulse" />
            <span>Learning Academy</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('profile'); setSelectedCourse(null); }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-500" />
            <span>Verified Portfolio</span>
            {candidate.skills.length > 0 && (
              <span className="scale-90 px-1.5 py-0.2 bg-emerald-500 text-white rounded text-[9px]">
                {candidate.skills.length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('opportunities'); setSelectedCourse(null); }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'opportunities'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4 text-indigo-500" />
            <span>Discover Jobs</span>
            <span className="scale-90 px-1.5 py-0.2 bg-indigo-100 text-indigo-700 rounded text-[9px] font-bold">
              {jobs.length}
            </span>
          </button>
        </div>
      </div>

      {/* ACTIVE LEARNING MODAL / SUB-SCREEN (Immersive split-view) */}
      {selectedCourse && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: 15 }}
          className="bg-slate-950 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
          id="course-terminal-view"
        >
          {/* Top Bar */}
          <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 font-mono tracking-wider border border-indigo-500/30">
                {selectedCourse.category.toUpperCase()}
              </span>
              <h2 className="text-base font-bold tracking-tight text-white">{selectedCourse.title}</h2>
            </div>
            <button 
              onClick={() => setSelectedCourse(null)}
              className="text-slate-400 hover:text-white transition-all text-sm font-mono hover:scale-105 bg-slate-800 px-2.5 py-1 rounded-md"
            >
              ESC [QUIT]
            </button>
          </div>

          {/* Stepper Status */}
          <div className="bg-slate-900/60 border-b border-slate-800 px-6 py-3 flex items-center gap-3 overflow-x-auto text-xs font-mono">
            {selectedCourse.lessons.map((les, idx) => (
              <div 
                key={les.id}
                className={`flex items-center gap-1.5 shrink-0 ${
                  idx === currentLessonIndex ? 'text-indigo-400' : idx < currentLessonIndex ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                {idx < currentLessonIndex ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${
                    idx === currentLessonIndex ? 'border-indigo-500 bg-indigo-505/20 text-white font-bold' : 'border-slate-700'
                  }`}>
                    {idx + 1}
                  </span>
                )}
                <span>{les.title}</span>
                {idx < selectedCourse.lessons.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-slate-700" />}
              </div>
            ))}
          </div>

          {/* Immersive Terminal Split Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            {/* Left: Material Study Guide */}
            <div className="col-span-7 p-6 sm:p-8 lg:border-r lg:border-slate-800 bg-slate-950 overflow-y-auto max-h-[600px] prose prose-invert prose-indigo">
              <div className="flex items-center text-[11px] font-mono text-indigo-400 mb-2 gap-1">
                <Clock className="w-3.5 h-3.5" /> <span>LESSON {currentLessonIndex + 1} OF {selectedCourse.lessons.length}</span>
              </div>
              <h3 className="text-xl font-extrabold text-white mb-4 tracking-tight">
                {selectedCourse.lessons[currentLessonIndex].title}
              </h3>
              
              {/* Splitting system for lesson text */}
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed whitespace-pre-line" id="lesson-html-rendered">
                {selectedCourse.lessons[currentLessonIndex].content}
              </div>

              <div className="mt-8 bg-indigo-950/20 border border-indigo-500/10 p-4 rounded-xl text-xs flex gap-3 text-indigo-300">
                <Cpu className="w-5 h-5 text-indigo-400 shrink-0" />
                <p>
                  <strong>Automatic Evaluation:</strong> Completing this syllabus grants a cryptographic verification link to your candidate file instantly. Recruiters will observe this verification in search ranks.
                </p>
              </div>
            </div>

            {/* Right: Real-time Evaluation Station */}
            <div className="col-span-5 p-6 sm:p-8 bg-slate-900/40 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 tracking-wider">EVALUATION GATE</span>
                <h4 className="text-sm font-semibold text-white mt-1 mb-4">Prove Understanding to Unlock Dynamic Skills</h4>

                {selectedCourse.lessons[currentLessonIndex].quiz ? (
                  <div className="space-y-4" id="quiz-block">
                    <p className="text-sm text-slate-200 font-medium">
                      {selectedCourse.lessons[currentLessonIndex].quiz?.question}
                    </p>

                    <div className="space-y-2">
                      {selectedCourse.lessons[currentLessonIndex].quiz?.options.map((opt, idx) => (
                        <button
                          key={idx}
                          id={`quiz-opt-${idx}`}
                          onClick={() => handleAnswerSelection(idx)}
                          className={`w-full text-left p-3.5 text-xs rounded-xl border transition-all duration-200 block ${
                            selectedAnswer === idx
                              ? 'bg-indigo-600/20 border-indigo-500 text-white font-medium'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="font-mono text-[10px] text-slate-500 mt-0.5">[{idx + 1}]</span>
                            <span>{opt}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {quizSubmitted && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl text-xs border ${
                          selectedAnswer === selectedCourse.lessons[currentLessonIndex].quiz?.correctAnswer
                            ? 'bg-emerald-500/10 border-emerald-505/30 text-emerald-400'
                            : 'bg-rose-500/10 border-rose-505/30 text-rose-400'
                        }`}
                      >
                        {quizFeedback}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 font-mono">This lesson contains study material only. Feel free to click proceed below!</p>
                )}
              </div>

              <div className="pt-6 border-t border-slate-800/80 mt-8 flex flex-col gap-2">
                {selectedCourse.lessons[currentLessonIndex].quiz && !quizSubmitted ? (
                  <button
                    onClick={handleVerifyQuiz}
                    disabled={selectedAnswer === null}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2 ${
                      selectedAnswer === null
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-900/30'
                    }`}
                  >
                    <Check className="w-4 h-4" /> Verify Answer Now
                  </button>
                ) : (
                  <button
                    onClick={handleNextOrFinish}
                    disabled={selectedCourse.lessons[currentLessonIndex].quiz && selectedAnswer !== selectedCourse.lessons[currentLessonIndex].quiz?.correctAnswer}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-all font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-950/20"
                  >
                    <span>
                      {currentLessonIndex === selectedCourse.lessons.length - 1 
                        ? 'Graduate & Claim Verified Proof 🎓' 
                        : 'Proceed to Next Lesson'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                <p className="text-[10px] text-center text-slate-500 mt-2">CareerOS secure learning consensus</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 1. LEARNING ACADEMY TAB PANEL */}
      {activeTab === 'learning' && !selectedCourse && (
        <div className="space-y-6 animate-fadeIn" id="tab-panels-learning">
          {/* Welcome Dashboard Accent */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center pr-10 pointer-events-none">
              <Layers className="w-72 h-72" />
            </div>
            
            <div className="max-w-xl relative z-10 space-y-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-505/30 text-indigo-200 border border-indigo-500/20">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> CORE MISSION
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Your work output translates directly into hiring validation</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Skip self-reported resume bullets. When you complete lessons here, your database file updates automatically. Recruiters immediately discover your real capability.
              </p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Expand Your Verified Portfolio</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="courses-grid">
            {courses.map(course => {
              const isEnrolled = course.enrolled;
              const isCompleted = course.completed;

              return (
                <div 
                  key={course.id} 
                  id={`course-card-${course.id}`}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wide uppercase ${
                        course.category === 'Engineering' ? 'bg-indigo-50 text-indigo-700' :
                        course.category === 'Artificial Intelligence' ? 'bg-purple-50 text-purple-700' :
                        course.category === 'Design' ? 'bg-pink-50 text-pink-700' :
                        course.category === 'Product' ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-700'
                      }`}>
                        {course.category}
                      </span>
                      {isCompleted && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 font-mono">
                          <Check className="w-3 h-3 mr-1" /> VERIFIED
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-base tracking-tight leading-tight">{course.title}</h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">{course.description}</p>
                    </div>

                    <div className="flex items-center text-[11px] text-slate-500 space-x-4 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {course.duration}
                      </span>
                      <span>•</span>
                      <span>{course.lessons.length} Modules</span>
                    </div>

                    {/* Skill Badges Granted */}
                    <div className="space-y-2">
                      <p className="text-[10px] text-slate-400 font-mono font-semibold uppercase tracking-wider">SKILLS VERIFIED UPON COMPLETION:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {course.skillsGranted.map(s => (
                          <span key={s} className="px-2 py-1 bg-slate-50 rounded text-[11px] font-semibold text-slate-700 border border-slate-100">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-50">
                    {isCompleted ? (
                      <div className="w-full bg-emerald-50 text-emerald-800 py-2.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5">
                        <Award className="w-4 h-4 text-emerald-500" /> 
                        <span>Portfolio Updated</span>
                      </div>
                    ) : isEnrolled ? (
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Continue Course ({course.progress}% done)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartCourse(course)}
                        className="w-full bg-slate-900 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-150 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1"
                      >
                        <span>Enroll & Certify Ability</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. VERIFIED PORTFOLIO / CV TAB PANEL */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn" id="tab-panels-profile">
          {/* Left Block: The Profile Resume Output */}
          <div className="lg:col-span-8 space-y-6">
            {/* Main resume card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-8" id="verified-compiled-cv">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row gap-6 items-start justify-between border-b border-slate-100 pb-6">
                <div className="flex flex-col sm:flex-row gap-5 items-center text-center sm:text-left">
                  <img 
                    src={candidate.avatar} 
                    alt={candidate.name} 
                    className="w-18 h-18 rounded-2xl object-cover ring-4 ring-indigo-50" 
                  />
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">{candidate.name}</h2>
                    <p className="text-sm font-semibold text-indigo-600 mt-1">{candidate.title}</p>
                    <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                      <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                        {candidate.email}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500">Live on Recruiter Marketplace</span>
                    </div>
                  </div>
                </div>

                {/* Candidate Status Selector */}
                <div className="bg-slate-50 py-1.5 px-3 rounded-xl border border-slate-100 self-stretch sm:self-auto flex flex-col justify-center items-center sm:items-end">
                  <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider">JOB-SEARCH STATE</span>
                  <select 
                    id="status-select"
                    value={candidate.status}
                    onChange={(e) => onUpdateStatus(e.target.value as Candidate['status'])}
                    className="text-xs font-bold text-emerald-700 bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer pt-1"
                  >
                    <option value="Open for Offers" className="text-slate-800">🟢 Open for Offers</option>
                    <option value="Interviewing" className="text-slate-800">🟡 Interviewing</option>
                    <option value="Active" className="text-slate-800">🔴 Active (Not Looking)</option>
                  </select>
                </div>
              </div>

              {/* Verified Skills Ledger (The Crown Jewel) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                    <span>Verified Professional Competencies</span>
                  </h3>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold font-mono">
                    TRUSTED CRYPTO CONSENSUS
                  </span>
                </div>

                {candidate.skills.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="verified-skills-list-cv">
                    {candidate.skills.map(skill => {
                      // Trace which course granted this skill to display link
                      const correspondingCourse = courses.find(c => c.skillsGranted.includes(skill));
                      return (
                        <div 
                          key={skill} 
                          className="bg-emerald-50/40 border border-emerald-100/60 rounded-xl p-3 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900">{skill}</p>
                              {correspondingCourse && (
                                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Via: {correspondingCourse.title}</p>
                              )}
                            </div>
                          </div>
                          <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                            Verified Fit
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-250">
                    <GraduationCap className="w-8 h-8 text-indigo-400 mx-auto opacity-75 mb-2" />
                    <p className="text-xs text-slate-500 font-medium">No verified skills generated yet.</p>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
                      Enroll in the Course Academy and complete dynamic module quizzes to gain auto-validated certifications.
                    </p>
                  </div>
                )}
              </div>

              {/* Self-Directed Personal Projects */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    Self-Directed Engineering Projects
                  </h3>
                  <button 
                    onClick={() => setIsAddingProject(true)}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                    id="add-project-btn"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                </div>

                {candidate.projects.length > 0 ? (
                  <div className="space-y-4" id="projects-list-cv">
                    {candidate.projects.map(proj => (
                      <div key={proj.id} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <div className="flex items-start justify-between">
                          <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                          {proj.link && (
                            <a 
                              href={proj.link} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-slate-400 hover:text-slate-650"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">{proj.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {proj.skills.map(s => (
                            <span key={s} className="px-1.5 py-0.5 bg-white border border-slate-100 rounded text-[10px] text-slate-600 font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No custom web projects added yet. Recruiter visibility benefits from adding raw outputs alongside academic work.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Block: Add project form / stats Summary */}
          <div className="lg:col-span-4 space-y-6">
            {/* Interactive Add Project Block */}
            {isAddingProject ? (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4" id="project-form-container">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Publish New Project Case Study</h3>
                <form onSubmit={handleAddProjectSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Project Name</label>
                    <input 
                      id="proj-title-input"
                      type="text" 
                      required
                      placeholder="e.g. FlightPath - Runway Analytics"
                      value={newProjTitle}
                      onChange={(e) => setNewProjTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Impact & Description</label>
                    <textarea 
                      id="proj-desc-input"
                      required
                      rows={3}
                      placeholder="Explain what was constructed, quantitative speeds achieved, or challenges overcome."
                      value={newProjDesc}
                      onChange={(e) => setNewProjDesc(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Technologies/Languages Used</label>
                    <input 
                      id="proj-skills-input"
                      type="text" 
                      placeholder="React, Tailwind, Docker, rust (comma separated)"
                      value={newProjSkills}
                      onChange={(e) => setNewProjSkills(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Repository/Live URL</label>
                    <input 
                      id="proj-link-input"
                      type="url" 
                      placeholder="https://github.com/developer/flight-path"
                      value={newProjLink}
                      onChange={(e) => setNewProjLink(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <button 
                      id="submit-project-btn"
                      type="submit"
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg"
                    >
                      Publish Project
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsAddingProject(false)}
                      className="px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-slate-55 bg-indigo-50/20 border border-indigo-100/50 rounded-2xl p-6 space-y-4" id="cv-quick-tips">
                <Sparkles className="w-6 h-6 text-indigo-500" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">How CareerOS verification works</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Unlike legacy resumes that suffer from self-reporting bias, any skills attached to your portfolio via our syllabus can be authenticated by recruiters. Each badge carries a consensus signature linking to standard-defined coursework.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => setIsAddingProject(true)}
                    className="w-full bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200/60 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add Personal Project Case
                  </button>
                </div>
              </div>
            )}

            {/* Static Verified Credentials Showcase */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-sm" id="certificate-scroller">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Earned Certifications</h4>
              {courses.filter(c => c.completed).length > 0 ? (
                <div className="space-y-3">
                  {courses.filter(c => c.completed).map(c => (
                    <div key={c.id} className="p-3 border border-emerald-100 bg-emerald-50/20 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-emerald-500" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">{c.title}</p>
                          <p className="text-[10px] text-slate-500 font-mono">ID: {c.id.toUpperCase()}-VERIFY</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No certificates secured. Complete the courses in the learning tab to claim active badges.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. DISCOVER OPPORTUNITIES TAB PANEL */}
      {activeTab === 'opportunities' && (
        <div className="space-y-6 animate-fadeIn" id="tab-panels-opportunities">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm" id="jobs-filters-bar">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <Search className="w-4 h-4" />
              </span>
              <input 
                id="job-search-input"
                type="text" 
                placeholder="Search jobs by title, company, or tech stack..."
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            
            {/* Skill Selector Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold font-mono whitespace-nowrap">Filter Skill:</span>
              <select
                id="skill-filter-select"
                value={selectedSkillFilter}
                onChange={(e) => setSelectedSkillFilter(e.target.value)}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="All">All Competencies</option>
                {allSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Job listings grid */}
          <div className="space-y-4" id="opportunities-feed">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => {
                const matchScore = calculateMatchScore(job.skillsNeeded);
                const hasApplied = appliedJobIds.includes(job.id);

                return (
                  <div 
                    key={job.id} 
                    id={`job-card-${job.id}`}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="flex-1 space-y-4">
                      {/* Job Title and Meta */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg select-none">
                            {job.logo}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-base leading-tight">{job.title}</h3>
                            <p className="text-xs text-slate-500 font-semibold mt-0.5">{job.company}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center font-mono text-[11px] text-slate-500 gap-x-4 gap-y-1 mt-2.5">
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-slate-400" /> {job.salary}</span>
                          <span>•</span>
                          <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded">{job.type}</span>
                          <span>•</span>
                          <span>Posted: {job.datePosted}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">{job.description}</p>

                      {/* Required Skills match indicator */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">COMPETENCY TARGETS:</span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            matchScore === 100 ? 'bg-emerald-50 text-emerald-700' :
                            matchScore >= 50 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {matchScore}% SKILL MATCH
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5">
                          {job.skillsNeeded.map(skill => {
                            const isVerifiedSkill = candidate.skills.includes(skill);
                            // Highlight course candidate can enroll in if they lack the skill
                            const correspondingLackCourse = !isVerifiedSkill ? courses.find(c => c.skillsGranted.includes(skill)) : null;

                            return (
                              <div key={skill} className="flex items-center">
                                {isVerifiedSkill ? (
                                  <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center">
                                    <Check className="w-3 h-3 text-emerald-500 mr-1" /> {skill}
                                  </span>
                                ) : correspondingLackCourse ? (
                                  <button
                                    id={`enroll-lack-${job.id}-${correspondingLackCourse.id}`}
                                    onClick={() => {
                                      setActiveTab('learning');
                                      handleStartCourse(correspondingLackCourse);
                                    }}
                                    className="px-2 py-1 rounded text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 flex items-center transition-all cursor-pointer group"
                                    title={`Click to acquire ${skill} via ${correspondingLackCourse.title}`}
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-505 mr-1.5 group-hover:scale-125 transition-all"></span>
                                    {skill} (Acquire 🎓)
                                  </button>
                                ) : (
                                  <span className="px-2 py-1 rounded text-xs font-regular bg-slate-50 text-slate-500 border border-slate-100">
                                    {skill} (Lacking)
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex lg:flex-col items-stretch lg:items-end justify-between lg:justify-center p-4 lg:p-0 bg-slate-50 lg:bg-transparent rounded-xl gap-3">
                      <div>
                        {job.applicantsCount > 0 && (
                          <div className="text-right text-[10px] text-slate-400 font-mono font-medium hidden lg:block mb-2">
                            {job.applicantsCount} Verified Applicants
                          </div>
                        )}
                      </div>

                      {hasApplied ? (
                        <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-1 font-sans">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Applied
                        </div>
                      ) : (
                        <button
                          id={`apply-btn-${job.id}`}
                          onClick={() => onApplyJob(job.id)}
                          className={`py-2.5 px-6 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                            matchScore === 100 
                              ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-100'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100'
                          }`}
                        >
                          {matchScore === 100 ? 'Apply with 100% Verified Fit' : 'Apply For Role'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-sm text-slate-500 italic">No job opportunities match your active competency search criteria.</p>
                <button
                  onClick={() => { setJobSearch(''); setSelectedSkillFilter('All'); }}
                  className="mt-3 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold"
                >
                  Clear Job Search Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Graduation Certificate Minting Award Celebration Modal */}
      <AnimatePresence>
        {showCertModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" id="cert-congrats-modal">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-slate-100 shadow-2xl space-y-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                <Award className="w-9 h-9 animate-bounce" />
              </div>

              <div>
                <span className="text-[10px] font-mono text-indigo-600 font-extrabold uppercase tracking-widest bg-indigo-50 px-2.5 py-0.5 rounded">
                  CONSENSUS VALIDATION SECURED
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2.5 tracking-tight">Congratulations, {candidate.name}!</h3>
                <p className="text-xs text-slate-500 mt-1.5 max-w-md mx-auto">
                  You have successfully completed every lesson module and verified your hands-on ability under CareerOS standards.
                </p>
              </div>

              {/* The Certificate Render */}
              <div className="relative border-4 border-double border-indigo-600 bg-indigo-50/20 p-6 rounded-xl space-y-3">
                <div className="absolute right-3 top-3 text-[10px] font-mono text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-100 font-bold flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" /> SIGNED PROOF
                </div>
                <span className="font-mono text-[9px] text-slate-400 block">CAREEROS DIPLOMA OF COMPETENCY</span>
                <h4 className="text-base font-extrabold text-slate-900 tracking-tight">{showCertModal.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans max-w-sm mx-auto">
                  Attributes: <span className="font-semibold text-indigo-700 font-mono text-[11px]">{showCertModal.skillsGranted.join(', ')}</span> have been auto-injected into Candidate File and published to recruiter registries.
                </p>
                <div className="text-[10px] text-slate-400 mt-4 flex justify-between font-mono pt-4 border-t border-indigo-100/40">
                  <span>DATE: {new Date().toLocaleDateString()}</span>
                  <span>NODE ID: VERIFY-96H32</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  id="close-cert-btn"
                  onClick={() => {
                    setShowCertModal(null);
                    setActiveTab('profile');
                  }}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md"
                >
                  View Dynamic Profile Updates
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
