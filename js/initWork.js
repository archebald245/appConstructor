var url;
var store;
var fileNameImage;
var indexPage = 0;
var applicationData;
var countFileDownload = 0;
var countFileDownloadFail = 0;
var swipeMenuInGallary = false;
var jsonStringify;

initYoutube();

function init() {
    blockUi();
    document.addEventListener("deviceready", onDeviceReady, false);
    $(".classDropdownList").addClass("classHide");
}

function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        window.myFileSystem = fileSystem;
        fileSystem.root.getDirectory("Phonegap", { create: true, exclusive: false }, onGetDirectorySuccess, onGetDirectoryFail);
        checkConnection();
        store = fileSystem.root.nativeURL + "Phonegap/";
    });
    appStart();
}

function onGetDirectorySuccess(dir) {
    console.log("Created dir " + dir.name);
}

function onGetDirectoryFail(error) {
    console.log("Error creating directory " + error.code);
}

function appStart() {
    console.log("add" + store)
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
    });
}

function initYoutube() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onCheckJson() {
    if ($.jStorage.get('appData') != null) {

        applicationData = JSON.parse($.jStorage.get('appData'));
        var projectId = applicationData.ProjectId;
        var versionId = applicationData.Version;
        createMenu(applicationData);
        $(".my-youtube").attr("height", "auto");
    } else {

        data = replaceData(data);
        applicationData = JSON.parse(data);
        downloadResources();
        initMenuYoutunbe();
        if (resources.length == 0) {
            var jsonString = JSON.stringify(applicationData);
            cutImageOfYoutubeContainer();
            $.jStorage.set('appData', jsonString);
            createMenu(applicationData);
            $(".my-youtube").attr("height", "auto");
        }
    }
    var pageStyles = applicationData.Pages[0].Style;
    $("body").attr("style", pageStyles);
    var networkState = navigator.connection.type;
    if (networkState == Connection.NONE) {
        reactRender();
        initGallaryClick();
        $(".blockUI").remove();
    }
}

function checkConnection() {
    var networkState = navigator.connection.type;
    if (networkState != Connection.NONE) {
        var siteUrl = "http://appconstructor.newlinetechnologies.net"

        if ($.jStorage.get('appData') != null) {
            applicationData = JSON.parse($.jStorage.get('appData'));
            var projectId = applicationData.ProjectId;
            var versionId = applicationData.Version;
        } else {
            data = replaceData(data);
            applicationData = JSON.parse(data);
            var projectId = applicationData.ProjectId;
            var versionId = applicationData.Version;
        }

        if (applicationData.UrlForUpdateApp != "" && applicationData.UrlForUpdateApp != null && typeof applicationData.UrlForUpdateApp != 'undefined') {
            siteUrl = applicationData.UrlForUpdateApp;
        }

        $.ajax({
            type: "POST",
            url: siteUrl + "/Constructor/CheckNewVersion",
            data: { projectId: projectId, versionName: versionId },
            cache: false,
            success: function(jsonObjectOfServer) {
                if (jsonObjectOfServer.IsUpdated == true) {
                    data = JSON.stringify(jsonObjectOfServer.Content);
                    $.jStorage.deleteKey('appData');
                    onCheckJson();
                } else {
                    onCheckJson();
                    reactRender();
                    initGallaryClick();
                    $(".blockUI").remove();
                }
            }
        });
    } else {
        onCheckJson();
    }
}

function initMenuYoutunbe() {
    createMenu();
    if (resources.length == 0) {
        reactRender();
        $(".blockUI").remove();
    }
    $(".my-youtube").attr("height", "auto");
}

function callback() {
    applicationData = JSON.parse($.jStorage.get('replaceImagePachJson'));
    var jsonString = JSON.stringify(applicationData);
    $.jStorage.set('appData', jsonString);
    deleteResources();
    reactRender();
    initGallaryClick();
    $(".blockUI").remove();
}

function replaceData(element) {
    element = element.replace(/&lt;/g, '<');
    element = element.replace(/&gt;/g, '>');
    element = element.replace(/\n/g, '');
    element = element.replace(/\t/g, '');
    element = element.replace(/\b/g, '');
    element = element.replace(/\r/g, '');
    element = element.replace(/\v/g, '');
    element = element.replace(/\f/g, '');
    return element;
}

function initGallaryClick() {
    $(".gallery-icon").unbind("click");
    $(".gallery-icon").on("click", function() {
        $(this).parent().siblings().find("figure")[0].click();
    });
}