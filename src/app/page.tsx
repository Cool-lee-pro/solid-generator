"use client";

import { useState } from 'react';
import SettingsPanel from '@/components/SettingsPanel';
import PreviewArea from '@/components/PreviewArea';
import ResultModal from '@/components/ResultModal';
import { toJpeg, toPng } from 'html-to-image';

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState('#f038da');
  const [aspectRatio, setAspectRatio] = useState('1/1');
  
  // Text state
  const [vAlign, setVAlign] = useState('center');
  const [hAlign, setHAlign] = useState('center');
  const [fontFamily, setFontFamily] = useState('font-pretendard');
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);

  // Download state
  const [downloadFormat, setDownloadFormat] = useState('JPG');
  const [generatedDataUrl, setGeneratedDataUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = async () => {
    setIsGenerating(true);
    try {
      const node = document.getElementById('preview-node');
      if (!node) return;

      // Blur to hide cursor in the editor
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      // Small delay to let the blur apply visually just in case
      await new Promise(r => setTimeout(r, 100));

      const targetDim: Record<string, {width: number, height: number}> = {
        '1/1': { width: 1080, height: 1080 },
        '4/5': { width: 1080, height: 1350 },
        '16/9': { width: 1920, height: 1080 },
        '9/16': { width: 1080, height: 1920 },
      };
      const dim = targetDim[aspectRatio] || targetDim['1/1'];

      const { width: nodeW } = node.getBoundingClientRect();
      const pixelRatio = dim.width / nodeW;

      const options = {
        pixelRatio: pixelRatio,
        quality: 0.95,
        canvasWidth: dim.width,
        canvasHeight: dim.height,
      };

      let dataUrl;
      if (downloadFormat === 'PNG') {
        dataUrl = await toPng(node, options);
      } else {
        dataUrl = await toJpeg(node, options);
      }
      
      setGeneratedDataUrl(dataUrl);
    } catch (err) {
      console.error("Failed to generate image", err);
      alert('이미지 생성에 실패했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="flex flex-col md:flex-row h-screen w-full bg-white overflow-hidden font-sans">
      <SettingsPanel
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
        vAlign={vAlign}
        setVAlign={setVAlign}
        hAlign={hAlign}
        setHAlign={setHAlign}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        letterSpacing={letterSpacing}
        setLetterSpacing={setLetterSpacing}
        lineHeight={lineHeight}
        setLineHeight={setLineHeight}
        downloadFormat={downloadFormat}
        setDownloadFormat={setDownloadFormat}
        generateImage={generateImage}
        isGenerating={isGenerating}
      />
      <PreviewArea
        backgroundColor={backgroundColor}
        aspectRatio={aspectRatio}
        vAlign={vAlign}
        hAlign={hAlign}
        fontFamily={fontFamily}
        letterSpacing={letterSpacing}
        lineHeight={lineHeight}
      />
      
      {generatedDataUrl && (
        <ResultModal 
          dataUrl={generatedDataUrl} 
          onClose={() => setGeneratedDataUrl('')} 
          format={downloadFormat} 
        />
      )}
    </main>
  );
}
