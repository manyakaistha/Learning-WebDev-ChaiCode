// Store moods in localStorage
const STORAGE_KEY = 'moodHistory';

// Emoji and value mapping for moods
const MOOD_DATA = {
    great: { emoji: '😄', value: 5 },
    good: { emoji: '🙂', value: 4 },
    okay: { emoji: '😐', value: 3 },
    bad: { emoji: '😕', value: 2 },
    awful: { emoji: '😢', value: 1 }
};

const MOOD_EMOJIS = Object.fromEntries(
    Object.entries(MOOD_DATA).map(([mood, data]) => [mood, data.emoji])
);

// Initialize mood history from localStorage with error handling
let moodHistory = [];
try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
        moodHistory = JSON.parse(storedData);
        if (!Array.isArray(moodHistory)) {
            console.error('Invalid mood history data format');
            moodHistory = [];
        }
    }
} catch (error) {
    console.error('Error loading mood history:', error);
}

// Getting all DOM elements
const moodButtons = document.querySelectorAll('.mood-btn');
const saveMoodBtn = document.getElementById('saveMood');
const moodHistoryContainer = document.getElementById('moodHistory');
const moodCalendarContainer = document.getElementById('moodCalendar');
const viewButtons = document.querySelectorAll('[data-view]');

let selectedMood = null;
let currentView = 'list';

// Event Listeners
moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedMood = button.dataset.mood;
        button.classList.add('selected');
        saveMood();
        setTimeout(() => button.classList.remove('selected'), 200);
    });
});

viewButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentView = button.dataset.view;
        viewButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayCurrentView();
    });
});

// Save mood entry
function saveMood() {
    if (!selectedMood) return;

    const moodEntry = {
        id: Date.now().toString(),
        mood: selectedMood,
        timestamp: new Date().toISOString()
    };

    try {
        moodHistory.unshift(moodEntry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(moodHistory));
        displayCurrentView();
    } catch (error) {
        console.error('Error saving mood:', error);
        alert('Failed to save mood. Please try again.');
    }
}

// Delete mood entry
function deleteMood(id) {
    try {
        moodHistory = moodHistory.filter(entry => entry.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(moodHistory));
        displayCurrentView();
    } catch (error) {
        console.error('Error deleting mood:', error);
        alert('Failed to delete mood. Please try again.');
    }
}

// Display current view
function displayCurrentView() {
    moodHistoryContainer.classList.toggle('d-none', currentView !== 'list');
    moodCalendarContainer.classList.toggle('d-none', currentView !== 'calendar');

    if (currentView === 'list') {
        displayListView();
    } else {
        displayCalendarView();
    }
}

// Display list view
function displayListView() {
    moodHistoryContainer.innerHTML = moodHistory.length ?
        moodHistory.map(createMoodEntryHTML).join('') :
        '<p class="text-muted">No mood entries yet.</p>';
}

// Mapping from mood values back to mood names
const moodValueToName = {
    5: 'great',
    4: 'good',
    3: 'okay',
    2: 'bad',
    1: 'awful'
};

// Calculate average mood on a certain day
function calculateAverageMoodForDay(date) {
    const targetDate = date.toDateString();
    const dayMoods = moodHistory.filter(entry => new Date(entry.timestamp).toDateString() === targetDate);

    if (!dayMoods.length) return null;

    const avgValue = Math.round(
        dayMoods.reduce((sum, entry) => sum + MOOD_DATA[entry.mood].value, 0) / dayMoods.length
    );
    return moodValueToName[avgValue];
}

// Display calendar view
function displayCalendarView() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const monthName = now.toLocaleString('en-US', { month: 'long' });

    const calendarHTML = [
        `<div class="text-center mb-3"><h3>${monthName} ${year}</h3></div>`,
        '<div class="calendar-grid">',
        // Add weekday headers
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            .map(day => `<div class="calendar-header">${day}</div>`).join(''),
        // Add empty cells for days before the first day of the month
        '<div class="calendar-day empty"></div>'.repeat(firstDay.getDay()),
        // Add cells for each day of the month
        Array.from({ length: lastDay.getDate() }, (_, i) => {
            const date = new Date(year, month, i + 1);
            const averageMood = calculateAverageMoodForDay(date);
            return `
                <div class="calendar-day">
                    <div class="day-number">${i + 1}</div>
                    ${averageMood ? `
                        <div class="mood-emoji">${MOOD_EMOJIS[averageMood]}</div>
                        <div class="mood-name text-capitalize">${averageMood}</div>
                    ` : ''}
                </div>
            `;
        }).join(''),
        '</div>' // Close grid container
    ].join('');

    moodCalendarContainer.innerHTML = calendarHTML;
}

// Create HTML for a mood entry
function createMoodEntryHTML(entry) {
    const date = new Date(entry.timestamp);
    const formattedDate = date.toLocaleString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
    });

    return `
        <div class="mood-entry">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="mood-emoji">${MOOD_EMOJIS[entry.mood]}</span>
                    <span class="mood-name text-capitalize">${entry.mood}</span>
                </div>
                <span class="mood-date">${formattedDate}</span>
                <button class="btn btn-sm btn-outline-danger delete-mood" onclick="deleteMood('${entry.id}')">×</button>
            </div>
        </div>
    `;
}
// Initial display
displayCurrentView();
viewButtons[0].classList.add('active');