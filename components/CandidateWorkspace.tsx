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

export interface SkillNode {
  name: string;
  x: number;
  y: number;
  tier: number;
  description: string;
  prerequisites: string[];
  courseId?: string;
}

export const SKILL_TREES: Record<string, {
  title: string;
  description: string;
  nodes: SkillNode[];
}> = {
  'Full-Stack': {
    title: 'Full-Stack Developer',
    description: 'Master modular React architectures, serverless Next.js optimization, containerized orchestrations, and high-availability systems.',
    nodes: [
      { name: 'React', x: 100, y: 150, tier: 1, description: 'Declarative component-driven interfaces and reactivity model.', prerequisites: [] },
      { name: 'Next.js', x: 260, y: 80, tier: 2, description: 'Server-Side Rendering, App Router, static optimizations, and edge runtimes.', prerequisites: ['React'], courseId: 'course-1' },
      { name: 'Docker', x: 260, y: 220, tier: 2, description: 'Container deployment structures, file packaging, and environments.', prerequisites: ['React'], courseId: 'course-5' },
      { name: 'Server Actions', x: 440, y: 40, tier: 3, description: 'Zero-API server-side database mutation scope.', prerequisites: ['Next.js'], courseId: 'course-1' },
      { name: 'SSR', x: 440, y: 120, tier: 3, description: 'Server-Side Rendering strategies and dynamic hydrations.', prerequisites: ['Next.js'], courseId: 'course-1' },
      { name: 'Kubernetes', x: 440, y: 220, tier: 3, description: 'Container orchestration, scale triggers, and cluster networking.', prerequisites: ['Docker'], courseId: 'course-5' },
      { name: 'Scalability', x: 620, y: 170, tier: 4, description: 'Traffic load balancing, caching loops, and cluster replication.', prerequisites: ['Kubernetes'], courseId: 'course-5' },
      { name: 'CI/CD', x: 620, y: 270, tier: 4, description: 'Automated test systems, compile validations, and instant pipelines.', prerequisites: ['Kubernetes'], courseId: 'course-5' }
    ]
  },
  'AI Specialist': {
    title: 'AI Engineering Specialist',
    description: 'Unlock vector spaces, master large language models, refine structured prompts, and coordinate Gemini agents.',
    nodes: [
      { name: 'Large Language Models', x: 120, y: 150, tier: 1, description: 'Context windows, transformer architectures, and weights.', prerequisites: [] },
      { name: 'Prompt Engineering', x: 290, y: 150, tier: 2, description: 'Few-shot instructions, system constraints, and JSON schemas.', prerequisites: ['Large Language Models'], courseId: 'course-2' },
      { name: 'Gemini API', x: 480, y: 80, tier: 3, description: 'Google Developer SDK client initialization and streaming queries.', prerequisites: ['Prompt Engineering'], courseId: 'course-2' },
      { name: 'AI Engineering', x: 480, y: 220, tier: 3, description: 'Agent loops, function calling tools, and semantic indexers.', prerequisites: ['Prompt Engineering'], courseId: 'course-2' }
    ]
  },
  'Product Designer': {
    title: 'Product Designer',
    description: 'Bridge semantic typography systems, interactive Auto-Layout layout hierarchies, and high-fidelity Figma components.',
    nodes: [
      { name: 'Typography', x: 120, y: 150, tier: 1, description: 'Font pairings, layout rhythms, line lengths, and weights.', prerequisites: [] },
      { name: 'UI/UX', x: 290, y: 150, tier: 2, description: 'User patterns, click maps, contrast, accessibility, and visual guidelines.', prerequisites: ['Typography'], courseId: 'course-3' },
      { name: 'Figma', x: 480, y: 80, tier: 3, description: 'Vector editing tools, components, variant properties, and styling grids.', prerequisites: ['UI/UX'], courseId: 'course-3' },
      { name: 'Design Systems', x: 480, y: 220, tier: 3, description: 'Dynamic primitive tokens, variable bindings, and code translations.', prerequisites: ['UI/UX'], courseId: 'course-3' }
    ]
  },
  'Product Manager': {
    title: 'Growth Product Manager',
    description: 'Refine self-service signups, construct custom telemetry funnels, run active A/B tests, and orchestrate PLG.',
    nodes: [
      { name: 'A/B Testing', x: 120, y: 150, tier: 1, description: 'Controlled variables, cohort analysis, and statistical significance.', prerequisites: [] },
      { name: 'User Retention', x: 290, y: 150, tier: 2, description: 'Cohort retention loops, activation events, and churn reductions.', prerequisites: ['A/B Testing'], courseId: 'course-4' },
      { name: 'Funnel Analytics', x: 480, y: 80, tier: 3, description: 'Click tracking, drop-off matrices, conversion boundaries, and tracking pixels.', prerequisites: ['User Retention'], courseId: 'course-4' },
      { name: 'PLG', x: 480, y: 220, tier: 3, description: 'Product-led growth, quick time-to-value, and viral activation loops.', prerequisites: ['User Retention'], courseId: 'course-4' }
    ]
  }
};

