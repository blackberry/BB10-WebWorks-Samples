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
		
  	takePhotoView = Backbone.View.extend({
 		
 		tagName:  "section",
 		
 		//set up click events
 		events: {
 		  'click #snap' : 'takePhoto',
 		  'click #cancel' : 'cancel'
 		},
 		
 		snapshot: false,
 		
 		className: "take-photo-view",
 		
		layoutTemplate: _.template($(template).html()),
		//this ensures we cache our views, so that they don't re-render when the pages are revisited
 		destructionPolicy: "never",
        
        startCamera: function(){
          var _this = this;
          //get access to camera
          navigator.webkitGetUserMedia({video: true, audio: true, toString : function() {return "video,audio";} }, 
           function(stream){
               //if access to camera granted, we get a stream object
               //set the source of video tag to the stream object
               var source = window.webkitURL.createObjectURL(stream);
               _this.video.autoplay = true;
               _this.video.src = source;
               
              //project feed onto Canvas so we can apply effects
              _this.streamFeed();
               
           }, 
           function(error){
               console.log(error);
           });

        },
        
		streamFeed: function(){
		    //check if a snapshot is being taken
		    if(!this.snapshot)
                window.webkitRequestAnimationFrame(this.streamFeed.bind(this));
            
            //feed the video frame by frame to the canvas
            var cameraLayerContext = window.cameraLayer.getContext('2d');     
            
            //getting ready for keyboard-series device      
            if(window.innerHeight > 720)
                cameraLayerContext.drawImage(this.video, 0, -200, 768, 1024);
            else
                cameraLayerContext.drawImage(this.video, -100, -85, 720, 720);
               
        },
        
		takePhoto: function(){
            this.snapshot = true;
            this.snap.style.display = "none";           
	        this.cancel.style.display = "block";  
		},
		
		cancel: function(){
		    this.snapshot = false;
		    
            //refresh canvas to show next frame
   		    window.webkitRequestAnimationFrame(this.streamFeed.bind(this));
		    
		    this.snap.style.display = "block";           
            this.cancel.style.display = "none";     
		},
		
        render: function(){            
            //append rendered template.html to this view
            this.$el.append(this.layoutTemplate);
            
            //cache elements for later use
            this.video = this.el.querySelector("#video");

            //storing the output into a global variable
            var cameraLayer = this.el.querySelector("#camera");
            var moustacheLayer = this.el.querySelector("#moustaches");
            
           
            //set up dimensions
            if(window.innerHeight > 720){
                cameraLayer.width = 768,
                cameraLayer.height = 702,
                moustacheLayer.width = 768,
                moustacheLayer.height = 702;
            }
            else{                
               cameraLayer.width = 550,
               cameraLayer.height = 550,
               moustacheLayer.width = 550,
               moustacheLayer.height = 550; 
            }
            
            //define canveses as global variables, this way we can access them from any other module
            window.cameraLayer = cameraLayer;
            window.moustacheLayer = moustacheLayer;            
            //cache elements for fast re-use
            this.snap = this.el.querySelector("#snap"); 
            this.cancel = this.el.querySelector("#cancel");
            //start Camera
            this.startCamera();
            return this;
        }
        
	});
});