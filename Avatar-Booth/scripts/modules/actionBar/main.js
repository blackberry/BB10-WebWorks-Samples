/*
* Copyright 2012 Anzor Bashkhaz.
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
	"text!./template.html",	
	"link!./styles/common.css",
	"./tab",

	], function(Backbone,template){

  	actionBar = Backbone.View.extend({
 		
 		tagName:  "footer",
 		
 		className: "actionBar",
 		
 		events: {
 			"click .backBtn" : "back"
 		},
		
		backButtonTemplate: _.template($(template).filter('#back-btn').html()),
				
		destructionPolicy: "never",
		
		initialize: function(params){
			var _this = this;
			if(params){
				if(params.back) this.backButton = params.back;
			    else {
			    	
			    	//create a new collection of tabs
			    	this.tabs = new Tabs();
			    	this.tabs.bind("add",this.render,this);
					if(params.router){
						//bind to router so that we are aware of the route to highlight the right tab
						params.router.bind("all", function(route){
			            	_this.navigate(route);
			 			});	
			 		}
			 		else
			 			console.log("You have not passed a router into actionBar, it will not be route-aware, look at the readme.md file please.")
				}
			}
				
		},
		
		render: function(){
			var _this = this;
			if(this.backButton) {
			    var backBtn = this.backButtonTemplate();
			    this.$el.html(backBtn);   
			}
			if(this.tabs){
				//clear the actionBar and re-populate
				this.$el.children().remove();
				//calculate the width of each tab
				var width = Math.floor(window.innerWidth/this.tabs.length);
				this.tabs.each(function(tab){
					_this.$el.append(new TabView({tab: tab},width).render().el);
				});
			}
			return this;
		},
		
		home: function(){
		   this.tabsEl.removeClass("selected");
		   this.$el.find(".tab:first-child").addClass("selected");
		},
		
		navigate: function(route){
			//parse the route and extract the hash
			var routeString = route + " ";
			routeString = routeString.substr(6,routeString.length-1);
			this.tabs.open(routeString);
		},
		
		back: function(){
			window.history.back();
		}
		
	});
});