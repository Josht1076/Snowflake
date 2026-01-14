'use client';

/**
 * Login page with email/password authentication
 */

import { useAuth } from '@/components/auth/AuthProvider';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { user, loading, signIn, signUp } = useAuth();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
        // Show success message - user may need to confirm email
        setError('Account created! Please check your email to confirm your account.');
      } else {
        await signIn(email, password);
        // Will redirect via useEffect
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="page-container">
        <div className="page-content">
          <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  if (user) {
    return null; // Will redirect
  }

  return (
    <main className="page-container">
      <div className="page-content">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="page-heading-light">Snowflake Novel Planner</h1>
              <p className="mt-4 text-gray-300">
                {isSignUp ? 'Create an account' : 'Sign in to access your projects from anywhere'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-900/30 border border-red-500/50 text-red-300 rounded">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="form-label text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="your@email.com"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="password" className="form-label text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary-action"
              >
                {isSubmitting ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }}
                className="text-sm text-primary-500 hover:text-primary-400 underline transition-colors"
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>

            <p className="text-center text-sm text-gray-400 mt-4">
              By signing in, you agree to store your projects securely in the cloud
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
