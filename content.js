function onDOMLoaded() {
  const targetElement = document.querySelector('#editor');
  let currentTime = new Date(); // Total time spent on the page
  let changeCount = 0; // Counter for tracking the number of changes
  let time = null; // Timer
  let lang = null;

  const startTimer = () => {
    time = Date.now();
    console.log('WakaTimer started');
    const text = targetElement.textContent.trim();
    lang = detectLanguage(text);
    console.log('Language:', lang);
  };

  const stopTimer = () => {
    const totalTime = Date.now() - time;
    const totalTimeOnPage = Date.now() - currentTime;
    time = null;
    console.log('Timer stopped');
    console.log('Result:', totalTime);
    console.log('Language:', lang);

    const wakaTime = 'wakatime'; // Replace with your WakaTime key
    const storedData = localStorage.getItem(wakaTime);
    let data = storedData ? JSON.parse(storedData) : [];
    const currentDate = new Date();
    data.push({
      dateTime: currentDate,
      totalTime,
      totalTimeOnPage,
      language: lang,
    });
    localStorage.setItem(wakaTime, JSON.stringify(data));
  };

  const detectLanguage = (text) => {
    const lowercaseText = text.toLowerCase();

    if (lowercaseText.includes('javascript')) {
      return 'JavaScript';
    } else if (lowercaseText.includes('java')) {
      return 'Java';
    } else if (lowercaseText.includes('python')) {
      return 'Python';
    } else if (lowercaseText.includes('c++')) {
      return 'C++';
    } else if (lowercaseText.includes('c')) {
      return 'C';
    }
    // Add more conditions for other languages

    return 'Unknown';
  };

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
          changeCount++;

          if (changeCount === 1 && time === null) {
            startTimer();
          }
        }
      }
    }
  });

  window.addEventListener('beforeunload', stopTimer);
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
  setTimeout(() => onDOMLoaded(), 10000);
}
