var collectionOrderItems;

function clickOrder() {
    var orderItems = $("#cart").find(".cartItem");
    var collectionOrderItems = [];
    $(orderItems).each(function() {
        var id = $(this).find("[name=shopItemId]").val();
        var count = $(this).find("[name=shopItemCount]").val();
        $(applicationData.restaurantMenu).each(function() {
            if (this.Id == id) {
                var item = this
                collectionOrderItems.push(this);
            }
        });

    });
}

function clickPlaceAnOrder() {
    if(checkValidationAndRequired($("#OrderInfo"))){
        var name = $("#OrderInfo").find(".nameOrder").val();
        var phone = $("#OrderInfo").find(".phoneOrder").val();
        var email = $("#OrderInfo").find(".emailOrder").val();
        var comment = $("#OrderInfo").find(".commentOrder").val();
         $.ajax({
            type: "POST",
            url: siteUrl + "/Constructor/CheckNewVersion",
            data: { 
                OrderItems: collectionOrderItems,
                Name: name,
                Phone: phone,
                Email:email,
                Comment:comment
            },
            cache: false,
            success: function() {
                alert("Thank you!");
                $("#cart").html("");
                $("#OrderInfo input").val("");
            },
            error: function(){
                alert("Sorry, error!");
            }
        });    
    } 
}