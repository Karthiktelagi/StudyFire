import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, type = 'signup' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [authMode, setAuthMode] = useState('signup'); // 'signup' or 'login'
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Check if user is already registered
    const savedUser = localStorage.getItem('studyFireUser');
    setIsRegistered(!!savedUser);
    setAuthMode(savedUser ? 'login' : 'signup');
  }, [isOpen]);

  useEffect(() => {
    // Reset form when modal opens
    if (isOpen) {
      setEmail('');
      setPassword('');
      setName('');
      setError('');
      setSubmitted(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (authMode === 'signup') {
      // Registration logic
      if (!name.trim()) {
        setError('Please enter your full name');
        return;
      }
      if (!email.trim()) {
        setError('Please enter your email address');
        return;
      }
      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      // Store user data
      const userData = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password, // In real app, hash this
        registeredAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      localStorage.setItem('studyFireUser', JSON.stringify(userData));
      localStorage.setItem('studyFireAuth', JSON.stringify({
        isLoggedIn: true,
        token: 'demo-token-' + Date.now(),
        loginTime: new Date().toISOString(),
      }));

      setSubmitted(true);
      setTimeout(() => {
        setIsRegistered(true);
        onClose();
        setSubmitted(false);
      }, 1500);
    } else {
      // Login logic
      const savedUser = localStorage.getItem('studyFireUser');
      if (!savedUser) {
        setError('No account found. Please register first.');
        return;
      }

      const user = JSON.parse(savedUser);

      if (email.toLowerCase().trim() !== user.email) {
        setError('Email not found. Please check and try again.');
        return;
      }

      if (password !== user.password) {
        setError('Incorrect password. Please try again.');
        return;
      }

      // Successful login
      const updatedUser = {
        ...user,
        lastLogin: new Date().toISOString(),
      };

      localStorage.setItem('studyFireUser', JSON.stringify(updatedUser));
      localStorage.setItem('studyFireAuth', JSON.stringify({
        isLoggedIn: true,
        token: 'demo-token-' + Date.now(),
        loginTime: new Date().toISOString(),
      }));

      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 1500);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 min-h-screen">
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-2xl w-full max-w-md animate-scale-up border border-[var(--border)] my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)] bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            {authMode === 'login' ? 'Welcome Back' : 'Get Started'}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 font-bold text-[var(--primary)]">✓</div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                {authMode === 'login' ? 'Welcome back!' : 'Account Created!'}
              </h3>
              <p className="text-base text-[var(--text-secondary)]">
                {authMode === 'login'
                  ? 'You have successfully logged in. Starting your study journey!'
                  : 'Your account is ready. Let\'s start studying and building streaks!'}
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-5">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all text-base"
                >
                  {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              {/* Toggle between login and signup */}
              <div className="mt-6 pt-6 border-t border-[var(--border)] text-center">
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  {authMode === 'login'
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                </p>
                <button
                  onClick={toggleAuthMode}
                  className="text-sm font-semibold text-[var(--primary)] hover:underline transition-colors"
                >
                  {authMode === 'login' ? 'Create Account' : 'Sign In'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
