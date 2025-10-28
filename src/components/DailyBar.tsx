/**
 * DailyBar - Bottom stats strip showing today's progress
 */

import { useStore } from '@/store';
import { formatMinutes } from '@/lib/date';

export function DailyBar() {
  const todayTotalMin = useStore((state) => state.todayTotalMin);
  const todaySessionsCount = useStore((state) => state.todaySessionsCount);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/10 backdrop-blur-md bg-black/20">
      <div className="container mx-auto px-3 md:px-4 py-2 md:py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 md:gap-8 text-xs sm:text-sm">
          <div className="flex items-center gap-2" role="status" aria-label={`${todayTotalMin} minutes focused today`}>
            <span className="text-white/60">Focused today:</span>
            <span className="font-semibold text-primary">{formatMinutes(todayTotalMin)}</span>
          </div>
          
          <div className="hidden sm:block w-px h-4 bg-white/20" aria-hidden="true" />
          
          <div className="flex items-center gap-2" role="status" aria-label={`${todaySessionsCount} sessions completed today`}>
            <span className="text-white/60">Sessions:</span>
            <span className="font-semibold text-primary">{todaySessionsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

