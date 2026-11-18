import { useState, useCallback } from 'react';
import { EraId, PageView } from './types/history';
import { HISTORICAL_ERAS } from './data/eras';
import { HISTORICAL_STORIES } from './data/stories';
import { useMuseumProgress } from './hooks/useMuseumProgress';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ErasIndexPage } from './components/ErasIndexPage';
import { EraDetailPage } from './components/EraDetailPage';
import { StoryViewer } from './components/StoryViewer';
import { TimelinePage } from './components/TimelinePage';
import { HistoricalMapPage } from './components/HistoricalMapPage';
import { ScholarsPage } from './components/ScholarsPage';
import { SearchAndSavedModal } from './components/SearchAndSavedModal';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedEraId, setSelectedEraId] = useState<EraId>('rashidun');
  const [selectedStoryId, setSelectedStoryId] = useState<string>(HISTORICAL_STORIES[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'search' | 'saved'>('search');

  const { bookmarks, progress, toggleBookmark, isBookmarked, updateStoryProgress } =
    useMuseumProgress();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = useCallback((view: PageView) => {
    setCurrentView(view);
    scrollToTop();
  }, []);

  const handleSelectEra = useCallback((eraId: EraId) => {
    setSelectedEraId(eraId);
    setCurrentView('era-detail');
    scrollToTop();
  }, []);

  const handleSelectStory = useCallback((storyId: string) => {
    setSelectedStoryId(storyId);
    setCurrentView('story');
    scrollToTop();
  }, []);

  const handleOpenSearch = useCallback((tab: 'search' | 'saved') => {
    setModalTab(tab);
    setModalOpen(true);
  }, []);

  const activeEra =
    HISTORICAL_ERAS.find((e) => e.id === selectedEraId) ?? HISTORICAL_ERAS[0];
  const activeStory =
    HISTORICAL_STORIES.find((s) => s.id === selectedStoryId) ?? HISTORICAL_STORIES[0];

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-[#FBF8F1] text-[#231811]">
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onStartJourney={() => handleSelectStory(HISTORICAL_STORIES[0].id)}
      />

      <div className="flex-1">
        {currentView === 'home' && (
          <HomePage
            bookmarks={bookmarks}
            progress={progress}
            onSelectEra={handleSelectEra}
            onSelectStory={handleSelectStory}
            onNavigate={handleNavigate}
            onOpenSearch={handleOpenSearch}
          />
        )}

        {currentView === 'eras' && <ErasIndexPage onSelectEra={handleSelectEra} />}

        {currentView === 'era-detail' && (
          <EraDetailPage
            era={activeEra}
            onBack={() => handleNavigate('eras')}
            onSelectStory={handleSelectStory}
            onSwitchEra={handleSelectEra}
          />
        )}

        {currentView === 'story' && (
          <StoryViewer
            story={activeStory}
            isBookmarked={isBookmarked(activeStory.id)}
            progressEntry={progress[activeStory.id]}
            onToggleBookmark={toggleBookmark}
            onUpdateProgress={updateStoryProgress}
            onBack={() => handleNavigate('home')}
            onSelectStory={handleSelectStory}
          />
        )}

        {currentView === 'timeline' && (
          <TimelinePage onSelectStory={handleSelectStory} />
        )}

        {currentView === 'map' && (
          <HistoricalMapPage onSelectStory={handleSelectStory} />
        )}

        {currentView === 'scholars' && <ScholarsPage />}
      </div>

      <Footer onNavigate={handleNavigate} onSelectEra={handleSelectEra} />

      <SearchAndSavedModal
        isOpen={modalOpen}
        initialTab={modalTab}
        onClose={() => setModalOpen(false)}
        bookmarks={bookmarks}
        progress={progress}
        onSelectStory={handleSelectStory}
        onSelectScholar={() => handleNavigate('scholars')}
        onSelectTimeline={() => handleNavigate('timeline')}
        onToggleBookmark={toggleBookmark}
      />
    </div>
  );
}
