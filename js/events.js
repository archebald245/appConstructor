function goToPage(index) {
    indexPage = index;
    var thisPage = applicationData.Pages.filter(function(item) { return item.Id == indexPage })[0];
    var thisPageIsLocked = thisPage.IsLocked;
    if (thisPageIsLocked) {
        window.plugins.toast.showShortBottom(cultureRes.lockedPage);
        return false;
    }
    if (thisPage.IsPrivate) {
        if (!$.jStorage.get('isLogin')) {
            var findLoginForm = false;
            var pageWithForm = [];
            applicationData.Pages.forEach(function(page) {
                page.Rows.forEach(function(row) {
                    row.CellContents.forEach(function(cell) {
                        if (cell.ContentTypeId == 12) {
                            pageWithForm.push({
                                pageId: page.Id,
                                formId: cell.FormId
                            })
                        }
                    })
                });
            });
            pageWithForm.forEach(function(item) {
                applicationData.Forms.forEach(function(form) {
                    if (form.Id == item.formId && form.LoginForm) {
                        indexPage = item.pageId
                        findLoginForm = true;
                    }
                });
            });
            if (findLoginForm) {
                window.plugins.toast.showShortBottom(cultureRes.loginPlease);
            } else {
                window.plugins.toast.showShortBottom(cultureRes.lockedPage);
                return false;
            }
        }
    }
    if (applicationData.IsTrackingLastPage == true) {
        setLastOpenPage(indexPage);
    }
    showActivePageInMenu(indexPage);
    $("#container").empty();
    slideUp();
    $("html, body").animate({ scrollTop: -$(document).height() }, "fast");
    reactRender();

    $("a:not(.galleryHref)").each(function(i, e) {
        var hrefVal = $(e).attr("href");
        $(e).click(function() {
            window.open(hrefVal, '_system');
        });
    });
    $(".my-youtube").attr("height", "auto");

    // applicationData.Pages.forEach(function(element) {
    //     if (element.Id == indexPage && element.BackgroundImagePath != null) {
    //         pageStyles = element.Style;
    //     }
    // }, this);

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
    submitFormListener();
    initGallaryClick();
    bindChangeValForms();
    addListenerToClickBuy();
    addListenerToClickOpenSingleItem();
    addListenerToClickTimeLine();
    $(".cart-btn").on("click", function() {
        $("#container").addClass("hidden");
        $(".classMenu").addClass("hidden");
        $(".cart").removeClass("hidden");
        scrollTop();
    });

    $(".event-btn").on("click", function() {
        $(".event-profile").addClass("hidden");
        $("#container").addClass("hidden");
        $(".event-favorite-wrapper").removeClass("hidden");
        window.scrollTo(0, scrollData);
    });
    changeRestaurant();
    changeMenu();
    $('[data-toggle="tooltip"]').tooltip();
}

function scrollTop() {
    $("html, body").animate({ scrollTop: -$(document).height() }, "fast");
}

function setLastOpenPage(pageId) {
    $.jStorage.set('lastPageId', pageId);
}

function getLastOpenPage() {
    return $.jStorage.get('lastPageId');
}

function checkRestarauntsAndEventsUpdate() {
    var eventCollection = [];
    var collectionRestaurantMenu = [];
    $(applicationData.MainEvents).each(function(i, elem) {
        eventCollection.push({
            Id: this.Id,
            Version: this.Version
        });
    });
    $(applicationData.Restaurants).each(function(i, elem) {
        $(elem.RestaurantMenus).each(function() {
            collectionRestaurantMenu.push({
                Id: this.Id,
                Version: this.Version
            });
        });
    });
    console.log("WHEN");
    $.when(
        //Restaraunt request
        $.ajax({
            type: "POST",
            url: applicationData.UrlForUpdateApp + "/RestaurantMenu/CheckUpdateRestaurantMenu",
            data: {
                model: collectionRestaurantMenu
            },
            cache: false,
            success: function(object) {
                object = JSON.parse(object);
                console.log("rest" + object);
                if (object.IsUpdated == true) {
                    applicationData.Restaurants = object.Restaurants;
                    var storePath = window.myFileSystem.root.nativeURL + "Phonegap/";
                    applicationData.Restaurants = resourcesOfRestaurantMenus(applicationData.Restaurants, storePath);
                    // var appJsonString = JSON.stringify(applicationData);
                    // $.jStorage.set('replaceImagePachJson', appJsonString);
                    // downloadResources();

                    // } else if (!isNewVersion) {
                    //     reactRender();
                    //     initGallaryClick();
                    //     submitFormListener();
                    //     unBlockUi()
                }
            }
        }),

        //Event request
        $.ajax({
            type: "POST",
            url: applicationData.UrlForUpdateApp + "/api/Event/GetUpdatedEvents",
            data: JSON.stringify(eventCollection),
            cache: false,
            success: function(object) {
                object = JSON.parse(object);
                console.log("event " + object);
                if (object.IsUpdated == true) {
                    applicationData.MainEvents = object.MainEvents;
                    var storePath = window.myFileSystem.root.nativeURL + "Phonegap/";
                    applicationData.MainEvents = resourcesOfEvents(applicationData.MainEvents, storePath);
                    // var appJsonString = JSON.stringify(applicationData);
                    // $.jStorage.set('replaceImagePachJson', appJsonString);
                    // downloadResources();

                    // // } else if (!isNewVersion) {
                    // reactRender();
                    // initGallaryClick();
                    // submitFormListener();
                    // unBlockUi()
                }
            }
        })
    ).then(function() {
        console.log("then");
        var appJsonString = JSON.stringify(applicationData);
        $.jStorage.set('replaceImagePachJson', appJsonString);
        downloadResources();

        reactRender();
        initGallaryClick();
        submitFormListener();
        unBlockUi()
    });
}