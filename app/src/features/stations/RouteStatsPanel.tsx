import { ArrowRight, X } from 'lucide-react';
import type { RouteTripStats } from './useRouteTripStats';
import { floatingPanelClass, panelLabelClass } from './panelStyles';

type RouteStatsPanelProps = {
  startStationName: string;
  endStationName: string;
  stats: RouteTripStats | undefined;
  isLoading: boolean;
  errorMessage: string | null;
  onClose: () => void;
};

function formatDuration(seconds: number | null | undefined): string {
  if (seconds == null) return 'Not available';

  const totalSeconds = Math.round(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  if (hours > 0) return `${hours} hr ${minutes} min`;
  if (minutes > 0) return `${minutes} min ${remainingSeconds} sec`;
  return `${remainingSeconds} sec`;
}

function formatSpeed(kmh: number | null | undefined): string {
  if (kmh == null) return 'Not available';
  return `${kmh.toFixed(1)} km/h`;
}

// start_time is a naive local timestamp ("YYYY-MM-DD HH:MM:SS"), so parse it as local time
function formatTripDate(timestamp: string): string {
  const date = new Date(timestamp.replace(' ', 'T'));
  if (Number.isNaN(date.getTime())) return timestamp;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function RouteStatsPanel({
  startStationName,
  endStationName,
  stats,
  isLoading,
  errorMessage,
  onClose,
}: RouteStatsPanelProps) {
  return (
    <aside className={floatingPanelClass} aria-labelledby="route-stats-title">
      <div className="flex items-center justify-between gap-2">
        <p className={panelLabelClass}>Route statistics</p>
        <button
          className="grid size-7.5 shrink-0 cursor-pointer place-items-center rounded-full text-muted hover:bg-shell focus-visible:bg-shell"
          type="button"
          aria-label="Close route statistics"
          onClick={onClose}
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <h2 id="route-stats-title" className="mt-1 mb-3 flex flex-wrap items-center gap-1.5 text-[15px] leading-snug font-bold wrap-anywhere">
        <span>{startStationName}</span>
        <ArrowRight size={16} aria-hidden="true" />
        <span>{endStationName}</span>
      </h2>

      {isLoading && <p className="my-3 text-sm">Loading trip data...</p>}
      {errorMessage && <p className="my-3 text-sm text-danger">{errorMessage}</p>}
      {!isLoading && !errorMessage && stats?.completed_trip_count === 0 && (
        <p className="my-3 text-sm">No completed trips found for this route.</p>
      )}
      {!isLoading && !errorMessage && stats && stats.completed_trip_count > 0 && (
        <>
          <h3 className={`${panelLabelClass} mb-1.5`}>Fastest trips</h3>
          <ol className="mb-3 list-decimal pl-5 marker:text-[13px] marker:font-bold marker:text-quiet">
            {stats.fastest_trips.map((trip) => (
              <li key={trip.trip_id} className="py-1">
                <span className="block text-[15px] font-bold">
                  {formatDuration(trip.duration_seconds)}
                </span>
                <span className="block text-xs text-muted">
                  {formatSpeed(trip.straight_line_speed_kmh)} · {formatTripDate(trip.start_time)}
                </span>
              </li>
            ))}
          </ol>

          <dl className="text-[13px] *:flex *:justify-between *:gap-3 *:border-t *:border-line *:py-2">
            <div>
              <dt className="text-muted">Completed trips</dt>
              <dd className="text-right font-bold">{stats.completed_trip_count.toLocaleString()}</dd>
            </div>
            <div>
              <dt className="text-muted">Average trip time</dt>
              <dd className="text-right font-bold">{formatDuration(stats.average_duration_seconds)}</dd>
            </div>
            <div>
              <dt className="text-muted">Estimated average speed</dt>
              <dd className="text-right font-bold">{formatSpeed(stats.average_straight_line_speed_kmh)}</dd>
            </div>
          </dl>
        </>
      )}

      <p className="mt-3 text-xs leading-normal text-quiet">
        Speed uses straight-line distance between stations, not actual route distance.
      </p>
    </aside>
  );
}
