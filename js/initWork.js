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
    $('[data-toggle="tooltip"]').tooltip();
}

function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        window.myFileSystem = fileSystem;
        if (!window.Promise) {
            window.Promise = Promise;
        }
        fileSystem.root.getDirectory("Phonegap", { create: true, exclusive: false }, onGetDirectorySuccess, onGetDirectoryFail);
        checkConnection(InitPushNotification);
        store = fileSystem.root.nativeURL + "Phonegap/";
    });
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Notification Area Start

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Notification Area End

    $("#dateTimePicker-date").dateDropper({
        dropBorder: "1px solid #939393",
        dropPrimaryColor: "#939393",
        dropWidth: "250",
        format: "m/d/Y l"
    });
    $("#dateTimePicker-time").timeDropper({
        primaryColor: "#939393",
        borderColor: "#939393",
        format: "HH:mm",
        setCurrentTime: "false"
    });

    appStart();

    if (device.platform === 'iOS') {
        StatusBar.hide();
    }
    $('[data-toggle="tooltip"]').tooltip();
    if ('ontouchstart' in document.documentElement) {
        $('body').css('cursor', 'pointer');
    }
}

function onGetDirectorySuccess(dir) {
    // console.log("Created dir " + dir.name);
}

function onGetDirectoryFail(error) {
    // console.log("Error creating directory " + error.code);
}

function appStart() {
    // console.log("add " + store)
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {});
}

