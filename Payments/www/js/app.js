/*
 * Copyright 2014 BlackBerry Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
var Application = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        Application.receivedEvent('deviceready');
        bb.init({
            actionBarDark: true,
            controlsDark: true,
            listsDark: false,
            // Fires "before" styling is applied and "before" the screen is inserted in the DOM
            onscreenready: function(element, id) {},
            // Fires "after" styling is applied and "after" the screen is inserted in the DOM
            ondomready: function(element, id) {}
        });
        // turn on development mode for the payment service
        blackberry.payment.developmentMode = true;
        // reset the coin counter object
        resetCoins();
        // start the app
        bb.pushScreen('forsale.html', 'forsale');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};
// reset coins back to zero
var resetCoins = function() {
    coins = {
        'chad-coin': 0,
        'jesse-coin': 0,
        'manny-coin': 0
    };
};
// buy coins
buyCoin = function(name) {
    var paymentObject = {
        "digitalGoodID": "123",
        "digitalGoodSKU": "",
        "purchaseAppName": "Payment Sample",
        "purchaseAppIcon": null,
    };
    if (name === 'chad') {
        paymentObject.digitalGoodSKU = 'chad-coin';
    } else if (name === 'jesse') {
        paymentObject.digitalGoodSKU = 'jesse-coin';
    } else if (name === 'manny') {
        paymentObject.digitalGoodSKU = 'manny-coin';
    }
    // call the payment service
    blackberry.payment.purchase(paymentObject,
        // success callback
        function(data) {
            var msg = "Successfully purchased a: " + data.digitalGoodSKU;
            blackberry.ui.toast.show(msg, false);
            coins[data.digitalGoodSKU]++;
        },
        // error callback
        function(data) {
            var msg = "Error: " + data.errorText;
            blackberry.ui.toast.show(msg, false);
        });
};
// check fake-balance
checkBalance = function() {
    var msg = 'Opps! Mt. Lolz was hacked and all of your coins have been lost forever! ';
    var options = {
        timeout: 5000
    };
    blackberry.ui.toast.show(msg, options);
    resetCoins();
};
// get list of existing purchases
var checkExistingPurchases = function() {
    if (coins['chad-coin'] === 0 && coins['jesse-coin'] === 0 && coins['manny-coin'] === 0) {
        var msg = 'You are broke. Touch a coin to buy some more!';
        var options = {
            timeout: 5000
        };
        blackberry.ui.toast.show(msg, options);
    } else {
        // we pass in 'false' to tell the payment service this is a test call aka. local mode
        blackberry.payment.getExistingPurchases(
        false,

        // success callback
        function(data) {
            for (var coin in coins) {
                if (coins[coin] !== 0) {
                    alert('Coin: ' + coin + '\nAmount: ' + coins[coin]);
                }
            }

        // fail callback
        }, function() {
            console.log('fail');
        });
    }
};