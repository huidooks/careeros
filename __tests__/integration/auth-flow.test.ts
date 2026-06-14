import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * Integration tests for the Supabase mock auth layer.
 *
 * The app ships with a localStorage-based mock client that supports
 * demo accounts. These tests validate the auth contract that the
 * rest of the app relies on (signInWithPassword, signUp, signOut, getUser).
 */

// We need to mock `window.localStorage` since jsdom provides it but
// we want a clean slate per test.
function clearAuthStorage() {
  localStorage.removeItem('co_current_user_email');
  localStorage.removeItem('co_current_user_role');
  localStorage.removeItem('co_current_user_name');
  localStorage.removeItem('co_current_user_id');
  localStorage.removeItem('co_mock_users');
}

// Dynamic import so localStorage mocking works before module init
async function getSupabase() {
  // Reset module cache so each test gets a fresh supabase client
  vi.resetModules();
  // Force the mock path by ensuring env vars are NOT set
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '');
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', '');
  const mod = await import('@/lib/supabase');
  return mod.supabase;
}

describe('Auth Flow — Mock Supabase Client', () => {
  beforeEach(() => {
    clearAuthStorage();
  });

  describe('signInWithPassword', () => {
    it('authenticates the demo candidate account', async () => {
      const supabase = await getSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'candidate@careeros.my',
        password: 'password',
      });

      expect(error).toBeNull();
      expect(data.user).toBeDefined();
      expect(data.user.email).toBe('candidate@careeros.my');
      expect(data.user.user_metadata.role).toBe('candidate');
      expect(data.user.user_metadata.name).toBe('Khor Ming Yao');
    });

    it('authenticates the demo recruiter account', async () => {
      const supabase = await getSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'recruiter@maybank.my',
        password: 'password',
      });

      expect(error).toBeNull();
      expect(data.user).toBeDefined();
      expect(data.user.email).toBe('recruiter@maybank.my');
      expect(data.user.user_metadata.role).toBe('recruiter');
      expect(data.user.user_metadata.name).toBe('Teh Meng Chang');
    });

    it('rejects invalid credentials with an error message', async () => {
      const supabase = await getSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'wrong@email.com',
        password: 'wrongpassword',
      });

      expect(data.user).toBeNull();
      expect(error).toBeDefined();
      expect(error.message).toContain('Invalid login credentials');
    });

    it('persists user session in localStorage after login', async () => {
      const supabase = await getSupabase();
      await supabase.auth.signInWithPassword({
        email: 'candidate@careeros.my',
        password: 'password',
      });

      expect(localStorage.getItem('co_current_user_email')).toBe('candidate@careeros.my');
      expect(localStorage.getItem('co_current_user_role')).toBe('candidate');
      expect(localStorage.getItem('co_current_user_name')).toBe('Khor Ming Yao');
    });
  });

  describe('signUp', () => {
    it('creates a new candidate user', async () => {
      const supabase = await getSupabase();
      const { data, error } = await supabase.auth.signUp({
        email: 'newuser@test.com',
        password: 'testpass123',
        options: {
          data: { role: 'candidate', name: 'New Test User' },
        },
      });

      expect(error).toBeNull();
      expect(data.user).toBeDefined();
      expect(data.user.email).toBe('newuser@test.com');
      expect(data.user.user_metadata.role).toBe('candidate');
      expect(data.user.user_metadata.name).toBe('New Test User');
    });

    it('creates a new recruiter user', async () => {
      const supabase = await getSupabase();
      const { data, error } = await supabase.auth.signUp({
        email: 'recruiter@newcorp.com',
        password: 'recruitpass',
        options: {
          data: { role: 'recruiter', name: 'Recruiter User' },
        },
      });

      expect(error).toBeNull();
      expect(data.user.user_metadata.role).toBe('recruiter');
    });

    it('allows login with newly signed up credentials', async () => {
      const supabase = await getSupabase();
      // Sign up
      await supabase.auth.signUp({
        email: 'logintest@test.com',
        password: 'mypass',
        options: {
          data: { role: 'candidate', name: 'Login Test' },
        },
      });

      // Sign out first
      await supabase.auth.signOut();

      // Now login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'logintest@test.com',
        password: 'mypass',
      });

      expect(error).toBeNull();
      expect(data.user).toBeDefined();
      expect(data.user.email).toBe('logintest@test.com');
    });
  });

  describe('signOut', () => {
    it('clears the session from localStorage', async () => {
      const supabase = await getSupabase();
      // Login first
      await supabase.auth.signInWithPassword({
        email: 'candidate@careeros.my',
        password: 'password',
      });

      // Verify session exists
      expect(localStorage.getItem('co_current_user_email')).toBe('candidate@careeros.my');

      // Sign out
      await supabase.auth.signOut();

      // Session should be cleared
      expect(localStorage.getItem('co_current_user_email')).toBeNull();
      expect(localStorage.getItem('co_current_user_role')).toBeNull();
      expect(localStorage.getItem('co_current_user_name')).toBeNull();
      expect(localStorage.getItem('co_current_user_id')).toBeNull();
    });
  });

  describe('getUser', () => {
    it('returns null when no user is logged in', async () => {
      const supabase = await getSupabase();
      const { data } = await supabase.auth.getUser();
      expect(data.user).toBeNull();
    });

    it('returns the current user after login', async () => {
      const supabase = await getSupabase();
      await supabase.auth.signInWithPassword({
        email: 'recruiter@maybank.my',
        password: 'password',
      });

      const { data } = await supabase.auth.getUser();
      expect(data.user).toBeDefined();
      expect(data.user.email).toBe('recruiter@maybank.my');
      expect(data.user.user_metadata.role).toBe('recruiter');
    });
  });
});
