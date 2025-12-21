import { Info } from 'lucide-react';

export default function UrlUsage() {
  return (
    <div className="mt-12 p-6 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4 text-slate-700 dark:text-slate-200 font-semibold">
        <Info className="w-5 h-5 text-blue-500" />
        <h3>URL Parameters</h3>
      </div>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        You can use URL parameters to share specific conversions or set defaults:
      </p>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">time</div>
          <p className="text-xs text-slate-500">The Unix timestamp value to display.</p>
        </div>
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">unit</div>
          <p className="text-xs text-slate-500">The time unit: <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">s</code>, <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">ms</code>, <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">us</code>, or <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">ns</code>.</p>
        </div>
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">tz</div>
          <p className="text-xs text-slate-500">The timezone ID (e.g., <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">UTC</code>, <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">America/New_York</code>).</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="text-xs text-slate-500 mb-2">Examples:</div>
        <div className="space-y-2">
          {[
            { params: '?time=1700000000&unit=s&tz=UTC', desc: 'Specific time in UTC' },
            { params: '?time=1672531200&tz=America/New_York', desc: 'New Year 2023 in NY' },
            { params: '?time=1700000000000&unit=ms', desc: 'Milliseconds timestamp' }
          ].map((ex, i) => (
            <div key={i} className="text-xs">
              <span className="text-slate-400 mr-2">- {ex.desc}:</span>
              <a 
                href={`${typeof window !== 'undefined' ? window.location.origin : ''}/${ex.params}`}
                className="text-blue-600 dark:text-blue-400 hover:underline bg-slate-200 dark:bg-slate-700 px-1 rounded font-mono break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {typeof window !== 'undefined' ? window.location.origin : 'https://unix-time.example.com'}/{ex.params}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
