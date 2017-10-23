function InitBraintree(token) {

    var client_token = token;
    var form = document.querySelector('#payment-form');

    braintree.dropin.create({
        authorization: client_token,
        container: '#bt-dropin',
        paypal: {
            flow: 'vault'
        }
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
                document.querySelector('#nonce').value = payload.nonce;

                if (checkValidationAndRequired($("#orderInfo"))) {

                    var data = $(form).serialize();
                    $.ajax({
                        type: 'POST',
                        url: applicationData.UrlForUpdateApp + "/CustomerBraintree/SubmitPayment",
                        data: data,
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
var checkout = new Demo({
    formID: "payment-form"
});

function GetClientToken(InitBraintree) {
    $.ajax({
        type: "POST",
        url: applicationData.UrlForUpdateApp + "/CustomerBraintree/GetClienToken",
        data: {
            ContentId: applicationData.Id
        },
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

function InitPayment() {
    GetClientToken(InitBraintree);
}