song1 = "";
song2= "";
leftX = "";
leftY = "";
rightX = "";
rightY= "";
scoreLeftWrist= 0;
scoreRightWrist = 0;
song1status= "";
song2status = "";

function preload(){
    song1 = loadSound("Astronaut-in-The-Ocean-song.mp3");
    song2 = loadSound("BTS - Dynamite- [PagalWorld.NL].mp3");    
    }

function setup(){
    canvas = createCanvas(500,600);
    canvas.position(500,250);
    
    video = createCapture(VIDEO);
    video.hide();

    PoseNet = ml5.poseNet(video , modalLoaded);
    PoseNet.on('pose' , gotPoses)
    }
    
    function modalLoaded(){
        console.log('PoseNet is PoseNet')    
        }
        
        function gotPoses(results){
        if(results.length > 0)
        {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        leftX = results[0].pose.leftWrist.x;
        leftY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftX + "leftWristY = " + leftY);
        
        rightX = results[0].pose.rightWrist.x;
        rightY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightX + "rightWristY = " + rightY);
        }
        }

        function draw(){
            image(video, 0, 0 ,600, 500);
            
            fill("#5a78d1");
            stroke("#5a78d1");

            song1status = song1.isPlaying();

            if(scoreLeftWrist > 0.2){
            circle(leftX,leftY,20);
            song2.stop();
            if(song1status == false){
                song1.play();   
                }
            }
            song2status = song2.isPlaying();

            if(scoreRightWrist > 0.2){
            circle(rightX,rightY,20);
            song1.stop();
            if(song2status == false){
                song2.play();   
                }
            }
            }

