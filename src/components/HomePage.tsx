import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  ArrowLeft,
  BookOpen,
  Compass,
  Clock,
  Bookmark,
  Search,
  ScrollText,
  Landmark,
} from 'lucide-react';
import { EraId, PageView } from '../types/history';
import { HISTORICAL_ERAS } from '../data/eras';
import { HISTORICAL_STORIES } from '../data/stories';
import { TIMELINE_EVENTS } from '../data/timeline';
import { MUSLIM_SCHOLARS } from '../data/scholars';
import { HISTORICAL_ARTICLES } from '../data/articles';
import { GeometricPattern } from './GeometricPattern';
import { ResilientImage } from './ResilientImage';
import { StoryProgressEntry } from '../hooks/useMuseumProgress';

interface HomePageProps {
  bookmarks: string[];
  progress: Record<string, StoryProgressEntry>;
  onSelectEra: (eraId: EraId) => void;
  onSelectStory: (storyId: string) => void;
  onNavigate: (view: PageView) => void;
  onOpenSearch: (tab: 'search' | 'saved') => void;
}

export function HomePage({
  bookmarks,
  progress,
  onSelectEra,
  onSelectStory,
  onNavigate,
  onOpenSearch,
}: HomePageProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 18,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const previewTimeline = [
    TIMELINE_EVENTS[0],
    TIMELINE_EVENTS[3],
    TIMELINE_EVENTS[6],
    TIMELINE_EVENTS[8],
    TIMELINE_EVENTS[11],
  ];

  const featuredScholars = MUSLIM_SCHOLARS.slice(0, 4);

  return (
    <div className="manuscript-surface">
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative bg-[#231811] text-[#FBF8F1] overflow-hidden border-b border-[#3D2B1F]"
      >
        {/* Subtle Islamic Geometric Pattern */}
        <GeometricPattern className="absolute inset-0" opacity={0.14} />

        {/* Architectural Illustration Backdrop with Measured Contrast Scrim */}
        <div className="absolute inset-0 pointer-events-none">
          <ResilientImage
            src="/src/assets/images/hero_islamic_archive_1795041276018.jpg"
            alt="رواق تاريخي إسلامي ومخطوطات أثرية"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#231811] via-[#231811]/88 to-[#231811]/55" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl space-y-6">
            <p className="hero-stagger text-xs sm:text-sm font-medium text-[#D8C39A]">
              أثر المسلمين · متحف رقمي ومنصة سرد وثائقي
            </p>

            <h1 className="hero-stagger font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.18] text-balance">
              رحلة عبر التاريخ الإسلامي
            </h1>

            <p className="hero-stagger text-base sm:text-xl text-[#E8DEC8] leading-relaxed max-w-2xl">
              من المدينة المنورة إلى أقصى أرجاء العالم الإسلامي، نروي حكاية الأحداث والشخصيات
              والحضارة.
            </p>

            <p className="hero-stagger font-serif text-lg sm:text-xl text-[#D8C39A]">
              «نروي التاريخ، لنفهم الحاضر.»
            </p>

            <div className="hero-stagger pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onSelectStory(HISTORICAL_STORIES[0].id)}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-sm sm:text-base font-medium bg-[#B48A3E] hover:bg-[#9D7630] text-[#1A110B] rounded-md transition-colors duration-200 whitespace-nowrap"
              >
                ابدأ الرحلة
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('timeline')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm sm:text-base font-medium border border-[#D8C39A]/40 text-[#FBF8F1] hover:bg-[#FBF8F1]/10 rounded-md transition-colors duration-200 whitespace-nowrap"
              >
                استكشف الخط الزمني
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Utility Strip (Search & Bookmarks placed below Hero per Top Bar Contract) */}
      <div className="bg-[#F3EDE0] border-b border-[#DFD4BC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#3D2B1F]">
            الإصدار الأول يغطي حصرياً: الخلافة الراشدة (١١–٤١ هـ) والدولة الأموية (٤١–١٣٢ هـ)
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenSearch('search')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium bg-[#FBF8F1] border border-[#DFD4BC] hover:border-[#B48A3E] text-[#231811] rounded-md transition-colors whitespace-nowrap"
            >
              <Search className="w-3.5 h-3.5 text-[#6B5849]" />
              بحث في الأرشيف
            </button>
            <button
              type="button"
              onClick={() => onOpenSearch('saved')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium bg-[#FBF8F1] border border-[#DFD4BC] hover:border-[#B48A3E] text-[#231811] rounded-md transition-colors whitespace-nowrap tabular-nums"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#2F4532]" />
              المحفوظات ({bookmarks.length})
            </button>
          </div>
        </div>
      </div>

      {/* 2. INTRODUCTION TO THE PLATFORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#DFD4BC]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-semibold text-[#8E6928]">٠١. فلسفة المتحف الرقمي</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231811] leading-snug text-balance">
              مخطوطة تاريخية حيّة بمنهجية علمية دقيقة
            </h2>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <ScrollText className="w-5 h-5 text-[#2F4532]" strokeWidth={1.6} />
              <h3 className="font-serif text-xl font-bold text-[#231811]">سرد وثائقي تفاعلي</h3>
              <p className="text-sm text-[#3D2B1F] leading-relaxed">
                نحوّل الحدث التاريخي إلى مشاهد متسلسلة بالسياق واللوحات التوضيحية لا مجرد سرد جامد.
              </p>
            </div>
            <div className="space-y-2">
              <BookOpen className="w-5 h-5 text-[#B48A3E]" strokeWidth={1.6} />
              <h3 className="font-serif text-xl font-bold text-[#231811]">توثيق ونقد الروايات</h3>
              <p className="text-sm text-[#3D2B1F] leading-relaxed">
                نميّز بوضوح بين الحقائق الثابتة والآراء التحليلية، ونذكر اختلاف المصادر عندما يرد.
              </p>
            </div>
            <div className="space-y-2">
              <Compass className="w-5 h-5 text-[#2F4532]" strokeWidth={1.6} />
              <h3 className="font-serif text-xl font-bold text-[#231811]">جغرافيا بلا إسقاط</h3>
              <p className="text-sm text-[#3D2B1F] leading-relaxed">
                خرائط تاريخية تعكس المدن والطرق والمجالات التقريبية لعصرها بعيداً عن الحدود الحديثة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HISTORICAL ERAS (Strictly Rashidun & Umayyad) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#DFD4BC]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold text-[#8E6928] mb-1">٠٢. العصور التاريخية</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231811]">
              حقبتان تأسيسيتان في الإصدار الأول
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('eras')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2F4532] hover:text-[#223425] transition-colors whitespace-nowrap"
          >
            استعراض كل التفاصيل
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {HISTORICAL_ERAS.map((era) => (
            <div
              key={era.id}
              className="bg-[#F3EDE0] border border-[#DFD4BC] rounded-lg overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#EAE1CE]">
                  <ResilientImage
                    src={era.image}
                    alt={era.name}
                    fallbackTitle={era.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 sm:p-8 space-y-3">
                  <div className="text-xs text-[#6B5849] tabular-nums">
                    <span>{era.periodHijri}</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span>{era.periodGregorian}</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span>العاصمة: {era.capital.split('(')[0].trim()}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231811]">
                    {era.name}
                  </h3>
                  <p className="text-sm sm:text-base text-[#3D2B1F] leading-relaxed">
                    {era.summary}
                  </p>
                </div>
              </div>
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectEra(era.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#2F4532] text-[#FBF8F1] hover:bg-[#223425] rounded-md transition-colors"
                >
                  دخول صفحة {era.name}
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED HISTORICAL STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#DFD4BC]">
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#8E6928] mb-1">٠٣. القصص الوثائقية التفاعلية</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231811]">
            عِش الحدث التاريخي مشهداً بعد مشهد
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {HISTORICAL_STORIES.map((story) => {
            const prog = progress[story.id];
            const saved = bookmarks.includes(story.id);
            return (
              <div
                key={story.id}
                className="bg-[#FBF8F1] border border-[#DFD4BC] rounded-lg overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/9] w-full overflow-hidden bg-[#EAE1CE]">
                    <ResilientImage
                      src={story.coverImage}
                      alt={story.title}
                      fallbackTitle={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 sm:p-7 space-y-3">
                    <div className="text-xs text-[#6B5849] flex flex-wrap items-center gap-2 tabular-nums">
                      <span className="font-semibold text-[#2F4532]">{story.eraLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{story.scenes.length} مشاهد تفاعلية</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {story.readingTimeMinutes} دقائق
                      </span>
                      {saved && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#8E6928] font-medium">محفوظة</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#231811] leading-snug">
                      {story.title}
                    </h3>
                    <p className="text-sm text-[#3D2B1F] leading-relaxed">{story.summary}</p>
                  </div>
                </div>
                <div className="px-6 sm:px-7 pb-6 sm:pb-7 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => onSelectStory(story.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#231811] text-[#FBF8F1] hover:bg-[#3D2B1F] rounded-md transition-colors"
                  >
                    {prog && prog.lastSceneIndex > 0 ? 'متابعة القصة التفاعلية' : 'ابدأ القصة التفاعلية'}
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  {prog && (
                    <span className="text-xs text-[#2F4532] font-medium tabular-nums">
                      {prog.completed
                        ? 'مكتملة'
                        : `المشهد ${prog.lastSceneIndex + 1} من ${story.scenes.length}`}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. INTERACTIVE TIMELINE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#DFD4BC]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold text-[#8E6928] mb-1">٠٤. الخط الزمني التفاعلي</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231811]">
              محطات التحول من ١١ هـ إلى ١٣٢ هـ
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('timeline')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2F4532] hover:text-[#223425] transition-colors whitespace-nowrap"
          >
            فتح الخط الزمني الكامل
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {previewTimeline.map((ev) => (
            <button
              key={ev.id}
              type="button"
              onClick={() =>
                ev.linkedStoryId ? onSelectStory(ev.linkedStoryId) : onNavigate('timeline')
              }
              className="text-right p-5 bg-[#F3EDE0]/70 border border-[#DFD4BC] hover:border-[#B48A3E] rounded-lg transition-colors flex flex-col justify-between gap-3"
            >
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#8E6928] tabular-nums">
                  {ev.yearHijriLabel} · {ev.yearGregorianLabel}
                </p>
                <h3 className="font-serif text-lg font-bold text-[#231811] leading-snug">
                  {ev.title}
                </h3>
                <p className="text-xs text-[#3D2B1F] leading-relaxed line-clamp-3">
                  {ev.summary}
                </p>
              </div>
              <span className="text-xs text-[#2F4532] font-medium">
                {ev.location}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 6. FEATURED MUSLIM SCHOLARS & CULTURAL MAP PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#DFD4BC]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Scholars Preview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#8E6928] mb-1">٠٥. علماء الحقبتين</p>
                <h2 className="font-serif text-3xl font-bold text-[#231811]">
                  رواد العلم والتدوين في العصرين الراشدي والأموي
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('scholars')}
                className="text-sm font-medium text-[#2F4532] hover:text-[#223425] whitespace-nowrap shrink-0"
              >
                دليل العلماء ←
              </button>
            </div>

            <div className="divide-y divide-[#DFD4BC] border border-[#DFD4BC] rounded-lg bg-[#FBF8F1]">
              {featuredScholars.map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => onNavigate('scholars')}
                  className="w-full text-right p-4 sm:p-5 hover:bg-[#F3EDE0]/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#231811]">{sc.name}</h3>
                    <p className="text-xs text-[#6B5849] mt-0.5">
                      {sc.honorificOrRole} · {sc.disciplines.join('، ')}
                    </p>
                  </div>
                  <span className="text-xs text-[#8E6928] font-medium tabular-nums shrink-0">
                    توفي {sc.deathLabel}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Map Spotlight */}
          <div className="lg:col-span-5 bg-[#2F4532] text-[#FBF8F1] rounded-lg p-7 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <Landmark className="w-7 h-7 text-[#D8C39A]" strokeWidth={1.5} />
              <p className="text-xs font-medium text-[#D8C39A]">٠٦. الأطلس التاريخي</p>
              <h2 className="font-serif text-3xl font-bold leading-snug">
                الخرائط التاريخية التفاعلية
              </h2>
              <p className="text-sm text-[#E5DACB] leading-relaxed">
                تتبع التحول الجغرافي من واحة المدينة المنورة إلى حواضر الكوفة والبصرة والفسطاط ودمشق
                والقيروان وقرطبة وسمرقند، مع توضيح الطرق الإدارية وعدم إسقاط الحدود السياسية الحديثة.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('map')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium bg-[#D8C39A] text-[#231811] hover:bg-[#C6AE81] rounded-md transition-colors w-full sm:w-auto"
            >
              استعراض الخريطة التفاعلية
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. LATEST HISTORICAL ARTICLES & EDUCATIONAL HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <p className="text-xs font-semibold text-[#8E6928] mb-1">٠٧. دراسات ومقالات منهجية</p>
          <h2 className="font-serif text-3xl font-bold text-[#231811]">
            إضاءات أثرية ومناهج التوثيق
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HISTORICAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="p-6 bg-[#F3EDE0]/60 border border-[#DFD4BC] rounded-lg flex flex-col justify-between gap-4"
            >
              <div className="space-y-2.5">
                <div className="text-xs text-[#6B5849] tabular-nums">
                  <span>{article.category}</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span>{article.dateLabel}</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span>{article.readingTimeMinutes} دقائق</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#231811] leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-[#3D2B1F] leading-relaxed">{article.excerpt}</p>
              </div>
              <p className="text-xs text-[#6B5849] pt-3 border-t border-[#DFD4BC]">
                المرجع: {article.sourceNote}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
