import { X, Download } from 'lucide-react';

interface ResultModalProps {
  dataUrl: string;
  onClose: () => void;
  format: string;
}

export default function ResultModal({ dataUrl, onClose, format }: ResultModalProps) {
  if (!dataUrl) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `background-generator.${format.toLowerCase()}`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-bold text-lg text-gray-800">이미지 생성 완료</h3>
          <button onClick={onClose} className="p-1 text-gray-500 hover:bg-gray-100 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center">
          <p className="text-sm text-gray-500 mb-4 text-center">
            아래 이미지를 <strong className="text-purple-600">꾹 눌러서 저장</strong>하거나<br/>다운로드 버튼을 클릭하세요.
          </p>
          <div className="w-full bg-gray-50 rounded-lg p-2 border border-gray-100 flex items-center justify-center">
            <img 
              src={dataUrl} 
              alt="Generated Background" 
              className="max-w-full max-h-[50vh] object-contain shadow-sm rounded border border-gray-200" 
            />
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition"
          >
            닫기
          </button>
          <button 
            onClick={handleDownload}
            className="flex-1 py-2.5 rounded-xl font-semibold text-white bg-purple-600 hover:bg-purple-700 transition flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            파일 다운로드
          </button>
        </div>
      </div>
    </div>
  );
}
