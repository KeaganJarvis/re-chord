// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// 'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
  // get the cuurently stored default value and set it in the input field:
  chrome.storage.sync.get({defaultTabs: 7}, function(data) {
    document.getElementById('defaultTabs').value = data.defaultTabs
  });
  let updateBtn = document.getElementById('updateDefault');
  updateBtn.onclick = function(element) {
    newDefaultValue = parseInt(document.getElementById('defaultTabs').value)
    chrome.storage.sync.set({defaultTabs: newDefaultValue}, function() {
    })
  };
})
