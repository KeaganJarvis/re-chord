'use strict';

/*
savedURLs eg data:
{'https://www.youtube.com/watch?v=NPBCbTZWnq0':{'title':'Yiruma - River Flows in You', 'favicon':'foo'},
'https://www.youtube.com/watch?v=yuboWIBPDvk':{'title':'The Lord of the Rings - Main Theme (Piano Version)', 'favicon':'bar'}}
*/

// these three global funcs should be in a seprate UTILs file...
function saveCurrentURL(){
    console.log('saving')
    chrome.tabs.getSelected(null,function(tab) {
      var current_url = tab.url;
      var current_title = tab.title;
      var current_favicon_url = tab.favIconUrl;
      // var saved_urls = []; TODO this seemed to not be used anywhere so commented
      // TODO(cont) Thought it was for setup initially. test from scratch setup again
      // get the object of existing saved URLS
      chrome.storage.sync.get({savedURLs: {}}, function(data) {
        var savedURLs = data.savedURLs
        // append to that object
        savedURLs[current_url] = {'title':current_title, 'favicon':current_favicon_url}
        // store the list with the newly appended url
        chrome.storage.sync.set({savedURLs: savedURLs}, function() {
        })
    })

    });
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function loadPractiseTabs(){
    chrome.storage.sync.get({savedURLs: {}}, function(data) {
        var allURLsData = data.savedURLs;
        // TODO should do something here if no URLs are saved
        var allURLs = Object.keys(allURLsData)
        chrome.storage.sync.get({defaultTabs: 7}, function(data) {
            try{
                // first tries this case whereby we are doing ths fnc from the popup
                var number_of_tabs_to_open = parseInt(document.getElementById("quantity").value);
            }
            catch{
                // else does this whereby we are doing ths fnc via the keyboard shortcut
                number_of_tabs_to_open = data.defaultTabs
            }
            if (allURLs.length <= number_of_tabs_to_open){
                // covers the case where a number higher than the length of the saved array
                number_of_tabs_to_open = allURLs.length
            }
            shuffle(allURLs);
            var URLsToOpen = allURLs.slice(0, number_of_tabs_to_open)
            for (let item of URLsToOpen) {
                chrome.tabs.create({ url: item });
            }
        });
    });
}

//HANDLERS FOR KEYBOARD SHORTCUTS
chrome.commands.onCommand.addListener(function(command) {
    if (command === '1-save-tab') {
        saveCurrentURL()
        //do same as if clicking on the save tab popup btn
    } else if (command === '2-open-practise-tabs') {
        loadPractiseTabs()
        //do same as if clicking on the practise popup btn
    }
});

chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({savedURLs: []}, function() {
    console.log('I am here!!!');
//   });
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: 'developer.chrome.com'},
//       })],
//       actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });
});
