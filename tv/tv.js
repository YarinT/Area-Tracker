const csvUrl = "/newtv/close2024.csv";
async function fetchCsv() {
  const response = await fetch(csvUrl);
  const text = await response.text();
  return text.split("\n").map((row) => row.split(","));
}

async function displayRelevantTime() {
  const csvData = await fetchCsv();
  const today = new Date();

  const todayDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

  let relevantTime = "לא זמין";
  let endDate = null;

  for (let i = 0; i < csvData.length; i++) {
    const [time, date] = csvData[i].map((item) => item.trim());

    // Find the entry for today's date
    if (date === todayDate) {
      relevantTime = time;

      // Check consecutive rows for the same time and update endDate
      for (let j = i + 1; j < csvData.length; j++) {
        const [nextTime, nextDate] = csvData[j].map((item) => item.trim());
        if (nextTime !== time) break; // Stop if the time differs

        endDate = nextDate; // Update end date if time matches
      }
      break;
    }
  }

  // Display either the single time or the range message
  const resultElement = document.getElementById("result");
  const untilEl = document.getElementById("until");
  resultElement.innerText = relevantTime;
  untilEl.innerText = `עד לתאריך ${endDate}`;
}
displayRelevantTime();
