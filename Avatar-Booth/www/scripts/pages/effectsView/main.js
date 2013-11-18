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
	    
    effectsCollection = Backbone.Collection.extend({
        
        initialize: function(){
            //if told to clear all effects, do it
            this.bind("clearAllFx",this.clearAllFx, this);
        },
        
        clearAllFx: function(){
            //for each effect in this collection
            this.each(function(effect){
               //clear effect
               effect.trigger("clear"); 
            });
        }
        
        
    });
    
    //view for all effects
  	effectsView = Backbone.View.extend({
  	    
 		tagName:  "section",
 		
 		className: "effects-view",
		
		layoutTemplate: _.template($(template).html()),

        //this ensures we cache our views, so that they don't re-render when the pages are revisited
 		destructionPolicy: "never",
        
        initialize: function(){
            //set up array of effects globally (makes it easier to work with)
            window.effects = new effectsCollection();
            effects.add([
                            { 
                                name: "grayscale",
                                effect: "grayscale(1)",
                            },
                            { 
                                name: "sepia",
                                effect: "sepia(1)",
                            },{ 
                                name: "invert",
                                effect: "invert(1)",
                            },{ 
                                name: "blur",
                                effect: "blur(40px)",
                            },{ 
                                name: "saturate",
                                effect: "saturate(1000%)",
                            },
                            { 
                                name: "brightness",
                                effect: "brightness(0.5)",
                            },{ 
                                name: "contrast",
                                effect: "contrast(100)",
                            },{ 
                                name: "hue-rotate",
                                effect: "hue-rotate(170deg)",
                            }                        
                        ]);
        },
        
		render: function(){
			//append rendered template.html to this view
			this.$el.append(this.layoutTemplate);
			var effectsGrid = this.$el.find(".effects-grid");
			
			//for each effect, render a button
			effects.each(function(effect){
			    var EffectView = new effectView(effect);
			    effectsGrid.append(EffectView.render().el);
			});
			return this;	
		}
		
	});	
	
	//view for every single effect
	effectView = Backbone.View.extend({
    	
    	tagName: "div",
    	
    	className: "effect",
    	
    	turnedOn: false,
    	
    	events: {
    	   'click' : 'applyEffect'  
    	},
    	
    	initialize: function(effect){
    	   this.effect = effect;
           this.effect.bind("clear", this.clear, this);
    	},
    	
    	render: function(){
           this.$el.html('<span class="name">' + this.effect.get("name") + '</span>');

    	   if(this.turnedOn)
    	       this.$el.addClass("on");
    	   else
               this.$el.removeClass("on");
    	   return this;
    	},
    	
    	clear: function(){
            //clear effect
    	    $(window.cameraLayer).css("-webkit-filter","none");
    	    this.turnedOn = false;
    	    this.render();  
    	},
    	
    	applyEffect: function(e){

    	    //if this effect is off, turn on
    	    if(!this.turnedOn){
                //turn off all other effects
                effects.trigger("clearAllFx");
                //turn this effect on
                this.turnedOn = true;
                //set css filter on the canvas
                $(window.cameraLayer).css("-webkit-filter",this.effect.get("effect"));       	       
            }
            else{
                //turn off all other effects
                effects.trigger("clearAllFx");
            }
           
            this.render();
         }
    
    });
	
});