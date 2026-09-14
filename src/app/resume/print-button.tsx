'use client';

import { Printer } from 'lucide-react';

const PrintButton = () => {
  return (
    <button
      type='button'
      onClick={() => window.print()}
      className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2'>
      <Printer className='h-4 w-4' aria-hidden />
      PDF 저장 / 인쇄
    </button>
  );
};

export { PrintButton };
