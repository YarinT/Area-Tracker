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

  for (const row of csvData) {
    const [time, date] = row.map((item) => item.trim());
    if (date === todayDate) {
      relevantTime = time;
      break;
    }
  }

  document.getElementById("result").innerText = relevantTime;
}
displayRelevantTime();