function initYoutube() {
    var tag = document.createElement('script');
    tag.src = "js/iframe/iframe_api.js";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onCheckJson() {
    var projectId = applicationData.ProjectId;
    var versionId = applicationData.Version;
    createMenu(applicationData);
    $(".my-youtube").attr("height", "auto");
    var pageStyles = "";

    applicationData.Pages.forEach(function(element) {
        if (element.Id == indexPage) {
            pageStyles = element.Style;
        }
    }, this);

    var pageWithGeneralBg = applicationData.Pages.filter(function(page) { return page.BackgroundForApplication });
    if (pageWithGeneralBg.length > 0) {
        pageStyles = pageWithGeneralBg[0].Style;
    }

    $("#container").attr("style", pageStyles);
}

function updateResources() {
    resources = searchResourcesAndReplacePatch(applicationData);
    downloadResources();
    initMenuYoutunbe();
    var jsonString = JSON.stringify(applicationData);
    $.jStorage.set('appData', jsonString);
    createMenu(applicationData);
    $(".my-youtube").attr("height", "auto");
}

function checkConnection(callbackInitPN) {
    var networkState = navigator.connection.type;
    if (networkState != Connection.NONE) {
        //With internet
        var siteUrl = "http://appconstructor.newline.tech";
        if ($.jStorage.get('appData') != null) {
            //restart
            applicationData = JSON.parse($.jStorage.get('appData'));
            var projectId = applicationData.ProjectId;
            var versionId = applicationData.Version;
        } else {
            //first start
            data = replaceData(data);
            applicationData = JSON.parse(data);
            var projectId = applicationData.ProjectId;
            var versionId = applicationData.Version;
            var tempRes = ReplaceResourcesPatchByLocal(applicationData);
        }

        if (applicationData.UrlForUpdateApp != "" && applicationData.UrlForUpdateApp != null && typeof applicationData.UrlForUpdateApp != 'undefined') {
            siteUrl = applicationData.UrlForUpdateApp;
        }

        if ($.jStorage.get('cultureName') == null) {
            $.jStorage.set('cultureName', applicationData.CultureName);
        }
        callbackInitPN();
        checkApplicationId(sendPushNotificationToken);

        var collectionBookingId = [];

        applicationData.Institutions.forEach(function(e) {
            collectionBookingId.push({
                Id: e.Id,
                Version: e.Version
            });
        });
        var NameOfPricingPlan = applicationData.NameOfPricingPlan;
        $.ajax({
            type: "POST",
            url: siteUrl + "/Constructor/CheckNewVersion",
            data: { projectId: projectId, versionName: versionId, collectionBookingId: collectionBookingId, nameOfPricingPlan: NameOfPricingPlan },
            cache: false,
            success: function(jsonObjectOfServer) {
                jsonObjectOfServer = JSON.parse(jsonObjectOfServer);
                if (jsonObjectOfServer.IsUpdated) {
                    jsonObjectOfServer.Content.DeniedTools.replace(/"/g, "'");
                    data = JSON.stringify(jsonObjectOfServer.Content);
                    applicationData = JSON.parse(data);
                    var jsonString = JSON.stringify(applicationData);
                    $.jStorage.set('appData', jsonString);
                    updateResources();
                    checkRestarauntsAndEventsUpdate();
                    onCheckJson();
                } else if (jsonObjectOfServer.InstitutionsUpdate) {
                    applicationData.Institutions = jsonObjectOfServer.Institutions;
                    applicationData.NameOfPricingPlan = jsonObjectOfServer.NameOfPricingPlan;
                    applicationData.DeniedTools = jsonObjectOfServer.DeniedTools.replace(/"/g, "'");
                    data = JSON.stringify(applicationData);
                    applicationData = JSON.parse(data);
                    var jsonString = JSON.stringify(applicationData);
                    $.jStorage.set('appData', jsonString);
                    updateResources();
                    onCheckJson();
                } else if (!jsonObjectOfServer.IsUpdated && jsonObjectOfServer.Content != "" && jsonObjectOfServer.Content != undefined) {
                    jsonObjectOfServer.Content.DeniedTools.replace(/"/g, "'");
                    data = JSON.stringify(jsonObjectOfServer.Content);
                    applicationData = JSON.parse(data);
                    var jsonString = JSON.stringify(applicationData);
                    $.jStorage.set('appData', jsonString);
                    updateResources();
                    checkRestarauntsAndEventsUpdate();
                    onCheckJson();
                } else {
                    checkRestarauntsAndEventsUpdate();
                    applicationData.NameOfPricingPlan = jsonObjectOfServer.NameOfPricingPlan;
                    applicationData.DeniedTools = jsonObjectOfServer.DeniedTools.replace(/"/g, "'");
                    createMenu(applicationData);
                    reactRender();
                    initGallaryClick();
                    submitFormListener();
                    $('[data-toggle="tooltip"]').tooltip();
                    unBlockUi();
                }
            }
        });
    } else {
        //without internet
        if ($.jStorage.get('appData') != null) {
            //Restart
            applicationData = JSON.parse($.jStorage.get('appData'));
            var projectId = applicationData.ProjectId;
            var versionId = applicationData.Version;
        } else {
            //first start
            data = replaceData(data);
            applicationData = JSON.parse(data);
            var t = ReplaceResourcesPatchByLocal(applicationData);
            var projectId = applicationData.ProjectId;
            var versionId = applicationData.Version;
        }

        var StartPage = applicationData.Pages.filter(function(p) { return p.IsStartPage })[0];
        indexPage = StartPage.Id;
        createMenu(applicationData);
        reactRender();
        initGallaryClick();
        submitFormListener();
        $('[data-toggle="tooltip"]').tooltip();
        unBlockUi();
    }
}

function sendPushNotificationToken() {
    if ($.jStorage.get('notificationToken') !== null) {
        var tokenToSend = $.jStorage.get('notificationToken');
        var projectIdToSend = applicationData.ProjectId;
        var deviceId = $.jStorage.get('ApplicationId');
        $.ajax({
            type: "POST",
            url: applicationData.UrlForUpdateApp + "/PushNotification/SaveUserToken",
            data: {
                token: tokenToSend,
                projectId: projectIdToSend,
                deviceId: deviceId
            },
            cache: false,
            success: function(response) {
                $.jStorage.set('notificationTokenSuccess', response);
            }
        });
    }
}

function updatePushNotificationToken(oldToken, newToken) {
    if ($.jStorage.get('notificationToken') !== null) {
        $.ajax({
            type: "POST",
            url: applicationData.UrlForUpdateApp + "/PushNotification/UpdateUserToken",
            data: { oldToken: oldToken, newToken: newToken },
            cache: false,
            success: function(response) {
                $.jStorage.set('notificationTokenSuccess', response);
                //check for bad request TODO
            }
        });
    }
}

function checkApplicationId(sendPushNotificationTokenCallback) {
    if ($.jStorage.get('ApplicationId') == null) {
        $.ajax({
            type: "POST",
            url: applicationData.UrlForUpdateApp + "/UploadFiles/GetApplicationIdForMobileApp",
            cache: false,
            success: function(applicationId) {
                $.jStorage.set('ApplicationId', applicationId);
                if (applicationData.EnablePushNotification) {
                    sendPushNotificationTokenCallback();
                }
            }
        });
    } else {
        if (applicationData.EnablePushNotification && !$.jStorage.get('notificationTokenSuccess')) {
            sendPushNotificationTokenCallback();
        }
    }
}

function initMenuYoutunbe() {
    if (resources.length == 0) {
        createMenu();
        reactRender();
        submitFormListener();
        unBlockUi()
    }
    $(".my-youtube").attr("height", "auto");
}

function callback() {
    var jsonString = JSON.stringify(applicationData);
    $.jStorage.set('appData', jsonString);
    deleteResources();
    createMenu();
    reactRender();
    initGallaryClick();
    submitFormListener();
    $('[data-toggle="tooltip"]').tooltip();
    unBlockUi();
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
        $(this).parent().siblings().find("a")[0].click();
    });
}

function doOnOrientationChange() {
    switch (window.orientation) {
        case -90:
        case 90:
            if (applicationData.Restaurants.length > 0) {
                // restarauntMenuModelItems();
            }
            break;
        default:
            if (applicationData.Restaurants.length > 0) {
                // restarauntMenuModelItems();
            }
            break;
    }
}

function InitPushNotification() {
    if (applicationData.EnablePushNotification) {
        var push = PushNotification.init({
            android: {
                //senderID: 418915081706
                sound: true,
                vibrate: true
            },
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        });

        push.on('registration', function(data) {
            $.jStorage.set('notificationToken', data.registrationId);
        });

        // PushNotification.hasPermission(function(data) {

        //     if (data.isEnabled) {
        //         alert("is enabled");
        //     } else {
        //         alert("is disabled");
        //     }
        // });

        push.on('notification', function(data) {
            // data.message,
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
            window.plugins.toast.hide();

            window.plugins.toast.showWithOptions({
                message: data.message,
                duration: 7500,
                position: "top",
                addPixelsY: 50
            });

        });

        push.on('error', function(e) {
            // e.message
            // alert("Error " + e.message);
        });
    }
}
window.addEventListener('orientationchange', doOnOrientationChange);