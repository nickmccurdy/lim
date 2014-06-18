var app = angular.module('Local Instant Messenger', []);

app.controller('ConversationController', function ($scope) {
  $scope.messages = [
    { user: 'User 1', message: 'Hello!'},
    { user: 'User 2', message: 'Goodbye!'},
    { user: 'User 3', message: 'Hello!'},
    { user: 'User 4', message: 'Goodbye!'}
  ];

  $scope.users = ['User 1', 'User 2', 'User 3', 'User 4'];
  $scope.currentUID = 0;

  // options
  $scope.switchUserAfterPostedMessage = true;
  $scope.switchUserAfterBlankMessage = true;

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
      $scope.messages.push({
        user: $scope.users[$scope.currentUID],
        message: $scope.input
      });
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
});
