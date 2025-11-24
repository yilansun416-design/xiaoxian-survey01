
import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { X, Copy, Check, Download, Share2, AlertCircle } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');

  // Initialize URL when modal opens or window location changes
  useEffect(() => {
    if (isOpen) {
      setUrl(window.location.href);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const canvas = document.getElementById('share-qr-code') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = '啸仙丹心-问卷二维码.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-red-900 text-white p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Share2 size={18} className="text-red-200" />
            <h3 className="text-lg font-bold">邀请好友体验</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-red-100 hover:text-white hover:bg-red-800 rounded-full p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col items-center gap-6 overflow-y-auto">
          {/* Warning for 404/Localhost issues */}
          <div className="w-full bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-3">
             <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={16} />
             <p className="text-xs text-amber-800 leading-relaxed">
               <strong>温馨提示：</strong> 填写完问卷有惊喜掉落。
             </p>
          </div>

          <div className="bg-white p-4 rounded-xl border-2 border-red-100 shadow-inner flex flex-col items-center shrink-0">
            <QRCodeCanvas 
              id="share-qr-code"
              value={url || 'https://example.com'} 
              size={180}
              level={"H"}
              fgColor="#7f1d1d" // red-900
              bgColor="#ffffff"
              includeMargin={true}
            />
            <p className="text-xs text-stone-400 mt-2">微信扫一扫 · 填写问卷</p>
          </div>
          
          <div className="flex gap-3 w-full shrink-0">
            <button
              onClick={handleDownload}
              className="flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Download size={18} />
              保存图片
            </button>
          </div>

          <div className="w-full h-px bg-stone-100 shrink-0"></div>

          {/* Link Copy Area */}
          <div className="w-full space-y-2 shrink-0">
            <p className="text-stone-500 text-xs ml-1">分享链接（可编辑）：</p>
            <div className="w-full flex items-center gap-2 bg-stone-50 border border-stone-200 p-2 rounded-lg focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 transition-all">
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="bg-transparent flex-1 text-sm text-stone-600 outline-none px-2 w-full"
              />
              <button
                onClick={handleCopy}
                className={`
                  px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 min-w-[80px] justify-center
                  ${copied ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-700 hover:bg-red-100'}
                `}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? '已复制' : '复制'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
