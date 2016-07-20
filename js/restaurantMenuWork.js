function addListenerToClickBuy() {
    $(".btn-restaurant-menu").on("click", function(){
        var item = $(this).closest(".shopItem").clone();
        $(item).find(".btn-restaurant-menu").remove();
        $("#cart").append(item);
    });
}