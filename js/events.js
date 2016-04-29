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
                goToPage(indexPage - 1);
            }else if((direction == "left")&(indexPage<applicationData.Pages.length-1)){
                goToPage(Number(indexPage) + 1);
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
         checkConnection();
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
    if(applicationData.Menu!=null){
    getPositionMenu(applicationData.Menu.Position);
    var div;
    $("div.classDropdownList").html("");
    var label;
    for(var i =0;i<applicationData.Menu.MenuItems.length;i++){
        if(applicationData.Menu.MenuItems[i].IsExternal == true){
            div = $('<a href=' +applicationData.Menu.MenuItems[i].Link + ' class="menu-item-href"><div class="classPageLink"><label>' + applicationData.Menu.MenuItems[i].Title + '</label></div></a>');
        }else{
            div =  $('<div class="classPageLink" id ='+ applicationData.Menu.MenuItems[i].Link +' onClick="clickPageOnDropdownMenu(' + applicationData.Menu.MenuItems[i].Link +')"><label>' + applicationData.Menu.MenuItems[i].Title + '</label></div>');

        }
        //  label.appendTo(div);
       div.appendTo('div.classDropdownList');
    }
    addListener();
    slideUp();
    showActivePageInMenu(applicationData.Pages[0].Id);
    }
    indexPage = applicationData.Pages[0].Id;
}

function clickPageOnDropdownMenu(link){
    slideUp();
    goToPage(link);
}
function addListener(){
    document.querySelector('body').addEventListener('click',slideUp,true);
}

function slideUp(){
     $( ".classDropdownList" ).slideUp( "fast");
}
$('.menu-icon').click(function(){
  $( ".classDropdownList" ).slideToggle();
})

function openMenu(){
    if ( $(".classDropdownList").is( ":hidden" ) ) {
    $(".classDropdownList").slideDown( "fast" );
  }else{
      $(".classDropdownList").slideUp( "fast" );
  }
}

function showActivePageInMenu(page){
    $(".classPageLink").removeClass("activePage");
    $("#"+ page +"").addClass("activePage");
}

function onClickButtonMenu(){

  openMenu()
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

function cutImageOfYoutubeContainer(){
    $(".youtube-image").remove();

    // var val;
    // for (var i = 0, iterator = 0; i < applicationData.Pages.length; i++) {
    //     for (var p = 0; p < applicationData.Pages[i].Rows.length; p++) {
    //         for (var j = 0; j < applicationData.Pages[i].Rows[p].CellContents.length; j++ , iterator++) {
    //             if (applicationData.Pages[i].Rows[p].CellContents[j].ContentTypeId == 7) {
    //                 val = applicationData.Pages[i].Rows[p].CellContents[j].Value.split('<img');
    //                 applicationData.Pages[i].Rows[p].CellContents[j].Value = val[0] + "</div>";
    //             }
    //         }
    //     }
    // }
}

function getPositionMenu(positionMenu)
{

    switch(positionMenu)
    {

        case 'top-left':
        $('span.menu-icon').show().addClass('menu-icon-left');
        $('.classMenu').show().addClass('classMenuTop');
        $('.classDropdownList').addClass('classDropdownList-topMenu');
        break;

        // case 'center-left':
        // $('span.menu-icon').show().addClass('side-menu-left');
        // $('.classMenu').show();
        // break;

        case 'bottom-left':
        $('span.menu-icon').show().addClass('menu-icon-left');
        $('.classMenu').show().addClass('classMenuBottom');
        $('.classDropdownList').addClass('classDropdownList-downMenu');
        break;

        case 'top-right':
        $('span.menu-icon').show().addClass('menu-icon-right');
        $('.classMenu').show().addClass('classMenuTop');
        $('.classDropdownList').addClass('classDropdownList-topMenu');
        break;

        // case 'center-right':
        // $('span.menu-icon').show().addClass('side-menu-right');
        //  $('.classMenu').show();
        // break;

        case 'bottom-righ':
        $('span.menu-icon').show().addClass('menu-icon-right');
        $('.classMenu').show().addClass('classMenuBottom');
        $('.classDropdownList').addClass('classDropdownList-downMenu');
        break;

        default:
        $('span.menu-icon').show().addClass('menu-icon-left');
        $('.classMenu').show().addClass('classMenuTop');
        $('.classDropdownList').addClass('classDropdownList-topMenu');
        break;



    }


}


    // var player;
    // function onYouTubeIframeAPIReady(){
    //            player = new YT.Player("video" ,{
    //                heidth: '390',
    //                width: '640',
    //                wideoId: "L4bWC70gmxU"
    //            })
    //        }