export const renderSkillIcon = (skill: string) => {
  switch (skill) {
    case 'React':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'Next.js':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 22h20L12 2z" />
          <path d="M12 8l4 8H8l4-8z" strokeWidth="1.5" />
        </svg>
      );
    case 'Docker':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="6" width="6" height="4" rx="1" />
          <rect x="14" y="6" width="6" height="4" rx="1" />
          <rect x="4" y="14" width="6" height="4" rx="1" />
          <rect x="14" y="14" width="6" height="4" rx="1" />
        </svg>
      );
    case 'Server Actions':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case 'SSR':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.5 19A5.5 5.5 0 0 0 18 8.02a9 9 0 0 0-17.61 3.22A5.5 5.5 0 0 0 5.5 22h12a.5.5 0 0 0 0-1z" />
          <path d="M12 12v6M9 15l3 3 3-3" />
        </svg>
      );
    case 'Kubernetes':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
        </svg>
      );
    case 'Scalability':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18" />
          <path d="M7 15l4-4 4 4 5-5M20 9h-4v4" />
        </svg>
      );
    case 'CI/CD':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4z" />
        </svg>
      );
    case 'Large Language Models':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
        </svg>
      );
    case 'Prompt Engineering':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 18V6h16v12H4zm8-6H6v2h6v-2zm6-4h-6v2h6V8z" />
        </svg>
      );
    case 'Gemini API':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6z" />
        </svg>
      );
    case 'AI Engineering':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <path d="M9 9h6v6H9zM9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" />
        </svg>
      );
    case 'Typography':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 7V4h16v3M9 20h6M12 4v16" />
        </svg>
      );
    case 'UI/UX':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'Figma':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 3a3 3 0 1 1 3 3v-3zM9 9a3 3 0 1 1 3 3v-3H9zm6 0a3 3 0 1 1-3-3v3h3zM9 15a3 3 0 1 1 3-3v3H9zm6 0a3 3 0 1 1-3 3v-3h3z" />
        </svg>
      );
    case 'Design Systems':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="8" y="2" width="8" height="6" rx="1" />
          <rect x="2" y="14" width="8" height="6" rx="1" />
          <rect x="14" y="14" width="8" height="6" rx="1" />
          <path d="M12 8v6M6 14v-3h12v3" />
        </svg>
      );
    case 'A/B Testing':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 3h12v3H6zM6 18h12v3H6zM10 6v12M14 6v12" />
        </svg>
      );
    case 'User Retention':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      );
    case 'Funnel Analytics':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 2h20l-8 11v7l-4 2v-9L2 2z" />
        </svg>
      );
    case 'PLG':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 5.5C4 22 6 21 7.5 19.5" />
          <path d="M12 12c-2.5 2.5-4 5.5-4.5 7.5.5.5 1.5.5 2 0 1-1 3.5-3 5.5-5.5L12 12z" />
          <path d="M12 12l5.5-5.5C19.5 4 22 2.5 22 2.5s-1.5 2.5-4 4.5L12 12z" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

export const getPathConnections = (pathName: string) => {
  switch (pathName) {
    case 'Full-Stack':
      return [
        { from: 'React', to: 'Next.js' },
        { from: 'React', to: 'Docker' },
        { from: 'Next.js', to: 'Server Actions' },
        { from: 'Next.js', to: 'SSR' },
        { from: 'Docker', to: 'Kubernetes' },
        { from: 'Kubernetes', to: 'Scalability' },
        { from: 'Kubernetes', to: 'CI/CD' }
      ];
    case 'AI Specialist':
      return [
        { from: 'Large Language Models', to: 'Prompt Engineering' },
        { from: 'Prompt Engineering', to: 'Gemini API' },
        { from: 'Prompt Engineering', to: 'AI Engineering' }
      ];
    case 'Product Designer':
      return [
        { from: 'Typography', to: 'UI/UX' },
        { from: 'UI/UX', to: 'Figma' },
        { from: 'UI/UX', to: 'Design Systems' }
      ];
    case 'Product Manager':
      return [
        { from: 'A/B Testing', to: 'User Retention' },
        { from: 'User Retention', to: 'Funnel Analytics' },
        { from: 'User Retention', to: 'PLG' }
      ];
    default:
      return [];
  }
};

