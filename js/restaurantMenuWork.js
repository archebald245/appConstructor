function addListenerToClickBuy() {
    $(".btn-restaurant-menu").on("click", function() {
        var itemId = $(this).closest(".shopItem").find("input[name='shopItemId']").attr("value");
        workToClickBuy(itemId);
        event.stopPropagation();
    });

}

function workToClickBuy(itemId) {
    var restaurantMenu = applicationData.RestaurantMenus[0].RestaurantMenuItems;

    if ($("#cart").find("input[value='" + itemId + "']").length > 0) {
        var itemThis = $("#cart").find("input[value='" + itemId + "']").siblings("input[name='shopItemCount']");
        var itemCount = Number(itemThis.val());
        itemThis.val(itemCount + 1);
        $("#cart").find("input[value='" + itemId + "']").siblings(".cartItem-info").find(".shopItemCount-visible").html("");
        var newItemCount = Number(itemThis.val());
        $("#cart").find("input[value='" + itemId + "']").siblings(".cartItem-info").find(".shopItemCount-visible").append(newItemCount);

        $(restaurantMenu).each(function() {
            if (this.Id == itemId) {
                $("#cart").find("input[value='" + itemId + "']").siblings(".cartItem-info").find(".shopItem-price").text(Number(this.Price) * newItemCount);
            }
        });
    } else {
        $(restaurantMenu).each(function() {
            if (this.Id == itemId) {
                $("#cart").append("<div id='shopItem'></div>");
                renderCartItem(this);
            }
        });
    }
    $("#shopItem").attr("id", "");
    function totalPrice() {
        var totalPrice = 0;
        $("#cart").find(".shopItem-price").each(function() {
            totalPrice += Number($(this).text());
        });
        return totalPrice;
    }
    // var totalPrice = totalPrice();
    $(".totalPrice b").html("");
    $(".totalPrice b").append(totalPrice());
    addListenerToClickDelete();
    window.plugins.toast.showShortBottom("Item add to cart!");
}

function addListenerToClickDelete() {
    $(".delete-cartItem").unbind("click");
    $(".delete-cartItem").on("click", function() {
        $(this).closest(".cartItem").parent().remove();

        // var totalPrice = totalPrice();
        $(".totalPrice b").html("");
        $(".totalPrice b").append(totalPrice());
    });
}
 function totalPrice() {
            var totalPrice = 0;
            $("#cart").find(".shopItem-price").each(function() {
                totalPrice += Number($(this).text());
            });
            return totalPrice;
        }
function checkUpdateRestaurantMenu() {
    var collectionRestaurantMenu = [];
    $(applicationData.RestaurantMenus).each(function() {
        collectionRestaurantMenu.push({
            Id: this.Id,
            Version: this.Version
        })
    })
    $.ajax({
        type: "POST",
        url: applicationData.UrlForUpdateApp + "/RestaurantMenu/CheckUpdateRestaurantMenu",
        data: {
            model: collectionRestaurantMenu
        }, cache: false,
        success: function(object) {
          object = JSON.parse(object);
            if (object.IsUpdated == true) {
                applicationData.RestaurantMenus = object.Menus;
                var storePath = window.myFileSystem.root.nativeURL + "Phonegap/";
                applicationData.RestaurantMenus = resourcesOfRestaurantMenus(applicationData.RestaurantMenus, storePath);
                var appJsonString = JSON.stringify(applicationData);
                 $.jStorage.set('replaceImagePachJson', appJsonString);
                downloadResources();
            }else{
                reactRender();
            }

            initGallaryClick();
            submitFormListener();
            unBlockUi()
        },
        error: function(err) {
            reactRender();
            initGallaryClick();
            submitFormListener();
            unBlockUi()
            console.log("error");
            console.log(err);
        }
    });
}
function cartShopPrice() {
    $(".cartShop-price").each(function() {
        var price = $(this).text();
        if (price.indexOf('.') < 0) {
            $(this).text(price + ".00");
        }
    });
}
function addListenerToClickOpenSingleItem() {
    $(".shopItem").on("click", function() {
        $("#container").addClass("hidden");
        $(".singleItem").removeClass("hidden");
        var id = $(this).find("[name='shopItemId']").val();
        var restaurantMenu = applicationData.RestaurantMenus[0].RestaurantMenuItems;
        $(restaurantMenu).each(function() {
            if (this.Id == id) {
                renderSingleShopItem(this);
            }
        });

    });
}
function restarauntMenuModelItems() {
    if ($("#container").width() >= 1000 || $("#container").width() >= 810) {
        $(".shopItem-row").attr("style", "");
        $(".shopItem-row").css({
            "float": "left",
            "width": "30%",
            "marginLeft": "2%",
            "marginBottom": "15px",
            "border": "1px solid #939393",
            "padding": "3px"
        });
    } else if ($("#container").width() >= 809 || $("#container").width() >= 650) {
        $(".shopItem-row").attr("style", "");
        $(".shopItem-row").css({
            "float": "left",
            "width": "45%",
            "marginLeft": "1%",
            "marginBottom": "15px",
            "border": "1px solid #939393",
            "padding": "3px"
        });
    } else if ($("#container").width() <= 650) {
        $(".shopItem-row").attr("style", "");
    }
}
