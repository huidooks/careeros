import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import SharedMarketplace from '@/components/SharedMarketplace';
import type { Candidate, Job, Course, CourseRequest } from '@/lib/types';

// Mock lucide-react — must explicitly list every icon imported by SharedMarketplace
vi.mock('lucide-react', () => {
  const createIcon = (name: string) =>
    function MockIcon(props: any) {
      return React.createElement('span', { 'data-testid': `icon-${name}`, ...props });
    };
  return {
    Sparkles: createIcon('Sparkles'),
    Briefcase: createIcon('Briefcase'),
    Award: createIcon('Award'),
    User: createIcon('User'),
    ArrowRight: createIcon('ArrowRight'),
    MapPin: createIcon('MapPin'),
    DollarSign: createIcon('DollarSign'),
    Check: createIcon('Check'),
    Building2: createIcon('Building2'),
    Layers: createIcon('Layers'),
    TrendingUp: createIcon('TrendingUp'),
    CheckCircle2: createIcon('CheckCircle2'),
    ShieldCheck: createIcon('ShieldCheck'),
    CornerDownRight: createIcon('CornerDownRight'),
    Zap: createIcon('Zap'),
    BookOpen: createIcon('BookOpen'),
    ChevronRight: createIcon('ChevronRight'),
  };
});

// Mock motion/react to pass through children
vi.mock('motion/react', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop) => {
        return React.forwardRef((props: any, ref: any) => {
          const { initial, animate, exit, whileHover, whileTap, ...rest } = props;
          return React.createElement(prop as string, { ...rest, ref });
        });
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}));

const mockCandidates: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Test Candidate',
    title: 'Developer',
    bio: 'A great developer',
    avatar: 'https://example.com/avatar.jpg',
    email: 'test@example.com',
    completedCourseIds: ['course-1'],
    skills: ['React', 'TypeScript'],
    projects: [],
    status: 'Open for Offers',
  },
];

const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Frontend Developer',
    company: 'TestCorp',
    logo: '⚡',
    description: 'Build things',
    skillsNeeded: ['React', 'TypeScript'],
    salary: '$100k',
    type: 'Full-time',
    location: 'Remote',
    datePosted: 'Just now',
    applicantsCount: 2,
  },
];

const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'React Basics',
    category: 'Engineering',
    description: 'Learn React',
    duration: '4 hours',
    skillsGranted: ['React'],
    enrolled: false,
    completed: false,
    progress: 0,
    lessons: [{ id: 'l1', title: 'Intro', content: 'Hello' }],
  },
];

const mockRequests: CourseRequest[] = [];

describe('SharedMarketplace Component', () => {
  const defaultProps = {
    candidates: mockCandidates,
    jobs: mockJobs,
    courses: mockCourses,
    appliedJobIds: [] as string[],
    courseRequests: mockRequests,
    onSwitchToCandidate: vi.fn(),
    onSwitchToRecruiter: vi.fn(),
  };

  it('renders the hero section with marketplace title', () => {
    render(<SharedMarketplace {...defaultProps} />);
    expect(
      screen.getByText(/where upskilling path meets recruiter target demand/i)
    ).toBeInTheDocument();
  });

  it('renders candidate cards', () => {
    render(<SharedMarketplace {...defaultProps} />);
    expect(screen.getByText('Test Candidate')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  it('renders job cards', () => {
    render(<SharedMarketplace {...defaultProps} />);
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('TestCorp')).toBeInTheDocument();
  });

  it('renders filter tabs', () => {
    render(<SharedMarketplace {...defaultProps} />);
    expect(screen.getByText('Unified Feed')).toBeInTheDocument();
    expect(screen.getByText('Talent Pool')).toBeInTheDocument();
    expect(screen.getByText('Job Listed')).toBeInTheDocument();
  });

  it('filters to show only talent when Talent Pool tab is clicked', () => {
    render(<SharedMarketplace {...defaultProps} />);
    fireEvent.click(screen.getByText('Talent Pool'));
    // Candidate should still be visible
    expect(screen.getByText('Test Candidate')).toBeInTheDocument();
    // Job section label should not be rendered when talent-only view
    expect(
      screen.queryByText('✦ Active Market Vacancy Listings')
    ).not.toBeInTheDocument();
  });

  it('filters to show only jobs when Job Listed tab is clicked', () => {
    render(<SharedMarketplace {...defaultProps} />);
    fireEvent.click(screen.getByText('Job Listed'));
    // Job should still be visible
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    // Talent section label should not be rendered
    expect(
      screen.queryByText('✦ Live Verified Candidate Talent Pool')
    ).not.toBeInTheDocument();
  });

  it('renders candidate verified skills', () => {
    render(<SharedMarketplace {...defaultProps} />);
    // Skills appear in both candidate cards and job skill tags, so use getAllByText
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThanOrEqual(1);
  });

  it('calls onSwitchToCandidate when Explore Career Path is clicked', () => {
    const onSwitchToCandidate = vi.fn();
    render(
      <SharedMarketplace {...defaultProps} onSwitchToCandidate={onSwitchToCandidate} />
    );
    const exploreBtn = screen.getByText('Explore Career Path');
    fireEvent.click(exploreBtn);
    expect(onSwitchToCandidate).toHaveBeenCalledTimes(1);
  });

  it('calls onSwitchToRecruiter when Evaluate Candidate Fit is clicked', () => {
    const onSwitchToRecruiter = vi.fn();
    render(
      <SharedMarketplace {...defaultProps} onSwitchToRecruiter={onSwitchToRecruiter} />
    );
    const evaluateBtn = screen.getByText('Evaluate Candidate Fit');
    fireEvent.click(evaluateBtn);
    expect(onSwitchToRecruiter).toHaveBeenCalledTimes(1);
  });

  it('renders activity timeline with seeded events', () => {
    render(<SharedMarketplace {...defaultProps} />);
    expect(screen.getByText('Live Consortium Action Ticker')).toBeInTheDocument();
  });
});
