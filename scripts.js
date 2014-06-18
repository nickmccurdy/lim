var app = angular.module('Local Instant Messenger', []);

app.controller('ConversationController', function ($scope) {
  $scope.messages = [];
  $scope.users = ['User 1', 'User 2', 'User 3', 'User 4'];
  $scope.currentUID = 0;

  // options
  $scope.switchUserAfterPostedMessage = true;
  $scope.switchUserAfterBlankMessage = true;

  function showMessage (uid, message) {
    $scope.messages.push({
      user: $scope.users[uid],
      message: message
    });
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
    //if there is a message in the input box
    if($scope.input) {
      //submit a new IM
      // TODO: check if we need to .trim() the input
      showMessage($scope.currentUID, $scope.input);
      $scope.input = '';
      document.getElementById('input').focus();

      //switch active user
      if($scope.switchUserAfterPostedMessage) {
        switchUser();
      }
    }
    //if the input box is empty
    else {
      //switch active user
      if($scope.switchUserAfterBlankMessage) {
        switchUser();
      }
    }
  };

  showMessage(0, 'Hello!');
  showMessage(1, 'Goodbye!');
  showMessage(2, 'Hello!');
  showMessage(3, 'Goodbye!');
});
