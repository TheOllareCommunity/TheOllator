
/*
document.getElementById("start").onclick = function(e){
    if(document.getElementById("urlArea").value==""){
        alert("Insert a Spotify URI in the textbox...");
    }
};
*/

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const result = urlParams.get('result')

document.onLoad = () =>{
    if (result == -1){
        alert("invalid spotify URI, check it and try again!")
    }

    if (result == 1){
        alert("The ollare community thanks you for your support <3")
    }

    if (result == -2){
        alert("The ollare community thanks you for your support <3")
    }

}

fileUploader=document.getElementById('uploadedBeat');
document.getElementById("uploadButton").onclick = function(e){
    fileUploader.click();
};

fileUploader.onchange = function(e){
    if( fileUploader.files.length > 0 ){
        document.getElementById('submitBeat').click();
    }
};

