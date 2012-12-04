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
	
	"backbone",
	
	//use the text! plugin to load the HTML file and pass it into our view
	"text!moustachesView/../template.html",
	
	//use the css! plugin to load the css file and apply to our view
	"link!moustachesView/../style-hdpi.css",
		
	
	], function(Backbone,template){
		
  	moustachesView = Backbone.View.extend({
 	
 		tagName:  "section",
 	
 		className: "view with-action-bar half-view moustaches-view",
	
		layoutTemplate: _.template($(template).html()),
		
 	    //this ensures we cache our views, so that they don't re-render when the pages are revisited
 		destructionPolicy: "never",
        
        events : {
          'click img' : 'addMoustache'
        },
		
		render: function(){
			//append rendered template.html to this view
			this.$el.append(this.layoutTemplate);
	       	return this;	
		},
		
		addMoustache: function(e){
		    var moustache = $(e.currentTarget).attr("src");
		    var moustacheLayerContext = window.moustacheLayer.getContext('2d');
		    //create a new moustache image
		    var img = new Image();
		    img.src= moustache;
		    //clear the canvas
		    moustacheLayerContext.clearRect(0 , 0 ,window.moustacheLayer.width , window.moustacheLayer.height);
            //apply the moustache
            moustacheLayerContext.drawImage(img, 150, 300, 500, 250);
		}

	});

});