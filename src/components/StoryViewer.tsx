import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  Bookmark,
  BookOpen,
  CheckCircle2,
  MapPin,
  Calendar,
  Library,
  Sparkles,
  Scale,
} from 'lucide-react';
import { HistoricalStory } from '../types/history';
import { HISTORICAL_STORIES } from '../data/stories';
import { ResilientImage } from './ResilientImage';
import { StoryProgressEntry } from '../hooks/useMuseumProgress';

interface StoryViewerProps {
  story: HistoricalStory;
  isBookmarked: boolean;
  progressEntry?: StoryProgressEntry;
  onToggleBookmark: (storyId: string) => void;
  onUpdateProgress: (
    storyId: string,
    sceneIndex: number,
    totalScenes: number,
    quizScore?: number
  ) => void;
  onBack: () => void;
  onSelectStory: (storyId: string) => void;
}

export function StoryViewer({
  story,
  isBookmarked,
  progressEntry,
  onToggleBookmark,
  onUpdateProgress,
  onBack,
  onSelectStory,
}: StoryViewerProps) {
  const [sceneIndex, setSceneIndex] = useState<number>(() => {
    if (progressEntry && progressEntry.lastSceneIndex < story.scenes.length) {
      return progressEntry.lastSceneIndex;
    }
    return 0;
  });

  // Reset scene index if story changes
  useEffect(() => {
    const initial =
      progressEntry && progressEntry.lastSceneIndex < story.scenes.length
        ? progressEntry.lastSceneIndex
        : 0;
    setSceneIndex(initial);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [story.id]);

  // Persist scene progress
  useEffect(() => {
    onUpdateProgress(story.id, sceneIndex, story.scenes.length);
  }, [story.id, sceneIndex, story.scenes.length, onUpdateProgress]);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentScene = story.scenes[sceneIndex];
  const totalScenes = story.scenes.length;
  const isLastScene = sceneIndex === totalScenes - 1;
  const progressPercentage = Math.round(((sceneIndex + 1) / totalScenes) * 100);

  const relatedStories = HISTORICAL_STORIES.filter((s) =>
    story.relatedStoryIds.includes(s.id)
  );

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    const correctCount = story.quiz.reduce((acc, q) => {
      return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
    }, 0);
    onUpdateProgress(story.id, sceneIndex, totalScenes, correctCount);
  };

  const correctCount = story.quiz.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  return (
    <article className="min-h-screen bg-[#FBF8F1]">
      {/* Sticky Minimal Exhibition Progress Bar */}
      <div className="sticky top-16 z-30 bg-[#FBF8F1]/95 backdrop-blur-xs border-b border-[#DFD4BC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#3D2B1F] hover:text-[#2F4532] transition-colors whitespace-nowrap"
          >
            <ArrowRight className="w-4 h-4" />
            العودة إلى العرض
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#6B5849] tabular-nums">
            <span>{story.eraLabel}</span>
            <span aria-hidden="true">·</span>
            <span>
              المشهد {sceneIndex + 1} من {totalScenes} ({progressPercentage}%)
            </span>
          </div>

          <button
            type="button"
            onClick={() => onToggleBookmark(story.id)}
            aria-pressed={isBookmarked}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
              isBookmarked
                ? 'bg-[#2F4532] text-[#FBF8F1] border-[#2F4532]'
                : 'bg-[#F3EDE0] text-[#231811] border-[#DFD4BC] hover:bg-[#EAE1CE]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
            {isBookmarked ? 'محفوظة' : 'حفظ القصة'}
          </button>
        </div>

        {/* Smooth Reading Progress Hairline */}
        <div className="h-[2px] w-full bg-[#EAE1CE]">
          <div
            className="h-full bg-[#B48A3E] transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Story Masthead */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8 border-b border-[#DFD4BC]">
        <div className="text-xs sm:text-sm text-[#6B5849] mb-3 flex flex-wrap items-center gap-2">
          <span className="font-semibold text-[#2F4532]">{story.eraLabel}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{story.periodHijri}</span>
          <span aria-hidden="true">/</span>
          <span className="tabular-nums">{story.periodGregorian}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">مدة القراءة: {story.readingTimeMinutes} دقائق</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231811] leading-tight text-balance mb-4">
          {story.title}
        </h1>
        <p className="text-base sm:text-lg text-[#3D2B1F] leading-relaxed max-w-3xl">
          {story.subtitle}
        </p>

        {/* Scene Chapter Scrubber */}
        <div
          className="mt-8 flex items-center gap-2 overflow-x-auto pb-2"
          role="tablist"
          aria-label="مشاهد القصة"
        >
          {story.scenes.map((scene, idx) => {
            const isCurrent = idx === sceneIndex;
            return (
              <button
                key={scene.id}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                onClick={() => setSceneIndex(idx)}
                className={`px-3.5 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                  isCurrent
                    ? 'bg-[#231811] text-[#FBF8F1] border-[#231811]'
                    : 'bg-[#F3EDE0] text-[#3D2B1F] border-[#DFD4BC] hover:bg-[#EAE1CE]'
                }`}
              >
                ٠{idx + 1}. {scene.dateHijri}
              </button>
            );
          })}
        </div>
      </header>

      {/* Active Scene Interactive Documentary Canvas */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <AnimatePresence mode="wait">
          <motion.section
            key={currentScene.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Scene Illustration Frame */}
            <figure className="bg-[#F3EDE0] border border-[#DFD4BC] rounded-lg overflow-hidden">
              <div className="aspect-[16/9] w-full overflow-hidden bg-[#EAE1CE]">
                <ResilientImage
                  src={currentScene.illustration}
                  alt={currentScene.title}
                  fallbackTitle={currentScene.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="px-5 py-3 text-xs font-serif text-[#6B5849] border-t border-[#DFD4BC] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>لوحة رقم {currentScene.sceneNumber} — {currentScene.illustrationCaption}</span>
                <span className="tabular-nums text-[#3D2B1F] font-sans shrink-0">
                  {currentScene.location}
                </span>
              </figcaption>
            </figure>

            {/* Asymmetric Two-Column Reading Canvas (65% Narrative / 35% Historical Context & Methodology) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Narrative Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B5849] pb-4 border-b border-[#DFD4BC]">
                  <span className="inline-flex items-center gap-1.5 text-[#2F4532] font-semibold tabular-nums">
                    <Calendar className="w-4 h-4" />
                    {currentScene.dateHijri} ({currentScene.dateGregorian})
                    {currentScene.isApproximateDate && ' — تاريخ تقريبي'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#B48A3E]" />
                    {currentScene.location}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231811] leading-snug">
                  {currentScene.title}
                </h2>

                <div className="space-y-5 text-base sm:text-[17px] leading-[1.85] text-[#231811]">
                  {currentScene.narrative.map((paragraph, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'first-letter:font-serif first-letter:text-3xl first-letter:font-bold first-letter:text-[#2F4532]'
                          : ''
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Margin Context & Historical Rigor Column */}
              <aside className="lg:col-span-5 space-y-5">
                <div className="p-5 bg-[#F3EDE0] border border-[#DFD4BC] rounded-lg space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#2F4532]">
                    <BookOpen className="w-4 h-4 text-[#B48A3E]" />
                    السياق التاريخي للمشهد
                  </div>
                  <p className="text-sm text-[#3D2B1F] leading-relaxed">
                    {currentScene.historicalContext}
                  </p>
                </div>

                <div className="p-5 bg-[#FBF8F1] border border-[#DFD4BC] rounded-lg space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#231811]">
                    <Scale className="w-4 h-4 text-[#B48A3E]" />
                    التمييز المنهجي: الحقيقة والاجتهاد
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-[#2F4532]">حقيقة تاريخية موثقة</p>
                    <p className="text-sm text-[#3D2B1F] leading-relaxed">
                      {currentScene.methodologyNote.establishedFact}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#DFD4BC] space-y-1.5">
                    <p className="text-xs font-semibold text-[#8E6928]">قراءة تحليلية / تعدد الروايات</p>
                    <p className="text-sm text-[#3D2B1F] leading-relaxed">
                      {currentScene.methodologyNote.scholarlyPerspective}
                    </p>
                  </div>
                </div>
              </aside>
            </div>

            {/* Scene Navigation Controls */}
            <div className="pt-8 border-t border-[#DFD4BC] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  setSceneIndex((i) => Math.max(0, i - 1));
                  window.scrollTo({ top: 140, behavior: 'smooth' });
                }}
                disabled={sceneIndex === 0}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md border border-[#DFD4BC] bg-[#F3EDE0] text-[#231811] hover:bg-[#EAE1CE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                المشهد السابق
              </button>

              <span className="text-xs text-[#6B5849] tabular-nums">
                {sceneIndex + 1} / {totalScenes}
              </span>

              <button
                type="button"
                onClick={() => {
                  setSceneIndex((i) => Math.min(totalScenes - 1, i + 1));
                  window.scrollTo({ top: 140, behavior: 'smooth' });
                }}
                disabled={isLastScene}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md bg-[#2F4532] text-[#FBF8F1] hover:bg-[#223425] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                المشهد التالي
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </motion.section>
        </AnimatePresence>

        {/* End-of-Story Animated Card: "ماذا نتعلم من هذه القصة؟" */}
        {isLastScene && (
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 p-6 sm:p-8 bg-[#231811] text-[#FBF8F1] rounded-lg border border-[#3D2B1F] space-y-6"
          >
            <div className="flex items-center gap-2.5 text-[#D8C39A]">
              <Sparkles className="w-5 h-5" />
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                ماذا نتعلم من هذه القصة؟
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 bg-[#2E2017] border border-[#463427] rounded-md space-y-3">
                <h3 className="text-sm font-semibold text-[#D8C39A]">
                  أولاً: خلاصة الحقائق التاريخية الثابتة
                </h3>
                <ul className="space-y-2.5 text-sm text-[#E5DACB] leading-relaxed">
                  {story.lessons.factsSummary.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#D8C39A] font-serif font-bold tabular-nums">
                        ٠{idx + 1}.
                      </span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-[#2E2017] border border-[#463427] rounded-md space-y-3">
                <h3 className="text-sm font-semibold text-[#9FC4A4]">
                  ثانياً: دلالات وتأملات لفهم الحاضر
                </h3>
                <ul className="space-y-2.5 text-sm text-[#E5DACB] leading-relaxed">
                  {story.lessons.analyticalInsights.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#9FC4A4] font-serif font-bold tabular-nums">
                        ٠{idx + 1}.
                      </span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>
        )}

        {/* Interactive Educational Quiz */}
        <section className="mt-14 pt-10 border-t border-[#DFD4BC] space-y-6">
          <div>
            <p className="text-xs font-semibold text-[#8E6928] mb-1">التفاعل التعليمي</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231811]">
              اختبر استيعابك لأحداث القصة
            </h2>
          </div>

          <div className="space-y-5">
            {story.quiz.map((q, qIdx) => {
              const selected = selectedAnswers[q.id];
              return (
                <div
                  key={q.id}
                  className="p-5 sm:p-6 bg-[#F3EDE0]/60 border border-[#DFD4BC] rounded-lg space-y-4"
                >
                  <p className="font-serif text-lg font-bold text-[#231811]">
                    <span className="tabular-nums text-[#8E6928] ml-2">٠{qIdx + 1}.</span>
                    {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isPicked = selected === optIdx;
                      const isCorrect = q.correctIndex === optIdx;
                      let stateClass =
                        'bg-[#FBF8F1] border-[#DFD4BC] text-[#231811] hover:bg-[#EAE1CE]/60';
                      if (quizSubmitted) {
                        if (isCorrect) {
                          stateClass = 'bg-[#2F4532]/15 border-[#2F4532] text-[#231811] font-medium';
                        } else if (isPicked && !isCorrect) {
                          stateClass = 'bg-[#9A3412]/10 border-[#9A3412] text-[#231811]';
                        }
                      } else if (isPicked) {
                        stateClass = 'bg-[#231811] border-[#231811] text-[#FBF8F1]';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full text-right px-4 py-3 text-sm rounded-md border transition-colors ${stateClass}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <div className="pt-2 text-xs sm:text-sm text-[#3D2B1F] flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2F4532] shrink-0 mt-0.5" />
                      <span>{q.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {!quizSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < story.quiz.length}
                className="px-6 py-2.5 text-sm font-medium rounded-md bg-[#2F4532] text-[#FBF8F1] hover:bg-[#223425] disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
              >
                تحقق من الإجابات
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-sm font-semibold text-[#2F4532] tabular-nums">
                  النتيجة: {correctCount} من {story.quiz.length} إجابات صحيحة
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="px-4 py-2 text-xs font-medium border border-[#DFD4BC] rounded-md text-[#3D2B1F] hover:bg-[#F3EDE0]"
                >
                  إعادة المحاولة
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Dedicated Academic Sources & Citations Section */}
        <section className="mt-14 pt-10 border-t border-[#DFD4BC] space-y-6">
          <div className="flex items-center gap-2.5">
            <Library className="w-5 h-5 text-[#B48A3E]" />
            <h2 className="font-serif text-2xl font-bold text-[#231811]">
              المصادر والمراجع التاريخية المعتمدة
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6B5849]">
            تلتزم «أثر المسلمين» بالتفريق بين المصادر الإخبارية الكلاسيكية وبين الأبحاث الأثرية
            والأكاديمية المعاصرة، ولا تفترض صحة كل رواية واردة دون نقد وتمحيص.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {story.sources.map((src) => (
              <div
                key={src.id}
                className="p-4 bg-[#F3EDE0]/50 border border-[#DFD4BC] rounded-md space-y-1.5"
              >
                <div className="text-xs text-[#8E6928] font-medium">{src.type}</div>
                <h3 className="font-serif text-lg font-bold text-[#231811]">{src.title}</h3>
                <p className="text-xs text-[#3D2B1F]">{src.author}</p>
                <p className="text-xs text-[#6B5849] leading-relaxed pt-1">{src.citationNote}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <section className="mt-14 pt-10 border-t border-[#DFD4BC] space-y-5">
            <h2 className="font-serif text-2xl font-bold text-[#231811]">قصص تاريخية ذات صلة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedStories.map((rel) => (
                <button
                  key={rel.id}
                  type="button"
                  onClick={() => onSelectStory(rel.id)}
                  className="text-right p-5 bg-[#F3EDE0] border border-[#DFD4BC] hover:border-[#B48A3E] rounded-lg transition-colors flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="text-xs text-[#6B5849] mb-1">
                      <span>{rel.eraLabel}</span>
                      <span className="mx-2" aria-hidden="true">·</span>
                      <span className="tabular-nums">{rel.periodHijri}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#231811] mb-2">
                      {rel.title}
                    </h3>
                    <p className="text-sm text-[#3D2B1F] line-clamp-2">{rel.summary}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2F4532]">
                    اقرأ القصة التفاعلية
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>
    </article>
  );
}
