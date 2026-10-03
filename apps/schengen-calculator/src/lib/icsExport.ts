export function generateSchengenIcs(departureDateStr: string, allowedDays: number): string {
  // departureDateStr is YYYY-MM-DD
  const dateFormatted = departureDateStr.replace(/-/g, '');
  const now = new Date();
  const dtStamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `schengen-${Date.now()}@zeroeffort.app`;

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ZeroEffort//Schengen 90/180 Tracker//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;VALUE=DATE:${dateFormatted}`,
    `DTEND;VALUE=DATE:${dateFormatted}`,
    'SUMMARY:⚠️ Schengen Max Stay Deadline (Must Exit Area Today)',
    `DESCRIPTION:Latest permitted departure date under the Schengen 90/180-day rule. Maximum permitted stay: ${allowedDays} days. Avoid overstay fines and entry bans.`,
    'STATUS:CONFIRMED',
    'TRANSP:TRANSPARENT',
    'BEGIN:VALARM',
    'TRIGGER:-P3D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Schengen 90/180 departure in 3 days',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:PT9H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Today is your final allowed Schengen departure date',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ];

  return icsLines.join('\r\n');
}

export function downloadIcsFile(departureDateStr: string, allowedDays: number) {
  const icsContent = generateSchengenIcs(departureDateStr, allowedDays);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `schengen_departure_deadline_${departureDateStr}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
