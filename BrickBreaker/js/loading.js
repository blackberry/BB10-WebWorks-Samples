// This file handles the loading screen
function loading() {
	$("<div>").addClass("loading-visible").attr("id", "loading").appendTo("body");
	var loaded = function() {
		$("#loading").attr("class", "loading-invisible");
                animloop();
                $("#light").hide();
                $("#building").hide();
        };
	window.onload = loaded;
};

loading();

