
import { Bike, X } from "lucide-react";

type BikeMarkerProps = {
    name: string;
    startTripCount: number;
    endTripCount: number;
    peakStartDay: number | null;
    peakStartHour: number | null;
    isSelected: boolean;
    onSelect: () => void;
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatHour(hour: number | null): string {
    if (hour === null) return 'Not available';

    const displayHour = hour % 12 || 12;
    return `${displayHour} ${hour < 12 ? 'AM' : 'PM'}`;
}

export const BikeMarker = ({
    name,
    startTripCount,
    endTripCount,
    peakStartDay,
    peakStartHour,
    isSelected,
    onSelect,
}: BikeMarkerProps) => {
    return (
        <div
            className="group relative w-fit"
            data-bike-marker
            data-selected={isSelected || undefined}
            onClick={(event) => event.stopPropagation()}
        >
            <button
                className={`grid cursor-pointer place-items-center rounded-full border-2 p-1 transition duration-200 ${
                    isSelected
                        ? "border-brand bg-brand"
                        : "border-[#d6e2dc] bg-white hover:scale-115 hover:bg-gray-200 focus-visible:scale-115 focus-visible:bg-gray-200"
                }`}
                type="button"
                aria-label={`${isSelected ? "Unselect" : "Select"} ${name} station`}
                aria-pressed={isSelected}
                onClick={onSelect}
            >
                <Bike size={24} color={isSelected ? "#ffffff" : "#167d5a"} aria-hidden="true" />
            </button>
            <span className="pointer-events-none invisible absolute bottom-[calc(100%+10px)] left-1/2 z-1001 flex min-w-max -translate-x-1/2 translate-y-1 flex-col items-start gap-1.25 rounded-[10px] border border-[#d6e2dc] bg-white px-3 py-2.5 text-[13px] leading-[1.35] text-ink opacity-0 shadow-[0_6px_18px_rgb(33_52_46/18%)] transition-[opacity,translate,visibility] duration-160 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <strong className="font-bold">{name}</strong>
                {isSelected ? (
                    <span className="inline-flex items-center gap-0.75 text-xs font-semibold text-[#a34b3e]">
                        <X size={12} aria-hidden="true" />
                        Click to remove
                    </span>
                ) : (
                    <div className="flex flex-col gap-0.5 text-xs text-quiet">
                        <span>{startTripCount.toLocaleString()} starts / {endTripCount.toLocaleString()} returns</span>
                        <span>Peak day: {peakStartDay === null ? 'Not available' : WEEKDAYS[peakStartDay]}</span>
                        <span>Peak hour: {formatHour(peakStartHour)}</span>
                    </div>
                )}
            </span>
        </div>
    );
};