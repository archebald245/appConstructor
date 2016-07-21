function addListenerToClickBuy() {
    $(".btn-restaurant-menu").on("click", function(){
      // var itemInList = $(this).closest(".shopItem");
      // var itemCountInList =  Number(itemInList.find("input[name='shopItemCount']").val()) + 1;
      // itemInList.find("input[name='shopItemCount']").val(itemCountInList);
    //     var item = $(this).closest(".shopItem").clone();
    //     var itemId = $(item).find("input[name='shopItemId']").attr("value");
    //     if($("#cart").find("input[value='"+itemId+"']").length > 0){
    //       var itemCount = Number($(item).find("input[name='shopItemCount']").val());
    //       $(item).find("input[name='shopItemCount']").val(itemCount + 1);
    //       var itemNewCount = Number($(item).find("input[name='shopItemCount']").val());
    //       $(item).find(".shopItemCountVisible").append(itemNewCount);
    //     }else{
    //         $("#cart").append(item);
    //     }
    //     $(item).find(".btn-restaurant-menu").remove();
    // });
    var itemId = $(this).closest(".shopItem").find("input[name='shopItemId']").attr("value");
    
}
