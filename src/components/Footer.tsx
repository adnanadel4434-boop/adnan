import { PageView, EraId } from '../types/history';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  onSelectEra: (eraId: EraId) => void;
}

export function Footer({ onNavigate, onSelectEra }: FooterProps) {
  return (
    <footer className="bg-[#231811] text-[#FBF8F1] border-t border-[#3D2B1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3D2B1F]">
          <div className="md:col-span-5 space-y-4">
            <BrandLogo variant="light" />
            <p className="font-serif text-xl text-[#D8C39A]">
              نروي التاريخ، لنفهم الحاضر.
            </p>
            <p className="text-sm text-[#C8B9A6] leading-relaxed max-w-md">
              متحف رقمي ومنصة سرد وثائقي مخصصة لتقديم التاريخ الإسلامي بمنهجية علمية دقيقة
              تُفرق بين الحقيقة التاريخية الموثقة والاجتهادات التحليلية، وتنطلق مرحلتها الأولى من
              الخلافة الراشدة والدولة الأموية.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold text-[#D8C39A]">أقسام المتحف</h3>
            <ul className="space-y-2.5 text-sm text-[#E5DACB]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#D8C39A] transition-colors"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('timeline')}
                  className="hover:text-[#D8C39A] transition-colors"
                >
                  الخط الزمني التفاعلي
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('map')}
                  className="hover:text-[#D8C39A] transition-colors"
                >
                  الخرائط التاريخية
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('scholars')}
                  className="hover:text-[#D8C39A] transition-colors"
                >
                  أعلام العلماء
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold text-[#D8C39A]">النطاق التاريخي (الإصدار الأول)</h3>
            <ul className="space-y-2.5 text-sm text-[#E5DACB]">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectEra('rashidun')}
                  className="hover:text-[#D8C39A] transition-colors text-right"
                >
                  الخلافة الراشدة (١١ – ٤١ هـ / ٦٣٢ – ٦٦١ م)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectEra('umayyad')}
                  className="hover:text-[#D8C39A] transition-colors text-right"
                >
                  الدولة الأموية (٤١ – ١٣٢ هـ / ٦٦١ – ٧٥٠ م)
                </button>
              </li>
              <li className="text-xs text-[#9C8B7A] pt-2 leading-relaxed">
                تنويه منهجي: جميع اللوحات المعمارية والمشاهد البصرية هي تصورات فنية تعليمية،
                وليست صوراً فوتوغرافية تاريخية أو تجسيماً للأنبياء.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9C8B7A]">
          <p>© ٢٠٢٦ أثر المسلمين (ATHAR AL-MUSLIMEEN). منصة تعليمية وتوثيقية للتاريخ الإسلامي.</p>
          <p>الإصدار الأول: الخلافة الراشدة والدولة الأموية</p>
        </div>
      </div>
    </footer>
  );
}
