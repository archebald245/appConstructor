function addListenerToClickBuy() {
    $(".btn-restaurant-menu").on("click", function(){
    var itemId = $(this).closest(".shopItem").find("input[name='shopItemId']").attr("value");
    var restaurantMenu = applicationData.RestaurantMenus[0].RestaurantMenuItems;

    if($("#cart").find("input[value='"+itemId+"']").length > 0){
      var itemThis = $("#cart").find("input[value='"+itemId+"']").siblings("input[name='shopItemCount']");
      var itemCount = Number(itemThis.val());
      itemThis.val(itemCount + 1);
      $("#cart").find("input[value='"+itemId+"']").siblings(".cartItem-info").find(".shopItemCount-visible").html("");
      var newItemCount = Number(itemThis.val());
      $("#cart").find("input[value='"+itemId+"']").siblings(".cartItem-info").find(".shopItemCount-visible").append(newItemCount);

      $(restaurantMenu).each(function () {
        if(this.Id == itemId ){
        $("#cart").find("input[value='"+itemId+"']").siblings(".cartItem-info").find(".shopItem-price").text(Number(this.Price) * newItemCount);
        }
      });
    }else{
      $(restaurantMenu).each(function () {
        if(this.Id == itemId ){
          $("#cart").append("<div id='shopItem'></div>");
          renderCartItem(this);
        }
      });
    }
$("#shopItem").attr("id", "");
    function TotalPrice(){
        var  totalPrice = 0;
      $("#cart").find(".shopItem-price").each(function(){
        totalPrice+=Number($(this).text());
      });
      return totalPrice;
    }
    var TotalPrice = TotalPrice();
    $(".totalPrice b").html("");
    $(".totalPrice b").append(TotalPrice);
  addListenerToClickDelete();
  });

}


// function addListenerToClickOpenSingleItem(){
//   $(".item-shop-title").on("click", function(){
//
//
//
//   });
// }

function addListenerToClickDelete(){
  $(".delete-cartItem").unbind("click");
  $(".delete-cartItem").on("click", function(){
    var itemCount = Number($(this).parent().siblings("[name='shopItemCount']").val());
    $(this).parent().siblings("[name='shopItemCount']").val(itemCount - 1);
    var newItemCount = Number($(this).parent().siblings("[name='shopItemCount']").val());
    $(this).siblings(".shopItemCount-visible").html("");
    $(this).siblings(".shopItemCount-visible").append(newItemCount);
    var restaurantMenu = applicationData.RestaurantMenus[0].RestaurantMenuItems;
    var thisId = $(this).parent().siblings("[name='shopItemId']");
    var deleteBtn = this;
    $(restaurantMenu).each(function () {
      if(this.Id == thisId.val() ){
        $(deleteBtn).siblings(".shopItem-price").text(Number(this.Price) * newItemCount);
      }
    });
    function TotalPrice(){
        var  totalPrice = 0;
      $("#cart").find(".shopItem-price").each(function(){
        totalPrice+=Number($(this).text());
      });
      return totalPrice;
    }
    var TotalPrice = TotalPrice();
    $(".totalPrice b").html("");
    $(".totalPrice b").append(TotalPrice);
  });
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
            if(object.IsUpdated == true){
                applicationData.RestaurantMenus = object.Menus;
                 var storePath = window.myFileSystem.root.nativeURL + "Phonegap/";
                applicationData.RestaurantMenus = resourcesOfRestaurantMenus(applicationData.RestaurantMenus, storePath);
                downloadResources();
            }
            reactRender();
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
function addListenerToClickOpenSingleItem(){
  $(".item-shop-title").on("click", function(){
    $("#container").addClass("hidden");
    $(".singleItem").removeClass("hidden");
    var id = $(this).siblings("[name='shopItemId']").val();
    var restaurantMenu = applicationData.RestaurantMenus[0].RestaurantMenuItems;
    $(restaurantMenu).each(function () {
      if(this.Id == id){
        renderSingleShopItem(this);
      }
    });

  });
}
