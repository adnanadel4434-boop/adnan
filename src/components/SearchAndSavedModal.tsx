import { useMemo, useState, useEffect } from 'react';
import { Search, Bookmark, X, BookOpen, Clock, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HISTORICAL_STORIES } from '../data/stories';
import { MUSLIM_SCHOLARS } from '../data/scholars';
import { TIMELINE_EVENTS } from '../data/timeline';
import { HISTORICAL_ARTICLES } from '../data/articles';
import { StoryProgressEntry } from '../hooks/useMuseumProgress';

interface SearchAndSavedModalProps {
  isOpen: boolean;
  initialTab: 'search' | 'saved';
  onClose: () => void;
  bookmarks: string[];
  progress: Record<string, StoryProgressEntry>;
  onSelectStory: (storyId: string) => void;
  onSelectScholar: () => void;
  onSelectTimeline: () => void;
  onToggleBookmark: (storyId: string) => void;
}

export function SearchAndSavedModal({
  isOpen,
  initialTab,
  onClose,
  bookmarks,
  progress,
  onSelectStory,
  onSelectScholar,
  onSelectTimeline,
  onToggleBookmark,
}: SearchAndSavedModalProps) {
  const [activeTab, setActiveTab] = useState<'search' | 'saved'>(initialTab);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  const currentTab = activeTab;

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        stories: HISTORICAL_STORIES,
        scholars: MUSLIM_SCHOLARS.slice(0, 3),
        events: TIMELINE_EVENTS.slice(0, 3),
        articles: HISTORICAL_ARTICLES,
      };
    }

    return {
      stories: HISTORICAL_STORIES.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.summary.toLowerCase().includes(q) ||
          s.eraLabel.toLowerCase().includes(q)
      ),
      scholars: MUSLIM_SCHOLARS.filter(
        (sc) =>
          sc.name.toLowerCase().includes(q) ||
          sc.biography.toLowerCase().includes(q) ||
          sc.disciplines.some((d) => d.includes(q))
      ),
      events: TIMELINE_EVENTS.filter(
        (ev) =>
          ev.title.toLowerCase().includes(q) ||
          ev.summary.toLowerCase().includes(q) ||
          ev.location.toLowerCase().includes(q)
      ),
      articles: HISTORICAL_ARTICLES.filter(
        (ar) => ar.title.toLowerCase().includes(q) || ar.excerpt.toLowerCase().includes(q)
      ),
    };
  }, [query]);

  const savedStories = useMemo(
    () => HISTORICAL_STORIES.filter((s) => bookmarks.includes(s.id)),
    [bookmarks]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#231811]/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="البحث والمحفوظات"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-[#FBF8F1] border border-[#DFD4BC] rounded-lg shadow-xl overflow-hidden mt-8"
          >
            {/* Header & Tabs */}
            <div className="flex items-center justify-between gap-4 px-5 py-4 bg-[#F3EDE0] border-b border-[#DFD4BC]">
              <div className="flex items-center gap-1 p-1 bg-[#EAE1CE] rounded-md">
                <button
                  type="button"
                  onClick={() => setActiveTab('search')}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 ${
                    currentTab === 'search'
                      ? 'bg-[#FBF8F1] text-[#231811] shadow-xs'
                      : 'text-[#6B5849] hover:text-[#231811]'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  البحث في الأرشيف
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('saved')}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 ${
                    currentTab === 'saved'
                      ? 'bg-[#FBF8F1] text-[#231811] shadow-xs'
                      : 'text-[#6B5849] hover:text-[#231811]'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span className="tabular-nums">المحفوظات ({savedStories.length})</span>
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق النافذة"
                className="w-10 h-10 inline-flex items-center justify-center rounded-md text-[#3D2B1F] hover:bg-[#EAE1CE] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {currentTab === 'search' ? (
              <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                <div className="relative">
                  <Search className="w-5 h-5 text-[#6B5849] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="ابحث عن قصة تاريخية، عالم، مدينة، أو حدث (مثال: الديوان، الزهري، دمشق)..."
                    className="w-full pr-11 pl-4 py-3 bg-[#F3EDE0]/70 border border-[#DFD4BC] rounded-md text-[#231811] placeholder:text-[#6B5849]/70 focus:outline-none focus:border-[#B48A3E]"
                    autoFocus
                  />
                </div>

                {/* Stories matches */}
                <section>
                  <h3 className="text-xs font-semibold text-[#6B5849] mb-3">
                    القصص التفاعلية ({searchResults.stories.length})
                  </h3>
                  {searchResults.stories.length === 0 ? (
                    <p className="text-sm text-[#6B5849]">لا توجد قصص مطابقة لعبارة البحث.</p>
                  ) : (
                    <div className="divide-y divide-[#DFD4BC] border border-[#DFD4BC] rounded-md bg-[#FBF8F1]">
                      {searchResults.stories.map((story) => (
                        <button
                          key={story.id}
                          type="button"
                          onClick={() => {
                            onSelectStory(story.id);
                            onClose();
                          }}
                          className="w-full text-right p-4 hover:bg-[#F3EDE0]/60 transition-colors flex items-center justify-between gap-4"
                        >
                          <div>
                            <div className="text-xs text-[#6B5849] mb-1">
                              <span>{story.eraLabel}</span>
                              <span className="mx-2" aria-hidden="true">·</span>
                              <span className="tabular-nums">{story.periodHijri}</span>
                            </div>
                            <p className="font-serif text-lg font-bold text-[#231811]">{story.title}</p>
                          </div>
                          <ArrowLeft className="w-4 h-4 text-[#B48A3E] shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </section>

                {/* Scholars matches */}
                {searchResults.scholars.length > 0 && (
                  <section>
                    <h3 className="text-xs font-semibold text-[#6B5849] mb-3">
                      العلماء والمؤرخون ({searchResults.scholars.length})
                    </h3>
                    <div className="divide-y divide-[#DFD4BC] border border-[#DFD4BC] rounded-md">
                      {searchResults.scholars.map((sc) => (
                        <button
                          key={sc.id}
                          type="button"
                          onClick={() => {
                            onSelectScholar();
                            onClose();
                          }}
                          className="w-full text-right p-3.5 hover:bg-[#F3EDE0]/60 transition-colors flex items-center justify-between gap-4"
                        >
                          <div>
                            <p className="font-serif text-base font-bold text-[#231811]">{sc.name}</p>
                            <p className="text-xs text-[#6B5849]">
                              {sc.honorificOrRole} · {sc.eraLabel}
                            </p>
                          </div>
                          <ArrowLeft className="w-4 h-4 text-[#6B5849] shrink-0" />
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* Timeline matches */}
                {searchResults.events.length > 0 && (
                  <section>
                    <h3 className="text-xs font-semibold text-[#6B5849] mb-3">
                      محطات الخط الزمني ({searchResults.events.length})
                    </h3>
                    <div className="divide-y divide-[#DFD4BC] border border-[#DFD4BC] rounded-md">
                      {searchResults.events.map((ev) => (
                        <button
                          key={ev.id}
                          type="button"
                          onClick={() => {
                            onSelectTimeline();
                            onClose();
                          }}
                          className="w-full text-right p-3.5 hover:bg-[#F3EDE0]/60 transition-colors flex items-center justify-between gap-4"
                        >
                          <div>
                            <p className="text-xs text-[#8E6928] font-medium tabular-nums">
                              {ev.yearHijriLabel} · {ev.yearGregorianLabel}
                            </p>
                            <p className="font-serif text-base font-bold text-[#231811]">{ev.title}</p>
                          </div>
                          <ArrowLeft className="w-4 h-4 text-[#6B5849] shrink-0" />
                        </button>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            ) : (
              <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-4">
                {savedStories.length === 0 ? (
                  <div className="text-center py-12 px-4 border border-dashed border-[#DFD4BC] rounded-md">
                    <BookOpen className="w-8 h-8 text-[#B48A3E] mx-auto mb-3" strokeWidth={1.5} />
                    <p className="font-serif text-xl font-bold text-[#231811] mb-1">
                      لا توجد قصص محفوظة بعد
                    </p>
                    <p className="text-sm text-[#6B5849] max-w-md mx-auto">
                      يمكنك حفظ أي قصة تفاعلية أثناء القراءة للرجوع إليها ومتابعة تقدمك في أي وقت.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedStories.map((story) => {
                      const entry = progress[story.id];
                      const sceneCount = story.scenes.length;
                      const currentScene = entry ? Math.min(entry.lastSceneIndex + 1, sceneCount) : 1;
                      return (
                        <div
                          key={story.id}
                          className="p-4 border border-[#DFD4BC] rounded-md bg-[#F3EDE0]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="text-xs text-[#6B5849]">
                              <span>{story.eraLabel}</span>
                              <span className="mx-2" aria-hidden="true">·</span>
                              <span className="inline-flex items-center gap-1 tabular-nums">
                                <Clock className="w-3.5 h-3.5" />
                                {story.readingTimeMinutes} دقائق
                              </span>
                              {entry && (
                                <>
                                  <span className="mx-2" aria-hidden="true">·</span>
                                  <span className="text-[#2F4532] font-medium tabular-nums">
                                    {entry.completed
                                      ? 'مكتملة'
                                      : `وصلت إلى المشهد ${currentScene} من ${sceneCount}`}
                                  </span>
                                </>
                              )}
                            </div>
                            <h4 className="font-serif text-lg font-bold text-[#231811]">
                              {story.title}
                            </h4>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                onSelectStory(story.id);
                                onClose();
                              }}
                              className="px-4 py-2 text-xs font-medium bg-[#2F4532] text-[#FBF8F1] hover:bg-[#223425] rounded-md transition-colors whitespace-nowrap"
                            >
                              متابعة القراءة
                            </button>
                            <button
                              type="button"
                              onClick={() => onToggleBookmark(story.id)}
                              className="px-3 py-2 text-xs font-medium border border-[#DFD4BC] text-[#6B5849] hover:text-[#231811] hover:bg-[#F3EDE0] rounded-md transition-colors whitespace-nowrap"
                            >
                              إزالة
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
