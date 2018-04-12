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
                        $.jStorage.set('LastPrivatePage', indexPage);
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

    var objectForm = applicationData.Forms;
    $("#custom-hide-container").html("");
    $(objectForm).each(function(i, form) {
        var idHideForm = "form_" + form.Id;
        $("#custom-hide-container").append("<form id='custom-form-hide-container'></form>");
        renderHideCustomForm(form);
        $("#custom-form-hide-container").attr("id", idHideForm);
    });


    $(".cart-btn").on("click", function() {
        $("#container").addClass("hidden");
        $(".classMenu").addClass("hidden");
        $(".cart").removeClass("hidden");
        scrollTop();
    });

    $(".event-btn").on("click", function() {
        renderFavorite();
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
    var collectionCatalogCategory = [];

    var userId = $.jStorage.get('isLogin');

    $(applicationData.MainEvents).each(function(i, elem) {
        eventCollection.push({
            Id: this.Id,
            Version: this.Version
        });
    });
    $(applicationData.Catalogs).each(function(i, elem) {
        $(elem.CatalogCategories).each(function() {
            collectionCatalogCategory.push({
                Id: this.Id,
                Version: this.Version
            });
        });
    });
    $.when(
        //Restaraunt request
        $.ajax({
            type: "POST",
            url: applicationData.UrlForUpdateApp + "/Catalog/CheckUpdateCatalogCategory",
            data: {
                model: collectionCatalogCategory
            },
            cache: false,
            success: function(object) {
                object = JSON.parse(object);
                if (object.IsUpdated == true) {
                    applicationData.Catalogs = object.Catalogs;
                    var storePath = window.myFileSystem.root.nativeURL + "Phonegap/";
                    applicationData.Catalogs = resourcesOfCatalogCategories(applicationData.Catalogs, storePath);
                }
            }
        }),
        //Event request
        $.ajax({
            type: "POST",
            url: applicationData.UrlForUpdateApp + "/api/Event/GetUpdatedEvents",
            data: JSON.stringify(eventCollection),
            cache: false,
            contentType: "application/json",
            datatype: 'json',
            success: function(object) {
                object = JSON.parse(object);
                if (object.IsUpdated == true) {
                    applicationData.MainEvents = object.MainEvents;
                    var storePath = window.myFileSystem.root.nativeURL + "Phonegap/";
                    applicationData.MainEvents = resourcesOfEvents(applicationData.MainEvents, storePath);
                }
            }
        }),
        //get favorites

        $.ajax({
            url: applicationData.UrlForUpdateApp + '/api/FavoriteEvent',
            type: "get",
            data: { userId: userId },
            contentType: "application/json",
            datatype: 'json',
            success: function(data) {
                if (data) {
                    data = JSON.parse(data);
                    $.jStorage.set('FavoriteEvents', GetEventsIds(data));
                } else {
                    $.jStorage.deleteKey('FavoriteEvents');
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(xhr, status, err.toString());
            }.bind(this)
        })

    ).then(function() {
        var appJsonString = JSON.stringify(applicationData);
        $.jStorage.set('replaceImagePachJson', appJsonString);
        downloadResources();
        reactRender();
        initGallaryClick();
        submitFormListener();
        unBlockUi()
    });
}