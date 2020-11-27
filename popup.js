// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';



document.addEventListener('DOMContentLoaded', (event) => {
  let saveURL = document.getElementById('saveURL');
  let loadTabs = document.getElementById('loadTabs');

  function isTabSaved(){
    chrome.tabs.getSelected(null,function(tab) {
      var current_url = tab.url;
      chrome.storage.sync.get({savedURLs: {}}, function(data) {
        var savedURLs = data.savedURLs
        console.log('here')
        console.log(current_url)
        console.log(typeof current_url)
        console.log(savedURLs)
        console.log(typeof savedURLs)
        if (current_url in savedURLs){
          hideSaveShowSaved()
        }
      })
    })
  }

  function hideSaveShowSaved(){
    saveURL.hidden = true;
    document.getElementById('saveURLClicked').hidden = false;
  }

  isTabSaved() // if the tab is saved, we hide the button to save and display that it is saved

  chrome.storage.sync.get({defaultTabs: 7}, function(data) {
    document.getElementById('quantity').value = data.defaultTabs
  });

  saveURL.addEventListener('click', function(e){
    saveCurrentURL()
    hideSaveShowSaved()
  });


  loadTabs.addEventListener('click', function(e){
    loadPractiseTabs()
  });

  settings.addEventListener('click', function(e){
    chrome.tabs.create({
      url: chrome.extension.getURL('options.html'),
    });
    window.close();
  });
})

