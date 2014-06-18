var app = angular.module('Local Instant Messenger', []);

app.controller('ConversationController', function ($scope) {
  $scope.messages = [];
  $scope.users = ['User 1', 'User 2', 'User 3', 'User 4'];
  $scope.currentUID = 0;

  function showMessage (uid, message) {
    $scope.messages.push({
      user: $scope.users[uid],
      message: message
    });
    $(window).scrollTop($(document).height());
  }

  function switchUser() {
    if($scope.currentUID < users.length-1) {
      $scope.currentUID++;
    }
    else {
      $scope.currentUID = 0;
    }
  }

  $scope.addMessage = function () {
    showMessage($scope.currentUID, $scope.input);
    switchUser();
    $scope.input = '';
    $(window).scrollTop($(document).height());
  };

  showMessage(0, 'Hello!');
  showMessage(1, 'Goodbye!');
  showMessage(2, 'Hello!');
  showMessage(3, 'Goodbye!');
});

var users = ['User 1', 'User 2', 'User 3', 'User 4'];
var currentUID = 0;

var options = {
  switchUserAfterPostedMessage: true,
  switchUserAfterBlankMessage: true
};

/*
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
*/

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

  $('#settings-save-button').click(saveSettings);
  $('#topic-button').click(setTopic);
});
