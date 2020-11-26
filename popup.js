// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
document.addEventListener('DOMContentLoaded', (event) => {
  let saveURL = document.getElementById('saveURL');
  let loadTabs = document.getElementById('loadTabs');


  chrome.storage.sync.get({defaultTabs: 7}, function(data) {
    document.getElementById('quantity').value = data.defaultTabs
  });

  // saveURL.onclick = function(element) {
  saveURL.addEventListener('click', function(e){
    console.log('saving')
    chrome.tabs.getSelected(null,function(tab) {
      var current_url = tab.url;
      var saved_urls = [];
      // get the list of existing saved URLS
      chrome.storage.sync.get({savedURLs: []}, function(data) {
        var savedURLs = data.savedURLs
        // append to that list
        savedURLs.push(current_url)
        // store the list with the newly appended url
        chrome.storage.sync.set({savedURLs: savedURLs}, function() {
        })
    })

    });
  });

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

  loadTabs.addEventListener('click', function(e){
    // loadTabs.onclick = function(element) {
    chrome.storage.sync.get({savedURLs: []}, function(data) {
      var allURLs = data.savedURLs;
      var number_of_tabs_to_open = parseInt(document.getElementById("quantity").value);
      if (allURLs.length <= number_of_tabs_to_open){
        number_of_tabs_to_open = allURLs.length
      }
      shuffle(allURLs);
      var URLsToOpen = allURLs.slice(0, number_of_tabs_to_open)
      for (let item of URLsToOpen) {
        chrome.tabs.create({ url: item });
      }
    });
  });
  settings.addEventListener('click', function(e){
    chrome.tabs.create({
      url: chrome.extension.getURL('options.html'),
    });
    window.close();
  });
})

