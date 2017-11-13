function goToPage(index) {
    indexPage = index;
    var thisPage = applicationData.Pages.filter(function(item) { return item.Id == indexPage })[0];
    var thisPageIsLocked = thisPage.IsLocked;
    if (thisPageIsLocked) {
        window.plugins.toast.showShortBottom(cultureRes.lockedPage);
        return false
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