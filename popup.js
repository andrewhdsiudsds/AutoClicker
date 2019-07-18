// Timer
var timer;
var isStarted = false;
var led = document.getElementById("led");
var label = document.getElementById("label");

// Start function
function start() {
  setStatus(true);
  let datetime_picker = document.getElementById("datetime-picker");

  let now = new Date(); // Get current date and time

  if (datetime_picker.value === "") {
    injectTheScript();
    setStatus(false);
  } else {
    let selectedDate = new Date(datetime_picker.value);
    let startTime = selectedDate - now; // Set Start Time
    timer = setTimeout(function() {
      injectTheScript();
      setStatus(false);
    }, startTime);
  }
}

// Stop function
function stop() {
  clearTimeout(timer);
  setStatus(false);
}

function setStatus(status) {
  switch (status) {
    case true:
      led.classList.remove("red");
      led.classList.add("green");
      label.innerHTML = "Started";
      break;
    case false:
      led.classList.remove("green");
      led.classList.add("red");
      label.innerHTML = "Stopped";
      break;
  }
}

// Inject Trigger to the current active Web Page
function injectTheScript() {
  let xpath = document.getElementById("xpath-input").value || "";
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript({
      code: `
      (function () {
        let btn = new XPathEvaluator()
        .createExpression("${xpath}")
        .evaluate(document, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
        btn.click();
       })();
      `
    });
  });
}

document.getElementById("startBtn").addEventListener("click", start);
document.getElementById("stopBtn").addEventListener("click", stop);
