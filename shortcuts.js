/*global chrome, gsAnalytics, gsUtils */


document.addEventListener('DOMContentLoaded', (event) => {

  var shortcutsEl = document.getElementById('keyboardShortcuts');

  var notSetMessage = chrome.i18n.getMessage('js_shortcuts_not_set');
  var groupingKeys = [
    '2-toggle-temp-whitelist-tab',
    '2b-unsuspend-selected-tabs',
    '4-unsuspend-active-window',
  ];
  console.log('attempting to populate keyboard shortcuts')
  //populate keyboard shortcuts
  chrome.commands.getAll(commands => {
    commands.forEach(command => {
      if (command.name !== '_execute_browser_action') {
        const shortcut =
          command.shortcut !== ''
            ? gsUtils.formatHotkeyString(command.shortcut)
            : '(' + notSetMessage + ')';
        var addMarginBottom = groupingKeys.includes(command.name);
        shortcutsEl.innerHTML += `<div ${
          addMarginBottom ? ' class="bottomMargin"' : ''
        }>${command.description}</div>
          <div class="${
            command.shortcut ? 'hotkeyCommand' : 'lesserText'
          }">${shortcut}</div>`;
      }
    });
  });

});

