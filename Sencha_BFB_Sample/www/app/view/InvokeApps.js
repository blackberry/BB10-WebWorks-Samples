/*
 * Copyright 2014 BlackBerry.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Ext.define('SenchaTouchSample.view.InvokeApps', {
    extend: 'Ext.Container',
    xtype: 'invokecard',

    requires: [
        'Ext.ux.ActionOverFlowMenuButton',
        'Ext.ux.ContextMenu',
        'Ext.ux.TabMenuButton',
        'Ext.Toolbar',
        'Ext.field.Text',
        'Ext.data.Store',
        'Ext.dataview.List'       
    ],

    config: {

        items: [
              {
                xtype: 'toolbar',
                ui: 'dark',
                docked: 'bottom',
                layout: {
                        type: 'hbox',
                        pack: 'center'
                },

                items: [

                       {

                           xclass: 'Ext.ux.TabMenuButton',                       
                           menuConfig: {
                              scrollable: true
                           },
                           docked: 'left',
                           iconCls: 'share',
                           text: 'Invoke Apps',
                           menuItems: [
                                  {
                                    text: 'Home',
                                    iconCls: 'home',
                                    scope: this,
                                    handler: function() {
                                      var homecard = Ext.create('SenchaTouchSample.view.Home');
                                      Ext.Viewport.setActiveItem(homecard);
                                    }
                                                           
                                },
                                  {
                                    text: 'BBM',
                                    iconCls: 'bbm',
                                    scope: this,
                                    handler: function() {
                                      var bbmcard = Ext.create('SenchaTouchSample.view.BBM');
                                      Ext.Viewport.setActiveItem(bbmcard);
                                    }
                                },
                              {
                                text: 'Invoke Apps',
                                iconCls: 'share',
                                scope: this,
                                handler: function() {
                                    
                               }
                              }, 
                          {
                              text: 'Toasts',
                              iconCls: 'textmessage',
                              scope: this,
                              handler: function() {
                                  var toastcard = Ext.create('SenchaTouchSample.view.Toasts');
                                  Ext.Viewport.setActiveItem(toastcard);
                              }
                          },
                          {
                              text: 'Spinners',
                              iconCls: 'reload',
                              scope: this,
                              handler: function() {
                                  var spinnercard = Ext.create('SenchaTouchSample.view.Spinners');
                                  Ext.Viewport.setActiveItem(spinnercard); 
                              }
                          }
                          ]

                      },

                      {
                          text: 'Targets',
                          iconCls: 'targets',
                          scope: this,
                          handler: function() {
                            Invoke.targets('http://www.blackberry.com');
                          }

                      },

                      {
                          text: 'Email',
                          iconCls: 'email',
                          scope: this,
                          handler: function() {
                            Invoke.email('no-reply@asdf1234.abc', 'this is the subject', 'this is the body');
                          }

                      },

                      {
                          text: 'Maps',
                          iconCls: 'map',
                          scope: this,
                          handler: function() {
                             Invoke.maps('25202 Prado Del Grandioso, Calabasas, California');
                          }

                      },

                      {
                           xclass: 'Ext.ux.ActionOverFlowMenuButton',
                          
                          
                           menuConfig: {
                              scrollable: true
                           },
                           
                          
                           docked: 'right',
                           iconCls: 'overflow_action',
                           
                           menuItems: [
                                        
                                        {
                                          text: 'Targets',
                                          iconCls: 'targets',
                                          scope: this,
                                          handler: function() {
                                            Ext.Viewport.hideMenu('right');
                                            Invoke.targets('http://www.blackberry.com');
                                          }
                                          

                                        },

                                        {
                                          text: 'Email',
                                          iconCls: 'email',
                                          scope: this,
                                          handler: function() {
                                            Ext.Viewport.hideMenu('right');
                                            Invoke.email('no-reply@asdf1234.abc', 'this is the subject', 'this is the body');
                                          }

                                      },

                                      {
                                          text: 'Maps',
                                          iconCls: 'map',
                                          scope: this,
                                          handler: function() {
                                            Ext.Viewport.hideMenu('right');
                                            Invoke.maps('25202 Prado Del Grandioso, Calabasas, California');
                                          }

                                      },

                                      {
                                          text: 'NFC',
                                          iconCls: 'nfc',
                                          scope: this,
                                          handler: function() {
                                            Ext.Viewport.hideMenu('right');
                                            Invoke.nfc('http://www.blackberry.com');
                                          }

                                      },

                                      {
                                          text: 'Twitter',
                                          iconCls: 'twitter',
                                          scope: this,
                                          handler: function() {
                                            Ext.Viewport.hideMenu('right');
                                            Invoke.twitter('this is text to share');
                                          }

                                      },

                                      {
                                          text: 'Facebook',
                                          iconCls: 'facebook',
                                          scope: this,
                                          handler: function() {
                                            Ext.Viewport.hideMenu('right');
                                            Invoke.facebook('this is text to share');
                                          }

                                      },

                                      {
                                          text: 'BlackBerry World',
                                          iconCls: 'bbworld',
                                          scope: this,
                                          handler: function() {
                                            Ext.Viewport.hideMenu('right');
                                            Invoke.blackberryWorld.vendor('1279');
                                          }

                                      },

                                      {
                                          text: 'Camera',
                                          iconCls: 'camera',
                                          scope: this,
                                          handler: function() {
                                            Ext.Viewport.hideMenu('right');
                                            takePhoto();
                                          }

                                      },

                                      {
                                          text: 'File Picker',
                                          iconCls: 'filepicker',
                                          scope: this,
                                          handler: function() {
                                            Ext.Viewport.hideMenu('right');
                                            pickFile();
                                          }

                                      }




                                      ]                             
                      }
                   ]
              }
          ]
      }
});


      

    