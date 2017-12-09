function addListenerToClickEvent() {
    $(".event-data-container img").unbind("click").on("click", function() {
        var id = $(this).find(".eventId").val();
        var events = $.jStorage.get('EventsData');
        events.forEach(function(item, index) {
            if (item.Id == id) {
                $("#container").addClass("hidden");
                $(".event-profile").removeClass("hidden");
                RenderEventProfile(item);
                //HIDE 
            }
        });
    });

    $(".event-favorite").unbind("click").on("click", function() {
        var id = $(this).siblings(".eventId").val();
        UpdateFavorite(this, id);
    });
}

//check event for favorite, save in local storage, add class
function UpdateFavorite(e, id) {
    var favorites = $.jStorage.get('FavoriteEvents');
    if (favorites != null) {
        if ($(this).hasClass("event-favorite-active")) {
            //remove from favorites
            var index = favorites.indexOf(id);
            if (index > -1) {
                favorites.splice(index, 1);
            }
            $(this).removeClass("event-favorite-active");
        } else {
            //add to favorites
            $(this).addClass("event-favorite-active");
        }
    } else {
        //add to favorites
        var arr = [];
        arr.push(id);
        $.jStorage.set('FavoriteEvents', arr);
    }
}