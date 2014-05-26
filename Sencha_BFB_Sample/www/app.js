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

//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'SenchaTouchSample': 'app'
});
//</debug>

/**
 * This sample application demonstrates the Blackberry 10 UI components available in Sencha Touch 2.3. 
 */

//Let's define the application
Ext.application({
    
    name: 'SenchaTouchSample',
  

    //requires defines the Components/Classes that our application requires.
    requires: [
        'Ext.ux.ActionOverFlowMenuButton',
        'Ext.ux.ContextMenu',
        'Ext.ux.TabMenuButton',
        'Ext.Toolbar',
        'Ext.field.Text',
        'Ext.data.Store',
        'Ext.dataview.List',
        'SenchaTouchSample.view.Home',
        'SenchaTouchSample.view.BBM',
        'SenchaTouchSample.view.InvokeApps',
        'SenchaTouchSample.view.Toasts',
        'SenchaTouchSample.view.Help',
        'SenchaTouchSample.view.Settings',
        'SenchaTouchSample.view.Spinners',
        'SenchaTouchSample.view.About',
        'SenchaTouchSample.view.Web'

    ],

    views: [
        'Home',
        'BBM',
        'InvokeApps',
        'Toasts',
        'Help',
        'Settings',
        'Spinners',
        'About',
        'Web'
    ],

    launch: function() {

        // Hide the Spinner
        Ext.get('SpinnerContainer').hide();


        /********************* Application menu *****************************/
        var applicationMenu = Ext.create('Ext.ux.ApplicationMenu', {
            items: [
                    {
                      text: 'Settings',
                      iconCls: 'settings',
                      docked: 'right',
                      handler: function() {
                         Ext.Viewport.hideMenu('top');
                         var settingscard = Ext.create('SenchaTouchSample.view.Settings');
                         Ext.Viewport.setActiveItem(settingscard);
                      }
                    },
                    
                    {
                      text: 'About',
                      iconCls: 'info',
                      handler: function() {
                         Ext.Viewport.hideMenu('top');
                         var aboutcard = Ext.create('SenchaTouchSample.view.About');
                         Ext.Viewport.setActiveItem(aboutcard);
                      }
                    },
                    {
                      text: 'Help',
                      iconCls: 'help',
                      docked: 'left',
                      handler: function() {
                         Ext.Viewport.hideMenu('top');
                         var helpcard = Ext.create('SenchaTouchSample.view.Help');
                         Ext.Viewport.setActiveItem(helpcard);
                      }
                    }
                  ]
        });

        Ext.Viewport.setMenu(applicationMenu, {
            side: 'top'
        });


        /*****************  Context menu ********************/
        var contextMenuHandler = function() {
            Ext.Viewport.hideMenu('right');

            Ext.Viewport.setMenu(actionMenuButton, {
                side: 'right'
            });
        };

        var contextMenu = Ext.create('Ext.ux.ContextMenu', {
            width: 55,
            // no text 'text' values
            items: [
            {
                iconCls: 'phone',
                scope: this,
                handler: contextMenuHandler
            }, 
            {
                iconCls: 'textmessage',
                scope: this,
                handler: contextMenuHandler
            }, 
            {
                iconCls: 'contacts',
                scope: this,
                handler: contextMenuHandler
            },
            {
                iconCls: 'copy_link',
                scope: this,
                handler: contextMenuHandler
            },
            {
                iconCls: 'compose',
                scope: this,
                handler: contextMenuHandler
            },
            {
                iconCls: 'delete',
                scope: this,
                handler: contextMenuHandler
            }
            ]
        });

        var onItemTapHold = function(list, item) {
            Ext.Viewport.setMenu(contextMenu, {
                side: 'right'
            });

            Ext.Viewport.showMenu('right');
        };


        /********************* Tab menu button **********************/
        var tabMenuButton = Ext.create('Ext.ux.TabMenuButton', {
            docked: 'left',
            text: 'Home',
            iconCls: 'home',
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
                    var spinnercard = Ext.create('SenchaTouchSample.view.Spinners');
                    Ext.Viewport.setActiveItem(spinnercard); 
                  }
                }
            ]
        });
	
		/******************* Action Overflow Menu ****************************/
		var actionMenuButton = Ext.create('Ext.ux.ActionOverFlowMenuButton', {
		    docked: 'right',
		    iconCls: 'overflow_action',
        scrollable: 'true',

		    menuItems: [
                {
		          text: 'Show Welcome',
		          iconCls: 'favorite',
		          scope: this,
		          handler: function() {
                Ext.Viewport.hideMenu('right');
		            welcome();
              }
		        }, 
         ]
		});

        /********************* ACTION BAR **************************/
        this.container = Ext.Viewport.add({
            layout: 'card',
            items: [
                // Bottom toolbar
                {
                    xtype: 'toolbar',
                    ui: 'dark',
                    docked: 'bottom',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    items: [

                        tabMenuButton,
                        {
                            text: 'Show Welcome',
                            iconCls: 'welcome',
                            scope: this,
                            handler: function() {
                              Ext.Viewport.hideMenu('right');
                              welcome();
                            }
                        },

                        actionMenuButton
                    ]
                }
          
            ]
        });
    },
});
