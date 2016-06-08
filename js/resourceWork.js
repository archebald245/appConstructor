var resources = [];

function searchResourcesAndReplacePatch(jsonObject) {
    var storePath = window.myFileSystem.root.nativeURL + "Phonegap/";
    for (var i = 0; i < jsonObject.Pages.length; i++) {
        for (var p = 0; p < jsonObject.Pages[i].Rows.length; p++) {
            jsonObject.Pages[i].Rows[p].CellContents = resourcesOfCellContainer(jsonObject.Pages[i].Rows[p].CellContents, storePath);
        }
    }
    if ($.jStorage.get('resources') != null) {
        resourcesToDownload = compareResouces($.jStorage.get('resources'), resources, storePath);
    } else {
        resourcesToDownload = resources;
    }
    $.jStorage.set('replaceImagePachJson', JSON.stringify(jsonObject));
    $.jStorage.set('resources', resources);
    return resourcesToDownload;
}

function resourcesOfCellContainer(cellContainer, storePath) {
    for (var i = 0; i < cellContainer.length; i++) {
        if ((cellContainer[i].IsDownloadable == true) &
            (cellContainer[i].ContentType != "Empty")) {
            resourcesPushInArray(cellContainer[i]);
            cellContainer[i].Value = replacementPathImages(cellContainer[i].Value, cellContainer[i].Resourceses, storePath);
        }
        if ((cellContainer[i].ContentTypeId == 10)) {
            cellContainer[i] = resourcesOfBoxConteiner(cellContainer[i], storePath);
        }
        if ((cellContainer[i].ContentTypeId == 11)) {
            cellContainer[i] = resourcesOfBoxConteiner(cellContainer[i], storePath);
        }
    }
    return cellContainer;
}

function resourcesOfBoxConteiner(boxConteiner, storePath) {
    var decodedJson = JSON.parse(Base64.decode(boxConteiner.Json));
    for (var i = 0; i < decodedJson.elements.length; i++) {
        if (decodedJson.elements[i].IsDownloadable == true) {
            resourcesPushInArray(decodedJson.elements[i]);
            decodedJson.elements[i].Value = replacementPathImages(decodedJson.elements[i].Value, decodedJson.elements[i].Resourceses, storePath);
        }
    }
    boxConteiner.Json = decodedJson;
    return boxConteiner;
}

function resourcesPushInArray(element) {
    for (var i = 0; i < element.Resourceses.length; i++) {
        resources.push(element.Resourceses[i].Link);
    }
}

function compareResouces(oldResources, newResources, storePath) {
    var equalResources = [];
    var deleteOldResources = [];
    for (var i = 0; i < oldResources.length; i++) {
        for (var j = 0; j < newResources.length; j++) {
            if (oldResources[i] == newResources[j]) {
                equalResources.push(newResources[j]);
                newResources[j] = null;
                oldResources[i] = null;
            }
        }
    }
    for (var i = 0; i < oldResources.length; i++) {
        if (oldResources[i] != null) {
            deleteOldResources.push(oldResources[i]);
        }
    }
    $.jStorage.set('oldResources', deleteOldResources);
    for (var i = 0; i < newResources.length; i++) {
        if (newResources[i] != null) {
            equalResources.push(newResources[i]);
        }
    }
    return equalResources;
}

function replacementPathImages(jsonObjectValue, arrayResources, storePath) {
    jsonObjectValue = replaceData(jsonObjectValue);
    var m;
    var urls = [];
    rex = /<img.+?src=[\"'](.+?)[\"'].*?>/g;
    while (m = rex.exec(jsonObjectValue)) {
        if (m[1] != "/Content/Images/noimage.gif") {
            urls.push(m[1]);
        }
    }
    for (var i = 0; i < urls.length; i++) {
        jsonObjectValue = jsonObjectValue.replace(urls[i], storePath + arrayResources[i].FileName);
    }
    return jsonObjectValue;
}

function deleteResources() {
    var oldResources = $.jStorage.get('oldResources');
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

function deleteImage(imagePath) {
    var remoteFile = encodeURI(imagePath);
    var localFileName = encodeURI("Phonegap/" + remoteFile.substring(remoteFile.lastIndexOf('/') + 1));
    window.myFileSystem.root.getFile(localFileName, { create: false }, function(fileEntry) {
        fileEntry.remove(function(file) {
            console.log("File removed!");
        }, function() {
            console.log("error deleting the file ");
        });
    }, function() {
        console.log("file does not exist");
    });
}

function downloadResources() {
    resources = searchResourcesAndReplacePatch(applicationData);
    for (var i = 0; i < resources.length; i++) {
        var fileNameImage = resources[i];
        download(fileNameImage);
    }
}

function download(fileName) {
    var remoteFile = encodeURI(fileName);
    var localFileName = encodeURI("Phonegap/" + remoteFile.substring(remoteFile.lastIndexOf('/') + 1));
    var localPath;
    var resourcesArr = [];
    for (var i = 0; i < resources.length; i++) {
        if ((resources[i] != "undefined") && (resources[i] != null)) {
            resourcesArr.push(resources[i]);
        }
    }
    window.myFileSystem.root.getFile(localFileName, { create: true, exclusive: false }, function(fileEntry) {
        localPath = fileEntry.toURL();
        console.log(localPath);
        var ft = new FileTransfer();
        ft.download(remoteFile,
            localPath, function(entry) {
                countFileDownload = countFileDownload + 1;
                if ((countFileDownload + countFileDownloadFail) === resourcesArr.length) {
                    callback();
                }
            }, failDownload);
    }, fail);
}

function failDownload(error) {
    countFileDownloadFail = countFileDownloadFail + 1;
    console.log(error.code);
}

function fail(error) {
    console.log(error.code);
}