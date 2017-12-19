function blockUi() {
    $.blockUI({
        message: $('#block-ui-container'),
        overlayCSS: {
            backgroundColor: '#10b781',
            opacity: 0
        },
        css: {
            backgroundColor: none,
            top: ($(window).height() - 300) / 2 + 'px',
            left: ($(window).width() - 300) / 2 + 'px',
            width: '300px',
            height: '300px'
        }
    });

    // $.blockUI({
    //     css: {
    //         border: 'none',
    //         padding: '15px',
    //         backgroundColor: '#000',
    //         '-webkit-border-radius': '10px',
    //         '-moz-border-radius': '10px',
    //         opacity: .5,
    //         color: '#fff'
    //     }
    // });
}


function unBlockUi() {
    createCustomHideForms();
    bindChangeValForms();
    addListenerToClickBuy();
    addListenerToClickOpenSingleItem();
    bindListenerToClickBtn();
    addListenerToClickTimeLine();
    var pageStyles = "";

    if (applicationData.IsTrackingLastPage) {
        var idLastPage = getLastOpenPage();
        var lastPage = applicationData.Pages.filter(function(p) { return p.Id == idLastPage })[0]
        if (lastPage) {
            pageStyles = lastPage.Style;
        }
    } else {
        var StartPage = applicationData.Pages.filter(function(p) { return p.IsStartPage })[0];
        if (indexPage == StartPage.Id) {
            if (StartPage) {
                pageStyles = StartPage.Style;
            }
        } else {
            applicationData.Pages.forEach(function(element) {
                if (element.Id == indexPage) {
                    pageStyles = element.Style;
                }
            }, this);

        }

    }

    var pageWithGeneralBg = applicationData.Pages.filter(function(page) { return page.BackgroundForApplication });
    if (pageWithGeneralBg.length > 0) {
        pageStyles = pageWithGeneralBg[0].Style;
    }


    // var pageWithGeneralBg = applicationData.Pages.filter(function(page) { return page.BackgroundForApplication });
    // if (pageWithGeneralBg.length > 0) {
    //     pageStyles = pageWithGeneralBg[0].Style;
    // }

    // if (applicationData.IsTrackingLastPage) {
    //     var idLastPage = getLastOpenPage();
    //     var lastPage = applicationData.Pages.filter(function(p) { return p.Id == idLastPage })[0]
    //     if (lastPage.BackgroundImagePath != null) {
    //         pageStyles = lastPage.Style;
    //     }
    // } else {
    //     var StartPage = applicationData.Pages.filter(function(p) { return p.IsStartPage })[0];
    //     if (indexPage == StartPage.Id) {
    //         if (StartPage.BackgroundImagePath != null) {
    //             pageStyles = StartPage.Style;
    //         }
    //     } else {
    //         applicationData.Pages.forEach(function(element) {
    //             if (element.Id == indexPage && element.BackgroundImagePath != null) {
    //                 pageStyles = element.Style;
    //             }
    //         }, this);

    //     }

    // }

    $("#container").attr("style", pageStyles);

    changeRestaurant();
    changeMenu();
    $.unblockUI();
}