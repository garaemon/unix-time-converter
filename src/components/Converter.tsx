import { useState, useEffect } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ArrowDown, Copy, RefreshCw, Calendar, Clock, Timer } from 'lucide-react';
import { TIMEZONES } from '../constants/timezones';
import { detectUnit, normalizeToMillis, formatUnit, type TimeUnit } from '../utils/time';
import { useUrlParams } from '../hooks/useUrlParams';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Converter() {
  const params = useUrlParams();
  const [timestampInput, setTimestampInput] = useState<string>('');
  const [detectedUnit, setDetectedUnit] = useState<TimeUnit>('s');
  const [manualUnit, setManualUnit] = useState<TimeUnit | null>(null);
  
  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const [dateInput, setDateInput] = useState<string>(format(new Date(), "yyyy-MM-dd'T'HH:mm"));

  useEffect(() => {
    if (params.time) {
      setTimestampInput(params.time);
    }
    if (params.unit) {
      setManualUnit(params.unit);
    }
    if (params.tz && TIMEZONES.includes(params.tz)) {
      setSelectedTimezone(params.tz);
    }
  }, [params]);

  // Derived state for timestamp conversion
  const effectiveUnit = manualUnit || detectedUnit;
  let parsedDate: Date | null = null;
  
  // Logic to parse timestamp input
  if (timestampInput) {
    const cleanInput = timestampInput.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleanInput);
    if (!isNaN(num)) {
       // If unit changed, update detected unit
       const newDetected = detectUnit(num);
       if (newDetected !== detectedUnit) {
         setDetectedUnit(newDetected);
       }
       
       const millis = normalizeToMillis(num, effectiveUnit);
       parsedDate = new Date(millis);
    }
  }

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTimestampInput(val);
    // Reset manual unit on new input? Maybe not.
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, I'd show a toast here
  };

  return (
    <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
      {/* Timestamp to Date */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-6 text-lg font-semibold">
          <Clock className="w-5 h-5 text-blue-500" />
          <h2>Timestamp to Date</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
              Unix Timestamp
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={timestampInput}
                onChange={handleTimestampChange}
                placeholder="e.g. 1679876543"
                className="flex-1 p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono"
              />
              <button
                onClick={() => setTimestampInput(Math.floor(Date.now() / 1000).toString())}
                className="p-2 text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                title="Use current time"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
               <span>Detected: {formatUnit(detectedUnit)}</span>
               <div className="flex gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded">
                  {(['s', 'ms', 'us', 'ns'] as TimeUnit[]).map(u => (
                    <button
                      key={u}
                      onClick={() => setManualUnit(u)}
                      className={cn(
                        "px-2 py-0.5 rounded transition-colors",
                        effectiveUnit === u ? "bg-white dark:bg-slate-600 shadow text-blue-600 dark:text-blue-400" : "hover:text-slate-800 dark:hover:text-slate-200"
                      )}
                    >
                      {u}
                    </button>
                  ))}
               </div>
            </div>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-6 h-6" />
          </div>

          <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">UTC Time</div>
              <div className="flex justify-between items-center group">
                 <div className="font-mono text-lg">
                    {parsedDate ? parsedDate.toISOString().replace('T', ' ').replace('Z', ' UTC') : '-'}
                 </div>
                 {parsedDate && (
                   <button onClick={() => copyToClipboard(parsedDate!.toISOString())} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-all">
                     <Copy className="w-4 h-4" />
                   </button>
                 )}
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Timer className="w-3 h-3 text-slate-500" />
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Relative Time</div>
              </div>
              <div className="font-mono text-lg text-purple-600 dark:text-purple-400">
                {parsedDate ? formatDistanceToNow(parsedDate, { addSuffix: true }) : '-'}
              </div>
            </div>
            
            <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>

            <div>
              <div className="flex justify-between items-center mb-1">
                 <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Local / Selected Zone</div>
                 <select
                   value={selectedTimezone}
                   onChange={(e) => setSelectedTimezone(e.target.value)}
                   className="text-xs bg-transparent border-none text-blue-600 focus:ring-0 cursor-pointer"
                 >
                   {TIMEZONES.map(tz => (
                     <option key={tz} value={tz}>{tz}</option>
                   ))}
                 </select>
              </div>
              <div className="flex justify-between items-center group">
                 <div className="font-mono text-lg text-blue-600 dark:text-blue-400">
                    {parsedDate ? format(toZonedTime(parsedDate, selectedTimezone), 'yyyy-MM-dd HH:mm:ss') : '-'}
                 </div>
                 {parsedDate && (
                   <button onClick={() => copyToClipboard(format(toZonedTime(parsedDate, selectedTimezone), 'yyyy-MM-dd HH:mm:ss'))} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-all">
                     <Copy className="w-4 h-4" />
                   </button>
                 )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date to Timestamp */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-6 text-lg font-semibold">
          <Calendar className="w-5 h-5 text-green-500" />
          <h2>Date to Timestamp</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
              Select Date & Time
            </label>
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <div className="mt-1 text-xs text-slate-500">
              Interpreted as local time (System)
            </div>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-6 h-6" />
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Unix Timestamp (Seconds)</div>
             <div className="flex justify-between items-center group">
                 <div className="font-mono text-2xl font-bold text-green-600 dark:text-green-400 break-all">
                    {dateInput ? Math.floor(new Date(dateInput).getTime() / 1000) : '-'}
                 </div>
                 {dateInput && (
                   <button onClick={() => copyToClipboard(Math.floor(new Date(dateInput).getTime() / 1000).toString())} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-all">
                     <Copy className="w-4 h-4" />
                   </button>
                 )}
            </div>
             <div className="mt-2 text-xs text-slate-500">
                Milliseconds: {dateInput ? new Date(dateInput).getTime() : '-'}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
