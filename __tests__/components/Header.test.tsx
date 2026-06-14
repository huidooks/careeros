import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Header from '@/components/Header';

// Minimal mock for lucide-react icons to avoid SVG rendering issues in jsdom
vi.mock('lucide-react', () => {
  const createIcon = (name: string) =>
    function MockIcon(props: any) {
      return React.createElement('span', { 'data-testid': `icon-${name}`, ...props });
    };
  return {
    Layers: createIcon('Layers'),
    User: createIcon('User'),
    Building2: createIcon('Building2'),
    Eye: createIcon('Eye'),
    Award: createIcon('Award'),
    Briefcase: createIcon('Briefcase'),
    LogOut: createIcon('LogOut'),
  };
});

describe('Header Component', () => {
  const defaultProps = {
    currentPersona: 'candidate' as const,
    setPersona: vi.fn(),
    candidateCompletedCount: 3,
    totalJobsCount: 7,
    userName: 'Alex Carter',
    onLogout: vi.fn(),
    userRole: 'candidate' as const,
  };

  it('renders the CareerOS brand name', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('CareerOS')).toBeInTheDocument();
  });

  it('displays the verified certs count', () => {
    render(<Header {...defaultProps} candidateCompletedCount={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Verified Certs')).toBeInTheDocument();
  });

  it('displays the market opportunities count', () => {
    render(<Header {...defaultProps} totalJobsCount={12} />);
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Market Opportunities')).toBeInTheDocument();
  });

  it('displays the user name when provided', () => {
    render(<Header {...defaultProps} userName="Meera Patel" />);
    expect(screen.getByText('Meera Patel')).toBeInTheDocument();
  });

  it('shows Candidate View button for candidate role', () => {
    render(<Header {...defaultProps} userRole="candidate" />);
    expect(screen.getByText('Candidate View')).toBeInTheDocument();
  });

  it('shows Recruiter View button for recruiter role', () => {
    render(<Header {...defaultProps} userRole="recruiter" currentPersona="recruiter" />);
    expect(screen.getByText('Recruiter View')).toBeInTheDocument();
  });

  it('hides Recruiter View button when role is candidate', () => {
    render(<Header {...defaultProps} userRole="candidate" />);
    expect(screen.queryByText('Recruiter View')).not.toBeInTheDocument();
  });

  it('hides Candidate View button when role is recruiter', () => {
    render(<Header {...defaultProps} userRole="recruiter" currentPersona="recruiter" />);
    expect(screen.queryByText('Candidate View')).not.toBeInTheDocument();
  });

  it('calls onLogout when logout button is clicked', () => {
    const onLogout = vi.fn();
    render(<Header {...defaultProps} onLogout={onLogout} />);
    const logoutBtn = screen.getByTitle('Sign Out');
    fireEvent.click(logoutBtn);
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it('calls setPersona when switching persona', () => {
    const setPersona = vi.fn();
    render(<Header {...defaultProps} setPersona={setPersona} userRole="candidate" />);
    const candidateBtn = screen.getByText('Candidate View');
    fireEvent.click(candidateBtn);
    expect(setPersona).toHaveBeenCalledWith('candidate');
  });
});
