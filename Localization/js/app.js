/*
* Copyright 2010-2012 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


var app = (function() {
  "use strict";

    //private
    function compileTemplate(templateName) {
      var template_source = "<div class=\"{{align}}\"><h1 id=\"activeLanguage\">{{language}}</h1><h2 id=\"pagetitle\">{{page_title}}</h2><h3 id=\"subtitle\">{{sub_title}}}</h3></div>";
      return Handlebars.compile(template_source);
    }

    function displayLanguage() {
      console.log("displayLanguage");
      var template, lang, translated_text, ele;
      template = compileTemplate("lang-template");
      lang = blackberry.system.language;
      translated_text = languages[(lang).substring(0,2)];
      ele = document.getElementById("container");

      if (translated_text) {
        ele.innerHTML = template(translated_text);
      } else {
        ele.innerHTML = "Unsupported language code: '" + lang + "'";
      }
    }

    function showLanguageCodes() {
      var ul = document.getElementById("languageCodes");
      for(i in languages) {
       var li = document.createElement("li");
       li.innerText = i;
       ul.appendChild(li);
      }
    }

    function startApp() {
        bb.pushScreen('main.html', 'main');

        blackberry.event.addEventListener("languagechanged", displayLanguage);
        blackberry.event.addEventListener("regionchanged", displayLanguage);
    }

    //public
    return {
      localizeContent : displayLanguage,
      showLanguages   : showLanguageCodes,
      doReady         : startApp
    }

})();
