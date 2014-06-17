var users = ['User 1', 'User 2', 'User 3', 'User 4'];
var currentUID = 0;
var options = {
  switchUserAfterPostedMessage: true,
  switchUserAfterBlankMessage: true
};

$(document).bind('keyup keydown', function(e) {
  shifted = e.shiftKey;
});

function postMessage() {
  var trimmedInput = $('#input').val().trim();

  //if there is a message in the input box
  if(trimmedInput) {
    //submit a new IM
    showMessage(currentUID, trimmedInput);
    $('#input').val('');
    $('#input').focus();
    //switch active user
    if(options.switchUserAfterPostedMessage) {
      switchUser();
    }
  }
  //if the input box is empty
  else {
    //switch active user
    if(options.switchUserAfterBlankMessage) {
      switchUser();
    }
  }
}

function showMessage(uid, message) {
  messageCode = _.template($('#message-template').html(), {
    uid: uid,
    user: users[uid],
    message: message
  });
  $(messageCode).hide().appendTo('#conversation').slideDown(200, function() {
    $(window).scrollTop($(document).height());
  });
}

function updateListMembers() {
  $('#member-list').html(memberList());
  $('#member-list .user-'+currentUID).addClass('active');
  window.document.title = $('#topic').html()+': ' + users.join(', ');
}

function memberList() {
  return _.template($('#user-template').html(), {
    user: users
  });
}

function switchUser() {
  if(currentUID < users.length-1) {
    currentUID++;
  }
  else {
    currentUID = 0;
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
  options.switchUserAfterPostedMessage = $('#switch_user_after_posted_message_box').attr('checked');
  options.switchUserAfterBlankMessage = $('#switch_user_after_blank_message_box').attr('checked');
  $('#settings-modal').modal('hide');
}

$(document).ready(function() {
  updateListMembers();

  //when something is typed in the input box
  $('#input').keyup(function(e) {
    //if it was return (without shift)
    if(e.keyCode == 13 && !shifted) {
      postMessage();
    }
  });
  $('#settings-save-button').click(saveSettings);
  $('#send-button').click(postMessage);
  $('#topic-button').click(setTopic);

  showMessage(0, 'Hello!');
  showMessage(1, 'Goodbye!');
  showMessage(2, 'Hello!');
  showMessage(3, 'Goodbye!');
});
