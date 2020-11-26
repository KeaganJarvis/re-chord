// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// 'use strict';

document.addEventListener('DOMContentLoaded', (event) => {

    function removeItem(itemToRemove) {
        console.log('Removing' + itemToRemove)
        chrome.storage.sync.get({savedURLs: []}, function(data) {
            var allURLs = data.savedURLs;
            // get index of the item and splice it out
            index_for_item = allURLs.indexOf(itemToRemove)
            if (index_for_item > -1) {
                allURLs.splice(index_for_item, 1);
            }
            chrome.storage.sync.set({savedURLs: allURLs}, function() {
            })
        })
    }


    let targetDiv = document.getElementById('URLListDv');
    chrome.storage.sync.get({savedURLs: []}, function(data) {
        var allURLs = data.savedURLs;
        for (let item of allURLs) {
            var item_specific_div = '<div><a href='+item+' target="_blank">'+ item + '</a><input class="mini-right" type="image" id="btn'+item+'" src="images/red_x_tiny.png" /></div></br>'
            targetDiv.innerHTML += item_specific_div

        }
    });
    chrome.storage.sync.get({savedURLs: []}, function(data) {
        var allURLs = data.savedURLs;
        for (let item of allURLs) { // can't do all this in the same loop as above as the btn obj isn't created completely til the loop ends
            // Create a btn listener for id="btn'+item+'" that rm's the val off the list
            // and reloads the page so the val is no longer on the list/page
            itembtn = document.getElementById('btn'+item);
            itembtn.onclick = function(element) {
                var valueToRemove = this.id.replace('btn','');
                removeItem(valueToRemove);
                location.reload();
            }
        }
    });
})
