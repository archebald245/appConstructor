function submitFormListener() {

    $(".form-container").find(".formSubmit").on("click", function() {
        var networkState = navigator.connection.type;
        if (networkState != Connection.NONE) {
            var check = true;
            var form = $(this).closest(".form-container");
            check = checkValidationAndRequired(form);
            if (check == false) {
                return;
            }
            var idForm = $(form).find(".formId").attr("id");
            var idProject = applicationData.ProjectId;
            $(".form-container").append("<input type='hidden' name='projectId' value='" + idProject + "'/><input type='hidden' name='formId' value='" + idForm + "'/>")

            var siteUrl = applicationData.UrlForUpdateApp;
            var formData = new FormData(form)
            $.post('' + siteUrl + '/Form/SaveFormData', $(form).serialize(), function() {
                alert("Thank you!");
                $(form).find("input, textarea").val("");
                $(form).find("input[type='checkbox']").removeAttr("checked");
            });
        } else {
            alert("Sorry, no internet connection!");
        }
    });
}

function createCustomHideForms() {
    var objectForm = applicationData.Forms;
    $(objectForm).each(function(i, form) {
        var idHideForm = "form_" + form.Id;
        $("#custom-hide-container").append("<form id='custom-form-hide-container'></form>");
        renderHideCustomForm(form);
        $("#custom-form-hide-container").attr("id", idHideForm);
    });
}

function bindChangeValForms() {
    var siteUrl = applicationData.UrlForUpdateApp;
    $($("#custom-hide-container").find("form")).each(function(i, elem) {
        var formId = $(elem).attr("id");
        $(".formSubmit").unbind("click");
        $(".formSubmit").each(function(i, button) {
            $(button).on("click", function() {
                var networkState = navigator.connection.type;
                if (networkState != Connection.NONE) {
                    var check = checkValidationAndRequired(elem);
                    if (check != false) {
                        $.post('' + siteUrl + '/Form/SaveFormData', $(elem).serialize(), function() {
                            alert("Thank you!");
                        });
                    }
                } else {
                    alert("Sorry, no internet connection!");
                }
            });
        });
        (function(elem, siteUrl, formId) {
            $("." + formId).each(function(i, element) {
                var field = $(element).siblings(".formBlock").find("input, textarea, select");
                var fieldName = $(field).attr("name");
                if ($(element).find("button").length > 0) {

                } else {
                    $(field).unbind("change");
                    $(field).on("change", function() {

                        if ($(elem).find("[name='" + fieldName + "']:radio").length > 0) {
                            $(elem).find("[name='" + fieldName + "']").filter('[value=' + $(field).filter(':checked').val() + ']').prop('checked', true);
                        } else if ($(elem).find("[name='" + fieldName + "']:checkbox").length > 0) {
                            $(elem).find("[name='" + fieldName + "']").prop('checked', $(this).prop("checked"));
                        } else {
                            $(elem).find("[name='" + fieldName + "']").val(field.val());
                        }
                    })
                }
            })
        })(elem, siteUrl, formId)
    })
}

function checkValidationAndRequired(form) {
    var check = true;
    $(form).find(".required").each(function(i, element) {
        if ($(element).val() == "") {
            check = false;
        }
    }, this);
    if (check == false) {
        alert("Please fill in all required fields!");
        return check;
    }
    if ($(form).find(".required-check").length > 0) {
        check = false;
        $(form).find(".required-check").each(function(i, element) {
            if (element.find("input").attr("checked")) {
                check = true;
            }
        });
        if (check == false) {
            alert("Please fill in all required fields!");
            return check;
        }
    }
    if ($(form).find(".phoneNumberElement").length > 0) {
        var phoneInput = $(form).find(".phoneNumberElement").find(".phoneNumber").val();
        var phoneValid = /^\+\d{4}\d{3}\d{4}$/;
        if ((!phoneInput.match(phoneValid)) && (!phoneInput != "")) {
            alert("Please enter valid phone number!");
            check = false;
            return check;
        }
    }
    if ($(form).find(".emailElement").length > 0) {
        var emailInput = $(form).find(".emailElement").find(".email").val();
        var emailValid = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
        if ((!emailInput.match(emailValid)) && (emailInput != "")) {
            alert("Please enter valid email!");
            check = false;
            return check;
        }
    }
    return check;
}