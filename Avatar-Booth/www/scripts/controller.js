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
	   'config',
	   'UIStack',
       'pages/takePhotoView/main',
       'pages/effectsView/main',
       'pages/moustachesView/main',
       'pages/aboutView/main',
	], function(){
		
	Controller = Backbone.Router.extend({
	    
        app: $("#App"),
        
        routes: {
            
        	"effects" : "effects",
        	"moustaches" : "moustaches",
        	"about" : "about"
        },
        
        initialize: function(){            
            //create a new instance of BB10-UI-Stack
        	this.tabView = new UIStack({ router: this, app: this.app, config: config});  

            //append main view to app
            this.takePhotoView = new takePhotoView();
            this.tabView.$el.find('#views > section').prepend(this.takePhotoView.render().el);
            //cache other views
            this.effectsView = new effectsView();
            this.moustachesView = new moustachesView();
            this.aboutView = new aboutView();
            window.location = "#moustaches";
        },
		
		effects: function(){	    
            this.tabView.showTab(this.effectsView);   
		},
		
        moustaches: function(){            
            this.tabView.showTab(this.moustachesView);    
        },
        
        about: function(){            
            this.tabView.showTab(this.aboutView);
        }
        
	});
});