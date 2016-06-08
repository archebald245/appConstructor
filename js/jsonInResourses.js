 initYoutube();








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

 function initYoutube() {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        // onYouTubeIframeAPIReady();
        
    }