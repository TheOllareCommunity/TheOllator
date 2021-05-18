document.body.ondrop= dropHandler
document.body.ondragover= dragOverHandler
//document.ondragleave = dragLeaveHandler

overlay = document.getElementById("overlay_container")
fileInput = document.getElementById("fileInput")

function dropHandler(ev){
  console.log('File(s) dropped');
    overlay.style.display = 'none'
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file.name);
          fileInput.files = ev.dataTransfer.files;
          console.log(fileInput.files)
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
      }
  

    }
}

function dragOverHandler(ev){
  console.log('File(s) in drop zone');
  overlay.style.display = 'block'
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

/*
function dragLeaveHandler(ev) {
  overlay.style.display = 'none'
}
*/


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const result = urlParams.get('result')


document.onLoad = () =>{

    if (result == -2){
        alert("Something went wrong, please try again")
    }
}