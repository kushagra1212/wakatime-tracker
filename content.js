console.log('Hello from cnt');

// Function to be executed when the DOM is fully loaded
function onDOMLoaded() {
  const targetElement = document.querySelector('#editor');
  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        const addedElements = Array.from(mutation.addedNodes).filter(
          (node) => node.nodeType === Node.ELEMENT_NODE
        );
        const changedElements = addedElements.concat(mutation.target);
        const changedText = Array.from(changedElements).map((element) =>
          element.textContent.trim()
        );
        if (changedText.length > 0) {
          console.log('Content has changed:', changedText);
        }
      }
    }
  });
  observer.observe(targetElement, {
    childList: true,
    characterData: true,
    subtree: true,
  });
}

// Check if the DOM is already loaded or add an event listener
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onDOMLoaded);
} else {
  onDOMLoaded();
}
