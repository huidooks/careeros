import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabaseClient;

const isRealSupabaseConfigured = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'your-supabase-url' && 
  supabaseUrl !== '' &&
  supabaseAnonKey !== 'your-supabase-anon-key' &&
  supabaseAnonKey !== '';

if (isRealSupabaseConfigured) {
  const realClient = createClient(supabaseUrl, supabaseAnonKey)
  
  // Wrap auth logic to support offline/local fallback for sandbox demo accounts
  const realSignIn = realClient.auth.signInWithPassword.bind(realClient.auth);
  realClient.auth.signInWithPassword = async ({ email, password }) => {
    if (email === 'candidate@careeros.my' && password === 'password') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('co_current_user_email', email);
        localStorage.setItem('co_current_user_role', 'candidate');
        localStorage.setItem('co_current_user_name', 'Khor Ming Yao');
        localStorage.setItem('co_current_user_id', 'mock-candidate-1');
      }
      return {
        data: {
          user: {
            id: 'mock-candidate-1',
            email,
            user_metadata: { role: 'candidate', name: 'Khor Ming Yao' }
          }
        },
        error: null
      };
    } else if (email === 'recruiter@maybank.my' && password === 'password') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('co_current_user_email', email);
        localStorage.setItem('co_current_user_role', 'recruiter');
        localStorage.setItem('co_current_user_name', 'Teh Meng Chang');
        localStorage.setItem('co_current_user_id', 'mock-recruiter-1');
      }
      return {
        data: {
          user: {
            id: 'mock-recruiter-1',
            email,
            user_metadata: { role: 'recruiter', name: 'Teh Meng Chang' }
          }
        },
        error: null
      };
    }

    const res = await realSignIn({ email, password });
    if (res.data?.user) {
      localStorage.setItem('co_current_user_email', res.data.user.email || '');
      localStorage.setItem('co_current_user_role', res.data.user.user_metadata?.role || 'candidate');
      localStorage.setItem('co_current_user_name', res.data.user.user_metadata?.name || 'User');
      localStorage.setItem('co_current_user_id', res.data.user.id);
    }
    return res;
  };

  const realGetUser = realClient.auth.getUser.bind(realClient.auth);
  realClient.auth.getUser = async () => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('co_current_user_email');
      const id = localStorage.getItem('co_current_user_id');
      if (email && (id === 'mock-candidate-1' || id === 'mock-recruiter-1')) {
        const role = localStorage.getItem('co_current_user_role') || 'candidate';
        const name = localStorage.getItem('co_current_user_name') || 'Khor Ming Yao';
        return {
          data: {
            user: {
              id,
              email,
              user_metadata: { role, name }
            }
          },
          error: null
        };
      }
    }

    const res = await realGetUser();
    if (res.data?.user) {
      localStorage.setItem('co_current_user_email', res.data.user.email || '');
      localStorage.setItem('co_current_user_role', res.data.user.user_metadata?.role || 'candidate');
      localStorage.setItem('co_current_user_name', res.data.user.user_metadata?.name || 'User');
      localStorage.setItem('co_current_user_id', res.data.user.id);
    }
    return res;
  };

  const realSignOut = realClient.auth.signOut.bind(realClient.auth);
  realClient.auth.signOut = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('co_current_user_email');
      localStorage.removeItem('co_current_user_role');
      localStorage.removeItem('co_current_user_name');
      localStorage.removeItem('co_current_user_id');
    }
    return await realSignOut();
  };

  const realSignUp = realClient.auth.signUp.bind(realClient.auth);
  realClient.auth.signUp = async ({ email, password, options }) => {
    const res = await realSignUp({ email, password, options });
    if (res.data?.user) {
      localStorage.setItem('co_current_user_email', res.data.user.email || '');
      localStorage.setItem('co_current_user_role', res.data.user.user_metadata?.role || 'candidate');
      localStorage.setItem('co_current_user_name', res.data.user.user_metadata?.name || 'User');
      localStorage.setItem('co_current_user_id', res.data.user.id);
    }
    return res;
  };

  supabaseClient = realClient;
} else {
  // Setup Mock LocalStorage Database for Offline Testing / Demo
  const initDb = () => {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem('co_courses')) {
      localStorage.setItem('co_courses', JSON.stringify([
        { id: '1', title: 'React Essentials & State Management', description: 'Master React 19 fundamentals, functional components, hooks (useState, useEffect, useMemo), and clean data flow.', duration: '1 week', skills: ['React', 'JavaScript', 'State Management'] },
        { id: '2', title: 'Next.js 16 App Router & Rendering', description: 'Deep dive into server components, static/dynamic rendering, route handlers, layouts, and data fetching conventions.', duration: '2 weeks', skills: ['Next.js', 'React', 'Routing'] },
        { id: '3', title: 'Tailwind CSS v4 Modern Styling', description: 'Build premium glassmorphic, responsive, and dark-mode compatible UIs using Tailwind CSS utility classes.', duration: '1 week', skills: ['Tailwind CSS', 'CSS', 'UI/UX Design'] },
        { id: '4', title: 'TypeScript for Production App Dev', description: 'Implement strict type-safety, custom interfaces, generics, and compile-time validation in frontend projects.', duration: '1 week', skills: ['TypeScript', 'JavaScript'] },
        { id: '5', title: 'Supabase Database & API Integration', description: 'Learn real-time sync, database schemas, Row Level Security (RLS) policies, and OAuth auth flows with Supabase.', duration: '1 week', skills: ['Supabase', 'SQL', 'APIs'] }
      ]));
    }

    if (!localStorage.getItem('co_jobs')) {
      localStorage.setItem('co_jobs', JSON.stringify([
        { id: 'job-1', title: 'Junior Web Developer (React)', company: 'Maybank', description: 'We are seeking a React developer to join our digital banking team to build clean customer-facing dashboards. Strong knowledge of CSS styling and state management is required.', skills: ['React', 'JavaScript', 'State Management'], created_at: new Date().toISOString() },
        { id: 'job-2', title: 'Next.js Systems Engineer', company: 'Petronas Digital', description: 'Help us build internal enterprise tools using Next.js. Experience with database optimization and type-safe development is highly valued.', skills: ['Next.js', 'TypeScript', 'Supabase'], created_at: new Date().toISOString() }
      ]));
    }

    if (!localStorage.getItem('co_enrollments')) {
      localStorage.setItem('co_enrollments', JSON.stringify([]));
    }

    if (!localStorage.getItem('co_course_requests')) {
      localStorage.setItem('co_course_requests', JSON.stringify([]));
    }

    if (!localStorage.getItem('co_user_projects')) {
      localStorage.setItem('co_user_projects', JSON.stringify([
        { id: 'proj-1', title: 'Personal E-Commerce Dashboard', description: 'A sleek retail dashboard built with React and Tailwind showing sales trends.', skills: ['React', 'Tailwind CSS'], evidenceUrl: '#' }
      ]));
    }

    if (!localStorage.getItem('co_candidates')) {
      localStorage.setItem('co_candidates', JSON.stringify([
        { id: 'cand-1', name: 'Desmond Ooi', title: 'Frontend Developer', skills: ['React', 'Tailwind CSS', 'JavaScript'], projects: [{ title: 'Glassmorphic Music Player', description: 'A sleek music app UI with fluid CSS animations.' }] },
        { id: 'cand-2', name: 'Yan Hui', title: 'Fullstack Engineer', skills: ['Next.js', 'TypeScript', 'Supabase'], projects: [{ title: 'Task Orchestrator API', description: 'A serverless cron runner built on Next.js edge functions.' }] }
      ]));
    }

    if (!localStorage.getItem('co_current_user_role')) {
      localStorage.setItem('co_current_user_role', 'candidate');
    }
  };

  initDb();

  // Mock Query Builder Class to simulate Supabase calls
  class MockQueryBuilder {
    constructor(tableName) {
      this.tableName = `co_${tableName}`;
      this.filters = [];
      this.isSingle = false;
      this.sortCol = null;
      this.sortAsc = true;
    }

    select(fields = '*') {
      return this;
    }

    eq(column, value) {
      this.filters.push({ column, value, type: 'eq' });
      return this;
    }

    order(column, { ascending = true } = {}) {
      this.sortCol = column;
      this.sortAsc = ascending;
      return this;
    }

    single() {
      this.isSingle = true;
      return this;
    }

    then(onfulfilled, onrejected) {
      const promise = (async () => {
        if (typeof window === 'undefined') {
          return { data: this.isSingle ? null : [], error: null };
        }

        let data = JSON.parse(localStorage.getItem(this.tableName) || '[]');

        // Apply filters
        for (const filter of this.filters) {
          if (filter.type === 'eq') {
            if (filter.column === 'user_id' || filter.column === 'recruiter_id' || filter.column === 'course_id' || filter.column === 'id') {
              data = data.filter(item => String(item[filter.column]) === String(filter.value));
            }
          }
        }

        // Populate courses relation if table is course_requests or enrollments
        if (this.tableName === 'co_course_requests' || this.tableName === 'co_enrollments') {
          const courses = JSON.parse(localStorage.getItem('co_courses') || '[]');
          data = data.map(item => {
            const course = courses.find(c => String(c.id) === String(item.course_id));
            return {
              ...item,
              courses: course ? { title: course.title } : null
            };
          });
        }

        // Sort
        if (this.sortCol) {
          data.sort((a, b) => {
            const valA = a[this.sortCol];
            const valB = b[this.sortCol];
            if (valA < valB) return this.sortAsc ? -1 : 1;
            if (valA > valB) return this.sortAsc ? 1 : -1;
            return 0;
          });
        }

        let result = data;
        if (this.isSingle) {
          result = data.length > 0 ? data[0] : null;
        }

        return { data: result, error: null };
      })();

      return promise.then(onfulfilled, onrejected);
    }

    async insert(newData) {
      if (typeof window === 'undefined') return { data: null, error: null };
      const data = JSON.parse(localStorage.getItem(this.tableName) || '[]');
      
      const toInsert = Array.isArray(newData) ? newData : [newData];
      const inserted = toInsert.map((item, idx) => ({
        id: String(Date.now() + idx),
        created_at: new Date().toISOString(),
        ...item
      }));

      const updated = [...data, ...inserted];
      localStorage.setItem(this.tableName, JSON.stringify(updated));

      return { data: Array.isArray(newData) ? inserted : inserted[0], error: null };
    }

    async update(updateData) {
      if (typeof window === 'undefined') return { data: null, error: null };
      let data = JSON.parse(localStorage.getItem(this.tableName) || '[]');

      data = data.map(item => {
        let matches = true;
        for (const filter of this.filters) {
          if (filter.type === 'eq' && String(item[filter.column]) !== String(filter.value)) {
            matches = false;
          }
        }
        if (matches) {
          return { ...item, ...updateData };
        }
        return item;
      });

      localStorage.setItem(this.tableName, JSON.stringify(data));
      return { data: null, error: null };
    }
  }

  supabaseClient = {
    from: (tableName) => new MockQueryBuilder(tableName),
    auth: {
      signUp: async ({ email, password, options }) => {
        if (typeof window === 'undefined') return { data: { user: null }, error: null };
        const users = JSON.parse(localStorage.getItem('co_mock_users') || '[]');
        const role = options?.data?.role || 'candidate';
        const name = options?.data?.name || (role === 'candidate' ? 'Khor Ming Yao' : 'Teh Meng Chang');
        
        const newUser = {
          id: `mock-user-${Date.now()}`,
          email,
          user_metadata: { role, name }
        };
        
        users.push({ ...newUser, password });
        localStorage.setItem('co_mock_users', JSON.stringify(users));
        localStorage.setItem('co_current_user_email', email);
        localStorage.setItem('co_current_user_role', role);
        localStorage.setItem('co_current_user_name', name);
        localStorage.setItem('co_current_user_id', newUser.id);
        
        return { data: { user: newUser }, error: null };
      },
      signInWithPassword: async ({ email, password }) => {
        if (typeof window === 'undefined') return { data: { user: null }, error: new Error('Window undefined') };
        const users = JSON.parse(localStorage.getItem('co_mock_users') || '[]');
        
        // Find if user was created locally
        let user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
          // Fallback static accounts
          if (email === 'candidate@careeros.my' && password === 'password') {
            user = {
              id: 'mock-candidate-1',
              email,
              user_metadata: { role: 'candidate', name: 'Khor Ming Yao' }
            };
          } else if (email === 'recruiter@maybank.my' && password === 'password') {
            user = {
              id: 'mock-recruiter-1',
              email,
              user_metadata: { role: 'recruiter', name: 'Teh Meng Chang' }
            };
          } else {
            return { data: { user: null }, error: { message: 'Invalid login credentials' } };
          }
        }
        
        localStorage.setItem('co_current_user_email', user.email);
        localStorage.setItem('co_current_user_role', user.user_metadata.role);
        localStorage.setItem('co_current_user_name', user.user_metadata.name);
        localStorage.setItem('co_current_user_id', user.id);
        
        return { data: { user }, error: null };
      },
      signOut: async () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('co_current_user_email');
          localStorage.removeItem('co_current_user_role');
          localStorage.removeItem('co_current_user_name');
          localStorage.removeItem('co_current_user_id');
        }
        return { error: null };
      },
      getUser: async () => {
        if (typeof window === 'undefined') return { data: { user: null } };
        const email = localStorage.getItem('co_current_user_email');
        if (!email) return { data: { user: null } };
        
        const role = localStorage.getItem('co_current_user_role') || 'candidate';
        const name = localStorage.getItem('co_current_user_name') || 'Khor Ming Yao';
        const id = localStorage.getItem('co_current_user_id') || 'mock-user-1';
        
        return {
          data: {
            user: {
              id,
              email,
              user_metadata: { role, name }
            }
          }
        };
      },
      onAuthStateChange: (callback) => {
        if (typeof window !== 'undefined') {
          const email = localStorage.getItem('co_current_user_email');
          const role = localStorage.getItem('co_current_user_role');
          const name = localStorage.getItem('co_current_user_name');
          const id = localStorage.getItem('co_current_user_id');
          if (email) {
            callback('SIGNED_IN', {
              user: { id, email, user_metadata: { role, name } }
            });
          } else {
            callback('SIGNED_OUT', null);
          }
        }
        return { data: { subscription: { unsubscribe: () => {} } } };
      }
    }
  };
}

export const supabase = supabaseClient;