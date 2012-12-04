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

require.config({
    //By default load any module IDs from js/lib
    baseUrl: 'scripts',
    paths: {
	  	
		//libraries
	    jquery: 'lib/jquery/jquery.min',
	    lodash: 'lib/lodash/lodash.min',

	    backbone: 'lib/backbone/backbone.min',
	    
	    //Require.js plugins
	    text: 'lib/require/plugins/text.min',
		link: 'lib/require/plugins/link',
		
		//UI View Stack
		backstack: 'lib/backstack/backstack',
		
		/* modules */	
		takePhotoView: 'modules/takePhotoView/main',
		effectsView: 'modules/effectsView/main',
        moustachesView: 'modules/moustachesView/main',
        aboutView: 'modules/aboutView/main',
        
        actionBar: 'modules/actionBar/actionBar-min',
	
  	}
 });
 
 
require( [ 'backbone', 'controller' ], function(Backbone){
			
			//initialize the Router/Controller
		 	window.controller = new Controller();
		 	Backbone.history.start();

});
