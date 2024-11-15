window.onload = function () {
  const newsContentElement = document.getElementById("newsContent");
  let currentIndex = 0;
  let newsItems = [];

  function updateNewsContent() {
    fetch("newsContent.json" + "?t=" + new Date().getTime())
      .then((response) => response.json())
      .then((data) => {
        newsItems = data || ["אין עדכונים חדשים."];
        displayNextNewsItem();
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        newsContentElement.textContent = "שגיאה בטעינת העדכונים";
      });
  }

  function displayNextNewsItem() {
    if (newsItems.length > 0) {
      // If only one update, display it without animation
      if (newsItems.length === 1) {
        newsContentElement.classList.remove('animate', 'multiple-updates');
        newsContentElement.textContent = newsItems[0];
        return;
      }

      // Multiple updates - show with animation
      newsContentElement.classList.remove('animate', 'multiple-updates');
      void newsContentElement.offsetWidth; // Trigger reflow to restart animation
      newsContentElement.textContent = newsItems[currentIndex];
      newsContentElement.classList.add('animate', 'multiple-updates');
      currentIndex = (currentIndex + 1) % newsItems.length;
    }
  }

  // Initial load
  updateNewsContent();
  
  // Check for updates every 5 seconds
  setInterval(updateNewsContent, 5000);
  
  // Display interval for multiple updates
  setInterval(() => {
    if (newsItems.length > 1) {
      displayNextNewsItem();
    }
  }, 5000);
};
