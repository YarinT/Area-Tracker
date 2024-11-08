// Fetch the current news content from newsContent.json when the page loads
window.onload = function() {
  fetch('newsContent.json')
    .then(response => response.json())
    .then(data => {
      // Pre-populate the textarea with the current news
      document.getElementById('newsContent').value = data.news;
    })
    .catch(error => {
      console.error('Error fetching news:', error);
      document.getElementById('newsContent').value = 'Error loading news.';
    });
};

// Function to send the updated news to the server
function updateNews() {
  const updatedNews = document.getElementById('newsContent').value;

  // Ensure the updated news is not empty
  if (updatedNews.trim() === "") {
    alert("אנא הכנס תוכן לפני שמירה.");
    return;
  }

  // Send the updated news to the server using fetch
  fetch('update-news.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `news=${encodeURIComponent(updatedNews)}`
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      alert('העדכון בוצע בהצלחה');
    } else {
      alert('שגיאה: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('אירעה שגיאה בעת עדכון הנתונים.');
  });
}
