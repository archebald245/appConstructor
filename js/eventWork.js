function addListenerToClickBookService() {
    $(".event-data-container").unbind("click").on("click", function() {
        var id = $(this).find(".eventId").val();
        var events = $.jStorage.get('Events');
        events.forEach(function(item, index) {
            if (item.Id == id) {
                RenderEventProfile(item);
                //HIDE 
            }
        });
    });

    $(".event-favorite").unbind("click").on("click", function() {
        var id = $(this).siblings(".eventId").val();
        if ($(this).hasClass("event-favorite-active")) {
            var favorites = $.jStorage.get('FavoriteEvents');
            $(this).removeClass("event-favorite-active");
        } else {
            $(this).addClass("event-favorite-active");
        }
    });
}
//check event for favorite, save in local storage, add class
function UpdateFavorite(e, id) {}