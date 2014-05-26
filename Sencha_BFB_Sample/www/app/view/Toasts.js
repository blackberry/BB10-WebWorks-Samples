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

Ext.define('SenchaTouchSample.view.Toasts', {
    extend: 'Ext.Container',
    xtype: 'toastscard',

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
                           iconCls: 'toast',
                           text: 'Toasts',
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
                                  var invokecard = Ext.create('SenchaTouchSample.view.InvokeApps');
                                  Ext.Viewport.setActiveItem(invokecard);
                              }
                          }, 
                          {
                              text: 'Toasts',
                              iconCls: 'textmessage',
                              scope: this,
                              handler: function() {
                                  
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
                          text: 'Regular',
                          iconCls: 'toast',
                          scope: this,
                          handler: function() {
                            Toast.regular('This is a toast!', 2500);
                          }
                      },
                      {
                          text: 'Button',
                          iconCls: 'toast',
                          scope: this,
                          handler: function() {
                            Toast.withButton('Toast w/Button', 'Button', 'toastCallback', 3000);
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
                                          text: 'Regular',
                                          iconCls: 'toast',
                                          scope: this,
                                          handler: function() {
                                            Ext.Viewport.hideMenu('right');
                                            Toast.regular('This is a toast!', 2500);
                                          }
                                        },
                                        {
                                          text: 'Button',
                                          iconCls: 'toast',
                                          scope: this,
                                          handler: function() {
                                            Ext.Viewport.hideMenu('right');
                                            Toast.withButton('Toast w/Button', 'Button', 'toastCallback', 3000);
                                          }
                                        }
                                      ]                             
                      }
                   ]
              }
          ]
      }
});


      

    