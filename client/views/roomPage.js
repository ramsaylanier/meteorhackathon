var config = {
  peerjskey: 'e6fvbscma9n3ik9'
}

Template.roomPage.onCreated(function(){
	var instance = this;

  this.name = 'Some room';

  instance.ready = new ReactiveVar(false);
  instance.users = new ReactiveVar();

  let subscription = instance.subscribe('currentRoom', FlowRouter.getParam('roomId'));

	instance.autorun(function() {
    subscription = instance.subscribe('currentRoom', FlowRouter.getParam('roomId'));

    if (subscription.ready()){
      instance.users.set(Rooms.findOne().users);
      instance.ready.set(true);
    } else {
      instance.ready.set(false);
    }

    let roomId = FlowRouter.getParam('roomId');
    let userId = Cookie.get('user');

    Meteor.call('addUserToRoom', roomId, userId , function(err, res){
      console.log("ADDED")
      if (err){
        alert(err)
      }
    } )

	});

  


})

var pendingFrames = {}
var img = new Image()

Template.roomPage.onRendered(function(){
  // videoStream = new Meteor.Stream('videoStream');
  Meteor._debug = (function (super_meteor_debug) {
    return function (error, info) {
      if (!(info && _.has(info, 'msg')))
        super_meteor_debug(error, info);
    }
  })(Meteor._debug);

  Streamy.on(FlowRouter.getParam('roomId'), function(data){
    if(data.userId == Cookie.get('user'))//our own message
      return

    if(pendingFrames[data.userId])
      return

    var canvas = document.getElementById(data.userId)
    var context = canvas.getContext('2d')

    pendingFrames[data.userId] = true
    var t = setTimeout(function(){
      pendingFrames[data.userId] = false
    })
    img.src = data.canvasData;
    img.onload = function(){
      context.drawImage(img, 0, 0)
      pendingFrames[data.userId] = false
      clearInterval(t)
    }
  })

})

Template.roomPage.helpers({
  usersToShow: function(){
    let instance = Template.instance();

    if (instance.ready.get()){
      users = instance.users.get();
      currentUser = Cookie.get('user');

      return _.filter(users, function(user){
        return user !== currentUser
      })
    }
  }
})

// Template.roomPage.onRendered(function() {
//   var signallingChannelName = "uniqueStringTokenForThisSignallingChannel";
//
//   var rtcPeerConnectionConfig = {};
//
//   // Config passed to getUserMedia()
//   //
//   // Could be null, then no media will be requested, i.e., for when you only
//   // want data channels, or one way video/audio calls.
//
//   var mediaConfig = {
//     video: true,
//     audio: true
//   };
//
//   var webRTCSignaller = SingleWebRTCSignallerFactory.create(
//     stream,
//     signallingChannelName,
//     'master',
//     servers,
//     config,
//     mediaConfig
//   );
//
//   // Creates the rtcPeerConnection
//   webRTCSignaller.start();
//
//   // ... Whenever someone wants to inititate a call (make a connection)
//   webRTCSignaller.createOffer();
//
//   // Then if you have written similar code for a client using the same
//   // signallingChannelName then it should connect for a call.
//
// 	var vid = document.getElementById('video-me');
// 	var overlay = document.getElementById('overlay-me');
// 	var overlayCC = overlay.getContext('2d');
//
//
// 	function enablestart() {
// 		var startbutton = document.getElementById('startbutton');
// 		startbutton.value = "start";
// 		startbutton.disabled = null;
// 	}
//
// 	/*var insertAltVideo = function(video) {
// 		if (supports_video()) {
// 			if (supports_ogg_theora_video()) {
// 				video.src = "../media/cap12_edit.ogv";
// 			} else if (supports_h264_baseline_video()) {
// 				video.src = "../media/cap12_edit.mp4";
// 			} else {
// 				return false;
// 			}
// 			//video.play();
// 			return true;
// 		} else return false;
// 	}*/
// 	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
// 	window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;
//
// 	// check for camerasupport
// 	if (navigator.getUserMedia) {
// 		// set up stream
//
// 		var videoSelector = {video : true};
// 		if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
// 			var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
// 			if (chromeVersion < 20) {
// 				videoSelector = "video";
// 			}
// 		};
//
// 		navigator.getUserMedia(videoSelector, function( stream ) {
// 			if (vid.mozCaptureStream) {
// 				vid.mozSrcObject = stream;
// 			} else {
// 				vid.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
// 			}
// 			vid.play();
// 		}, function() {
// 			//insertAltVideo(vid);
// 			alert("There was some problem trying to fetch video from your webcam. If you have a webcam, please make sure to accept when the browser asks for access to your webcam.");
// 		});
// 	} else {
// 		//insertAltVideo(vid);
// 		alert("This demo depends on getUserMedia, which your browser does not seem to support. :(");
// 	}
//
// 	vid.addEventListener('canplay', enablestart, false);
//
// 	/*********** setup of emotion detection *************/
//
// 	var ctrack = new clm.tracker({useWebGL : true});
// 	ctrack.init(pModel);
//
// 	function startVideo() {
// 		// start video
// 		vid.play();
// 		// start tracking
// 		ctrack.start(vid);
// 		// start loop to draw face
// 		drawLoop();
// 	}
//
// 	function drawLoop() {
// 		requestAnimFrame(drawLoop);
// 		overlayCC.clearRect(0, 0, 400, 300);
// 		//psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
// 		if (ctrack.getCurrentPosition()) {
// 			ctrack.draw(overlay);
// 		}
// 		var cp = ctrack.getCurrentParameters();
//
// 		var er = ec.meanPredict(cp);
// 		if (er) {
// 			updateData(er);
// 			for (var i = 0;i < er.length;i++) {
// 				if (er[i].value > 0.4) {
// 					document.getElementById('icon'+(i+1)).style.visibility = 'visible';
// 				} else {
// 					document.getElementById('icon'+(i+1)).style.visibility = 'hidden';
// 				}
// 			}
// 		}
// 	}
//
// 	var ec = new emotionClassifier();
// 	ec.init(emotionModel);
// 	var emotionData = ec.getBlank();
// })
