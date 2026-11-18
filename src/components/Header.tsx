import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageView } from '../types/history';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  onStartJourney: () => void;
}

const NAV_ITEMS: { view: PageView; label: string }[] = [
  { view: 'home', label: 'الرئيسية' },
  { view: 'eras', label: 'العصور' },
  { view: 'timeline', label: 'الخط الزمني' },
  { view: 'map', label: 'الخرائط' },
  { view: 'scholars', label: 'العلماء' },
];

export function Header({ currentView, onNavigate, onStartJourney }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (view: PageView) => {
    onNavigate(view);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF8F1]/95 backdrop-blur-sm border-b border-[#DFD4BC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="text-right focus-visible:outline-2 focus-visible:outline-[#B48A3E] rounded-sm whitespace-nowrap shrink-0"
          aria-label="أثر المسلمين - الصفحة الرئيسية"
        >
          <BrandLogo variant="dark" />
        </button>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#3D2B1F]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              currentView === item.view ||
              (item.view === 'eras' && currentView === 'era-detail');
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => handleNav(item.view)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 ${
                  isActive
                    ? 'text-[#2F4532] font-semibold'
                    : 'text-[#6B5849] hover:text-[#231811]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 right-0 left-0 h-[1.5px] bg-[#B48A3E]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action button + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onStartJourney();
            }}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-[#FBF8F1] bg-[#2F4532] hover:bg-[#223425] rounded-md transition-colors duration-200 whitespace-nowrap shrink-0 min-h-[40px]"
          >
            ابدأ الرحلة
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#DFD4BC] text-[#231811] hover:bg-[#F3EDE0]"
            aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="قائمة الجوال"
          className="md:hidden border-t border-[#DFD4BC] bg-[#FBF8F1] px-4 py-4 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              currentView === item.view ||
              (item.view === 'eras' && currentView === 'era-detail');
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => handleNav(item.view)}
                className={`block w-full text-right px-3 py-3 text-base rounded-md transition-colors ${
                  isActive
                    ? 'bg-[#F3EDE0] text-[#2F4532] font-semibold'
                    : 'text-[#3D2B1F] hover:bg-[#F3EDE0]/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
