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
                    // jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses[0].Link = storePath + fileName;
                     console.log(jsonObject.Pages[i].Rows[p].CellContents[j].Value);
                }
            }
        }
    }
    return jsonObject;
}

function replacementValueImages(jsonObjectValue, fileName, storePath) {
    var value = jsonObjectValue.split('src=');
    var src = value[1].split('\'')
     console.log(src[1]);
    console.log("ClassStore " + storePath);
    src[1] = storePath + fileName;
    console.log(src[1]);
    value[1] = src.join('\'');
    console.log(value[1]);
    console.log(value.join('src='));
    return  value.join('src=');
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