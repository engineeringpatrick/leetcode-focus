if (window.location.pathname === "/") {
    window.location.href = "https://leetcode.com/problemset/";
}

// Function to hide comments on LeetCode pages
function hideComments() {
    // Inject CSS to hide comments
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.runtime.getURL('css/hide-comments.css');
    document.head.appendChild(style);
    
    // Hide elements by XPath
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
    
    const xpathsToHide = [
        '/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[5]/div/div[2]/div/div[3]', // editorial comments area
        '/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[4]/div[8]' // problem discussion section
    ];
    
    xpathsToHide.forEach(xpath => hideElementsByXPath(xpath));
    
    // Additional dynamic hiding for comments that might load later
    const observer = new MutationObserver((mutations) => {
        xpathsToHide.forEach(xpath => hideElementsByXPath(xpath));
    });
    
    // Start observing the document with configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
}

// Run on page load
document.addEventListener('DOMContentLoaded', hideComments);

// Also run immediately in case DOM is already loaded
hideComments();