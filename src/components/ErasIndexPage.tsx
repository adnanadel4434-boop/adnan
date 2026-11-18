import { ArrowLeft } from 'lucide-react';
import { EraId } from '../types/history';
import { HISTORICAL_ERAS } from '../data/eras';
import { ResilientImage } from './ResilientImage';

interface ErasIndexPageProps {
  onSelectEra: (eraId: EraId) => void;
}

export function ErasIndexPage({ onSelectEra }: ErasIndexPageProps) {
  return (
    <div className="manuscript-surface min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <header className="max-w-3xl space-y-3 border-b border-[#DFD4BC] pb-8">
          <p className="text-xs font-semibold text-[#8E6928]">قاعات العرض التاريخي · الإصدار الأول</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#231811] text-balance">
            العصور الإسلامية المشمولة في المرحلة الأولى
          </h1>
          <p className="text-base text-[#3D2B1F] leading-relaxed">
            يركز الإصدار الأول من منصة «أثر المسلمين» حصرياً على الحقبتين التأسيسيتين في التاريخ
            الإسلامي: الخلافة الراشدة والدولة الأموية (١١ – ١٣٢ هـ / ٦٣٢ – ٧٥٠ م)، مع قابلية التوسع
            المستقبلي لإضافة العصور اللاحقة ضمن البنية المعرفية نفسها.
          </p>
        </header>

        <div className="space-y-10">
          {HISTORICAL_ERAS.map((era, index) => (
            <section
              key={era.id}
              className="bg-[#F3EDE0]/70 border border-[#DFD4BC] rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto bg-[#EAE1CE]">
                <ResilientImage
                  src={era.image}
                  alt={era.name}
                  fallbackTitle={era.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="text-xs text-[#6B5849] tabular-nums">
                    <span className="font-semibold text-[#8E6928]">٠{index + 1}.</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span>{era.periodHijri}</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span>{era.periodGregorian}</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span>العاصمة: {era.capital}</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231811]">
                    {era.name}
                  </h2>

                  <p className="text-sm sm:text-base text-[#3D2B1F] leading-relaxed">
                    {era.introduction}
                  </p>

                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#3D2B1F]">
                    <div className="p-3.5 bg-[#FBF8F1] border border-[#DFD4BC] rounded-md">
                      <p className="font-semibold text-[#2F4532] mb-1">أبرز الخلفاء المشمولين</p>
                      <p>{era.rulers.map((r) => r.name).join('، ')}</p>
                    </div>
                    <div className="p-3.5 bg-[#FBF8F1] border border-[#DFD4BC] rounded-md">
                      <p className="font-semibold text-[#2F4532] mb-1">أبرز التحولات الحضارية</p>
                      <p>{era.administrativeAndCultural.slice(0, 110)}...</p>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => onSelectEra(era.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#2F4532] text-[#FBF8F1] hover:bg-[#223425] rounded-md transition-colors"
                  >
                    استعراض الصفحة الكاملة للحقبة
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
