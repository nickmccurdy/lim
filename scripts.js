var users = ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"];
var current_uid = 0;

$(document).bind("keyup keydown", function(e) {
	shifted = e.shiftKey;
});

function newMessage(uid, message) {
	$("#chat").append('<tr><td class="user user-'+uid+'">'+users[uid]+'</td><td class="message">'+message+'</td></tr>');
	$(window).scrollTop($(document).height());
}

function listMembers() {
	var code = ""
	for(var i=0; i<users.length; i++) {
		if(code != "") {
			code += " "
		}
		code += '<span class="user-'+i+'">'+users[i]+'</span>'
	}
	return code
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

$(document).ready(function() {
	$("#member-list").html(listMembers());
	newMessage(0, "Hello!");
	newMessage(1, "Goodbye!");
	newMessage(2, "Hello!");
	newMessage(3, "Goodbye!");
});
