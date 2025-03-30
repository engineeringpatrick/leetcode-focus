const defaultSettings = {
  redirectHome: true,
  hideEditorialComments: true,
  hideDiscussionComments: true,
  hideStoryboard: true
};

chrome.storage.sync.get(defaultSettings, (settings) => {
    if (settings.redirectHome && window.location.pathname === "/") {
      window.location.href = "https://leetcode.com/problemset/";
    }
    
    if (settings.hideEditorialComments || settings.hideDiscussionComments || settings.hideStoryboard) {
      hideComments(settings);
    }
  });

function hideComments(settings) {
  function hideElementsByXPath(xpath) {
    const elements = document.evaluate(
      xpath, 
      document, 
      null, 
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
      null
    );
    
    for (let i = 0; i < elements.snapshotLength; i++) {
      const element = elements.snapshotItem(i);
      if (element) {
        element.style.display = 'none';
      }
    }
  }
  
  function hideElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
  }
  
  const xpathsToHide = [];
  
  if (settings.hideEditorialComments) {
    xpathsToHide.push('/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[5]/div/div[2]/div/div[3]'); // editorial comments area
  }
  
  if (settings.hideDiscussionComments) {
    xpathsToHide.push('/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[4]/div[8]'); // problem discussion section
  }
  
  const observer = new MutationObserver(() => {
    xpathsToHide.forEach(xpath => hideElementsByXPath(xpath));
    if (settings.hideStoryboard) { hideElementsByClass('storyboard'); }
  });
  
  function startObservingAndHide() {
    xpathsToHide.forEach(xpath => hideElementsByXPath(xpath));
    
    if (settings.hideStoryboard) {
      hideElementsByClass('storyboard');
    }
    
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObservingAndHide);
  } else {
    startObservingAndHide();
  }
}