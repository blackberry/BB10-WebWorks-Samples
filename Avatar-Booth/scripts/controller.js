/*
* Copyright 2012 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

define([
		//lib dependencies
		'backbone',
		'backstack',

		//user modules/views
		'takePhotoView',
		'effectsView',
		'moustachesView',
		'aboutView',
		'actionBar'
	
	], function(Backbone, BackStack){
		
	Controller = Backbone.Router.extend({
	    
        app: $("#App"),
        
        routes: {
        	"" : "effects",
        	"effects" : "effects",
        	"moustaches" : "moustaches",
        	"about" : "about"
        },
        
        initialize: function(){            
            //create UI stack and set up default effects
            this.tabView = new BackStack.StackNavigator(
                                { 
                                       el: this.app,
                                       pushTransition: new BackStack.NoEffect(), 
                                       popTransition: new BackStack.NoEffect() 
                                });

  
            //for information on how to use the actionBar package check out the readme file in modules/actionBar folder
        	this.actionBar = new actionBar({ router: this});
            this.app.append(this.actionBar.el);
            this.actionBar.tabs.add([
                       // Uncomment this when CSS Filters are working again :(
                         { 
                             title: "Effects",
                             icon: "images/icons/effects.png",
                             url: "effects"
                         },
                         { 
                             title: "Moustaches",
                             icon: "images/icons/moustaches.png",
                             url: "moustaches"
                         },
                         { 
                             title: "Info",
                             icon: "images/icons/info.png",
                             url: "about"
                         }
                     ]);        
            //append main view to app
            this.takePhotoView = new takePhotoView();
            this.app.prepend(this.takePhotoView.render().el);
            //cache other views
            this.effectsView = new effectsView();
            this.moustachesView = new moustachesView();
            this.aboutView = new aboutView();
        },
		
		effects: function(){		    
            this.tabView.pushView(this.effectsView);   
		},
		
        moustaches: function(){            
            this.tabView.pushView(this.moustachesView);    
        },
        
        about: function(){            
            this.tabView.pushView(this.aboutView);
        }
        
	});
});