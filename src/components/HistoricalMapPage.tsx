import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowLeft, AlertCircle, Route } from 'lucide-react';
import { MAP_SNAPSHOTS } from '../data/maps';

interface HistoricalMapPageProps {
  onSelectStory: (storyId: string) => void;
}

export function HistoricalMapPage({ onSelectStory }: HistoricalMapPageProps) {
  const [snapshotIdx, setSnapshotIdx] = useState(1); // Start with Rashidun expansion for rich visual detail
  const snapshot = MAP_SNAPSHOTS[snapshotIdx];
  const [selectedCity, setSelectedCity] = useState(snapshot.cities[0]);

  useEffect(() => {
    setSelectedCity(snapshot.cities[0]);
  }, [snapshotIdx]);

  const isActiveRegion = (region: string) => snapshot.activeRegions.includes(region);

  return (
    <div className="manuscript-surface min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#DFD4BC]">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold text-[#8E6928]">الأطلس التاريخي التفاعلي</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#231811]">
              الجغرافيا التاريخية (١١ – ١٣٢ هـ)
            </h1>
            <p className="text-sm sm:text-base text-[#3D2B1F] leading-relaxed">
              استكشف الحواضر والطرق والمجالات الجغرافية التقريبية للخلافة الراشدة والدولة
              الأموية دون إسقاط للحدود السياسية الحديثة.
            </p>
          </div>

          <div
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EAE1CE] rounded-md"
            role="group"
            aria-label="اختيار الحقبة الزمنية على الخريطة"
          >
            {MAP_SNAPSHOTS.map((snap, idx) => (
              <button
                key={snap.id}
                type="button"
                onClick={() => setSnapshotIdx(idx)}
                className={`px-3.5 py-2 text-xs font-medium rounded-sm transition-colors tabular-nums whitespace-nowrap ${
                  snapshotIdx === idx
                    ? 'bg-[#FBF8F1] text-[#231811] shadow-xs'
                    : 'text-[#6B5849] hover:text-[#231811]'
                }`}
              >
                {snap.yearLabel.split('/')[0].trim()}
              </button>
            ))}
          </div>
        </header>

        {/* Disclaimer Bar */}
        <div className="p-4 bg-[#F3EDE0] border border-[#DFD4BC] rounded-lg flex items-start gap-3 text-xs sm:text-sm text-[#3D2B1F]">
          <AlertCircle className="w-5 h-5 text-[#B48A3E] shrink-0 mt-0.5" />
          <p>{snapshot.boundaryDisclaimer}</p>
        </div>

        {/* Map Canvas + Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Custom SVG Historical Cartography Map */}
          <div className="lg:col-span-8 bg-[#EAE1CE] border border-[#DFD4BC] rounded-lg overflow-hidden">
            <div className="px-5 py-3.5 bg-[#F3EDE0] border-b border-[#DFD4BC] flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#231811]">{snapshot.title}</h2>
                <p className="text-xs text-[#6B5849]">{snapshot.subtitle}</p>
              </div>
              <span className="text-xs font-medium text-[#2F4532] tabular-nums">
                {snapshot.yearLabel}
              </span>
            </div>

            {/* Keep geographic orientation West=Left, East=Right */}
            <div dir="ltr" className="relative w-full aspect-[1000/540] bg-[#D9D1BE]">
              <svg
                viewBox="0 0 1000 540"
                className="w-full h-full block select-none"
                role="img"
                aria-label={`خريطة تاريخية: ${snapshot.title}`}
              >
                {/* Sea / Water Backdrop */}
                <rect width="1000" height="540" fill="#CFE0DF" />

                {/* Subtle Maritime Longitude/Latitude Grid */}
                <g stroke="#B5C9C8" strokeWidth="0.7" strokeDasharray="3 5" opacity="0.6">
                  <line x1="0" y1="135" x2="1000" y2="135" />
                  <line x1="0" y1="270" x2="1000" y2="270" />
                  <line x1="0" y1="405" x2="1000" y2="405" />
                  <line x1="250" y1="0" x2="250" y2="540" />
                  <line x1="500" y1="0" x2="500" y2="540" />
                  <line x1="750" y1="0" x2="750" y2="540" />
                </g>

                {/* Base Landmasses (Natural Topography — NO Modern Political Borders) */}
                {/* Europe / North Mediterranean */}
                <path
                  d="M 40 20 L 210 20 L 220 95 L 360 90 L 420 110 L 490 70 L 620 85 L 680 120 L 610 140 L 530 140 L 460 120 L 380 135 L 250 115 L 150 140 L 75 135 L 40 95 Z"
                  fill="#E8DFCA"
                  stroke="#C8B99B"
                  strokeWidth="1"
                />

                {/* Iberian Peninsula (Al-Andalus) */}
                <path
                  d="M 55 75 L 160 72 L 155 138 L 80 142 L 50 115 Z"
                  fill={isActiveRegion('andalus') ? '#D7C395' : '#E8DFCA'}
                  stroke="#B8A88A"
                  strokeWidth="1"
                />

                {/* North Africa (Maghreb + Egypt) */}
                <path
                  d="M 65 162 L 190 155 L 335 165 L 440 210 L 545 215 L 580 280 L 620 430 L 520 510 L 65 510 L 55 240 Z"
                  fill="#E8DFCA"
                  stroke="#C8B99B"
                  strokeWidth="1"
                />

                {/* Maghreb Sphere Highlight */}
                {isActiveRegion('maghreb') && (
                  <path
                    d="M 75 168 L 195 160 L 345 170 L 440 212 L 490 220 L 470 295 L 270 285 L 95 255 Z"
                    fill="#B48A3E"
                    fillOpacity="0.22"
                    stroke="#B48A3E"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                  />
                )}

                {/* Egypt Sphere Highlight */}
                {isActiveRegion('egypt') && (
                  <path
                    d="M 480 218 L 548 218 L 570 285 L 555 340 L 485 335 Z"
                    fill="#2F4532"
                    fillOpacity="0.2"
                    stroke="#2F4532"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                  />
                )}

                {/* Arabia, Levant, Iraq, Persia & Transoxiana Landmass */}
                <path
                  d="M 552 215 L 575 150 L 620 120 L 730 110 L 960 60 L 980 330 L 840 315 L 775 265 L 735 260 L 750 325 L 795 365 L 750 450 L 645 480 L 580 340 L 560 245 Z"
                  fill="#E8DFCA"
                  stroke="#C8B99B"
                  strokeWidth="1"
                />

                {/* Active Historical Region Shading (Approximate Zones) */}
                {isActiveRegion('arabia') && (
                  <path
                    d="M 575 290 L 655 265 L 735 280 L 785 365 L 740 445 L 648 472 L 588 355 Z"
                    fill="#2F4532"
                    fillOpacity="0.22"
                    stroke="#2F4532"
                    strokeWidth="1.3"
                    strokeDasharray="5 4"
                  />
                )}
                {isActiveRegion('levant') && (
                  <path
                    d="M 558 152 L 625 142 L 642 225 L 558 228 Z"
                    fill="#2F4532"
                    fillOpacity="0.22"
                    stroke="#2F4532"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                  />
                )}
                {isActiveRegion('iraq') && (
                  <path
                    d="M 635 155 L 735 160 L 745 260 L 645 255 Z"
                    fill="#2F4532"
                    fillOpacity="0.22"
                    stroke="#2F4532"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                  />
                )}
                {isActiveRegion('persia') && (
                  <path
                    d="M 738 145 L 860 140 L 885 280 L 755 265 Z"
                    fill="#B48A3E"
                    fillOpacity="0.2"
                    stroke="#B48A3E"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                  />
                )}
                {isActiveRegion('transoxiana') && (
                  <path
                    d="M 840 90 L 950 85 L 955 210 L 850 190 Z"
                    fill="#B48A3E"
                    fillOpacity="0.22"
                    stroke="#B48A3E"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                  />
                )}

                {/* Major Rivers (Nile, Tigris, Euphrates) */}
                <g fill="none" stroke="#8FB4B8" strokeWidth="2.2" opacity="0.85">
                  <path d="M 526 222 Q 528 280 518 390" /> {/* Nile */}
                  <path d="M 655 135 Q 685 185 728 252" /> {/* Euphrates */}
                  <path d="M 685 130 Q 715 180 732 252" /> {/* Tigris */}
                </g>

                {/* Historical Communication & Administrative Routes */}
                {snapshot.routes.map((route) => (
                  <motion.path
                    key={route.id}
                    d={route.pathD}
                    fill="none"
                    stroke="#8E6928"
                    strokeWidth="2.2"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0.2, opacity: 0.4 }}
                    animate={{ pathLength: 1, opacity: 0.9 }}
                    transition={{ duration: 0.8 }}
                  />
                ))}

                {/* Water Body Labels */}
                <text x="310" y="142" fill="#4A7073" fontSize="12" fontFamily="IBM Plex Sans Arabic">
                  البحر المتوسط
                </text>
                <text x="582" y="395" fill="#4A7073" fontSize="11" fontFamily="IBM Plex Sans Arabic">
                  بحر القلزم
                </text>

                {/* Interactive Historical City Markers */}
                {snapshot.cities.map((city) => {
                  const isSelected = selectedCity.id === city.id;
                  return (
                    <g
                      key={city.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedCity(city)}
                      role="button"
                      tabIndex={0}
                      aria-label={city.name}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedCity(city);
                        }
                      }}
                    >
                      {isSelected && (
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r="15"
                          fill="#B48A3E"
                          fillOpacity="0.28"
                          stroke="#B48A3E"
                          strokeWidth="1.5"
                        />
                      )}
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={isSelected ? '7' : '5.5'}
                        fill={isSelected ? '#2F4532' : '#231811'}
                        stroke="#FBF8F1"
                        strokeWidth="2"
                      />
                      <text
                        x={city.x}
                        y={city.y - 12}
                        textAnchor="middle"
                        fill="#231811"
                        fontSize="12.5"
                        fontWeight={isSelected ? '700' : '600'}
                        fontFamily="IBM Plex Sans Arabic"
                        style={{ paintOrder: 'stroke', stroke: '#FBF8F1', strokeWidth: '3px' }}
                      >
                        {city.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Map Legend */}
            <div className="px-5 py-3 bg-[#F3EDE0] border-t border-[#DFD4BC] flex flex-wrap items-center gap-6 text-xs text-[#3D2B1F]">
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-[#2F4532]/30 border border-dashed border-[#2F4532]" />
                نطاق تقريبي للخلافة الراشدة
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-[#B48A3E]/30 border border-dashed border-[#B48A3E]" />
                توسع تقريبي في العصر الأموي
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-5 border-t-2 border-dashed border-[#8E6928]" />
                طرق البريد والإدارة التاريخية
              </span>
            </div>
          </div>

          {/* Selected City & Routes Inspector */}
          <aside className="lg:col-span-4 space-y-5">
            <div className="p-6 bg-[#F3EDE0] border border-[#DFD4BC] rounded-lg space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2F4532]">
                <MapPin className="w-4 h-4 text-[#B48A3E]" />
                بطاقة الحاضرة التاريخية
              </div>

              <div>
                <h3 className="font-serif text-3xl font-bold text-[#231811]">{selectedCity.name}</h3>
                <p className="text-xs font-medium text-[#8E6928] mt-1">{selectedCity.eraRole}</p>
              </div>

              <p className="text-sm text-[#3D2B1F] leading-relaxed">
                {selectedCity.foundingOrHighlight}
              </p>

              <div className="pt-3 border-t border-[#DFD4BC] space-y-2">
                <p className="text-xs font-semibold text-[#6B5849]">أحداث مرتبطة بالموقع:</p>
                <ul className="space-y-1.5 text-sm text-[#231811]">
                  {selectedCity.events.map((ev, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#B48A3E] font-bold">·</span>
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedCity.linkedStoryId && (
                <button
                  type="button"
                  onClick={() => onSelectStory(selectedCity.linkedStoryId!)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#2F4532] text-[#FBF8F1] hover:bg-[#223425] rounded-md transition-colors"
                >
                  افتح القصة المرتبطة بالموقع
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Cities Quick Switcher */}
            <div className="p-5 bg-[#FBF8F1] border border-[#DFD4BC] rounded-lg space-y-3">
              <p className="text-xs font-semibold text-[#6B5849]">المدن الظاهرة في هذه الحقبة:</p>
              <div className="flex flex-wrap gap-2">
                {snapshot.cities.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCity(c)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                      selectedCity.id === c.id
                        ? 'bg-[#231811] text-[#FBF8F1] border-[#231811]'
                        : 'bg-[#F3EDE0] text-[#3D2B1F] border-[#DFD4BC] hover:border-[#B48A3E]'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Routes info */}
            <div className="p-5 bg-[#FBF8F1] border border-[#DFD4BC] rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8E6928]">
                <Route className="w-4 h-4" />
                المحاور والطرق التاريخية
              </div>
              {snapshot.routes.map((r) => (
                <div key={r.id} className="space-y-1">
                  <p className="text-sm font-semibold text-[#231811]">{r.name}</p>
                  <p className="text-xs text-[#6B5849] leading-relaxed">{r.description}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
