/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
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
        app.initialiseBBui();
    },
    initialiseBBui: function(){
        // You must call init on bbUI before any other code loads.  
                // If you want default functionality, simply don't pass any parameters: bb.init();
                bb.init({
                    bb10ActionBarDark: true,
                    bb10ControlsDark: true,
                    bb10ListsDark: false,
                    bb10ForPlayBook: true,
                    onscreenready: function(element, id) {
                        if (id == "pushlist") {
                            sample.pushcapture.initPushList(element);
                        } else if (id == "pushcontent") {
                            sample.pushcapture.initContent(element);
                        } else if (id == "configuration") {
                            // Updates the title bar
                            element.getElementById("user-input-title").setAttribute("data-bb-caption", "Configuration");
                            element.getElementById("user-input-title").setAttribute("data-bb-action-caption", "Save");
                            element.getElementById("user-input-title").setAttribute("onactionclick", "sample.pushcapture.configure()");
                            
                            // Selects the config tab on the action bar
                            element.getElementById("user-input-config-action").setAttribute("data-bb-selected", "true");
                            
                            // Shows the config tab, hides the others
                            element.getElementById("register-tab").style.display = "none";
                            element.getElementById("unregister-tab").style.display = "none";
                            element.getElementById("config-tab").style.display = "block";
            
                            sample.pushcapture.initConfiguration(element);
                        } else if (id == "register") {
                            // Updates the title bar
                            element.getElementById("user-input-title").setAttribute("data-bb-caption", "Register");
                            element.getElementById("user-input-title").setAttribute("data-bb-action-caption", "Submit");
                            element.getElementById("user-input-title").setAttribute("onactionclick", "sample.pushcapture.register()");
                            
                            // Selects the register tab on the action bar
                            element.getElementById("user-input-reg-action").setAttribute("data-bb-selected", "true");
                            
                            // Shows the register tab, hides the others
                            element.getElementById("config-tab").style.display = "none";
                            element.getElementById("unregister-tab").style.display = "none";
                            element.getElementById("register-tab").style.display = "block";
            
                            sample.pushcapture.initRegister(element);
                        } else if (id == "unregister") {
                            // Updates the title bar
                            element.getElementById("user-input-title").setAttribute("data-bb-caption", "Unregister");
                            element.getElementById("user-input-title").setAttribute("data-bb-action-caption", "Submit");
                            element.getElementById("user-input-title").setAttribute("onactionclick", "sample.pushcapture.unregister()");
                            
                            // Selects the unregister tab on the action bar
                            element.getElementById("user-input-unreg-action").setAttribute("data-bb-selected", "true");
                            
                            // Shows the unregister tab, hides the others
                            element.getElementById("config-tab").style.display = "none";
                            element.getElementById("register-tab").style.display = "none";
                            element.getElementById("unregister-tab").style.display = "block";
            
                            sample.pushcapture.initUnregister(element);
                        } 
                    },
                    ondomready: function(element, id) {
                        sample.pushcapture.isDomReady = true;
                        
                        if (id == "pushlist") {
                            if (sample.pushcapture.isOpenInvoke) {
                                // Clear the flag
                                sample.pushcapture.isOpenInvoke = false;
                                
                                sample.pushcapture.openHighlightedPush();
                            } else {
                                sample.pushcapture.checkIfConfigExists();
                                
                                // If the push list was loaded from localStorage, then it loaded super quickly
                                // We need to wait for the DOM to be ready before scrolling down to the currently selected push
                                if (sample.pushcapture.selectedPushSeqnum && localStorage.getItem(sample.pushcapture.localStorageKey) != null) {
                                    var selectedPush = document.getElementById(sample.pushcapture.selectedPushSeqnum);
                                    document.getElementById("push-screen").scrollToElement(selectedPush);
                                }
                            }
                        } else if (id != "configuration") {
                            sample.pushcapture.checkIfConfigExists();
                        }
                    }
                });
                
                // Create the push service (i.e. call create, etc.)
                sample.pushcapture.initPushService(); 
                
                // Display the home screen
                bb.pushScreen('pushlist.htm', 'pushlist');
    }
};
