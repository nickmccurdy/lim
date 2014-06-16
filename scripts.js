var users = ['User 1', 'User 2', 'User 3', 'User 4'];
var current_uid = 0;
var options = {
	switch_user_after_posted_message: true,
	switch_user_after_blank_message: true
};

$(document).bind('keyup keydown', function(e) {
	shifted = e.shiftKey;
});

function postMessage() {
	//if there is a message in the input box
	if($('#input').val().replace(/\n/g, '') !== '') {
		//submit a new IM
		var message = $('#input').val().replace(/\n/g, '');
		showMessage(current_uid, message);
		$('#input').val('');
		$('#input').focus();
		//switch active user
		if(options.switch_user_after_posted_message) {
			switchUser();
		}
	}
	//if the input box is empty
	else {
		//switch active user
		if(options.switch_user_after_blank_message) {
			switchUser();
		}
	}
}

function showMessage(uid, message) {
	message_code = '<tr><td class="user user-'+uid+'"">'+users[uid]+'</td><td class="message">'+message+'</td></tr>';
	$(message_code).hide().appendTo('#conversation').slideDown(200, function() {
		$(window).scrollTop($(document).height());
	});
}

function updateListMembers() {
	$('#member-list').html(memberList('brief'));
	$('#member-list .user-'+current_uid).addClass('active');
	$('#member-list-settings').html(memberList('settings'));
	window.document.title = $('#topic').html()+': ' + users.join(', ');
}

function memberList(mode) {
	list_code = '';
	for(var i=0; i<users.length; i++) {
		if(list_code !== '') {
			list_code += ' ';
		}
		switch(mode) {
			case 'brief':
				member_code = '<span class="user user-'+i+'">'+users[i]+'</span>';
				break;
			case 'settings':
				member_code = '<li><span class="user user-'+i+'">'+users[i]+'</span></li>';
				break;
		}
		list_code += member_code;
	}
	if(mode == 'settings') {
		list_code = '<ul>'+list_code+'</ul>';
	}
	return list_code;
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

function setTopic() {
	topic = $('#topic-input').val();
	if(topic) {
		$('#topic').html(topic);
		updateListMembers();
	}
}

function saveSettings() {
	setTopic();
	options.switch_user_after_posted_message = $('#switch_user_after_posted_message_box').attr('checked');
	options.switch_user_after_blank_message = $('#switch_user_after_blank_message_box').attr('checked');
	$('#settings-modal').modal('hide');
}

$(document).ready(function() {
	//when something is typed in the input box
	$('#input').keyup(function(e) {
		//if it was return (without shift)
		if(e.keyCode == 13 && !shifted) {
			postMessage();
		}
	});
	updateListMembers();
	$('#settings-save-button').click(function() {
		saveSettings();
	});
	$('#send-button').click(function() {
		postMessage();
	});
	$('#topic-button').click(function() {
		setTopic();
	});
	showMessage(0, 'Hello!');
	showMessage(1, 'Goodbye!');
	showMessage(2, 'Hello!');
	showMessage(3, 'Goodbye!');
});
