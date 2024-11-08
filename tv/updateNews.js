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
  