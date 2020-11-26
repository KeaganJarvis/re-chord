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

  saveURL.addEventListener('click', function(e){
    saveCurrentURL()
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

