// Fetch the latest news content from the server
window.onload = function() {
    fetch('newsContent.json')
      .then(response => response.json())
      .then(data => {
        document.getElementById('newsContent').textContent = data.news || 'No news available.';
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        document.getElementById('newsContent').textContent = 'Error loading news.';
      });
  };
  