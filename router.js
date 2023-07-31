// router.js
function loadPage(url) {
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById('content').innerHTML = html;
      })
      .catch((error) => {
        console.error('Error loading page:', error);
      });
  }
  
  function handleNavigation() {
    const path = window.location.pathname;
    const url = path === '/' ? '/index.html' : `${path}.html`;
  
    loadPage(url);
  }
  
  document.addEventListener('DOMContentLoaded', handleNavigation);
  
  window.addEventListener('popstate', handleNavigation);
  