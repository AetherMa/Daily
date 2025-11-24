const pad = (num) => String(num).padStart(2, '0');

export const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const parseDate = (value) => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const getMonthLabel = (current) => {
  const date = new Date(current);
  return `${date.getFullYear()}年 ${pad(date.getMonth() + 1)}月`;
};

export const getMonthMatrix = (current) => {
  const date = new Date(current);
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay(); // 0-6
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonthDays = new Date(year, month, 0).getDate();
  const totalCells = 42; // 6 weeks grid
  const cells = [];

  for (let i = 0; i < totalCells; i += 1) {
    const dayNumber = i - startDay + 1;
    let cellDate;
    let isCurrentMonth = true;

    if (dayNumber < 1) {
      cellDate = new Date(year, month - 1, prevMonthDays + dayNumber);
      isCurrentMonth = false;
    } else if (dayNumber > daysInMonth) {
      cellDate = new Date(year, month + 1, dayNumber - daysInMonth);
      isCurrentMonth = false;
    } else {
      cellDate = new Date(year, month, dayNumber);
    }

    const today = new Date();
    const isToday =
      cellDate.getFullYear() === today.getFullYear() &&
      cellDate.getMonth() === today.getMonth() &&
      cellDate.getDate() === today.getDate();

    cells.push({
      dateString: formatDate(cellDate),
      label: cellDate.getDate(),
      isCurrentMonth,
      isToday
    });
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return weeks;
};

export const shiftMonth = (current, offset) => {
  const date = new Date(current);
  date.setMonth(date.getMonth() + offset);
  return date;
};

export const getNextAnniversary = (anniversaries, now = new Date()) => {
  if (!anniversaries?.length) return null;
  const currentYear = now.getFullYear();
  const upcoming = anniversaries
    .map((item) => {
      const [month, day] = item.date.split('-').map(Number);
      let target = new Date(currentYear, month - 1, day);
      if (target < now) {
        target = new Date(currentYear + 1, month - 1, day);
      }
      const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
      return { ...item, targetDate: target, daysLeft: diff };
    })
    .sort((a, b) => a.targetDate - b.targetDate);

  return upcoming[0];
};
