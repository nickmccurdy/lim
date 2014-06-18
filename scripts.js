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
    if($scope.currentUID < $scope.users.length-1) {
      $scope.currentUID++;
    }
    else {
      $scope.currentUID = 0;
    }
  }

  $scope.addMessage = function () {
    switchUser();
    if ($scope.input.length) {
      showMessage($scope.currentUID, $scope.input);
      $scope.input = '';
      $(window).scrollTop($(document).height());
    }
  };

  showMessage(0, 'Hello!');
  showMessage(1, 'Goodbye!');
  showMessage(2, 'Hello!');
  showMessage(3, 'Goodbye!');
});

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

function saveSettings() {
  options.switchUserAfterPostedMessage = $('#switch_user_after_posted_message_box').attr('checked');
  options.switchUserAfterBlankMessage = $('#switch_user_after_blank_message_box').attr('checked');
  $('#settings-modal').modal('hide');
}

$(document).ready(function() {
  $('#settings-save-button').click(saveSettings);
});
