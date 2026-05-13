import { useState } from 'react';
import { Menu, X, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Logo } from '../ui/Logo';

export default function NewNavbar({ onPageChange, currentPage, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', label: 'Progress' },
    { id: 'calendar', label: 'Sessions' },
    { id: 'settings', label: 'Goals' },
  ];

  const handleNavClick = (pageId) => {
    onPageChange(pageId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#1a1a1a] border-b border-[var(--border)] backdrop-blur-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Logo size="md" withText={true} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 rounded-md font-body text-sm transition-all ${
                  currentPage === link.id
                    ? 'text-[var(--primary)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="btn btn-icon-sm hover:bg-[var(--surface-alt)]"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={onLogout}
              className="btn btn-text flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="btn btn-icon-sm hover:bg-[var(--surface-alt)]"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-icon-sm hover:bg-[var(--surface-alt)]"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[var(--border)] py-4 animate-slide-down">
            <div className="flex flex-col gap-2 mb-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-2 rounded-md font-body text-sm text-left transition-all ${
                    currentPage === link.id
                      ? 'bg-[var(--surface-alt)] text-[var(--primary)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2 pt-4 border-t border-[var(--border)]">
              <button
                onClick={() => {
                  onLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full btn btn-text flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
