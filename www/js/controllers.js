angular.module('starter.controllers', [])

.controller('photoCtrl', function($scope,$ionicPlatform, $cordovaCapture, $cordovaImagePicker, $ionicActionSheet, NODE) {

var fd = new FormData;
var url = NODE + '/user';
console.log('fd is -',fd)
console.log('NODE:',NODE)
console.log('url',url)

//$ionicPlatform.ready(function() {

        

        // action sheet
        $scope.showActionSheet = function () {

            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: ' Capture'},
                    {text: ' Pick'}
                ],
                title: 'Add Photo',
                cancelText: 'Cancel',
                cancel: function () {
                    //
                },
                buttonClicked: function (index) {
                    if (index == 0) {
                        var options = {
                            limit: 1
                        };

                        // capture
                        $cordovaCapture.captureImage(options).then(function (imageData) {
                            

                            var imgData = imageData[0].fullPath;
                            console.log('capturedImage-',imgData)
                            $scope.profilePic= imgData
                            // convert image to base64 string
                            //Photo.convertImageToBase64(imgData, function(base64Img){
                              // $scope.formData.photo = base64Img;
                             fd.append('photo', imgData)
                             console.log('formData after capture image is ', $scope.fd.photo)
                            //})

                        }, function (error) {
                            $scope.photoError = error;
                        })
                    } else if (index == 1) {
                        var options = {
                            maximumImagesCount: 1,
                        }

                        // pick
                        $cordovaImagePicker.getPictures(options).then(function (results) {
                            var imgData = results[0];
                            $scope.profilePic= imgData
                            console.log('Picked image', imgData)
                            fd.append('photo', imgData)
                            console.log('formData after capture image is ', fd.photo)
                            
                            
                            
                            // convert image to base64 string
                            //Photo.convertImageToBase64(imgData, function(base64Img){
                              //  $scope.formData.photo = base64Img;
                            //})
                        })
                    }
                }
            })
        }

   // })

    $scope.register = function(user) {
      
      
      console.log('form has',fd)
      
      fd.append('user', user)
     console.log('formData has image ', fd.user.username)
     console.log('formData has user name ', fd.user.username)
      console.log('formData has user email ', fd.user.email)

        $http.post('url', fd, {
            
            headers: {'Content-Type': undefined}
        })
            .success(function(response){
              console.log('Recd from node',response)
               alert('registered!')
            })
            .error(function (errorData) {
                console.log(errorData)
            })
    }

})






.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
