song = "";
song2 = "";

var leftWristscore = 0;
var rightWristscore = 0;
var status1 = "";
var status2 = ""; 

var leftWristX = 0;
var rightWristX = 0;

var leftWristY = 0;
var rightWristY = 0;
function setup(){
    canvas = createCanvas(300, 300);
    canvas.position(600, 250);
    img = createCapture(VIDEO);
    img.hide();

    
    classifier = ml5.poseNet(img, MdoelLoaded);
    classifier.on('pose', gotPoses);
}

function MdoelLoaded(){
    console.log("OoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOo");
}

function draw(){
    image(img, 0, 0, 300, 300);

    fill("#FF0000");
    stroke("#FF0000");

    status1 = song.isPlaying();
    status2 = song2.isPlaying();

    if(leftWristscore > 0.2){
        circle(leftWristX - 225, leftWristY- 125, 20);
        song2.stop();
        if(status1 == false){
            song.play();
            document.getElementById("song_playing").innerHTML = "Song playing is - Harry potter";
        }
    }
    if(rightWristscore > 0.2){
        circle(rightWristX- 100, rightWristY- 100, 20);
        song.stop();
        if(status2 == false){
            song2.play();
            document.getElementById("song_playing").innerHTML = "Song playing is - Peter pan";
        }
    }
}

function preload(){
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}



function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristscore = results[0].pose.keypoints[9].score;
        rightWristscore = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}