"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import { Bold, Italic, Underline as UnderlineIcon, Highlighter } from 'lucide-react';

interface PreviewAreaProps {
  backgroundColor: string;
  aspectRatio: string;
  vAlign: string;
  hAlign: string;
  fontFamily: string;
  letterSpacing: number;
  lineHeight: number;
}

export default function PreviewArea({
  backgroundColor,
  aspectRatio,
  vAlign,
  hAlign,
  fontFamily,
  letterSpacing,
  lineHeight,
}: PreviewAreaProps) {
  // Validate hex color roughly to prevent invalid CSS injection
  const validColor = backgroundColor.match(/^#[0-9A-Fa-f]{3,8}$/i) ? backgroundColor : '#f038da';

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
    ],
    content: '<h2>배경 텍스트</h2><p>단어를 드래그해 스타일을 변경하세요.</p>',
    editorProps: {
      attributes: {
        class: 'focus:outline-none max-w-full',
      },
    },
  });

  const vAlignClass = 
    vAlign === 'top' ? 'justify-start' : 
    vAlign === 'bottom' ? 'justify-end' : 
    'justify-center';

  const hAlignClass = 
    hAlign === 'left' ? 'text-left' : 
    hAlign === 'right' ? 'text-right' : 
    'text-center';

  const letterSpacingEm = `${(letterSpacing / 100) * 0.5}em`;
  const lineHeightVal = 1.5 + (lineHeight / 100);

  return (
    <div className="flex-1 bg-slate-50 relative flex items-center justify-center p-6 md:p-16 overflow-hidden h-[50vh] md:h-auto">
      {/* Sleek background decoration */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60"></div>
      
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div
          id="preview-node"
          className={`shadow-2xl shadow-black/10 rounded-2xl transition-all duration-300 ease-out border border-white/20 flex flex-col p-8 md:p-12 overflow-hidden ${vAlignClass} ${hAlignClass}`}
          style={{
            backgroundColor: validColor,
            aspectRatio: aspectRatio,
            width: aspectRatio === '9/16' || aspectRatio === '4/5' ? 'auto' : '100%',
            height: aspectRatio === '9/16' || aspectRatio === '4/5' ? '100%' : 'auto',
            maxHeight: '100%',
            maxWidth: '100%',
            color: '#ffffff',
            textShadow: '0px 2px 10px rgba(0,0,0,0.15)',
            containerType: 'inline-size'
          }}
        >
          <div 
            className={`w-full ${fontFamily}`}
            style={{
              letterSpacing: letterSpacingEm,
              lineHeight: lineHeightVal,
              fontSize: 'clamp(1.5rem, 6cqi, 5rem)',
              wordBreak: 'keep-all'
            }}
          >
            {editor && (
              <BubbleMenu editor={editor} className="z-50 shadow-xl rounded-xl overflow-hidden">
                <div className="flex bg-gray-900/90 backdrop-blur-md border border-white/10 text-white p-1.5 gap-1.5">
                  <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-white/20 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-white/20 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('underline') ? 'bg-white/20 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                  >
                    <UnderlineIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('highlight') ? 'bg-white/20 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                  >
                    <Highlighter className="w-4 h-4" />
                  </button>
                </div>
              </BubbleMenu>
            )}
            
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
}
