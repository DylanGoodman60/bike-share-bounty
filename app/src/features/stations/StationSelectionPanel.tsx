import { ArrowUpDown, X } from 'lucide-react';
import type { Station } from './useStations';
import { floatingPanelClass, panelLabelClass } from './panelStyles';

const removeButtonClass =
  'grid size-8 shrink-0 cursor-pointer place-items-center rounded-full border border-[#efd9d3] bg-[#fbf1ee] text-[#9d4b3f] transition-colors hover:border-[#d99b8e] hover:bg-[#f4dfd9] hover:text-[#87382d] focus-visible:border-[#d99b8e] focus-visible:bg-[#f4dfd9] focus-visible:text-[#87382d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark';

type StationSelectionPanelProps = {
  startStation: Station | null;
  endStation: Station | null;
  onRemoveStation: (stationId: number) => void;
  onSwap: () => void;
};

export function StationSelectionPanel({
  startStation,
  endStation,
  onRemoveStation,
  onSwap,
}: StationSelectionPanelProps) {
  const selectedCount = Number(startStation !== null) + Number(endStation !== null);

  return (
    <section className={floatingPanelClass} aria-label="Selected stations">
      <header className="mb-2 flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold">Selected stations</h2>
        <span className="text-[13px] text-quiet tabular-nums">{selectedCount}/2</span>
      </header>

      <div>
        <div className="flex min-w-0 items-center justify-between gap-2 border-t border-line py-2.25">
          <div className="flex min-w-0 flex-1 flex-col gap-0.75">
            <span className={panelLabelClass}>Start</span>
            {startStation ? <strong className="truncate text-sm font-semibold" title={startStation.name}>{startStation.name}</strong> : <span className="truncate text-sm text-[#87948d]">Choose a station</span>}
          </div>
          {startStation && (
            <button
              className={removeButtonClass}
              type="button"
              aria-label={`Remove start station ${startStation.name}`}
              title="Remove start station"
              onClick={() => onRemoveStation(startStation.station_id)}
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex min-w-0 items-center justify-between gap-2 border-t border-line py-2.25">
          <div className="flex min-w-0 flex-1 flex-col gap-0.75">
            <span className={panelLabelClass}>Destination</span>
            {endStation ? <strong className="truncate text-sm font-semibold" title={endStation.name}>{endStation.name}</strong> : <span className="truncate text-sm text-[#87948d]">Choose a station</span>}
          </div>
          {endStation && (
            <button
              className={removeButtonClass}
              type="button"
              aria-label={`Remove destination station ${endStation.name}`}
              title="Remove destination station"
              onClick={() => onRemoveStation(endStation.station_id)}
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <button
        className="mt-2 inline-flex cursor-pointer items-center gap-1.75 rounded-md border border-edge bg-white px-2.5 py-1.75 text-[13px] font-semibold text-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        disabled={!startStation || !endStation}
        onClick={onSwap}
      >
        <ArrowUpDown size={16} aria-hidden="true" />
        Swap direction
      </button>
    </section>
  );
}
