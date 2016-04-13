function resourcesFromJson(jsonObject) {
    //var jsonObject = JSON.parse(data);
    var resourcesArray = new Array();
    var resourcesToDownload;
    var fileName;
    var storePath = window.myFileSystem.root.nativeURL + "Phonegap/" ;
    for (var i = 0, iterator = 0; i < jsonObject.Pages.length; i++) {
        for (var p = 0; p < jsonObject.Pages[i].Rows.length; p++) {
            for (var j = 0; j < jsonObject.Pages[i].Rows[p].CellContents.length; j++ , iterator++) {
                if (jsonObject.Pages[i].Rows[p].CellContents[j].IsDownloadable == true) {
                    resourcesArray[iterator] = jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses[0].Link;                    
                }
            }
        }
    }
     if($.jStorage.get('resources')!=null){
       resourcesToDownload = compareResouces($.jStorage.get('resources'),resourcesArray, storePath);
    }else{
        resourcesToDownload = resourcesArray;
    }
    
    $.jStorage.set('resources',resourcesArray);
    return resourcesToDownload;
}

function SearchValueImages(jsonObject, storePath) {
     var fileName;
     
    for (var i = 0, iterator = 0; i < jsonObject.Pages.length; i++) {
        for (var p = 0; p < jsonObject.Pages[i].Rows.length; p++) {
            for (var j = 0; j < jsonObject.Pages[i].Rows[p].CellContents.length; j++ , iterator++) {
                if ((jsonObject.Pages[i].Rows[p].CellContents[j].IsDownloadable == true)&(jsonObject.Pages[i].Rows[p].CellContents[j].ContentType != "Empty")) {
                    resources[iterator] = jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses[0].Link;
                    fileName = resources[iterator].split('/');
                    console.log(fileName);
                    console.log(resources);
                    console.log(fileName.length);
                    fileName = fileName[fileName.length-1];
                    console.log(fileName);
                   
                    
                    jsonObject.Pages[i].Rows[p].CellContents[j].Value = replacementValueImages(jsonObject.Pages[i].Rows[p].CellContents[j].Value, fileName, storePath);
                    // jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses[0].Link = storePath + fileName;
                     console.log(jsonObject.Pages[i].Rows[p].CellContents[j].Value);
                }
            }
        }
    }
   
    return jsonObject;
}

function compareResouces(oldResources, newResources, storePath){
    var equalResources=[];
    var deleteOldResources = [];
    for(var i=0;i<oldResources.length;i++){
        for(var j=0;j<newResources.length;j++){
            if(oldResources[i]==newResources[j]){
                equalResources.push(newResources[j]);
                newResources[j] = null;
                oldResources[i] = null;
            }
        }
    }
            for(var i=0;i<oldResources.length;i++){
        if(oldResources[i] != null){
            deleteOldResources.push(oldResources[i]);
        }
    }
             $.jStorage.set('oldResources', deleteOldResources);
           
    
  
    
    for(var i=0;i<newResources.length;i++){
        if(newResources[i] != null){
            equalResources.push(newResources[i]);
        }
    }
    return equalResources;
    
}

function replacementValueImages(jsonObjectValue, fileName, storePath) {
    var value = jsonObjectValue.split('src=');
    var src = value[1].split('\"')
     console.log(src[1]);
    console.log("ClassStore " + storePath);
    src[1] = storePath + fileName;
    console.log(src[1]);
    value[1] = src.join('\"');
    console.log(value[1]);
    console.log(value.join('src='));
    return  value.join('src=');
    /*
    var m,
    urls = [], 
    str = '<img src="http://site.org/one.jpg />',
    rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

    m = rex.exec( str );
    str = str.replace(m[1], "test");
    */
}

function deleteImage(imagePath) {
    var remoteFile = encodeURI(imagePath);
        var localFileName = encodeURI("Phonegap/" + remoteFile.substring(remoteFile.lastIndexOf('/')+1));
  
    window.myFileSystem.root.getFile(localFileName, {create:false}, function(fileEntry){
        fileEntry.remove(function(file){
            console.log("File removed!");
        },function(){
            console.log("error deleting the file " + error.code);
            });
        },function(){
            console.log("file does not exist");
        });

}

function renderingPage(index) {
    indexPage= index;
    showActivePageInMenu(index);
    $("#container").empty();
    slideUp();
    
    reactRender();
    
    $("a").each(function(i, e){
        var hrefVal = $(e).attr("href");
        $(e).click(function(){
            window.open(hrefVal, '_system');
        });
    });
}

function deleteResources(){
    var oldResources =  $.jStorage.get('oldResources');
    if (oldResources != null) {
        for (var i = 0; i < oldResources.length; i++) {
            if (oldResources[i] != null) {
                deleteImage(oldResources[i]);
            }
        }
    }
    deleteImage("Phonegap/undefined");
    deleteImage("Phonegap/null");
}