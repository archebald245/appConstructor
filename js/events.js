var url;
var store;
var fileNameImage;
var resources;
var indexPage = 0;

function initSwipe(){
    $(document).swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if((direction == "right")&(indexPage>0)){
                renderingPage(indexPage - 1);
            }else if((direction == "left")&(indexPage<data.Pages.length-1)){
                renderingPage(indexPage + 1);
            }
        }
    });
}

function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
         fileSystem.root.getDirectory("PhonegapImages", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
         store = fileSystem.root.nativeURL + "PhonegapImages/" ;
         console.log(store);
     });
     
    resources = resourcesFromJson(data);
    
    for(var i = 0;i<resources.length;i++){
        fileNameImage = resources[i];
        console.log(fileNameImage);
        download();
    }
    console.log("indexStore " + store);
    appStart();    
}

function download() {
    var remoteFile = encodeURI(fileNameImage);
    var localFileName = encodeURI("PhonegapImages/" + remoteFile.substring(remoteFile.lastIndexOf('/')+1));
    var localPath;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

        fileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
             localPath = fileEntry.toURL();
            console.log( localPath );
            var ft = new FileTransfer();
            ft.download(remoteFile,
                localPath, function(entry) {
                   
                }, fail);
        }, fail);
    }, fail);
}
    
function fail(error) {
    console.log(error.code);
}
    
function onGetDirectorySuccess(dir) { 
      console.log("Created dir "+dir.name); 
} 

function onGetDirectoryFail(error) { 
     console.log("Error creating directory "+error.code); 
} 
  
function appStart() {
    console.log("add" + store)
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
      store = fileSystem.root.nativeURL + "PhonegapImages/" ;
        data = SearchValueImages(data, store);
        createMenu();
    });
}
    
function createMenu(){
    var div;
    var label;
    for(var i =0;i<data.Pages.length;i++){
        div = $('<div class="classPageLink" id ='+ i+' onClick="clickPageOnDropdownMenu(event)"></div>');
         label = $('<label>' + data.Pages[i].Name + '</label>');
         label.appendTo(div);
       div.appendTo('div.classDropdownList');
    }  
    addClassHide();
    addListener();      
}

function clickPageOnDropdownMenu(event){
     renderingPage(event.currentTarget.id);
}
function addListener(){
  document.querySelector('body').addEventListener('click',addClassHide,true);
}  
  
function addClassHide(){
    $(".classPageLink").addClass("classHide");
    console.log("classHide");
}
function removeClassHide(){
    $(".classPageLink").removeClass("classHide");
}
  
function onClickButtonMenu(){
  removeClassHide();
}