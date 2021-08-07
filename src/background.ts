function polling() {
  // console.log("polling");
  setTimeout(polling, 1000 * 30);
}

polling();

chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.sync.get((items) => {
    if (items.enabled == null) chrome.storage.sync.set({ enabled: true });
  })
})

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
      // chrome.tabs.executeScript({file: 'js/content_script.js'});
    // do your things

  }
})