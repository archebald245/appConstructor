var url;
var store;
var fileNameImage;
var resources;
var indexPage = 0;
var applicationData;
var countFileDownload = 0;
var countFileDownloadFail = 0;

function initSwipe(){
    $(document).swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if((direction == "right")&(indexPage>0)){
                renderingPage(indexPage - 1);
            }else if((direction == "left")&(indexPage<applicationData.Pages.length-1)){
                renderingPage(Number(indexPage) + 1);
            }
        },
        allowPageScroll:"vertical"
    });
}

function init(){
    blockUi()
    document.addEventListener("deviceready", onDeviceReady, false);
    $(".classDropdownList").addClass("classHide");
    //initSwipe();
}

function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        window.myFileSystem=fileSystem;
         fileSystem.root.getDirectory("Phonegap", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
         onCheckJson();
         store = fileSystem.root.nativeURL + "Phonegap/" ;
         console.log(store);
         
     });
     
    
    
    console.log("indexStore " + store);
    appStart();    
}

function download() {
    var remoteFile = encodeURI(fileNameImage);
    var localFileName = encodeURI("Phonegap/" + remoteFile.substring(remoteFile.lastIndexOf('/')+1));
    var localPath;
    var resourcesArr = [];
    for(var i = 0, iterator = 0;i<resources.length; i++, iterator++){
        if(resources[i]!="undefined"){
            resourcesArr[iterator] = resources[i];
        }
    }
    resources = resourcesArr;
    
        window.myFileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
            
             localPath = fileEntry.toURL();
            console.log( localPath );
            var ft = new FileTransfer();
            ft.download(remoteFile,
                localPath, function(entry) {
                   countFileDownload = countFileDownload+1;
                   if((countFileDownload+countFileDownloadFail) === resources.length){
                     callback();  
                   }
                   
                   
                   
                }, failDownload);
        }, fail);
}
 
 function failDownload(error) {
     countFileDownloadFail = countFileDownloadFail+1;
     
    console.log(error.code);
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
      
       
    });
}
    
function createMenu(){
    var div;
    $("div.classDropdownList").html("");
    var label;
    for(var i =0;i<applicationData.Pages.length;i++){
        div = $('<div class="classPageLink" id ='+ i+' onClick="clickPageOnDropdownMenu(event)"></div>');
         label = $('<label>' + applicationData.Pages[i].Name + '</label>');
         label.appendTo(div);
       div.appendTo('div.classDropdownList');
    }  
    addListener();   
    slideUp(); 
    showActivePageInMenu(0);
}

function clickPageOnDropdownMenu(event){
    slideUp();
    renderingPage(event.currentTarget.id);
}
function addListener(){
    document.querySelector('body').addEventListener('click',slideUp,true);
}  

function slideUp(){
     $( ".classDropdownList" ).slideUp( "fast");
}

function slideDown(){
    if ( $(".classDropdownList").is( ":hidden" ) ) {
    $(".classDropdownList").slideDown( "fast" );
    }
}

function showActivePageInMenu(page){
    $(".classPageLink").removeClass("activePage");
    $("#"+ page +"").addClass("activePage");
}
  
function onClickButtonMenu(){
  slideDown()
}

function blockUi(){
     $.blockUI({ css: { 
            border: 'none', 
            padding: '15px', 
            backgroundColor: '#000', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: .5, 
            color: '#fff' 
        } }); 
}

function unBlockUi(){
    $.unblockUI();
}