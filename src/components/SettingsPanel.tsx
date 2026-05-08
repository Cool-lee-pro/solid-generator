import { ChangeEvent } from 'react';
import { PaintBucket, Maximize, Type, AlignCenter, SlidersHorizontal, Image as ImageIcon, Download } from 'lucide-react';
import CoupangAd from './CoupangAd';

interface SettingsPanelProps {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  aspectRatio: string;
  setAspectRatio: (ratio: string) => void;
  vAlign: string;
  setVAlign: (val: string) => void;
  hAlign: string;
  setHAlign: (val: string) => void;
  fontFamily: string;
  setFontFamily: (val: string) => void;
  letterSpacing: number;
  setLetterSpacing: (val: number) => void;
  lineHeight: number;
  setLineHeight: (val: number) => void;
  downloadFormat: string;
  setDownloadFormat: (val: string) => void;
  generateImage: () => void;
  isGenerating: boolean;
}

export default function SettingsPanel({
  backgroundColor,
  setBackgroundColor,
  aspectRatio,
  setAspectRatio,
  vAlign,
  setVAlign,
  hAlign,
  setHAlign,
  fontFamily,
  setFontFamily,
  letterSpacing,
  setLetterSpacing,
  lineHeight,
  setLineHeight,
  downloadFormat,
  setDownloadFormat,
  generateImage,
  isGenerating,
}: SettingsPanelProps) {
  const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('#') && val.length > 0) {
      val = '#' + val;
    }
    setBackgroundColor(val);
  };

  const ratios = [
    { label: '1:1', value: '1/1' },
    { label: '4:5', value: '4/5' },
    { label: '16:9', value: '16/9' },
    { label: '9:16', value: '9/16' },
  ];

  return (
    <div className="w-full md:w-80 border-r border-gray-100 bg-white/80 backdrop-blur-xl h-full flex flex-col shadow-sm z-10 shrink-0 overflow-hidden relative">
      <div className="p-6 pb-5 border-b border-gray-100 bg-white">
        <h1 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
          <PaintBucket className="w-5 h-5 text-purple-600" />
          단색배경 제너레이터
        </h1>
        <p className="text-xs text-gray-500 mt-1.5 font-medium">배경색과 텍스트를 커스터마이징 하세요</p>
      </div>

      <div className="p-6 overflow-y-auto flex-1 space-y-8 bg-gradient-to-b from-white to-gray-50/50">
        {/* Background Section */}
        <div className="space-y-5">
          <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">배경 설정</h2>
          
          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500" />
              배경 색상
            </label>
            <div className="flex gap-2.5">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={backgroundColor}
                  onChange={handleHexChange}
                  className="w-full pl-3 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-gray-700 font-mono text-sm shadow-sm"
                  placeholder="#f038da"
                />
              </div>
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-gray-200 shadow-sm shrink-0 cursor-pointer flex items-center justify-center bg-white hover:border-gray-300 transition-colors">
                <input
                  type="color"
                  value={backgroundColor.match(/^#[0-9A-Fa-f]{6}$/i) ? backgroundColor : '#000000'}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="absolute w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 p-0 m-0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
              <Maximize className="w-4 h-4 text-gray-400" />
              이미지 비율
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ratios.map((ratio) => (
                <button
                  key={ratio.value}
                  onClick={() => setAspectRatio(ratio.value)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    aspectRatio === ratio.value
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  {ratio.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="space-y-5 pt-5 border-t border-gray-100">
          <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">텍스트 설정</h2>
          
          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
              <Type className="w-4 h-4 text-gray-400" />
              폰트
            </label>
            <div className="relative">
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full pl-3 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-gray-700 text-sm appearance-none bg-white shadow-sm font-medium"
              >
                <option value="font-pretendard">Pretendard</option>
                <option value="font-iropke">이롭게바탕체</option>
                <option value="font-chosun-gs">조선궁서체</option>
                <option value="font-chosun-km">조선굵은명조</option>
                <option value="font-chosun-gu">조선굴림체</option>
                <option value="font-chosun-kg">조선굵은고딕</option>
                <option value="font-chosun-sm">조선신명조</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
              <AlignCenter className="w-4 h-4 text-gray-400" />
              정렬 옵션
            </label>
            <div className="space-y-2.5">
              <div className="flex items-center text-xs text-gray-500 gap-3">
                <span className="w-7 font-medium">수직</span>
                <div className="flex flex-1 gap-1.5 p-1 bg-gray-100 rounded-lg">
                  {['top', 'center', 'bottom'].map((val) => (
                    <button
                      key={val}
                      onClick={() => setVAlign(val)}
                      className={`flex-1 py-1.5 rounded-md transition-all font-semibold ${
                        vAlign === val ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {val === 'top' ? '상' : val === 'center' ? '중' : '하'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center text-xs text-gray-500 gap-3">
                <span className="w-7 font-medium">수평</span>
                <div className="flex flex-1 gap-1.5 p-1 bg-gray-100 rounded-lg">
                  {['left', 'center', 'right'].map((val) => (
                    <button
                      key={val}
                      onClick={() => setHAlign(val)}
                      className={`flex-1 py-1.5 rounded-md transition-all font-semibold ${
                        hAlign === val ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {val === 'left' ? '좌' : val === 'center' ? '중' : '우'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5 pt-2">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              글꼴 간격
            </label>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500 font-medium px-1">
                <span>자간</span>
                <span className="text-gray-900 bg-gray-100 px-2 py-0.5 rounded">{letterSpacing}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500 font-medium px-1">
                <span>행간</span>
                <span className="text-gray-900 bg-gray-100 px-2 py-0.5 rounded">{lineHeight}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={lineHeight}
                onChange={(e) => setLineHeight(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="space-y-4 pt-5 border-t border-gray-100 pb-4">
          <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">저장 설정</h2>
          
          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-gray-400" />
              파일 형식
            </label>
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
              <button
                onClick={() => setDownloadFormat('JPG')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  downloadFormat === 'JPG' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                JPG
              </button>
              <button
                onClick={() => setDownloadFormat('PNG')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  downloadFormat === 'PNG' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                PNG
              </button>
            </div>
          </div>

          <button
            onClick={generateImage}
            disabled={isGenerating}
            className="w-full py-3.5 mt-2 rounded-xl font-bold text-white bg-gray-900 hover:bg-black disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2 text-sm"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                이미지 생성 중...
              </span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                이미지 다운로드
              </>
            )}
          </button>
        </div>
        
        {/* Ad Section */}
        <div className="pt-2 pb-4">
          <CoupangAd />
        </div>
      </div>
    </div>
  );
}
