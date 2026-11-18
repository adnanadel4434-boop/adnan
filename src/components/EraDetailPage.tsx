import { ArrowRight, ArrowLeft, Calendar, Library, Landmark } from 'lucide-react';
import { HistoricalEra, EraId } from '../types/history';
import { HISTORICAL_STORIES } from '../data/stories';
import { ResilientImage } from './ResilientImage';

interface EraDetailPageProps {
  era: HistoricalEra;
  onBack: () => void;
  onSelectStory: (storyId: string) => void;
  onSwitchEra: (eraId: EraId) => void;
}

export function EraDetailPage({
  era,
  onBack,
  onSelectStory,
  onSwitchEra,
}: EraDetailPageProps) {
  const eraStories = HISTORICAL_STORIES.filter((s) => s.eraId === era.id);
  const otherEraId: EraId = era.id === 'rashidun' ? 'umayyad' : 'rashidun';
  const otherEraName = era.id === 'rashidun' ? 'الدولة الأموية' : 'الخلافة الراشدة';

  return (
    <div className="manuscript-surface min-h-screen pb-16">
      {/* Top Sub-bar */}
      <div className="bg-[#F3EDE0] border-b border-[#DFD4BC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#3D2B1F] hover:text-[#2F4532] transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            جميع العصور
          </button>

          <button
            type="button"
            onClick={() => onSwitchEra(otherEraId)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#2F4532] hover:text-[#223425] transition-colors"
          >
            الانتقال إلى {otherEraName}
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Split */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 border-b border-[#DFD4BC]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-xs sm:text-sm text-[#6B5849] tabular-nums">
                <span className="font-semibold text-[#8E6928]">{era.englishName}</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>{era.periodHijri}</span>
                <span className="mx-2" aria-hidden="true">/</span>
                <span>{era.periodGregorian}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#231811] text-balance">
                {era.name}
              </h1>

              <p className="text-base sm:text-lg text-[#3D2B1F] leading-relaxed">
                {era.introduction}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#F3EDE0] border border-[#DFD4BC] rounded-md">
                <p className="text-xs text-[#6B5849] mb-1">المركز الإداري والعاصمة</p>
                <p className="font-serif text-lg font-bold text-[#231811]">{era.capital}</p>
              </div>
              <div className="p-4 bg-[#F3EDE0] border border-[#DFD4BC] rounded-md">
                <p className="text-xs text-[#6B5849] mb-1">الإطار الزمني المعتمد</p>
                <p className="font-serif text-lg font-bold text-[#231811] tabular-nums">
                  {era.periodHijri} ({era.periodGregorian})
                </p>
              </div>
            </div>
          </div>

          <figure className="lg:col-span-5 flex flex-col bg-[#F3EDE0] border border-[#DFD4BC] rounded-lg overflow-hidden">
            <div className="aspect-[4/3] lg:flex-1 bg-[#EAE1CE]">
              <ResilientImage
                src={era.image}
                alt={era.name}
                fallbackTitle={era.name}
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="px-4 py-2.5 text-xs font-serif text-[#6B5849] border-t border-[#DFD4BC]">
              {era.imageCaption}
            </figcaption>
          </figure>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-14">
        {/* Political, Administrative, Geographic & Closing Sections */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-[#FBF8F1] border border-[#DFD4BC] rounded-lg space-y-2.5">
            <h2 className="font-serif text-2xl font-bold text-[#231811]">
              ٠١. البنية السياسية والقيادة
            </h2>
            <p className="text-sm sm:text-base text-[#3D2B1F] leading-relaxed">
              {era.politicalOverview}
            </p>
          </div>
          <div className="p-6 bg-[#FBF8F1] border border-[#DFD4BC] rounded-lg space-y-2.5">
            <h2 className="font-serif text-2xl font-bold text-[#231811]">
              ٠٢. التطور الإداري والثقافي
            </h2>
            <p className="text-sm sm:text-base text-[#3D2B1F] leading-relaxed">
              {era.administrativeAndCultural}
            </p>
          </div>
          <div className="p-6 bg-[#FBF8F1] border border-[#DFD4BC] rounded-lg space-y-2.5">
            <h2 className="font-serif text-2xl font-bold text-[#231811]">
              ٠٣. الامتداد الجغرافي
            </h2>
            <p className="text-sm sm:text-base text-[#3D2B1F] leading-relaxed">
              {era.expansionSummary}
            </p>
          </div>
          <div className="p-6 bg-[#F3EDE0]/70 border border-[#DFD4BC] rounded-lg space-y-2.5">
            <h2 className="font-serif text-2xl font-bold text-[#231811]">
              ٠٤. التحول ونهاية الحقبة
            </h2>
            <p className="text-sm sm:text-base text-[#3D2B1F] leading-relaxed">
              {era.closingTransition}
            </p>
          </div>
        </section>

        {/* Chronological Rulers / Caliphs */}
        <section className="space-y-6">
          <div>
            <p className="text-xs font-semibold text-[#8E6928] mb-1">التسلسل الزمني للقيادة</p>
            <h2 className="font-serif text-3xl font-bold text-[#231811]">
              أبرز الخلفاء ومنجزاتهم المؤسسية
            </h2>
          </div>

          <div className="space-y-6">
            {era.rulers.map((ruler, idx) => (
              <div
                key={ruler.id}
                className="p-6 sm:p-8 bg-[#F3EDE0]/55 border border-[#DFD4BC] rounded-lg space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#DFD4BC]">
                  <div>
                    <p className="text-xs text-[#8E6928] font-medium tabular-nums">
                      ٠{idx + 1}. {ruler.title}
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231811]">
                      {ruler.name}
                    </h3>
                  </div>
                  <div className="text-xs sm:text-sm text-[#3D2B1F] tabular-nums">
                    <span>{ruler.reignHijri}</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span>{ruler.reignGregorian}</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span>{ruler.capital}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#231811] leading-relaxed">
                  {ruler.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ruler.keyDevelopments.map((dev, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-4 bg-[#FBF8F1] border border-[#DFD4BC] rounded-md space-y-1"
                    >
                      <p className="text-xs font-semibold text-[#2F4532]">{dev.category}</p>
                      <p className="text-sm text-[#3D2B1F] leading-relaxed">{dev.detail}</p>
                    </div>
                  ))}
                </div>

                {ruler.scholarlyNote && (
                  <p className="text-xs text-[#6B5849] pt-2">
                    ملاحظة توثيقية: {ruler.scholarlyNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Key Events Chronology */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#B48A3E]" />
            <h2 className="font-serif text-3xl font-bold text-[#231811]">
              محطات مفصلية في تاريخ {era.name}
            </h2>
          </div>

          <div className="divide-y divide-[#DFD4BC] border border-[#DFD4BC] rounded-lg bg-[#FBF8F1]">
            {era.keyEvents.map((ev, i) => (
              <div
                key={i}
                className="p-5 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8"
              >
                <div className="sm:w-44 shrink-0 text-xs sm:text-sm font-semibold text-[#8E6928] tabular-nums">
                  {ev.yearHijri} / {ev.yearGregorian}
                  {ev.isApproximate && (
                    <span className="block text-[11px] font-normal text-[#6B5849]">
                      تاريخ تقريبي
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-[#231811]">{ev.title}</h3>
                  <p className="text-sm text-[#3D2B1F] leading-relaxed">{ev.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Linked Interactive Stories */}
        {eraStories.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#2F4532]" />
              <h2 className="font-serif text-3xl font-bold text-[#231811]">
                قصص تفاعلية من هذه الحقبة
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eraStories.map((st) => (
                <div
                  key={st.id}
                  className="p-6 bg-[#2F4532] text-[#FBF8F1] rounded-lg flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <p className="text-xs text-[#D8C39A] tabular-nums">
                      {st.periodHijri} · {st.scenes.length} مشاهد تفاعلية
                    </p>
                    <h3 className="font-serif text-2xl font-bold leading-snug">{st.title}</h3>
                    <p className="text-sm text-[#E5DACB] leading-relaxed">{st.summary}</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => onSelectStory(st.id)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#D8C39A] text-[#231811] hover:bg-[#C6AE81] rounded-md transition-colors"
                    >
                      ابدأ القصة التفاعلية
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Era Sources */}
        <section className="pt-8 border-t border-[#DFD4BC] space-y-4">
          <div className="flex items-center gap-2">
            <Library className="w-5 h-5 text-[#B48A3E]" />
            <h2 className="font-serif text-2xl font-bold text-[#231811]">
              مراجع دراسة {era.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {era.sources.map((src) => (
              <div
                key={src.id}
                className="p-4 bg-[#F3EDE0]/50 border border-[#DFD4BC] rounded-md space-y-1"
              >
                <p className="text-xs text-[#8E6928] font-medium">{src.type}</p>
                <h3 className="font-serif text-lg font-bold text-[#231811]">{src.title}</h3>
                <p className="text-xs text-[#3D2B1F]">{src.author}</p>
                <p className="text-xs text-[#6B5849] pt-1">{src.citationNote}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
