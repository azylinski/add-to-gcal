function openEventCreationTab(data) {
  var desc = data.selectionText;

  var gCalParams = new URLSearchParams({
    "action" : 'TEMPLATE',
    // "text" : titleText,
    // "dates" : startTime + '/' + endTime,
    // "location" : locationText,
    "details" : desc,
    "trp;" : true,
    'gsessionid' : 'OK',
    'output' : 'xml'
  });
  var url = "https://calendar.google.com/calendar/render?" + gCalParams.toString();
  
  chrome.tabs.create({"url": url})
}

chrome.contextMenus.create({
  title: "Add to GCal",
  contexts: ["selection"],
  onclick: openEventCreationTab
});
