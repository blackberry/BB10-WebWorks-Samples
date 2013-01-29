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
	
    "text!./template.html",
    "link!./style-hdpi.css",
		
	], function(template){
		
  	moustachesView = Backbone.View.extend({
 	
 		tagName:  "section",
 	
 		className: "moustaches-view",
	
		layoutTemplate: _.template($(template).html()),
		
 	    //this ensures we cache our views, so that they don't re-render when the pages are revisited
 		destructionPolicy: "never",
        
        events : {
          'click .moustache' : 'addMoustache'
        },
		
		render: function(){
			//append rendered template.html to this view
			this.$el.append(this.layoutTemplate);
			this.height = window.innerHeight;
			
	       	return this;	
		},
		
		addMoustache: function(e){
		    //console.log(e);
		    var moustache = $(e.currentTarget).css('background-image');
		    moustache = moustache.substr(4, moustache.length-5);
		    var moustacheLayerContext = window.moustacheLayer.getContext('2d');
		    //create a new moustache image
		    var img = new Image();
		    img.src= moustache;
		    //clear the canvas
		    moustacheLayerContext.clearRect(0 , 0 ,window.moustacheLayer.width , window.moustacheLayer.height);
            //apply the moustache
            if(this.height > 720)            
                moustacheLayerContext.drawImage(img, 120, 300, 500, 250);
            else
                moustacheLayerContext.drawImage(img, 70, 280, 400, 150);
		}

	});

});