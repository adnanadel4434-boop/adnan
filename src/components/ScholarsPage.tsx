import { useState, useMemo } from 'react';
import { Search, BookOpen, MapPin, Calendar } from 'lucide-react';
import { ScholarDiscipline, EraId } from '../types/history';
import { MUSLIM_SCHOLARS } from '../data/scholars';

const DISCIPLINES: ('الكل' | ScholarDiscipline)[] = [
  'الكل',
  'العلوم الشرعية',
  'الحديث',
  'الفقه',
  'التاريخ',
  'الأدب',
  'العلوم والطب',
  'الرياضيات والفلك',
];

export function ScholarsPage() {
  const [disciplineFilter, setDisciplineFilter] = useState<'الكل' | ScholarDiscipline>('الكل');
  const [eraFilter, setEraFilter] = useState<'all' | EraId>('all');
  const [query, setQuery] = useState('');

  const filteredScholars = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MUSLIM_SCHOLARS.filter((sc) => {
      const matchesEra = eraFilter === 'all' || sc.eraId === eraFilter;
      const matchesDiscipline =
        disciplineFilter === 'الكل' || sc.disciplines.includes(disciplineFilter);
      const matchesQuery =
        !q ||
        sc.name.toLowerCase().includes(q) ||
        sc.biography.toLowerCase().includes(q) ||
        sc.city.toLowerCase().includes(q);
      return matchesEra && matchesDiscipline && matchesQuery;
    });
  }, [disciplineFilter, eraFilter, query]);

  return (
    <div className="manuscript-surface min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="pb-8 border-b border-[#DFD4BC] space-y-4">
          <p className="text-xs font-semibold text-[#8E6928]">تراجم العلماء والمؤرخين</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#231811]">
            أعلام العلم في العصرين الراشدي والأموي
          </h1>
          <p className="text-sm sm:text-base text-[#3D2B1F] max-w-3xl leading-relaxed">
            يقتصر هذا الدليل في الإصدار الأول على العلماء والفقهاء والمؤرخين والأدباء الذين عاشوا
            في حقبتي الخلافة الراشدة والدولة الأموية (حتى ١٣٢ هـ / ٧٥٠ م)، مع توثيق التواريخ
            المحتملة أو المتفق عليها والمراجع المعتمدة.
          </p>
        </header>

        {/* Filter & Search Workspace Bar */}
        <div className="space-y-4 bg-[#F3EDE0] border border-[#DFD4BC] rounded-lg p-5">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#6B5849] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث باسم العالم أو المدينة أو الإسهام..."
                className="w-full pr-10 pl-4 py-2.5 text-sm bg-[#FBF8F1] border border-[#DFD4BC] rounded-md text-[#231811] placeholder:text-[#6B5849]/70 focus:outline-none focus:border-[#B48A3E]"
              />
            </div>

            <div className="inline-flex items-center gap-1 p-1 bg-[#EAE1CE] rounded-md self-start">
              {[
                { id: 'all' as const, label: 'الحقبتان' },
                { id: 'rashidun' as const, label: 'الخلافة الراشدة' },
                { id: 'umayyad' as const, label: 'الدولة الأموية' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setEraFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap ${
                    eraFilter === tab.id
                      ? 'bg-[#FBF8F1] text-[#231811] shadow-xs'
                      : 'text-[#6B5849] hover:text-[#231811]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#DFD4BC]">
            <span className="text-xs text-[#6B5849] ml-1">التخصص العلمي:</span>
            {DISCIPLINES.map((disc) => (
              <button
                key={disc}
                type="button"
                onClick={() => setDisciplineFilter(disc)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
                  disciplineFilter === disc
                    ? 'bg-[#2F4532] text-[#FBF8F1] border-[#2F4532]'
                    : 'bg-[#FBF8F1] text-[#3D2B1F] border-[#DFD4BC] hover:border-[#B48A3E]'
                }`}
              >
                {disc}
              </button>
            ))}
          </div>
        </div>

        {/* Scholars Grid */}
        {filteredScholars.length === 0 ? (
          <div className="text-center py-14 border border-dashed border-[#DFD4BC] rounded-lg">
            <BookOpen className="w-8 h-8 text-[#B48A3E] mx-auto mb-3" strokeWidth={1.5} />
            <p className="font-serif text-xl font-bold text-[#231811]">
              لا توجد نتائج مطابقة للبحث المحدد
            </p>
            <button
              type="button"
              onClick={() => {
                setDisciplineFilter('الكل');
                setEraFilter('all');
                setQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium bg-[#2F4532] text-[#FBF8F1] rounded-md"
            >
              إعادة ضبط المرشحات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredScholars.map((scholar) => (
              <article
                key={scholar.id}
                className="p-6 sm:p-7 bg-[#FBF8F1] border border-[#DFD4BC] rounded-lg space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="pb-4 border-b border-[#DFD4BC] space-y-1.5">
                    <div className="text-xs text-[#6B5849] flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-[#2F4532]">{scholar.eraLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{scholar.disciplines.join('، ')}</span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231811]">
                      {scholar.name}
                    </h2>
                    <p className="text-sm font-medium text-[#8E6928]">{scholar.honorificOrRole}</p>

                    <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-[#3D2B1F] tabular-nums">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#B48A3E]" />
                        الميلاد: {scholar.birthLabel} — الوفاة: {scholar.deathLabel}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#B48A3E]" />
                        {scholar.city}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#231811] leading-relaxed">
                    {scholar.biography}
                  </p>

                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-[#2F4532]">الإسهامات العلمية والمنهجية</h3>
                    <ul className="space-y-1.5 text-sm text-[#3D2B1F]">
                      {scholar.scientificContributions.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#B48A3E] font-bold">·</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xs font-semibold text-[#6B5849]">الآثار والمدارس العلمية</h3>
                    <ul className="space-y-1 text-xs sm:text-sm text-[#3D2B1F]">
                      {scholar.importantWorksOrLegacy.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>

                  {scholar.scholarlyCaveat && (
                    <div className="p-3.5 bg-[#F3EDE0] border border-[#DFD4BC] rounded-md text-xs text-[#3D2B1F] leading-relaxed">
                      <span className="font-semibold text-[#8E6928]">تنبيه تحقيقي: </span>
                      {scholar.scholarlyCaveat}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#DFD4BC] text-xs text-[#6B5849]">
                  <span className="font-semibold text-[#3D2B1F]">المصادر: </span>
                  {scholar.references.join(' · ')}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
