function addListenerToClickEvent() {
    $(".event-image-container, .event-data").unbind("click").on("click", function() {
        var id = $(this).siblings(".eventId").val();
        var events = $.jStorage.get('EventsData');
        events.forEach(function(item, index) {
            if (item.Id == id) {
                $("#container").addClass("hidden");
                $(".event-profile").removeClass("hidden");

                RenderEventProfile(item);
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
        var index = favorites.indexOf(+id);
        if (index > -1) {
            favorites.splice(index, 1);
            $(e).removeClass("event-favorite-active");
        } else {
            //add to favorites
            favorites.push(+id);
            $(e).addClass("event-favorite-active");
        }
        $.jStorage.set('FavoriteEvents', favorites);
    } else {
        //add to favorites
        var arr = [];
        arr.push(+id);
        $.jStorage.set('FavoriteEvents', arr);
        $(e).addClass("event-favorite-active");
    }
}