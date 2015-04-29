'use strict';
/**
 * @ngdoc function
 * @name rfid.controller:RfidCtrl
 * @description
 * # RfidCtrl
 * Controller of the rfid
 */
angular.module('rfid')
  .controller('RfidCtrl', function ($scope, socket, $timeout) {
    var final_transcript = '';
    var start_timestamp;

    var upgrade = function() {
      console.log("UPGRADE");
      $scope.msg = "SHOULD BE UPGRADE";
    }
    
    if (!('webkitSpeechRecognition' in window)) {
      upgrade();
    }
    else {
      $scope.recognition = new webkitSpeechRecognition();
      $scope.recognition.lang = "th-TH";
      $scope.recognition.continuous = true;
      $scope.recognition.interimResults = true;

      $scope.recognition.onstart = function() {
        $scope.recognizing = true;
        console.log("ON START", arguments);
      }

      $scope.recognition.onend = function() {
        console.log("ON END", arguments);
         $scope.recognizing = false;
          if ($scope.ignore_onend) {
            return;
          }
      }   

      $scope.recognition.onerror = function(result) {
        console.log("ERROR");
            if (event.error == 'no-speech') {
              // start_img.src = 'mic.gif';
              // showInfo('info_no_speech');
               $scope.ignore_onend = true;
            }

            if (event.error == 'audio-capture') {
               $scope.ignore_onend = true;
            }

            if (event.error == 'not-allowed') {
              // if (event.timeStamp - start_timestamp < 100) {
              //   showInfo('info_blocked');
              // } else {
              //   showInfo('info_denied');
              // }
               $scope.ignore_onend = true;
            }
      }

      $scope.recognition.onresult = function() {
           var interim_transcript = '';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
              } else {
                interim_transcript += event.results[i][0].transcript;
              }
              $scope.final_text_1 = interim_transcript;
              $scope.$apply();

            }

            final_transcript = (final_transcript);
            $scope.final_text = final_transcript;

            $scope.$apply();

            // speak(final_transcript);
            $scope.recognizing = false;
      }
    }

    $scope.start_regcognize = function() {
        if ($scope.recognizing) {
          console.log("STOP");
          $scope.recognition.stop();
          return;
        }

        final_transcript = '';
        // $scope.recognition.lang = "th-TH";
        $scope.recognition.start();

        $scope.ignore_onend = false;
        start_timestamp = event.timeStamp;


    }

    var utterance = new SpeechSynthesisUtterance();
    var speak = function(text, endFn, startFn) {
        // utterance.text = "บัตรหมายเลข " + data.cardId.split().join(" ") + " สามารถเข้าสู่ระบบได้ค่ะ";
         utterance.text = text; 
         // utterance.text = "สวัสดีก้าว"; 
         // utterance.text = "สวัสดีน้องแมน: " + new Date(); 
         // utterance.text = new Date().toString();
        // utterance.text = "Card number " + data.cardId;
        // utterance.text += "Permission granted ";
        // utterance.text += "How can I serve you today?";
        // utterance.lang = 'en-UK';
        // utterance.rate = 2;
        // utterance.pitch = 0;
          // utterance.rate = 0.1;
        utterance.pitch = 1.0;
        // utterance.volume = 0.5;
        utterance.lang = 'th-TH';


        utterance.onstart = function(event) {
          if (startFn) {
            startFn(event);
          }
        };

        utterance.onend = function(event) {
          if (endFn) {
            endFn(event);
          }
        };


        if (!speechSynthesis.speaking) {
          // speechSynthesis.speak(utterance, function() {
          //   console.log("arguments: ", arguments);
          // })

        }
        else {
          console.log("SKIP");
        }

    }

       $scope.$on('$viewContentLoaded', function(){
        console.log("LOADED");
    });

    socket.on('rfid-read', function(data) {
        $scope.cardId = data.cardId;

        var onFinalEnd = function() {
          // $scope.mic.start();
          $scope.start_regcognize();

        //   $timeout(function() {
        //     $scope.recognizing = false;
        //     $scope.recognition.stop();
        //   }, 10000);
        }

        var onEnd = function() {
          speak("มีอะไรให้ช่วยบ้าง? ", onFinalEnd)
        }


        speak("สวัสดี " + data.name.en, onEnd);
    });
    
  });
