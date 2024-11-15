window.onload = function () {
  const newsContentElement = document.getElementById("newsContent");
  let currentIndex = 0;
  let newsItems = [];
  let isAnimating = false;

  function updateNewsContent() {
    fetch("newsContent.json" + "?t=" + new Date().getTime())
      .then((response) => response.json())
      .then((data) => {
        newsItems = data || ["אין עדכונים חדשים."];
        if (currentIndex === 0) {
          displayNextNewsItem();
        }
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        newsContentElement.textContent = "שגיאה בטעינת העדכונים";
      });
  }

  function displayNextNewsItem() {
    if (newsItems.length > 0 && !isAnimating) {
      // If only one update, display it without animation
      if (newsItems.length === 1) {
        newsContentElement.classList.remove('animate', 'multiple-updates');
        newsContentElement.textContent = newsItems[0];
        return;
      }

      // Multiple updates - show with animation
      isAnimating = true;

      // Create and append next update element
      const nextIndex = (currentIndex + 1) % newsItems.length;
      const nextUpdate = document.createElement('div');
      nextUpdate.className = 'news-item animate multiple-updates';
      nextUpdate.textContent = newsItems[nextIndex];
      
      // Clear and update content
      newsContentElement.innerHTML = '';
      newsContentElement.appendChild(nextUpdate);

      // Update current index
      currentIndex = nextIndex;

      // Reset animation flag after animation completes
      setTimeout(() => {
        isAnimating = false;
        displayNextNewsItem();
      }, 5000);
    }
  }

  // Initial load
  updateNewsContent();
  
  // Check for new content every 10 seconds
  setInterval(updateNewsContent, 10000);
};
