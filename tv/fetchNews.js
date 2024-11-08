// Fetch the latest news content every 30 seconds
window.onload = function() {
    // Function to fetch and update the news content
    function updateNewsContent() {
      fetch('newsContent.json')
        .then(response => response.json())
        .then(data => {
          // Update the news content in the newsContent div
          document.getElementById('newsContent').textContent = data.news || 'No news available.';
        })
        .catch(error => {
          console.error('Error fetching news:', error);
          document.getElementById('newsContent').textContent = 'Error loading news.';
        });
    }
  
    // Call the function once when the page loads
    updateNewsContent();
  
    // Set an interval to refresh the news every 30 seconds (10000 ms)
    setInterval(updateNewsContent, 30000); // Adjust the time as needed
  };
  