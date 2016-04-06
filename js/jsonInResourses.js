function resourcesFromJson(jsonObject) {
    //var jsonObject = JSON.parse(data);
    var resourcesArray = new Array();
    var fileName;
    for (var i = 0, iterator = 0; i < jsonObject.Pages.length; i++) {
        for (var p = 0; p < jsonObject.Pages[i].Rows.length; p++) {
            for (var j = 0; j < jsonObject.Pages[i].Rows[p].CellContents.length; j++ , iterator++) {
                if (jsonObject.Pages[i].Rows[p].CellContents[j].IsDownloadable == true) {
                    resourcesArray[iterator] = jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses[0].Link;                    
                }
            }
        }
    }
    return resourcesArray;
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
                    jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses[0].Link = storePath + fileName;
                }
            }
        }
    }
    return jsonObject;
}

function replacementValueImages(jsonObjectValue, fileName, storePath) {
    var value = jsonObjectValue.split('src=');
    var src = value[1].split('\"')
    console.log("ClassStore " + storePath);
    src[1] = storePath + fileName;
    value[1] = src.join('\"');
    return  value.join('src=');
}

function deleteImage(imagePath) {
    var remoteFile = encodeURI(imagePath);
        var localFileName = encodeURI("PhonegapImages/" + remoteFile.substring(remoteFile.lastIndexOf('/')+1));
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
    fileSystem.root.getFile(localFileName, {create:false}, function(fileEntry){
        fileEntry.remove(function(file){
            console.log("File removed!");
        },function(){
            console.log("error deleting the file " + error.code);
            });
        },function(){
            console.log("file does not exist");
        });
    },function(evt){
        console.log(evt.target.error.code);
});
}

function renderingPage(index) {
    indexPage= index;
     $("#container").empty();
            reactRender();
            
}

function doMenu(){
    
}


