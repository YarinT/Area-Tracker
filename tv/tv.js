const csvUrl = "/tv/close2025.csv";

async function fetchCsv() {
  const res = await fetch(csvUrl);
  const text = await res.text();
  return text
    .trim()
    .split("\n")
    .map((row) => row.split(",").map((s) => s.trim()))
    .filter((row) => row.length >= 2 && row[0] && row[1]);
}

function formatToday() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

async function displayRelevantTime() {
  const csvData = await fetchCsv();
  const todayDate = formatToday();

  let relevantTime = "לא זמין";
  let endDate = null;
  let nextTimeAfterRange = null;

  for (let i = 0; i < csvData.length; i++) {
    const [time, date] = csvData[i];

    if (date === todayDate) {
      // מצאנו את התאריך של היום
      relevantTime = time;
      endDate = date;

      // בודקים אם יש ימים עוקבים עם אותה שעה
      let j = i + 1;
      while (j < csvData.length && csvData[j][0] === time) {
        endDate = csvData[j][1];
        j++;
      }

      // אם לאחר הטווח יש שעה אחרת - נשמור אותה
      if (j < csvData.length) {
        nextTimeAfterRange = csvData[j][0];
      }
      break;
    }
  }

  const resultEl = document.getElementById("result");
  const untilEl  = document.getElementById("until");

  resultEl.innerText = relevantTime;

  // מציג הודעה משולבת: "עד לתאריך X, ולאחר מכן HH:MM"
  if (relevantTime !== "לא זמין" && endDate) {
    const afterPart = nextTimeAfterRange
      ? `, ולאחר מכן <span class="time-pill">${nextTimeAfterRange}</span>`
      : "";
    untilEl.innerHTML = `עד לתאריך ${endDate}${afterPart}`;
  } else {
    untilEl.innerText = "";
  }
}

// רענון כל דקה
setInterval(displayRelevantTime, 60000);
displayRelevantTime();
