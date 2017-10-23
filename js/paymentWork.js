function InitBraintree(token) {

    var client_token = token;
    var form = document.querySelector('#payment-form');

    braintree.dropin.create({
        authorization: client_token,
        container: '#bt-dropin',
        locale: 'ru_Ru'
    }, function(createErr, instance) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            instance.requestPaymentMethod(function(err, payload) {
                if (err) {
                    //console.log('Error', err);
                    alert(err);
                    return;
                }

                // Add the nonce to the form and submit
                //document.querySelector('#nonce').value = payload.nonce;

                if (checkValidationAndRequired($("#orderInfo"))) {

                    var name = $("#orderInfo").find(".nameOrder").val();
                    var phone = $("#orderInfo").find(".phoneOrder").val();
                    var email = $("#orderInfo").find(".emailOrder").val();
                    var comment = $("#orderInfo").find(".commentOrder").val();
                    var nonce = payload.nonce;
                    $.ajax({
                        type: "POST",
                        url: applicationData.UrlForUpdateApp + "/RestaurantMenu/CreateOrder",
                        data: {
                            OrderItems: collectionOrderItems,
                            Name: name,
                            Phone: phone,
                            Email: email,
                            Comment: comment,
                            ProjectId: applicationData.ProjectId,
                            ContentId: applicationData.Id,
                            Nonce: nonce
                        },
                        dataType: 'json',
                        success: function(data) {
                            if (data.result == "Error") {
                                alert(data.message);
                            }
                        }
                    });
                }

                //form.submit();
            });
        });
    });
}
// var checkout = new Demo({
//     formID: "payment-form"
// });

function GetClientToken(InitBraintree) {
    $.ajax({
        type: "POST",
        url: applicationData.UrlForUpdateApp + "/CustomerBraintree/GetClientToken",
        data: applicationData.Id,
        cache: false,
        success: function(data) {
            alert(data);
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

function InitPayment() {
    GetClientToken(InitBraintree);
}