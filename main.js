var gesture_meaning = "";

Webcam.set
({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:92
})

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/m9xQRJPar/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The meaning of this gesture is, " + gesture_meaning;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if (error)
        console.error(error);
    else
    {
        console.log(results);
        prediction_1 = results[0].label;
        if (results[0].label == "Thumbs-Up")
        {
            document.getElementById("result_gesture_meaning").innerHTML = "All the best";
            gesture_meaning = "All the best";
            document.getElementById("result_gesture_name").innerHTML = results[0].label;
            document.getElementById("update_gesture_emoji").innerHTML = "👍";
        }
        if (results[0].label == "Thumbs-Down")
        {
            document.getElementById("result_gesture_meaning").innerHTML = "I don't approve";
            gesture_meaning = "I don't approve";
            document.getElementById("result_gesture_name").innerHTML = results[0].label;
            document.getElementById("update_gesture_emoji").innerHTML = "👎";
        }
        if (results[0].label == "Amazing")
        {
            document.getElementById("result_gesture_meaning").innerHTML = "This looks amazing";
            gesture_meaning = "This looks amazing";
            document.getElementById("result_gesture_name").innerHTML = results[0].label;
            document.getElementById("update_gesture_emoji").innerHTML = "👌";
        }
        if (results[0].label == "Victory")
        {
            document.getElementById("result_gesture_meaning").innerHTML = "Victory";
            gesture_meaning = "Victory";
            document.getElementById("result_gesture_name").innerHTML = results[0].label;
            document.getElementById("update_gesture_emoji").innerHTML = "✌"; 
        }
        speak();
    }
}