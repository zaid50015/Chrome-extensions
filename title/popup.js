
  const getTitleButton = document.getElementById("getTitleButton");
  const titleDisplay = document.getElementById("titleDisplay");

  getTitleButton.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const currentTab = tabs[0];
      const tabTitle = currentTab.title;
      titleDisplay.innerHTML = `<h3>Tab Title: ${tabTitle}</h3>`;
    });
  });

