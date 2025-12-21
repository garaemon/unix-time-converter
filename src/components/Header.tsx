import { format } from 'date-fns';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { Clock, Copy } from 'lucide-react';

export default function Header() {
  const now = useCurrentTime();
  const timestamp = Math.floor(now.getTime() / 1000);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(timestamp.toString());
  };

  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Unix Time Converter</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Simple & Fast Timestamp Conversion
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1 text-right">
        <div className="flex items-center gap-2 group">
          <div className="font-mono text-2xl font-bold text-blue-600 dark:text-blue-400">
            {timestamp}
          </div>
          <button
            onClick={copyToClipboard}
            className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-all"
            title="Copy current Unix timestamp"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-col text-xs text-slate-500 dark:text-slate-400">
          <span>UTC: {now.toISOString().replace('T', ' ').split('.')[0]}</span>
          <span>Local: {format(now, 'yyyy-MM-dd HH:mm:ss')}</span>
        </div>
      </div>
    </header>
  );
}
