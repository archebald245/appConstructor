var collectionOrderItems;

function clickOrder() {
    var orderItems = $("#cart").find(".cartItem");
    collectionOrderItems = [];
    $(orderItems).each(function() {
        var id = $(this).find("[name=shopItemId]").val();
        var count = $(this).find("[name=shopItemCount]").val();
        $(applicationData.Catalogs).each(function() {
            $(this.CatalogCategories).each(function() {
                $(this.ProductItems).each(function() {
                    if (this.Id == id) {
                        var item = JSON.parse(JSON.stringify(this));
                        item.Count = count;
                        item.ProductItemImages = null;
                        collectionOrderItems.push(item);
                    }
                });
            });
        });

    });
}

function clickPlaceAnOrder() {
    if (checkValidationAndRequired($("#orderInfo"))) {
        $(".spinner-container").removeClass("hidden");

        var name = $("#orderInfo").find(".nameOrder").val();
        var phone = $("#orderInfo").find(".phoneOrder").val();
        var email = $("#orderInfo").find(".emailOrder").val();
        var comment = $("#orderInfo").find(".commentOrder").val();

        $.ajax({
            type: "POST",
            url: applicationData.UrlForUpdateApp + "/Catalog/CreateOrder",
            data: {
                OrderItems: collectionOrderItems,
                Name: name,
                Phone: phone,
                Email: email,
                Comment: comment,
                ProjectId: applicationData.ProjectId,
                ContentId: applicationData.Id,
                Nonce: ""
            },
            cache: false,
            success: function() {
                $(".spinner-container").addClass("hidden");
                alert(cultureRes.thankYou);
                $("#cart").html("");
                $(".totalPrice b").html("0");
                $("#cart .cartItem").html("");
                $("#orderInfo input, #orderInfo textarea").val("");
                $("#container").removeClass("hidden");
                $("#orderInfo, .cart").addClass("hidden");

                scrollTop();
                if ($('.classMenuTop').length > 0 || $('.classMenuBottom').length > 0) {
                    $(".classMenu").removeClass("hidden");
                }
            },
            error: function() {
                alert(cultureRes.sorryError);
            }
        });
    }
}

function bindListenerToClickBtn() {
    //to menu
    $(".back-to-container, .go-to-menu-btn, .go-to-menu").on("click", function() {
        $("#container").removeClass("hidden");
        $(".classMenu").removeClass("hidden");
        $(".classSwipeDropList").removeClass("hidden");
        $(".cart").addClass("hidden");
        $(".singleItem").addClass("hidden");
        $("#orderInfo").addClass("hidden");
        scrollTop();
    });
    //to cart
    $(".to-cart, .cart-btn").on("click", function() {
        $("#container").addClass("hidden");
        $(".classMenu").addClass("hidden");
        $(".classSwipeDropList").addClass("hidden");
        $(".cart").removeClass("hidden");
        $(".singleItem").addClass("hidden");
        window.scrollTo(0, 0);
    });
    //to cart from order page
    $(".back-to-cart").on("click", function() {
        $("#orderInfo").addClass("hidden");
        $(".singleItem").addClass("hidden");
        $(".cart").removeClass("hidden");
        scrollTop();
    });
    //to order
    $(".btn-order").unbind("click");
    $(".btn-order").on("click", function() {
        if ($("#cart").children().length > 0) {

            var catalogAmount = TotalCatalogAmount();
            var catalogCategoryId = $("input[name='catalogCategoryId']").val();
            var isRestUsePayment = false;

            applicationData.Catalogs.forEach(function(el) {
                var cat = el;
                el.CatalogCategories.forEach(function(e) {
                    if (e.Id == catalogCategoryId) {
                        isCatUsePayment = cat.UseCustomerPayment;
                    }
                });
            });

            if (isCatUsePayment && catalogAmount >= 1) {
                $("#restAmount").val(catalogAmount);
                var curr = $(".totalPrice b").html().split(" ")[1];
                $(".rest-amount-count").html(catalogAmount + " " + curr);

                InitCatalogPayment();
				
				$(".placeAnOrder").unbind().on("click", function() {
                    clickPlaceAnOrder();
                });

            } else {
                //RestOrderHandlers();
                $("#orderInfo").removeClass("hidden");
                $(".cart,.payment-method-container").addClass("hidden");
                scrollTop();

                $("#restAmount").val(restAmount);
                var curr = $(".totalPrice b").html().split(" ")[1];
                $(".rest-amount-count").html(restAmount + " " + curr);

                $(".placeAnOrder").unbind().on("click", function() {
                    clickPlaceAnOrder();
                });
            }
        } else {
            alert(cultureRes.nothingOrdered);
        }
    });

    // $(".placeAnOrder").on("click", function() {
    //     $("#payment-form").submit();

    //     clickPlaceAnOrder();
    // });
}

function TotalCatalogAmount() {
    clickOrder();
    var total = 0;
    collectionOrderItems.forEach(function(element) {
        if (element.Price !== "") {
            total = total + (Number(element.Price) * parseInt(element.Count));
        }
    });

    return total;
}

function TotalCatalogCount(coef) {
    var data = $(".cart-btn-counter").html();

    if (data !== "") {
        var count = parseInt(data);
        $(".cart-btn-counter").html(count + coef);
    } else {
        $(".cart-btn-counter").removeClass("hidden")
        $(".cart-btn-counter").html("1");
    }

    //window.plugins.toast.showShortBottom($("#cart>div").length);
}