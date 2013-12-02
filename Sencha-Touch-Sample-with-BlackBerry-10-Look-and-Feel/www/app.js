//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src'
});
//</debug>

/**
 * This sample application demonstrates the Blackberry 10 UI components available in Sencha Touch 2.3. 
 */

//Let's define the application
Ext.application({
    

    //requires defines the Components/Classes that our application requires.
    requires: [
        'Ext.ux.ActionOverFlowMenuButton',
        'Ext.ux.ContextMenu',
        'Ext.ux.TabMenuButton',
        'Ext.Toolbar',
        'Ext.field.Text',
        'Ext.data.Store',
        'Ext.dataview.List'
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
                         Toast.regular('Invoking the settings app.. ',2000);
                         setTimeout(function(){
                            blackberry.invoke.invoke({
                            target: "sys.settings.target"
                            }, function() {}, function() {});
                         },2300);
                      }
                    },
                    {
                      text: 'Help',
                      iconCls: 'help',
                      docked: 'left',
                      handler: function() {
                         Toast.regular('Help will be implemented soon..',2000);
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
            iconCls: 'overflow_tab',
            menuItems: [
               {
                  text: 'BBM Update',
                  iconCls: 'bbm',
                  scope: this,
                  handler: function() {
                    Toast.regular('Updating the BBM status...',2000);
                    setTimeout(function(){
                        Bbm.updateMessage();
                    },2300); 
                  }
                },
                {
                  text: 'BBM Invite',
                  iconCls: 'bbm',
                  scope: this,
                  handler: function() {
                    Toast.regular('Inviting others to BBM...',2000);
                    setTimeout(function(){
                        Bbm.inviteToDownload();
                    },2300); 
                  }
                },
                {
                  text: 'InvokeApps',
                  iconCls: 'share',
                  scope: this,
                  handler: function() {
                    Toast.regular('Invoking Apps...',2000);
                    setTimeout(function(){
                        Invoke.targets('http://www.blackberry.com');
                    },2300); 
                  }
                }, 
                {
                  text: 'Toasts',
                  iconCls: 'textmessage',
                  scope: this,
                  handler: function() {
                    Toast.regular('This is a regular toast!',3000);
                    setTimeout(function(){
                        Toast.withButton('This is a toast with button','Button','toastCallback', 3000);
                    },3300); 
                  }
                },
                {
                  text: 'Spinners',
                  iconCls: 'reload',
                  scope: this,
                  handler: function() {
                    Toast.regular('Hiding the spinner in 3 seconds...',3000);
                    Ext.get('SpinnerContainer').show();
                    setTimeout(function(){
                         Ext.get('SpinnerContainer').hide();
                    },3000); 
                  }
                }
            ]
        });
	
		/******************* Action Overflow Menu ****************************/
		var actionMenuButton = Ext.create('Ext.ux.ActionOverFlowMenuButton', {
		    docked: 'right',
		    iconCls: 'overflow_action',
		    menuItems: [
                {
		          text: 'To Top',
		          iconCls: 'to_top',
		          scope: this,
		          handler: function() {
		            Ext.Viewport.hideMenu('right');

		          }
		        }, 
                {
		          text: 'To Bottom',
		          iconCls: 'to_bottom',
		          scope: this,
		          handler: function() {
		            Ext.Viewport.hideMenu('right');

		          }
		        }, 
              {
              text: 'Search',
              iconCls: 'search',
              scope: this,
              handler: function() {
                Ext.Viewport.hideMenu('right');
      
              }
            }, 
                {
              text: 'Compose',
              iconCls: 'compose',
              scope: this,
              handler: function() {
                Ext.Viewport.hideMenu('right');

              }
            }, 
                {
              text: 'Settings',
              iconCls: 'settings',
              scope: this,
              handler: function() {
                Ext.Viewport.hideMenu('right');

              }
                },
               {
              text: 'Refresh',
              iconCls: 'reload',
              scope: this,
              handler: function() {
                Ext.Viewport.hideMenu('right');

              }
            }, 
                {
              text: 'Select More',
              iconCls: 'select_more',
              scope: this,
              handler: function() {
                Ext.Viewport.hideMenu('right');

              }
            } 
               
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
                            text: 'Camera',
                            iconCls: 'camera',
                            handler: function() {
                               Toast.regular('Invoking the camera app.. ',2000);
                               setTimeout(function(){
                                  takePhoto();
                                },2300); 
                            }
                        },
                        {
                            text: 'Maps',
                            iconCls: 'map',
                            handler: function() {
                                Toast.regular('Invoking the map app.. ',2000);
                                setTimeout(function(){
                                  Invoke.maps('4701 Tahoe blvd, Mississauga, Ontario');
                                },2300); 
                            }
                        },
                        {
                            text: 'Context Menu',
                            iconCls: 'view_list',
                            handler: function() {
                                Toast.regular('Invoking the Context Menu. Tap any where on the screen to hide it ',3000);
                                setTimeout(function(){
                                  Ext.Viewport.setMenu(contextMenu, {
                                      side: 'right'
                                  });
                                  Ext.Viewport.showMenu('right');
                                },3300); 
                            }
                        },

                        actionMenuButton
                    ]
                },

               
            ]
        });
    },
});
