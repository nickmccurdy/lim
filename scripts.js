var users = ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"];
var current_uid = 0;

$(document).bind("keyup keydown", function(e) {
	shifted = e.shiftKey;
});

function postMessage() {
	var message = $("#input").val().replace(/\n/g, "");
	showMessage(current_uid, message);
	$("#input").val("");
}

function showMessage(uid, message) {
	$("#chat").append('<tr><td class="user user-'+uid+'">'+users[uid]+'</td><td class="message">'+message+'</td></tr>');
	$(window).scrollTop($(document).height());
}

function updateListMembers() {
	var code = "";
	for(var i=0; i<users.length; i++) {
		if(code != "") {
			code += " ";
		}
		code += '<span class="user-'+i+'">'+users[i]+'</span>';
	}
	$("#member-list").html(code);
	$("#member-list .user-"+current_uid).addClass("active");
}

function switchUser() {
	if(current_uid < users.length-1) {
		current_uid++;
	}
	else {
		current_uid = 0;
	}
	updateListMembers();
}

//when something is typed in the input box
$("#input").keyup(function(e) {
	//if it was return (without shift)
	if(e.keyCode == 13 && !shifted) {
		//if there is a message in the input box
		if($("#input").val().replace(/\n/g, "") != "") {
			//submit a new IM
			postMessage();
		}
		//if the input box is empty
		else {
			//switch active user
			switchUser();
		}
	};
});

$(document).ready(function() {
	updateListMembers();
	showMessage(0, "Hello!");
	showMessage(1, "Goodbye!");
	showMessage(2, "Hello!");
	showMessage(3, "Goodbye!");
});
