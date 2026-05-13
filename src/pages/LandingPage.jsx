import { useState, useEffect } from 'react';
import { AuthModal } from '../components/ui/AuthModal';
import { Logo } from '../components/ui/Logo';
import { Zap, BookOpen, TrendingUp, Lock } from 'lucide-react';

export const LandingPage = ({ onLogin }) => {
  const [showAuth, setShowAuth] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const auth = localStorage.getItem('studyFireAuth');
    if (auth) {
      const { isLoggedIn } = JSON.parse(auth);
      if (isLoggedIn) {
        onLogin();
      }
    }
  }, [onLogin]);

  const handleAuthClose = () => {
    // Check if user just logged in
    const auth = localStorage.getItem('studyFireAuth');
    if (auth) {
      const { isLoggedIn } = JSON.parse(auth);
      if (isLoggedIn) {
        onLogin();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0f0f1e] dark:to-[#1a1a2e] flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Features */}
        <div className="space-y-8">
          <div>
            <div className="mb-6">
              <Logo size="lg" withText={true} />
            </div>
            <h1 className="text-5xl font-bold text-[var(--text-primary)] mb-4">
              Master Your Learning
            </h1>
            <p className="text-xl text-[var(--text-secondary)]">
              Track your study streaks, build consistent habits, and unlock your potential with StudyFire
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">Build Streaks</h3>
                <p className="text-[var(--text-secondary)]">
                  Track your daily study sessions and maintain consistent learning habits
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">Subject Tracking</h3>
                <p className="text-[var(--text-secondary)]">
                  Monitor your progress across multiple subjects and topics
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400 mt-1" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">Analytics & Insights</h3>
                <p className="text-[var(--text-secondary)]">
                  Visualize your learning journey with detailed analytics and charts
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Lock className="w-6 h-6 text-red-600 dark:text-red-400 mt-1" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">Secure & Private</h3>
                <p className="text-[var(--text-secondary)]">
                  Your data is safely stored locally in your browser
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Modal */}
        <div className="flex justify-center lg:justify-end">
          {showAuth && (
            <div className="w-full max-w-md bg-white dark:bg-[#1a1a1a] rounded-xl shadow-2xl border border-[var(--border)] p-8 space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                  Get Started
                </h2>
                <p className="text-[var(--text-secondary)]">
                  Sign up or log in to start tracking your study journey
                </p>
              </div>

              <AuthModal
                isOpen={showAuth}
                onClose={handleAuthClose}
                type="signup"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
