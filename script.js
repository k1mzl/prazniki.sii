const holidays = [
  {
    date: '2026-01-01',
    name: 'Novo leto',
    type: 'Državni praznik',
    emoji: '🎉',
    description: 'Prvi dan novega leta, pustite si čas za počitek in družino.',
    isOffDay: true,
  },
  {
    date: '2026-01-02',
    name: 'Dan samostojnosti in enotnosti',
    type: 'Državni praznik',
    emoji: '🇸🇮',
    description: 'Obeležujemo samostojno in enotno Slovenijo.',
    isOffDay: true,
  },
  {
    date: '2026-02-08',
    name: 'Prešernov dan',
    type: 'Kulturni praznik',
    emoji: '🎓',
    description: 'Slovenski kulturni praznik v spomin Francetu Prešernu.',
    isOffDay: true,
  },
  {
    date: '2026-04-09',
    name: 'Velika noč',
    type: 'Verski praznik',
    emoji: '🐣',
    description: 'Glavni verski praznik z dediščino ljudskih običajev.',
    isOffDay: true,
  },
  {
    date: '2026-04-10',
    name: 'Velikonočni ponedeljek',
    type: 'Verski praznik',
    emoji: '🌷',
    description: 'Prah praznični ponedeljek s tradicionalnimi običaji.',
    isOffDay: true,
  },
  {
    date: '2026-05-01',
    name: 'Praznik dela',
    type: 'Državni praznik',
    emoji: '🛠️',
    description: 'Praznik dela in delaških pravic.',
    isOffDay: true,
  },
  {
    date: '2026-05-02',
    name: 'Dan upora proti okupatorju',
    type: 'Državni praznik',
    emoji: '✊',
    description: 'Spomin na odpor med drugo svetovno vojno.',
    isOffDay: true,
  },
  {
    date: '2026-06-25',
    name: 'Dan državnosti',
    type: 'Državni praznik',
    emoji: '📜',
    description: 'Slovenski državni praznik ob razglasitvi neodvisnosti.',
    isOffDay: true,
  },
  {
    date: '2026-08-15',
    name: 'Marijino vnebovzetje',
    type: 'Verski praznik',
    emoji: '⛪',
    description: 'Verski in kulturni praznik s tradicijo počitnic.',
    isOffDay: true,
  },
  {
    date: '2026-10-31',
    name: 'Dan reformacije',
    type: 'Verski praznik',
    emoji: '📖',
    description: 'Spomin na reformacijo in njen vpliv na jezik.',
    isOffDay: true,
  },
  {
    date: '2026-11-01',
    name: 'Dan spomina na mrtve',
    type: 'Verski praznik',
    emoji: '🕯️',
    description: 'Dan spomina na pokojne, svečke in obisk grobov.',
    isOffDay: true,
  },
  {
    date: '2026-12-24',
    name: 'Božični večer',
    type: 'Verski praznik',
    emoji: '🎄',
    description: 'Večer pred Božičem s tradicionalno družino večerjo.',
    isOffDay: false,
  },
  {
    date: '2026-12-25',
    name: 'Božič',
    type: 'Verski praznik',
    emoji: '🎅',
    description: 'Božični praznik in čas obdarovanja.',
    isOffDay: true,
  },
  {
    date: '2026-12-26',
    name: 'Dan samostojnosti in enotnosti',
    type: 'Dodatni praznik',
    emoji: '🌟',
    description: 'Podaljšan praznični dan po Božiču.',
    isOffDay: true,
  },
];

const monthNames = [
  'Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij',
  'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December'
];

const weekdayNames = ['Ned', 'Pon', 'Tor', 'Sre', 'Če', 'Pet', 'Sob'];

const holidayColors = {
  'Državni praznik': '#2563eb',
  'Kulturni praznik': '#f97316',
  'Verski praznik': '#10b981',
  'Dodatni praznik': '#8b5cf6'
};

// Specific holiday color overrides (more thematic colors)
const holidayColorOverrides = {
  'Božič': '#dc2626',
  'Božični večer': '#b91c1c',
  'Novo leto': '#f59e0b',
  'Prešernov dan': '#7c3aed',
};

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function getContrastColor(hex) {
  try {
    const [r, g, b] = hexToRgb(hex);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? '#0f172a' : '#ffffff';
  } catch (e) {
    return '#ffffff';
  }
}

const todayDate = new Date();
const todayDateString = todayDate.toISOString().slice(0, 10);

const calendarGrid = document.getElementById('calendarGrid');
const monthTitle = document.getElementById('monthTitle');
const selectedDateLabel = document.getElementById('selectedDate');
const selectedHolidayInfo = document.getElementById('selectedHolidayInfo');
const holidayList = document.getElementById('holidayList');
const holidaySearch = document.getElementById('holidaySearch');
const todayButton = document.getElementById('todayButton');
const currentMonthButton = document.getElementById('currentMonthButton');
const resultCount = document.getElementById('resultCount');

let currentDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
let selectedDate = todayDateString;

function getHolidayByDate(dateString) {
  return holidays.find((item) => item.date === dateString);
}

