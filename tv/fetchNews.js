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
      if (newsItems.length === 1) {
        newsContentElement.classList.remove('animate', 'multiple-updates');
        newsContentElement.textContent = newsItems[0];
        return;
      }

      isAnimating = true;

      const nextIndex = (currentIndex + 1) % newsItems.length;
      const nextUpdate = document.createElement('div');
      nextUpdate.className = 'news-item';
      nextUpdate.textContent = newsItems[nextIndex];
      nextUpdate.style.opacity = '0';
      
      newsContentElement.innerHTML = '';
      newsContentElement.appendChild(nextUpdate);

      void nextUpdate.offsetWidth;
      nextUpdate.classList.add('animate', 'multiple-updates');

      currentIndex = nextIndex;

      setTimeout(() => {
        isAnimating = false;
        displayNextNewsItem();
      }, 5000);
    }
  }

  updateNewsContent();
  setInterval(updateNewsContent, 10000);
};
