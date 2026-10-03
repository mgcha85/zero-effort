export interface TripEntry {
  id: string;
  entryDate: string; // YYYY-MM-DD
  exitDate: string;  // YYYY-MM-DD
  country?: string;
  note?: string;
}

export interface DayStayInfo {
  dateStr: string;
  isStay: boolean;
  tripId?: string;
  count180: number; // number of stay days in [date - 179, date]
  isOverstay: boolean;
}

export interface SchengenStatus {
  referenceDate: string;
  usedDays: number;
  remainingDays: number;
  isOverstay: boolean;
  overstayDays: number;
  // Simulation: entering on referenceDate (or today)
  maxStayDays: number;
  latestExitDate: string;
  // Full reset date
  completeResetDate: string | null;
  dayTimeline: DayStayInfo[];
}
