var users = ["Nicolas", "Test"]
var current_uid = 0;

$(document).bind("keyup keydown", function(e) {
	shifted = e.shiftKey;
});

function newMessage(uid, message) {
	$("#chat").append('<tr><td class="user">'+users[uid]+'</td><td class="message">'+message+'</td></tr>');
	$(window).scrollTop($(document).height());
}

//when something is typed in the input box
$("#input").keyup(function(e) {
	//if it was return (without shift)
	if(e.keyCode == 13 && !shifted) {
		//if there is a message in the input box
		if($("#input").val != "") {
			//submit a new IM
			var message = $("#input").val().replace(/\n/g, "");
			newMessage(current_uid, message);
			$("#input").val("");
		}
		//if the input box is empty
		else {
			//switch active user
			switchUser();
		}
	};
});
