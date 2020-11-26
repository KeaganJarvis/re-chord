/*global chrome, gsAnalytics, gsUtils */


document.addEventListener('DOMContentLoaded', (event) => {

  var shortcutsEl = document.getElementById('keyboardShortcuts');
  var configureShortcutsEl = document.getElementById('configureShortcuts');

  configureShortcutsEl.onclick = function(e) {
    chrome.tabs.update({ url: 'chrome://extensions/shortcuts' });
  };

  console.log('attempting to populate keyboard shortcuts')
  //populate keyboard shortcuts
  chrome.commands.getAll(commands => {
    commands.forEach(command => {
      if (command.name !== '_execute_browser_action') {
        const shortcut = command.shortcut
        shortcutsEl.innerHTML += `<div>${command.description}:</div>
            <div class="hotkeyCommand"
            }">${shortcut}</div><br />`;
      }
    });
  });

});

