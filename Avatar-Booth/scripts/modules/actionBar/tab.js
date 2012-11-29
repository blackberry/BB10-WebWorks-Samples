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
	"link!./styles/tabs.css",

	], function(Backbone,template){
		
	Tabs = Backbone.Collection.extend({
		setActive: function(cid){
			//this function sets the tab as active (and sets all other tabs to inactive)
			this.each(function(tab){
				tab.set({ active: false});
			});
			this.getByCid(cid).set({active: true});
		},
		
		open: function(route){
		    //get cid by route
			var selectedTab = _.find(this.models,function(tab){
				return tab.get("url") == route.trim();
			});
			
			if(selectedTab)
				this.setActive(selectedTab.cid);
			
		}
		
	});
		
  	TabView = Backbone.View.extend({
 		
 		tagName:  "div",
 		
 		className: "bb10-action-bar-tab",
 		
 		events: {
 			"click" : "open"
 		},
				
		tabTemplate: _.template($(template).filter('#action-bar-tab').html()),
		
		destructionPolicy: "never",
		
		initialize: function(params,width){

			this.tab = params.tab;
			this.width = width;
			this.tab.bind("change:active",this.highlight,this);

		},
		
		render: function(){
			this.$el.html(this.tabTemplate({ tab: this.tab }));
			this.$el.css("width",this.width-1 + "px");
			return this;
		},
		
		highlight: function(){
			if(this.tab.get("active"))
				this.$el.addClass('selected');
			else
				this.$el.removeClass('selected');
		},
		
		open: function(){
			window.controller.navigate(this.tab.get("url"),true);
		}
		
	});
});