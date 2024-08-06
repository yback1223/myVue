var input = document.getElementById("todoInput");
input.addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		document.getElementById("todoAddButton").click();
	}
})