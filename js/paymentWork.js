function InitRestarauntPayment() {
    GetClientToken(InitRestarauntBraintree);
}

function InitRestarauntBraintree(token) {
    var client_token = token;
    var form = document.querySelector('#payment-form');

    braintree.dropin.create({
        authorization: client_token,
        container: '#bt-dropin'
    }, function(createErr, instance) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (checkValidationAndRequired($("#orderInfo"))) {
                instance.requestPaymentMethod(function(err, payload) {
                    if (err) {
                        //console.log('Error', err);
                        alert(err);
                        return;
                    }

                    // Add the nonce to the form and submit
                    //document.querySelector('#nonce').value = payload.nonce;
                    clickOrder(); //set collectionOrderItems

                    var name = $("#orderInfo").find(".nameOrder").val();
                    var phone = $("#orderInfo").find(".phoneOrder").val();
                    var email = $("#orderInfo").find(".emailOrder").val();
                    var comment = $("#orderInfo").find(".commentOrder").val();
                    var nonce = payload.nonce;
                    var requestdata = {};

                    requestdata.OrderItems = collectionOrderItems;
                    requestdata.Name = name;
                    requestdata.Phone = phone;
                    requestdata.Email = email;
                    requestdata.Comment = comment;
                    requestdata.ProjectId = applicationData.ProjectId;
                    requestdata.ContentId = applicationData.Id;
                    requestdata.Nonce = nonce;

                    $.ajax({
                        type: "POST",
                        url: applicationData.UrlForUpdateApp + "/RestaurantMenu/CreateOrder",
                        data: requestdata,
                        dataType: 'json',
                        success: function(data) {
                            if (data.Success) {
                                alert(cultureRes.thankYou);
                                $("#cart").html("");
                                $(".totalPrice b").html("0");
                                $("#cart .cartItem").html("");
                                $("#orderInfo input, #orderInfo textarea").val("");
                                $("#container").removeClass("hidden");
                                $("#orderInfo, .cart").addClass("hidden");
                                $(".bt-dropin").html("");
                                scrollTop();
                                if ($('.classMenuTop').length > 0 || $('.classMenuBottom').length > 0) {
                                    $(".classMenu").removeClass("hidden");
                                }
                            } else {
                                alert(data.Message);
                            }

                        }
                    });
                    //form.submit();
                });
            }
        });

        $(".placeAnOrder").on("click", function() {
            $("#payment-form").submit();
            // clickPlaceAnOrder();
        });
    });
}

// function InitBookingBraintree(token) {
//     if (token !== "") {
//         $(".dateTimePicker-container").addClass("hidden");
//         $(".order-booking").removeClass("hidden");
//         scrollTop();
//     }
// }
// var checkout = new Demo({
//     formID: "payment-form"
// });

function GetClientToken(InitBraintree) {
    $.ajax({
        type: "POST",
        url: applicationData.UrlForUpdateApp + "/CustomerBraintree/GetClientToken",
        data: { projectId: applicationData.ProjectId },
        cache: false,
        success: function(data) {
            InitBraintree(data);
            $("#orderInfo").removeClass("hidden");
            $(".braintree-container").removeClass("hidden");
            $(".cart").addClass("hidden");
            scrollTop();

        },
        error: function() {
            alert(cultureRes.sorryError);
        }
    });
}

function GetClientTokenForBooking(callback, dateVal, timeVal, needConfirmation, bookResourceId) {
    $.ajax({
        type: "POST",
        url: applicationData.UrlForUpdateApp + "/CustomerBraintree/GetClientToken",
        data: { projectId: applicationData.ProjectId },
        cache: false,
        success: function(data) {
            if (data !== "") {

                $(".dateTimePicker-container").addClass("hidden");
                $(".order-booking").removeClass("hidden");
                scrollTop();

                callback(dateVal, timeVal, needConfirmation, bookResourceId, data);
            } else {
                if (checkValidationAndRequired($(".order-booking"))) {
                    BookingOrderHandlers(dateVal, timeVal, needConfirmation, bookResourceId);
                }
            }
        },
        error: function() {
            alert(cultureRes.sorryError);
        }
    });
}