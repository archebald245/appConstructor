function submitFormListener() {

    $(".form-item").find(".formSubmit").on("click", function() {
        var check = true;
        var form = $(this).closest(".form-item");
        $(form).find(".required").each(function(i, element) {
            if ($(element).val() == "") {
                check = false;
            }
        }, this);
        if (check == false) {
            alert("Please fill in all required fields!");
            return;
        }
        check = false;
        $(form).find(".required-check").each(function(i, element) {
          if(element.find("input").attr("checked")){
              check = true;
          }  
        });
        if (check == false) {
            alert("Please fill in all required fields!");
            return;
        }
        

        if ($(form).find(".phoneNumberElement").length > 0) {
            var phoneInput = $(form).find(".phoneNumberElement").find(".phoneNumber").val();
            var phoneValid = /^\+\d{4}\d{3}\d{4}$/;
            if ((!phoneInput.match(phoneValid)) && (!phoneInput.val() != "")) {
                alert("Please enter valid phone number!");
                return;
            }
        }
        if ($(form).find(".emailElement").length > 0) {
            var emailInput = $(form).find(".emailElement").find(".email").val();
            var emailValid = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
            if ((!emailInput.match(emailValid)) && (!phoneInput.val() != "")) {
                alert("Please enter valid email!");
                return;
            }
        }
        if ($(form).find(".phoneNumberElement").length > 0) {
            var phoneInput = $(form).find(".phoneNumberElement").find(".phoneNumber").val();
            var phoneValid = /^\+\d{4}\d{3}\d{4}$/;
            if ((!phoneInput.match(phoneValid)) && (!phoneInput.val() != "")) {
                alert("Please enter valid phone number!");
                return;
            }
        }
        var idForm = $(form).find(".formId").attr("id");
        var idProject = applicationData.ProjectId;
        var siteUrl = applicationData.UrlForUpdateApp;
        var modelData = {
            'projectId': idProject,
            'formId': siteUrl
        }
        $.ajax({
            type: "POST",
            url: siteUrl + "/Form/SaveFormData",
            data: modelData,
            success: function(msg) {
                console.log(msg.Massage);
                $(".formId").each(function(i, element) {
                    if(element.attr("id") == msg.Id){
                        $(element).closest(".form-item").find(":input").val("");
                        $('.checkBoxFormBlock').find(":input").attr("checked", false)
                    }
                });
                
            },
            error: function(er) {
                console.log(er);
                alert("Sorry, error");
            }
        });
    });
}