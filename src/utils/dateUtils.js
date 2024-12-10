const holidays = [
  // 这里应该填充法定节假日
];

export function calculateEndDate(task) {
  let currentDate = new Date(task.startDate);
  let workDaysCounted = 0;

  while (workDaysCounted < task.workDays) {
    currentDate.setDate(currentDate.getDate() + 1);
    
    if (isWorkDay(currentDate, task.includeSaturday, task.includeSunday, holidays)) {
      workDaysCounted++;
    }
  }
  return currentDate;
}

function isWorkDay(date, includeSaturday, includeSunday, holidays) {
  const day = date.getDay();
  const holiday = holidays.find(h => h.date === date.toISOString().split('T')[0]);

  if ((day === 6 && !includeSaturday) || (day === 0 && !includeSunday)) {
    return false;
  }

  if (holiday && !includeHolidays) {
    return false;
  }

  return true;
}
