'use strict';
/**
 * @ngdoc function
 * @name rfid.controller:RfidCtrl
 * @description
 * # RfidCtrl
 * Controller of the rfid
 */
angular.module('rfid')
  .controller('RfidCtrl', function ($scope, socket) {

    socket.on('rfid-read', function(data) {
        $scope.cardId = data.cardId;

        var utterance = new SpeechSynthesisUtterance();
        // utterance.text = "บัตรหมายเลข " + data.cardId.split().join(" ") + " สามารถเข้าสู่ระบบได้ค่ะ";
         utterance.text = "สวัสดีแมน"; 
         utterance.text = "สวัสดีก้าว"; 
         // utterance.text = "สวัสดีน้องแมน: " + new Date(); 
         utterance.text = new Date().toString();
        // utterance.text = "Card number " + data.cardId;
        // utterance.text += "Permission granted ";
        // utterance.text += "How can I serve you today?";
        utterance.lang = 'en-UK';
        // utterance.rate = 2;
        // utterance.pitch = 0;
          // utterance.rate = 0.1;
      utterance.pitch = 1.0;
      // utterance.volume = 0.5;
        utterance.lang = 'th-TH';


        utterance.onstart = function(event) {
            console.log('The utterance started to be spoken.')
            $scope.status = event;
            $scope.$apply();
        };

        utterance.onend = function(event) {
            console.log('The utterance started to be spoken.')
            $scope.status = event;
            $scope.$apply();
        };

        if (!speechSynthesis.speaking) {
          console.log('data', data);

          speechSynthesis.speak(utterance, function() {
            console.log("arguments: ", arguments);
          })

        }
        else {
          console.log("SKIP");
        }


    });
    
  });
