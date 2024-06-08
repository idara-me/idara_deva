
$(document).keydown(function(e) {
	if (e.ctrlKey && e.keyCode == 13) {
		$(document.activeElement).parents("[data-fieldtype=Table]").find(".grid-add-row").click();
	}
});