import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, MapPin, Link2 } from 'lucide-react';
import { EraId, TimelineEvent } from '../types/history';
import { TIMELINE_EVENTS } from '../data/timeline';

interface TimelinePageProps {
  onSelectStory: (storyId: string) => void;
}

export function TimelinePage({ onSelectStory }: TimelinePageProps) {
  const [eraFilter, setEraFilter] = useState<'all' | EraId>('all');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent>(TIMELINE_EVENTS[0]);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredEvents = TIMELINE_EVENTS.filter((ev) =>
    eraFilter === 'all' ? true : ev.eraId === eraFilter
  );

  useEffect(() => {
    if (!filteredEvents.some((e) => e.id === selectedEvent.id) && filteredEvents.length > 0) {
      setSelectedEvent(filteredEvents[0]);
    }
  }, [eraFilter, filteredEvents, selectedEvent.id]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !listRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.timeline-node', {
        y: 12,
        opacity: 0,
        duration: 0.45,
        stagger: 0.04,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });
    }, listRef);

    return () => ctx.revert();
  }, [eraFilter]);

  const relatedEvents = TIMELINE_EVENTS.filter((ev) =>
    selectedEvent.relatedEventIds?.includes(ev.id)
  );

  return (
    <div className="manuscript-surface min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header & Interactive Era Filter */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#DFD4BC]">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold text-[#8E6928]">التسلسل الزمني الوثائقي</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#231811]">
              الخط الزمني التفاعلي (١١ – ١٣٢ هـ)
            </h1>
            <p className="text-sm sm:text-base text-[#3D2B1F] leading-relaxed">
              تصفّح الأحداث المفصلية في الخلافة الراشدة والدولة الأموية، واختر أي سنة لاستكشاف
              ارتباطها بالتحولات اللاحقة والقصص الوثائقية.
            </p>
          </div>

          <div
            className="inline-flex items-center gap-1 p-1 bg-[#EAE1CE] rounded-md self-start lg:self-end"
            role="group"
            aria-label="تصفية حسب الحقبة"
          >
            {[
              { id: 'all' as const, label: 'جميع المحطات (١١–١٣٢ هـ)' },
              { id: 'rashidun' as const, label: 'الخلافة الراشدة' },
              { id: 'umayyad' as const, label: 'الدولة الأموية' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setEraFilter(tab.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 ${
                  eraFilter === tab.id
                    ? 'bg-[#FBF8F1] text-[#231811] shadow-xs'
                    : 'text-[#6B5849] hover:text-[#231811]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {/* Horizontal Year Scrubber */}
        <div className="bg-[#F3EDE0] border border-[#DFD4BC] rounded-lg p-3 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {filteredEvents.map((ev) => {
              const isSelected = ev.id === selectedEvent.id;
              return (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => setSelectedEvent(ev)}
                  className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors tabular-nums whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#2F4532] text-[#FBF8F1] border-[#2F4532]'
                      : 'bg-[#FBF8F1] text-[#3D2B1F] border-[#DFD4BC] hover:border-[#B48A3E]'
                  }`}
                >
                  {ev.yearHijriLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Column Interactive Workspace: Chronological Rail + Detailed Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chronological Nodes List */}
          <div ref={listRef} className="lg:col-span-6 space-y-3">
            {filteredEvents.map((ev) => {
              const isSelected = ev.id === selectedEvent.id;
              return (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => setSelectedEvent(ev)}
                  className={`timeline-node w-full text-right p-5 rounded-lg border transition-colors flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#231811] text-[#FBF8F1] border-[#231811]'
                      : 'bg-[#FBF8F1] text-[#231811] border-[#DFD4BC] hover:bg-[#F3EDE0]/70'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div
                      className={`text-xs tabular-nums ${
                        isSelected ? 'text-[#D8C39A]' : 'text-[#8E6928]'
                      }`}
                    >
                      <span>{ev.yearHijriLabel}</span>
                      <span className="mx-2" aria-hidden="true">·</span>
                      <span>{ev.yearGregorianLabel}</span>
                      {ev.isApproximate && ' (تقريبي)'}
                      <span className="mx-2" aria-hidden="true">·</span>
                      <span>{ev.category}</span>
                    </div>
                    <h2 className="font-serif text-xl font-bold leading-snug">{ev.title}</h2>
                    <p
                      className={`text-xs leading-relaxed line-clamp-2 ${
                        isSelected ? 'text-[#E5DACB]' : 'text-[#6B5849]'
                      }`}
                    >
                      {ev.summary}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky Inspector Panel */}
          <aside className="lg:col-span-6 lg:sticky lg:top-24 p-6 sm:p-8 bg-[#F3EDE0] border border-[#DFD4BC] rounded-lg space-y-6">
            <div className="space-y-2 pb-4 border-b border-[#DFD4BC]">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B5849] tabular-nums">
                <span className="font-semibold text-[#2F4532]">
                  {selectedEvent.eraId === 'rashidun' ? 'الخلافة الراشدة' : 'الدولة الأموية'}
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedEvent.yearHijriLabel}</span>
                <span aria-hidden="true">/</span>
                <span>{selectedEvent.yearGregorianLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B48A3E]" />
                  {selectedEvent.location}
                </span>
              </div>

              <h2 className="font-serif text-3xl font-bold text-[#231811] leading-snug">
                {selectedEvent.title}
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#231811] leading-relaxed">
              <p>{selectedEvent.summary}</p>
              <div className="p-4 bg-[#FBF8F1] border border-[#DFD4BC] rounded-md space-y-1">
                <p className="text-xs font-semibold text-[#8E6928]">الأهمية التاريخية والعلاقة بالمسار</p>
                <p className="text-sm text-[#3D2B1F]">{selectedEvent.historicalSignificance}</p>
              </div>
            </div>

            {/* Related Events Network */}
            {relatedEvents.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-semibold text-[#6B5849] inline-flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-[#B48A3E]" />
                  أحداث مرتبطة بهذا التحول:
                </p>
                <div className="space-y-2">
                  {relatedEvents.map((rel) => (
                    <button
                      key={rel.id}
                      type="button"
                      onClick={() => {
                        setEraFilter('all');
                        setSelectedEvent(rel);
                      }}
                      className="w-full text-right px-4 py-2.5 bg-[#FBF8F1] border border-[#DFD4BC] hover:border-[#B48A3E] rounded-md text-xs sm:text-sm text-[#231811] transition-colors flex items-center justify-between gap-2"
                    >
                      <span className="font-medium">{rel.title}</span>
                      <span className="text-xs text-[#8E6928] tabular-nums shrink-0">
                        {rel.yearHijriLabel}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-[#DFD4BC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-[#6B5849]">المرجع: {selectedEvent.sourceRef}</p>
              {selectedEvent.linkedStoryId && (
                <button
                  type="button"
                  onClick={() => onSelectStory(selectedEvent.linkedStoryId!)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium bg-[#2F4532] text-[#FBF8F1] hover:bg-[#223425] rounded-md transition-colors whitespace-nowrap shrink-0"
                >
                  اقرأ القصة التفاعلية المرتبطة
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
