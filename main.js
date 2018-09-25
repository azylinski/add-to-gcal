// YYYYMMDDTHHMMSSZ
function formatDt(date) {
  return date.toISOString().slice(0,-5).replace(/[-:]/g, "") + "Z";
}


// https://github.com/wanasit/chrono#parsedcomponents
// YYYYMMDDTHHMMSSZ/YYYYMMDDTHHMMSSZ
function timeIntervalStr(parsedComponent) {
  var start = parsedComponent.start.date();
  var end = null;

  if (parsedComponent.end) {
    end = parsedComponent.end.date();
  } else {
    end = parsedComponent.start.date();
    end.setHours(end.getHours() + 1);
  }

  return formatDt(start) + '/' + formatDt(end);
}


function openEventCreationTab(info) {
  var desc = info.selectionText;
  var datetimes = chrono.casual.parse(desc);

  var gCalParams = new URLSearchParams({
    "action": 'TEMPLATE',
    // "text": titleText,
    "dates": timeIntervalStr(datetimes[0]),
    // "location": locationText,
    "details": desc + "\n\n--\n" + encodeURI(info.pageUrl),
    "trp;": true,
    'gsessionid': 'OK',
    'output': 'xml'
  });
  var url = "https://calendar.google.com/calendar/render?" + gCalParams.toString();
  
  chrome.tabs.create({"url": url})
}

chrome.contextMenus.create({
  title: "Add to GCal",
  contexts: ["selection"],
  onclick: openEventCreationTab
});
