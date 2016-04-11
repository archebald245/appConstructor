var jsonStringify;

function onCheckJson(){
    if($.jStorage.get('appData') != null){
        applicationData = JSON.parse($.jStorage.get('appData'));
        createMenu();
        reactRender();
    }else{
        applicationData = JSON.parse(data);
        downloadResources();
        if(resources.length==0){
            var jsonString = JSON.stringify(applicationData);
             console.log(jsonString);
            $.jStorage.set('appData', jsonString);
            createMenu();
            reactRender();
        }
      
    }
    console.log($.jStorage.get('appData'));
    
        
// window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
//     fileSystem.root.getDirectory("Phonegap", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
//     var localFileName = encodeURI("Phonegap/" + "applicationData.json");
//     fileSystem.root.getFile(localFileName, null, gotFileEntryToRead, failCheckJson);
//     console.log("check");
// });
}
   

function downloadResources() {
    resources = resourcesFromJson(applicationData);
    
    for(var i = 0;i<resources.length;i++){
        fileNameImage = resources[i];
        console.log(fileNameImage);
        download();
        var jsonString = JSON.stringify(applicationData);
    console.log(jsonString);
    $.jStorage.set('appData', jsonString);
    createMenu();
    reactRender();
    }
    
    
   
  
}

function callback(){
    store = window.myFileSystem.root.nativeURL + "Phonegap/" ;
    applicationData = SearchValueImages(applicationData, store);
    console.log("app" + applicationData);
      
}

function replaceData(){
    console.log(data);
    data = data.replace(/\n/g,'');
    data = data.replace(/\t/g,'');
    data = data.replace(/\b/g,'');
    data = data.replace(/\r/g,'');
    data = data.replace(/\v/g,'');
    data = data.replace(/\f/g,'');
    console.log(data);
}
