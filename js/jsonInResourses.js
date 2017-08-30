 initYoutube();

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
                    for(var z = 0;z<jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses.length; z++,iterator++){
                         resourcesArray[iterator] = jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses[z].Link;      
                    }           
                }
                 if ((jsonObject.Pages[i].Rows[p].CellContents[j].ContentTypeId == 8)) {
                      for(var z = 0;z<jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses.length; z++,iterator++){
                         resourcesArray[iterator] = jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses[z].Link;      
                    }    
                     
                 }
                
                if ((jsonObject.Pages[i].Rows[p].CellContents[j].ContentTypeId == 10)) {
                    
                    var decodedJson = JSON.parse(Base64.decode(jsonObject.Pages[i].Rows[p].CellContents[j].Json));
                    
                    for (var u = 0; u < decodedJson.elements.length; u++ , iterator++) {
                        if (decodedJson.elements[u].IsDownloadable == true) {
                            for(var t=0;t<decodedJson.elements[u].Resourceses.length;t++){
                                
                                resourcesArray[iterator] = decodedJson.elements[u].Resourceses[t].Link;
                                fileName = decodedJson.elements[u].Resourceses[t].FileName;
                               

                                
                                // jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses[k].Link = storePath + fileName;
                                console.log(decodedJson.elements[u].Value);
                                
                                
                            }
                            if ((decodedJson.elements[u].ContentTypeId == 8)) {
                                for (var z = 0; z < decodedJson.elements[u].Resourceses.length; z++ , iterator++) {
                                    resourcesArray[iterator] = decodedJson.elements[u].Resourceses[z].Link;
                                }

                            }
                            decodedJson.elements[u].Value = replacementValueImages(decodedJson.elements[u].Value, decodedJson.elements[u].Resourceses, storePath);
                        }
                    }
                    jsonObject.Pages[i].Rows[p].CellContents[j].Json = Base64.encode(JSON.stringify(decodedJson));
                }
                if ((jsonObject.Pages[i].Rows[p].CellContents[j].ContentTypeId == 11)) {
                    var decodedJsonHbox = JSON.parse(Base64.decode(jsonObject.Pages[i].Rows[p].CellContents[j].Json));
                    
                    for (var z = 0; z < decodedJsonHbox.length; z++ ) {
                        if (decodedJsonHbox[z].IsDownloadable == true) {
                            for(var q=0;q<decodedJsonHbox[z].Resourceses.length;q++, iterator++){
                                
                                resourcesArray[iterator] = decodedJsonHbox[z].Resourceses[q].Link;
                                fileName = decodedJsonHbox[z].Resourceses[q].FileName;
                               

                                
                                // jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses[k].Link = storePath + fileName;
                                console.log(decodedJsonHbox[z].Value);
                            }
                            decodedJsonHbox[z].Value = replacementValueImages(decodedJsonHbox[z].Value, decodedJsonHbox[z].Resourceses, storePath);
                        }
                    }
                    
                    jsonObject.Pages[i].Rows[p].CellContents[j].Json = Base64.encode(JSON.stringify(decodedJsonHbox));
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
                    for(var k=0;k<jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses.length;k++){
                        
                        resources[iterator] = jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses[k].Link;
                        fileName = jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses[k].FileName;
                       

                        
                        // jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses[k].Link = storePath + fileName;
                        console.log(jsonObject.Pages[i].Rows[p].CellContents[j].Value);
                    }
                    jsonObject.Pages[i].Rows[p].CellContents[j].Value = replacementValueImages(jsonObject.Pages[i].Rows[p].CellContents[j].Value, jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses, storePath);
                }
                
                if ((jsonObject.Pages[i].Rows[p].CellContents[j].ContentTypeId == 10)) {
                    
                    var decodedJson = JSON.parse(Base64.decode(jsonObject.Pages[i].Rows[p].CellContents[j].Json));
                    
                    for (var u = 0; u < decodedJson.elements.length; u++ , iterator++) {
                        if (decodedJson.elements[u].IsDownloadable == true) {
                            for(var t=0;t<decodedJson.elements[u].Resourceses.length;t++){
                                
                                resources[iterator] = decodedJson.elements[u].Resourceses[t].Link;
                                fileName = decodedJson.elements[u].Resourceses[t].FileName;
                               

                                
                                // jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses[k].Link = storePath + fileName;
                                console.log(decodedJson.elements[u].Value);
                            }
                            decodedJson.elements[u].Value = replacementValueImages(decodedJson.elements[u].Value, decodedJson.elements[u].Resourceses, storePath);
                        }
                    }
                    jsonObject.Pages[i].Rows[p].CellContents[j].Json = Base64.encode(JSON.stringify(decodedJson));
                }
                if ((jsonObject.Pages[i].Rows[p].CellContents[j].ContentTypeId == 11)) {
                    var decodedJsonHbox = JSON.parse(Base64.decode(jsonObject.Pages[i].Rows[p].CellContents[j].Json));
                    
                    for (var z = 0; z < decodedJsonHbox.length; z++ , iterator++) {
                        if (decodedJsonHbox[z].IsDownloadable == true) {
                            for(var q=0;q<decodedJsonHbox[z].Resourceses.length;q++){
                                
                                resources[iterator] = decodedJsonHbox[z].Resourceses[q].Link;
                                fileName = decodedJsonHbox[z].Resourceses[q].FileName;
                               

                                
                                // jsonObject.Pages[i].Rows[p].CellContents[j].Resourceses[k].Link = storePath + fileName;
                                console.log(decodedJsonHbox[z].Value);
                            }
                            decodedJsonHbox[z].Value = replacementValueImages(decodedJsonHbox[z].Value, decodedJsonHbox[z].Resourceses, storePath);
                        }
                    }
                    
                    jsonObject.Pages[i].Rows[p].CellContents[j].Json = Base64.encode(JSON.stringify(decodedJsonHbox));
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

function replacementValueImages(jsonObjectValue, arrayResources, storePath) {
 jsonObjectValue = replaceData(jsonObjectValue);
  var m;
  var urls = []; 
  rex = /<img.+?src=[\"'](.+?)[\"'].*?>/g;
  //rex = /<img[^>]+src='?([^'\s]+)'?\s*>/g;

while ( m = rex.exec( jsonObjectValue ) ) {
    if(m[1] != "/Content/Images/noimage.gif"){
        urls.push( m[1] );
    }
    
}
for(var i = 0; i<urls.length;i++){
  jsonObjectValue = jsonObjectValue.replace(urls[i], storePath + arrayResources[i].FileName);
}
return jsonObjectValue;

  
  
  
    // var value = jsonObjectValue.split('src=');
    // var src = value[1].split('\"')
    //  console.log(src[1]);
    // console.log("ClassStore " + storePath);
    // src[1] = storePath + fileName;
    // console.log(src[1]);
    // value[1] = src.join('\"');
    // console.log(value[1]);
    // console.log(value.join('src='));
    // return  value.join('src=');
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
            console.log("error deleting the file ");
            });
        },function(){
            console.log("file does not exist");
        });

}

function goToPage(index) {
    indexPage= index;
    showActivePageInMenu(index);
    $("#container").empty();
    slideUp();
    
    reactRender();
    
    $("a:not(.galleryHref)").each(function(i, e){
        var hrefVal = $(e).attr("href");
        $(e).click(function(){
            window.open(hrefVal, '_system');
        });
    });
    $(".my-youtube").attr("height", "auto");
    
    var pageStyles = "";
    
    applicationData.Pages.forEach(function(element) {
        if(element.Id == index && element.Style != null && element.Style != ""){
            pageStyles = element.Style;
        }        
    }, this);
    
    $("body").attr("style", pageStyles);
    
    initGallaryClick();
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
 function initYoutube() {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        // onYouTubeIframeAPIReady();
        
    }