import type { TripEntry, SchengenStatus, DayStayInfo } from './types';

const MS_PER_DAY = 86400000;

export function parseDateToDayIndex(dateStr: string): number {
  const parts = dateStr.split('-');
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  return Math.floor(Date.UTC(y, m, d) / MS_PER_DAY);
}

export function dayIndexToDateStr(dayIndex: number): string {
  const date = new Date(dayIndex * MS_PER_DAY);
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getTodayDateStr(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Builds a Set of all day indices spent in Schengen from a list of trips.
 */
export function buildStayDaySet(trips: TripEntry[]): Map<number, string> {
  const stayMap = new Map<number, string>(); // dayIndex -> tripId
  for (const trip of trips) {
    if (!trip.entryDate || !trip.exitDate) continue;
    const start = parseDateToDayIndex(trip.entryDate);
    const end = parseDateToDayIndex(trip.exitDate);
    if (start <= end) {
      for (let day = start; day <= end; day++) {
        stayMap.set(day, trip.id);
      }
    }
  }
  return stayMap;
}

/**
 * Counts days spent in Schengen in the 180-day window [refDay - 179, refDay]
 */
export function countDaysInWindow(stayMap: Map<number, string> | Set<number>, refDay: number): number {
  let count = 0;
  const startWindow = refDay - 179;
  for (let day = startWindow; day <= refDay; day++) {
    if (stayMap.has(day)) {
      count++;
    }
  }
  return count;
}

/**
 * Simulates a continuous stay starting from proposedEntryDay.
 * Returns the maximum days of continuous stay allowed (max 90) and the exit day index.
 */
export function simulateContinuousStay(
  pastStayMap: Map<number, string>,
  proposedEntryDay: number
): { maxDays: number; latestExitDay: number } {
  // We simulate day by day: proposedEntryDay, proposedEntryDay + 1, ...
  const simulatedSet = new Set<number>();
  // Only include days from pastStayMap that are strictly BEFORE proposedEntryDay
  for (const day of pastStayMap.keys()) {
    if (day < proposedEntryDay) {
      simulatedSet.add(day);
    }
  }

  let dayOffset = 0;
  while (dayOffset < 90) {
    const currentDay = proposedEntryDay + dayOffset;
    simulatedSet.add(currentDay);
    const countInWindow = countDaysInWindow(simulatedSet, currentDay);
    if (countInWindow > 90) {
      // Exceeded limit on currentDay! The last valid day was currentDay - 1
      simulatedSet.delete(currentDay);
      break;
    }
    dayOffset++;
  }

  if (dayOffset === 0) {
    return { maxDays: 0, latestExitDay: proposedEntryDay };
  }

  return {
    maxDays: dayOffset,
    latestExitDay: proposedEntryDay + dayOffset - 1
  };
}

/**
 * Full calculation of Schengen status for a given reference date (usually today or travel date).
 */
export function calculateSchengen(trips: TripEntry[], referenceDateStr: string): SchengenStatus {
  const stayMap = buildStayDaySet(trips);
  const refDay = parseDateToDayIndex(referenceDateStr);

  const usedDays = countDaysInWindow(stayMap, refDay);
  const remainingDays = Math.max(0, 90 - usedDays);
  const isOverstay = usedDays > 90;
  const overstayDays = isOverstay ? usedDays - 90 : 0;

  // Simulation starting from refDay
  const simulation = simulateContinuousStay(stayMap, refDay);
  const latestExitDate = dayIndexToDateStr(simulation.latestExitDay);

  // Complete reset date: find when window contains 0 days
  let completeResetDate: string | null = null;
  if (stayMap.size > 0) {
    let latestStayDay = -Infinity;
    for (const d of stayMap.keys()) {
      if (d > latestStayDay) latestStayDay = d;
    }
    // 180 days after the last exit day, all past stays fall out of the 180-day window
    completeResetDate = dayIndexToDateStr(latestStayDay + 180);
  }

  // Generate 180-day visual timeline ending at max(refDay, simulation.latestExitDay)
  const timelineEndDay = Math.max(refDay, simulation.latestExitDay);
  const timelineStartDay = timelineEndDay - 179;
  const dayTimeline: DayStayInfo[] = [];

  for (let d = timelineStartDay; d <= timelineEndDay; d++) {
    const isStay = stayMap.has(d);
    const tripId = stayMap.get(d);
    const count180 = countDaysInWindow(stayMap, d);
    dayTimeline.push({
      dateStr: dayIndexToDateStr(d),
      isStay,
      tripId,
      count180,
      isOverstay: count180 > 90
    });
  }

  return {
    referenceDate: referenceDateStr,
    usedDays,
    remainingDays,
    isOverstay,
    overstayDays,
    maxStayDays: simulation.maxDays,
    latestExitDate,
    completeResetDate,
    dayTimeline
  };
}
