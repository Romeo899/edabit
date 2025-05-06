const fs = require("fs");

const logFile = "log.json";
if (!fs.existsSync(logFile)) {
  console.log("No log file found.");
  process.exit();
}

const logs = JSON.parse(fs.readFileSync(logFile, "utf8"));
const now = new Date();
const today = now.toISOString().slice(0, 10);

let counters = {
  today: 0,
  yesterday: 0,
  week: 0,
  month: 0,
  year: 0,
  total: logs.length
};

const startOfWeek = new Date(now);
startOfWeek.setDate(now.getDate() - now.getDay());
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const startOfYear = new Date(now.getFullYear(), 0, 1);

logs.forEach(log => {
  const date = new Date(log.createdAt);
  const dateStr = date.toISOString().slice(0, 10);

  if (dateStr === today) counters.today++;

  const yest = new Date(now);
  yest.setDate(now.getDate() - 1);
  const yesterdayStr = yest.toISOString().slice(0, 10);
  if (dateStr === yesterdayStr) counters.yesterday++;

  if (date >= startOfWeek) counters.week++;
  if (date >= startOfMonth) counters.month++;
  if (date >= startOfYear) counters.year++;
});

console.log("📊 Completion Stats:");
console.log(`Today:      ${counters.today}`);
console.log(`Yesterday:  ${counters.yesterday}`);
console.log(`This week:  ${counters.week}`);
console.log(`This month: ${counters.month}`);
console.log(`This year:  ${counters.year}`);
console.log(`Total:      ${counters.total}`);