export const GAME_DATA: Record<string, {
  title: string;
  scenario: string;
  correctSequence: string[];
  tips: string;
}> = {
  'DevOps': {
    title: 'Data Center Server Rack Assembly & Orchestration',
    scenario: 'You are setting up a secure container host node in a physical data center. Sort the steps in order of hardware mount, power, wire network, package container code, and finally deploy routing.',
    correctSequence: [
      "Mount raw server chassis in rack unit",
      "Cable redundant power lines (PDUs)",
      "Wire physical optical fiber rails to patch panel",
      "Define multi-stage Dockerfile",
      "Boot container image and verify cluster sync"
    ],
    tips: "Ensure physical hardware mounting and power delivery precede network cabling, which must precede compiling and running containers."
  },
  'AI': {
    title: 'Prompt Shield Context Guardrails',
    scenario: 'Arrange prompt instructions to secure an LLM model against indirect jailbreaks and context leaking. Sort from base rules, safety boundaries, training inputs, filtering filters, and output schemas.',
    correctSequence: [
      "Establish base System Instructions restricting model scope",
      "Add negative constraints prohibiting user system overrides",
      "Provide 3 few-shot examples showing rejected malicious inputs",
      "Parse inputs and run safety classification gates",
      "Enforce strict JSON schema validations on final outputs"
    ],
    tips: "Base system context shapes initial state; override guards must be defined before examples, which are followed by input checking and output structures."
  },
  'Design': {
    title: 'Design System Semantic Token Mapping',
    scenario: 'Sort these mappings from base primitives (colors/sizes) to logical component styling layers.',
    correctSequence: [
      "#0F172A (Primitive dark color) -> --color-bg-primary (Canvas bg)",
      "#4F46E5 (Primitive purple color) -> --color-accent (Action item hover)",
      "1.25rem / 1.75rem (Base typography sizes) -> --font-size-title (Header rhythm)",
      "0.375rem (Base border radius size) -> --radius-button (Interactive elements)",
      "#EF4444 (Primitive feedback color) -> --color-feedback-error (Alert boundaries)"
    ],
    tips: "Sort the design variables from background primitives down to specific action element accents, typography, radius parameters, and error alert indicators."
  },
  'Product': {
    title: 'Product Growth Cohort Optimization',
    scenario: 'Sequence user-onboarding flows to reduce friction and decrease Time-To-Value (TTV). Sort from top funnel discovery down to post-signup retention.',
    correctSequence: [
      "Run A/B testing on landing page headlines",
      "Remove credit-card prompt walls from signup",
      "Instantly display self-service templates (Aha! moment)",
      "Trigger contextual in-app notifications guiding first actions",
      "Deliver usage insight drip emails based on telemetry"
    ],
    tips: "Acquiring users on landing pages must happen before onboarding form simplification, followed by showing direct product value, guides, and finally follow-up emails."
  }
};

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
  onUpdateTargetJob?: (jobId: string | undefined) => void;
  onUpdateSkillLevel?: (skill: string, newLevel: 'Beginner' | 'Intermediate' | 'Pro') => void;
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
  appliedJobIds,
  onUpdateTargetJob,
  onUpdateSkillLevel
}: CandidateWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<'learning' | 'profile' | 'opportunities' | 'roadmaps'>('learning');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState('');
  const [showCertModal, setShowCertModal] = useState<Course | null>(null);

  // Gamified Skill Tree states
  const [selectedPath, setSelectedPath] = useState<'Full-Stack' | 'AI Specialist' | 'Product Designer' | 'Product Manager'>('Full-Stack');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeAssessmentSkill, setActiveAssessmentSkill] = useState<string | null>(null);
  const [assessmentStep, setAssessmentStep] = useState<number>(0);
  const [assessmentSequence, setAssessmentSequence] = useState<string[]>([]);
  const [assessmentSelectedMapping, setAssessmentSelectedMapping] = useState<Record<string, string>>({});
  const [assessmentQuizOption, setAssessmentQuizOption] = useState<number | null>(null);
  const [assessmentCompleted, setAssessmentCompleted] = useState<boolean>(false);
  const [assessmentResult, setAssessmentResult] = useState<{ success: boolean; score: number; level: 'Beginner' | 'Intermediate' | 'Pro' } | null>(null);

  // Search and filter for jobs
  const [jobSearch, setJobSearch] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('All');

  // Interactive project builder form state
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjSkills, setNewProjSkills] = useState('');
  const [newProjLink, setNewProjLink] = useState('');

  // Helper methods for interactive skill tree progression
  const isUnlocked = (nodeName: string) => {
    return candidate.skills.includes(nodeName);
  };

  const isPrereqMet = (node: SkillNode) => {
    if (node.prerequisites.length === 0) return true;
    return node.prerequisites.every(p => candidate.skills.includes(p));
  };

  const getSkillLevel = (nodeName: string) => {
    if (!isUnlocked(nodeName)) return 'Locked';
    return candidate.skillLevels?.[nodeName] || 'Intermediate';
  };

  const startAssessment = (skillName: string) => {
    let category = 'DevOps';
    if (selectedPath === 'AI Specialist') category = 'AI';
    else if (selectedPath === 'Product Designer') category = 'Design';
    else if (selectedPath === 'Product Manager') category = 'Product';

    const baseGame = GAME_DATA[category];
    // Scramble the correct sequence
    const scrambled = [...baseGame.correctSequence].sort(() => Math.random() - 0.5);

    setActiveAssessmentSkill(skillName);
    setAssessmentStep(1);
    setAssessmentSequence(scrambled);
    setAssessmentCompleted(false);
    setAssessmentResult(null);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newSeq = [...assessmentSequence];
    if (direction === 'up' && index > 0) {
      const temp = newSeq[index - 1];
      newSeq[index - 1] = newSeq[index];
      newSeq[index] = temp;
    } else if (direction === 'down' && index < newSeq.length - 1) {
      const temp = newSeq[index + 1];
      newSeq[index + 1] = newSeq[index];
      newSeq[index] = temp;
    }
    setAssessmentSequence(newSeq);
  };

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
            onClick={() => { setActiveTab('roadmaps'); setSelectedCourse(null); }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'roadmaps'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-violet-500" />
            <span>Roadmap Trees</span>
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

      {/* GAME-STYLE ROADMAP TREES TAB PANEL */}
      {activeTab === 'roadmaps' && (
        <div className="space-y-6 animate-fadeIn" id="tab-panels-roadmaps">
          {/* Target Job Tracker Banner */}
          {candidate.targetJobId && (
            (() => {
              const targetJob = jobs.find(j => j.id === candidate.targetJobId);
              if (!targetJob) return null;
              
              const matchScore = calculateMatchScore(targetJob.skillsNeeded);
              const missingSkills = targetJob.skillsNeeded.filter(s => !candidate.skills.includes(s));

              return (
                <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 rounded-2xl p-5 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-indigo-550/30 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Award className="w-48 h-48" />
                  </div>
                  
                  <div className="space-y-1 relative z-10">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-violet-500/30 text-violet-200 border border-violet-500/20 font-bold uppercase tracking-wider font-mono">
                      Pinned Target Goal
                    </span>
                    <h3 className="text-lg font-black tracking-tight">{targetJob.title}</h3>
                    <p className="text-xs text-slate-300 font-medium">At {targetJob.company} • {targetJob.location} • {targetJob.salary}</p>
                    {missingSkills.length > 0 ? (
                      <p className="text-[11px] text-indigo-300 mt-2 font-mono">
                        Missing Skills to Unlock: <span className="font-bold text-white">{missingSkills.join(', ')}</span>
                      </p>
                    ) : (
                      <p className="text-[11px] text-emerald-400 mt-2 font-mono font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> All competency targets unlocked! You have 100% verified fit.
                      </p>
                    )}
                  </div>

                  <div className="text-left md:text-right shrink-0 relative z-10 flex flex-col items-start md:items-end gap-1.5">
                    <span className="text-xs font-mono text-slate-400 uppercase font-semibold">Match score</span>
                    <span className="text-3xl font-black text-emerald-400 leading-none">{matchScore}%</span>
                    <button 
                      onClick={() => {
                        setActiveTab('opportunities');
                        setJobSearch(targetJob.company);
                      }}
                      className="mt-2 text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-all"
                    >
                      View Vacancy Details
                    </button>
                  </div>
                </div>
              );
            })()
          )}

          {/* Core Panel Content */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-slate-100 pb-5 gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Interactive Skill Tree Roadmaps</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-50 text-violet-700 border border-violet-100 font-mono">
                    GAME MODE
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">Select a specialization path to view the competency tree. Verify skills to rise from Beginner to Pro.</p>
              </div>

              {/* Specialization Switcher */}
              <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl">
                {Object.keys(SKILL_TREES).map(key => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedPath(key as any);
                      setHoveredSkill(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedPath === key
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {SKILL_TREES[key].title}
                  </button>
                ))}
              </div>
            </div>

            {/* Path description */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 leading-relaxed font-sans">
              <strong>Specialization:</strong> {SKILL_TREES[selectedPath].description}
            </div>

            {/* Interactive Graph Box */}
            <div className="relative border border-slate-150 rounded-2xl bg-slate-950 p-4 overflow-hidden shadow-inner select-none" style={{ height: '380px' }}>
              {/* Background grid canvas effect */}
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ 
                backgroundImage: 'radial-gradient(circle, #818cf8 1px, transparent 1px)', 
                backgroundSize: '16px 16px' 
              }} />

              {/* The SVG lines rendering layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minWidth: '760px' }}>
                <defs>
                  <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>

                {(() => {
                  const nodes = SKILL_TREES[selectedPath].nodes;
                  const connections = getPathConnections(selectedPath);

                  return connections.map((conn, idx) => {
                    const fromNode = nodes.find(n => n.name === conn.from);
                    const toNode = nodes.find(n => n.name === conn.to);

                    if (!fromNode || !toNode) return null;

                    const startX = fromNode.x;
                    const startY = fromNode.y;
                    const endX = toNode.x;
                    const endY = toNode.y;

                    // Draw a smooth bezier curve connector
                    const d = `M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`;

                    // Determine stroke status
                    const fromUnlocked = candidate.skills.includes(fromNode.name);
                    const toUnlocked = candidate.skills.includes(toNode.name);
                    const isTargetActive = candidate.targetJobId && 
                      (() => {
                        const targetJobObj = jobs.find(j => j.id === candidate.targetJobId);
                        return targetJobObj?.skillsNeeded.includes(toNode.name);
                      })();

                    let strokeColor = '#334155'; // Slate 700 for locked
                    let strokeDash = undefined;
                    let strokeWidth = 1.5;
                    let filter = undefined;

                    if (fromUnlocked && toUnlocked) {
                      strokeColor = 'url(#glow-grad)';
                      strokeWidth = 2.5;
                    } else if (fromUnlocked) {
                      strokeColor = '#6366f1'; // Indigo-500 for available path
                      strokeDash = '4,4';
                      strokeWidth = 2;
                    }

                    if (isTargetActive) {
                      strokeColor = '#d946ef'; // Fuchsia-500 highlighting target path
                      strokeWidth = 3;
                    }

                    return (
                      <path 
                        key={idx}
                        d={d}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray={strokeDash}
                        className={fromUnlocked && toUnlocked ? 'animate-pulse' : undefined}
                      />
                    );
                  });
                })()}
              </svg>

              {/* The interactive node layout layer */}
              <div className="absolute inset-0 overflow-x-auto overflow-y-hidden" style={{ minWidth: '760px' }}>
                <div className="relative w-full h-full">
                  {SKILL_TREES[selectedPath].nodes.map(node => {
                    const isUnlockedNode = candidate.skills.includes(node.name);
                    const prereqMet = isPrereqMet(node);
                    const mastery = getSkillLevel(node.name);
                    
                    const isTargetSkill = candidate.targetJobId && 
                      (() => {
                        const targetJobObj = jobs.find(j => j.id === candidate.targetJobId);
                        return targetJobObj?.skillsNeeded.includes(node.name);
                      })();

                    // Coordinates
                    const style = {
                      position: 'absolute' as const,
                      left: `${node.x}px`,
                      top: `${node.y}px`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 20
                    };

                    // CSS color styles
                    let nodeClass = '';
                    if (isUnlockedNode) {
                      if (mastery === 'Pro') {
                        nodeClass = 'bg-emerald-950 border-2 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-900/30';
                      } else if (mastery === 'Intermediate') {
                        nodeClass = 'bg-indigo-950 border-2 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-900/20';
                      } else {
                        nodeClass = 'bg-slate-900 border-2 border-indigo-400 text-slate-300';
                      }
                    } else if (prereqMet) {
                      nodeClass = 'bg-slate-900 border-2 border-dashed border-slate-600 text-slate-400 hover:border-indigo-400 hover:text-indigo-300 cursor-pointer animate-pulse';
                    } else {
                      nodeClass = 'bg-slate-950 border-2 border-slate-800 text-slate-700 opacity-60 cursor-not-allowed';
                    }

                    if (isTargetSkill) {
                      nodeClass += ' ring-4 ring-pink-500/40 border-pink-500';
                    }

                    return (
                      <div 
                        key={node.name} 
                        style={style}
                        onMouseEnter={() => setHoveredSkill(node.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        onClick={() => {
                          if (prereqMet || isUnlockedNode) {
                            setHoveredSkill(node.name);
                          }
                        }}
                        className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 relative group select-none ${nodeClass}`}
                      >
                        {/* Custom Drawing Inside Node */}
                        {renderSkillIcon(node.name)}

                        {/* Mastery level index badge on the corner */}
                        {isUnlockedNode ? (
                          <span className={`absolute -top-1.5 -right-1.5 text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border font-mono shadow-sm ${
                            mastery === 'Pro' ? 'bg-emerald-500 text-white border-emerald-400' :
                            mastery === 'Intermediate' ? 'bg-indigo-600 text-white border-indigo-400' :
                            'bg-slate-700 text-slate-200 border-slate-600'
                          }`}>
                            {mastery[0]}
                          </span>
                        ) : (
                          <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-slate-800 text-slate-500 border border-slate-700 w-5 h-5 rounded-full flex items-center justify-center">
                            🔒
                          </span>
                        )}

                        {/* Title text below the node */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[10px] font-bold tracking-tight text-slate-400 font-sans group-hover:text-white transition-colors">
                          {node.name}
                        </div>

                        {/* Floating Tooltip Panel (Glassmorphic) */}
                        {hoveredSkill === node.name && (
                          <div 
                            className="absolute bg-slate-900/95 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl text-left text-xs z-50 text-white space-y-3 pointer-events-auto"
                            style={{ 
                              width: '260px', 
                              bottom: node.y < 120 ? 'auto' : '65px',
                              top: node.y < 120 ? '65px' : 'auto',
                              left: '1/2', 
                              transform: 'translateX(-50%)' 
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-extrabold text-sm tracking-tight text-white">{node.name}</h4>
                                <span className="text-[10px] font-semibold text-slate-400 font-mono">Tier {node.tier} • {node.prerequisites.length === 0 ? 'Core competency' : 'Specialized'}</span>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black font-mono border ${
                                mastery === 'Pro' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                                mastery === 'Intermediate' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' :
                                mastery === 'Beginner' ? 'bg-slate-800 text-slate-300 border-slate-700' :
                                'bg-slate-950 text-slate-500 border-slate-800'
                              }`}>
                                {mastery.toUpperCase()}
                              </span>
                            </div>

                            <p className="text-slate-350 text-[11px] leading-relaxed font-sans">{node.description}</p>

                            {node.prerequisites.length > 0 && (
                              <div className="text-[10px] text-slate-400 font-mono">
                                <strong>Requires:</strong> {node.prerequisites.join(', ')}
                              </div>
                            )}

                            {/* Verification Path CTAs inside tooltip */}
                            <div className="pt-2 border-t border-slate-800 flex flex-col gap-1.5">
                              {isUnlockedNode ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startAssessment(node.name);
                                  }}
                                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 rounded-lg text-[10px] text-center transition-all shadow-sm"
                                >
                                  {mastery === 'Pro' ? 'Verify Level Again' : 'Challenge AI Sandbox (Level Up)'}
                                </button>
                              ) : prereqMet ? (
                                <div className="space-y-1.5">
                                  {node.courseId ? (
                                    (() => {
                                      const relatedCourse = courses.find(c => c.id === node.courseId);
                                      if (relatedCourse) {
                                        return (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setActiveTab('learning');
                                              handleStartCourse(relatedCourse);
                                            }}
                                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-1.5 rounded-lg text-[10px] text-center transition-all"
                                          >
                                            Enroll: {relatedCourse.title} 🎓
                                          </button>
                                        );
                                      }
                                      return null;
                                    })()
                                  ) : (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        startAssessment(node.name);
                                      }}
                                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-1.5 rounded-lg text-[10px] text-center transition-all"
                                    >
                                      Run AI Assessment Sandbox
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <div className="text-[10px] text-rose-400 font-semibold font-mono text-center bg-rose-500/10 p-1.5 rounded border border-rose-500/20">
                                  🔒 Previous nodes locked
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GAME-STYLE INTERACTIVE AI SANDBOX ASSESSMENT MODAL */}
      <AnimatePresence>
        {activeAssessmentSkill && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4" id="ai-sandbox-modal">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-750 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Console Top */}
              <div className="bg-slate-950 px-6 py-4 flex items-center justify-between border-b border-slate-800 font-mono text-xs">
                <div className="flex items-center space-x-2.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-bold tracking-wider">CAREEROS SECURE EVALUATION SYSTEM // {activeAssessmentSkill.toUpperCase()}</span>
                </div>
                <button
                  onClick={() => setActiveAssessmentSkill(null)}
                  className="text-slate-500 hover:text-white transition-all font-bold hover:scale-105"
                >
                  [QUIT]
                </button>
              </div>

              {/* Step 1: Game Description / Scenario */}
              {assessmentStep === 1 && (
                (() => {
                  let category = 'DevOps';
                  if (selectedPath === 'AI Specialist') category = 'AI';
                  else if (selectedPath === 'Product Designer') category = 'Design';
                  else if (selectedPath === 'Product Manager') category = 'Product';

                  const game = GAME_DATA[category];

                  return (
                    <div className="p-6 space-y-6 overflow-y-auto">
                      <div className="space-y-2">
                        <span className="text-[10px] text-violet-400 font-bold uppercase tracking-wider font-mono">Consensus Sandbox Challenge</span>
                        <h3 className="text-lg font-black text-white">{game.title}</h3>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">{game.scenario}</p>
                      </div>

                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-300 leading-relaxed">
                        <p className="font-bold text-white mb-1">🤖 AI Sandbox Guidelines:</p>
                        <p>1. We will present you with 5 core procedures in scrambled order.</p>
                        <p>2. Arrange them in the correct sequence to build the target pipeline architecture.</p>
                        <p>3. Submit to the AI evaluator nodes to grade your master level (Pro, Intermediate, Beginner).</p>
                      </div>

                      <div className="pt-4 border-t border-slate-800 flex gap-2">
                        <button
                          onClick={() => setAssessmentStep(2)}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-xs text-center transition-all shadow-md"
                        >
                          Initialize Diagnostic Sandbox Engine
                        </button>
                      </div>
                    </div>
                  );
                })()
              )}

              {/* Step 2: Interactive Sandbox Sorting Game */}
              {assessmentStep === 2 && (
                (() => {
                  let category = 'DevOps';
                  if (selectedPath === 'AI Specialist') category = 'AI';
                  else if (selectedPath === 'Product Designer') category = 'Design';
                  else if (selectedPath === 'Product Manager') category = 'Product';

                  const game = GAME_DATA[category];

                  return (
                    <div className="p-6 space-y-5 flex-1 flex flex-col justify-between overflow-y-auto">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <span className="text-[10px] text-violet-400 font-bold uppercase tracking-wider font-mono">STAGE 2 // SEQUENCE OPTIMIZATION</span>
                          <h4 className="text-xs font-extrabold text-white">Arrange steps in correct sequence from top to bottom:</h4>
                        </div>

                        {/* Interactive List with Up/Down triggers */}
                        <div className="space-y-2 font-sans">
                          {assessmentSequence.map((item, idx) => (
                            <div 
                              key={idx} 
                              className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs text-white"
                            >
                              <div className="flex items-center gap-3 pr-2">
                                <span className="font-mono text-[10px] text-emerald-500 bg-emerald-950/40 w-5 h-5 rounded-full flex items-center justify-center border border-emerald-900/30">
                                  {idx + 1}
                                </span>
                                <span className="font-semibold text-slate-200 text-[11px] leading-snug">{item}</span>
                              </div>

                              {/* Ordering Actions */}
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => moveItem(idx, 'up')}
                                  disabled={idx === 0}
                                  className={`w-6 h-6 rounded flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-[10px] font-bold border border-slate-750 transition-all ${
                                    idx === 0 ? 'text-slate-700 opacity-30 cursor-not-allowed' : 'text-slate-300'
                                  }`}
                                  title="Move Up"
                                >
                                  ▲
                                </button>
                                <button
                                  onClick={() => moveItem(idx, 'down')}
                                  disabled={idx === assessmentSequence.length - 1}
                                  className={`w-6 h-6 rounded flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-[10px] font-bold border border-slate-750 transition-all ${
                                    idx === assessmentSequence.length - 1 ? 'text-slate-700 opacity-30 cursor-not-allowed' : 'text-slate-300'
                                  }`}
                                  title="Move Down"
                                >
                                  ▼
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {game.tips && (
                          <p className="text-[10px] font-mono text-slate-500 leading-normal bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40">
                            💡 <strong>Hint:</strong> {game.tips}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-slate-850 flex gap-2">
                        <button
                          onClick={() => {
                            // Calculate Score
                            const correctSeq = game.correctSequence;
                            let matches = 0;
                            assessmentSequence.forEach((item, index) => {
                              if (item === correctSeq[index]) {
                                matches++;
                              }
                            });

                            let level: 'Beginner' | 'Intermediate' | 'Pro' = 'Beginner';
                            let success = false;
                            if (matches === 5) {
                              level = 'Pro';
                              success = true;
                            } else if (matches === 4) {
                              level = 'Intermediate';
                              success = true;
                            } else if (matches >= 3) {
                              level = 'Beginner';
                              success = true;
                            }

                            setAssessmentResult({ success, score: Math.round((matches / 5) * 100), level });
                            setAssessmentStep(3); // Loading analysis screen
                            
                            // Simulate AI node analysis latency
                            setTimeout(() => {
                              setAssessmentStep(4); // Show final result
                            }, 2000);
                          }}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs text-center transition-all shadow-md shadow-emerald-950/20"
                        >
                          Submit Setup to AI Evaluator Consensus
                        </button>
                      </div>
                    </div>
                  );
                })()
              )}

              {/* Step 3: Loading AI Simulation / Diagnostics */}
              {assessmentStep === 3 && (
                <div className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <div className="space-y-2">
                    <h3 className="text-base font-extrabold text-white font-mono">Running Real-Time Evaluation Diagnostics</h3>
                    <p className="text-xs text-slate-400 font-mono">AI consensus analyzing sequence correctness matrices...</p>
                  </div>
                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl text-left font-mono text-[10px] text-slate-400 space-y-1">
                    <p className="text-emerald-400">⚡ INITIALIZING NETWORK COMPILE CHECK...</p>
                    <p className="text-emerald-400">⚡ VERIFYING GRAPH DEPENDENCIES...</p>
                    <p className="text-yellow-400">⚡ COMPARATIVE INDEX ALIGNMENT: PENDING SECURE VERIFY...</p>
                  </div>
                </div>
              )}

              {/* Step 4: Final Assessment Results & Level Claims */}
              {assessmentStep === 4 && assessmentResult && (
                <div className="p-6 space-y-6 overflow-y-auto">
                  <div className="text-center space-y-4">
                    {assessmentResult.success ? (
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto text-2xl font-black">
                        ✓
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500 text-rose-400 flex items-center justify-center mx-auto text-2xl font-black">
                        ✗
                      </div>
                    )}

                    <div>
                      <span className="text-[10px] font-mono text-violet-400 font-extrabold uppercase tracking-widest bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                        DIAGNOSTIC COMPLETED
                      </span>
                      <h3 className="text-2xl font-black text-white mt-3">Evaluation Results</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Consensus nodes completed analysis on sequence layout alignment.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                      <span className="text-xs text-slate-400 font-mono">Evaluator Score</span>
                      <span className="text-lg font-black text-white font-mono">{assessmentResult.score}% Correct</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-mono">Assessed Mastery Rating</span>
                      <span className={`px-2.5 py-1 rounded text-xs font-black font-mono border ${
                        assessmentResult.success 
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                      }`}>
                        {assessmentResult.success ? assessmentResult.level.toUpperCase() : 'FAILED'}
                      </span>
                    </div>

                    {assessmentResult.success ? (
                      <p className="text-[11px] text-slate-400 leading-normal pt-2 font-sans text-center">
                        This rating will be securely cryptographically stamped on your candidate file and published live to search algorithms.
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-400 leading-normal pt-2 font-sans text-center">
                        Validation score was below standard threshold bounds. Take a look at the study materials and retry again!
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {assessmentResult.success ? (
                      <button
                        onClick={() => {
                          onUpdateSkillLevel?.(activeAssessmentSkill, assessmentResult.level);
                          setActiveAssessmentSkill(null);
                        }}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs text-center transition-all"
                      >
                        Claim Verified {assessmentResult.level} Mastery Badge 🏆
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setAssessmentStep(2);
                          setAssessmentResult(null);
                        }}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-xs text-center transition-all"
                      >
                        Retry Challenge Sandbox
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
                        <div className="flex flex-col gap-2 w-full lg:w-auto">
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
                          
                          {candidate.targetJobId === job.id ? (
                            <button
                              onClick={() => onUpdateTargetJob?.(undefined)}
                              className="py-1.5 px-4 rounded-lg border border-violet-200 text-violet-700 bg-violet-50 hover:bg-violet-100 font-bold text-[11px] transition-all flex items-center justify-center gap-1"
                            >
                              Following Path 🎯
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                onUpdateTargetJob?.(job.id);
                                if (job.skillsNeeded.includes('Gemini API') || job.skillsNeeded.includes('AI Engineering')) {
                                  setSelectedPath('AI Specialist');
                                } else if (job.skillsNeeded.includes('Next.js') || job.skillsNeeded.includes('Server Actions')) {
                                  setSelectedPath('Full-Stack');
                                } else if (job.skillsNeeded.includes('Figma') || job.skillsNeeded.includes('Design Systems')) {
                                  setSelectedPath('Product Designer');
                                } else if (job.skillsNeeded.includes('PLG') || job.skillsNeeded.includes('User Retention')) {
                                  setSelectedPath('Product Manager');
                                }
                              }}
                              className="py-1.5 px-4 rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 font-bold text-[11px] transition-all flex items-center justify-center gap-1"
                            >
                              Follow Skill Path 🎯
                            </button>
                          )}
                        </div>
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
