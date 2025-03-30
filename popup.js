const defaultSettings = {
  redirectHome: true,
  hideEditorialComments: true,
  hideDiscussionComments: true,
  hideStoryboard: true
};

document.addEventListener('DOMContentLoaded', () => {
  const redirectHomeToggle = document.getElementById('redirectHome');
  const hideEditorialCommentsToggle = document.getElementById('hideEditorialComments');
  const hideDiscussionCommentsToggle = document.getElementById('hideDiscussionComments');
  const hideStoryboardToggle = document.getElementById('hideStoryboard');
  chrome.storage.sync.get(defaultSettings, (settings) => {
    redirectHomeToggle.checked = settings.redirectHome;
    hideEditorialCommentsToggle.checked = settings.hideEditorialComments;
    hideDiscussionCommentsToggle.checked = settings.hideDiscussionComments;
    hideStoryboardToggle.checked = settings.hideStoryboard;
  });
  
  redirectHomeToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ redirectHome: redirectHomeToggle.checked });
  });
  
  hideEditorialCommentsToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ hideEditorialComments: hideEditorialCommentsToggle.checked });
  });
  
  hideDiscussionCommentsToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ hideDiscussionComments: hideDiscussionCommentsToggle.checked });
  });

  hideStoryboardToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ hideStoryboard: hideStoryboardToggle.checked });
  });
}); 