function formatDate(date) {
  return date.toLocaleDateString('sl-SI', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

function renderCalendar(year, month) {
  calendarGrid.innerHTML = '';
  monthTitle.textContent = `${monthNames[month]} ${year}`;

  weekdayNames.forEach((day) => {
    const weekday = document.createElement('div');
    weekday.className = 'weekday';
    weekday.textContent = day;
    calendarGrid.appendChild(weekday);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousDays = new Date(year, month, 0).getDate();
  const totalSlots = 42;

  for (let i = 0; i < totalSlots; i += 1) {
    const button = document.createElement('button');
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';

    let day = i - firstDay + 1;
    let dateValue;
    if (i < firstDay) {
      day = previousDays - (firstDay - 1 - i);
      button.classList.add('inactive');
      dateValue = new Date(year, month - 1, day);
    } else if (day > daysInMonth) {
      day = day - daysInMonth;
      button.classList.add('inactive');
      dateValue = new Date(year, month + 1, day);
    } else {
      dateValue = new Date(year, month, day);
    }

    button.appendChild(dayNumber);
    dayNumber.textContent = day;
    button.dataset.date = dateValue.toISOString().slice(0, 10);

    const holiday = getHolidayByDate(button.dataset.date);
    if (holiday) {
      const dot = document.createElement('span');
      dot.className = 'holiday-dot';
      const overrideColor = holidayColorOverrides[holiday.name];
      const color = overrideColor || holidayColors[holiday.type] || '#2563eb';
      dot.style.backgroundColor = color;
      dot.title = `${holiday.name} — ${holiday.type}`;
      button.appendChild(dot);
      button.title = `${holiday.name} — ${holiday.type}`;
    }

    if (button.dataset.date === todayDateString) {
      button.classList.add('today');
      button.setAttribute('aria-label', `Danes: ${button.dataset.date}`);
    }

    if (selectedDate === button.dataset.date) {
      button.classList.add('selected');
    }

    if (!button.classList.contains('inactive')) {
      button.addEventListener('click', () => handleDateClick(button.dataset.date));
    }

    calendarGrid.appendChild(button);
  }
}

function scrollSelectedIntoView() {
  const selectedButton = calendarGrid.querySelector('button.selected');
  if (selectedButton) {
    selectedButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function handleDateClick(dateString, options = {}) {
  selectedDate = dateString;
  const target = new Date(dateString);
  currentDate = new Date(target.getFullYear(), target.getMonth(), 1);
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  renderSelectedDate();

  if (options.scroll !== false) {
    scrollSelectedIntoView();
  }
}

function renderSelectedDate() {
  if (!selectedDate) {
    selectedDateLabel.textContent = 'Noben datum ni izbran.';
    selectedHolidayInfo.innerHTML = '<p>Izberi datum na koledarju, da si ga označiš in preveriš praznik.</p>';
    return;
  }

  const date = new Date(selectedDate);
  selectedDateLabel.textContent = formatDate(date);
  const holiday = getHolidayByDate(selectedDate);

  if (holiday) {
    selectedHolidayInfo.innerHTML = `
      <div class="selected-badge">${holiday.emoji} ${holiday.type}</div>
      <h3>${holiday.name}</h3>
      <p><strong>Opis:</strong> ${holiday.description}</p>
      <p><strong>Dela prost dan:</strong> ${holiday.isOffDay ? 'Da' : 'Ne'}</p>
    `;
  } else {
    selectedHolidayInfo.innerHTML = `
      <p>To ni državni praznik, a ga lahko vseeno zabeležiš kot svoj označeni datum.</p>
    `;
  }
}

function renderHolidayList(filter = '') {
  const normalized = filter.trim().toLowerCase();
  const filtered = holidays.filter((item) => {
    return (
      item.name.toLowerCase().includes(normalized) ||
      item.type.toLowerCase().includes(normalized) ||
      item.description.toLowerCase().includes(normalized)
    );
  });
  if (resultCount) {
    resultCount.textContent = `Prikazanih ${filtered.length} od ${holidays.length} praznikov.`;
  }
  holidayList.innerHTML = '';

  if (!filtered.length) {
    const empty = document.createElement('p');
    empty.textContent = 'Ni praznikov, ki ustrezajo iskanju.';
    empty.style.color = '#64748b';
    holidayList.appendChild(empty);
    return;
  }

  filtered.forEach((holiday) => {
    const item = document.createElement('article');
    item.className = 'holiday-item';
    item.title = `${holiday.description}`;
    item.innerHTML = `
      <div class="holiday-item-top">
        <span class="holiday-emoji">${holiday.emoji}</span>
        <div>
          <h3>${holiday.name}</h3>
          <div class="holiday-meta">${holiday.type} · ${holiday.isOffDay ? 'dela prost dan' : 'ne dela prost dan'}</div>
        </div>
      </div>
      <div class="holiday-date">📅 ${holiday.date}</div>
    `;
    item.addEventListener('click', () => handleDateClick(holiday.date));
    holidayList.appendChild(item);
    // color the emoji background to match holiday type / override
    const emojiEl = item.querySelector('.holiday-emoji');
    if (emojiEl) {
      const override = holidayColorOverrides[holiday.name];
      const base = holidayColors[holiday.type] || '#2563eb';
      const finalColor = override || base;
      emojiEl.style.backgroundColor = finalColor;
      emojiEl.style.color = getContrastColor(finalColor);
    }
  });
}

function init() {
  document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  });

  document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  });

  todayButton.addEventListener('click', () => {
    handleDateClick(todayDateString);
  });

  currentMonthButton.addEventListener('click', () => {
    currentDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  });

  holidaySearch.addEventListener('input', (event) => {
    renderHolidayList(event.target.value);
  });

  holidaySearch.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      holidaySearch.value = '';
      renderHolidayList('');
    }
  });

  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  renderSelectedDate();
  renderHolidayList();
}

init();
