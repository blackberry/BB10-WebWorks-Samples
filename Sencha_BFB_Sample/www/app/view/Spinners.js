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

Ext.define('SenchaTouchSample.view.Spinners', {
    extend: 'Ext.Container',
    xtype: 'spinnercard',

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
                           iconCls: 'reload',
                           text: 'Spinners',
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
                                var toastcard = Ext.create('SenchaTouchSample.view.Toasts');
                                Ext.Viewport.setActiveItem(toastcard);                                 
                              }
                          },
                          {
                              text: 'Spinners',
                              iconCls: 'reload',
                              scope: this,
                              handler: function() {
                                  
                              }
                          }
                          ]

                      },
                      {
                          text: 'Enable',
                          iconCls: 'enable',
                          scope: this,
                          handler: function() {
                             Ext.get('SpinnerContainer').show();
                          }
                      },
                      {
                          text: 'Disable',
                          iconCls: 'disable',
                          scope: this,
                          handler: function() {
                             Ext.get('SpinnerContainer').hide();
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
                                          text: 'Enable',
                                          iconCls: 'enable',
                                          scope: this,
                                          handler: function() {
                                            Ext.Viewport.hideMenu('right');
                                            Ext.get('SpinnerContainer').show();
                                          }
                                        },
                                        {
                                          text: 'Disable',
                                          iconCls: 'disable',
                                          scope: this,
                                          handler: function() {
                                            Ext.Viewport.hideMenu('right');
                                            Ext.get('SpinnerContainer').hide();
                                          }
                                        }
                                      ]                             
                      }
                   ]
              }
          ]
      }
});


      

    