var listServiceForBooking = [];

function addListenerToClickTimeLine() {
    $(".row-elementTimeLine").on("click", function() {
        $(".bookingServices-container").removeClass("hidden");
        $("#container, .classMenu").addClass("hidden");
        scrollTop();
        var thisInstitutionId = $(this).find(".timeLineId").val();
        $(applicationData.Institutions).each(function(i, institution) {
            $(institution.BookResources).each(function(ind, resources) {
                if (resources.Id == thisInstitutionId) {
                    $("#booking-order").html("");
                    listServiceForBooking = [];
                    renderServiceOfThisInstitution(resources);
                }
            });
        });
    });
    $(".back-to-timelines").on("click", function() {
        $(".bookingServices-container").addClass("hidden");
        $("#container, .classMenu").removeClass("hidden");
        scrollTop();
    });
    $(".back-to-container-from-book").unbind().click(function() {
        $("#container, .classMenu").removeClass("hidden");
        $(".container-selectFreeBookTime, .container-statusBooking").addClass("hidden");
        scrollTop();
    });
}

function addListenerToClickBookService() {
    $(".cartItem-delete").unbind("click");
    $(".cartItem-delete").click(function() {
        $(this).closest(".bookingCartItem").parent().remove();
        var itemDeleteId = $(this).siblings(".cart-service-itemId").val();
        listServiceForBooking = $.grep(listServiceForBooking, function(e) {
            return e.BookDateTime.BookServiceProvideId != itemDeleteId;
        });
    });

    $(".btn-back-toservices").click(function() {
        $(".order-booking").addClass("hidden");
        if ($("#container").find(".row-elementInstitution").length > 0) {
            $("#container, .classMenu").removeClass("hidden");
            scrollTop();

        } else {
            $(".bookingServices-container").removeClass("hidden");
            scrollTop();
        }
    });
    $(".btn-order-booking").unbind("click");
    $(".btn-order-booking").click(function() {
        if (listServiceForBooking == 0) {
            alert(cultureRes.dontAnyBook);
        } else {
            $(".dateTimePicker-container").removeClass("hidden");
            if ($("#container").find(".row-elementInstitution").length > 0) {
                $("#container, .classMenu").addClass("hidden");
                $(".bookingServices-container").addClass("hidden");
                scrollTop();
            } else {
                $(".bookingServices-container").addClass("hidden");
                scrollTop();
            }
        }
    });

    $(".back-to-services").on("click", function() {
        $(".dateTimePicker-container").addClass("hidden");
        if ($("#container").find(".row-elementInstitution").length > 0) {
            $("#container, .classMenu").removeClass("hidden");
            scrollTop();
        } else {
            $(".bookingServices-container").removeClass("hidden");
            scrollTop();
        }
    });
    $(".btn-confirmDateForBook").unbind("click");
    $(".btn-confirmDateForBook").click(function() {
        var idService = listServiceForBooking[0].BookDateTime.BookServiceProvideId;
        var needConfirmation = Boolean($(".serviceId[value=" + idService + "]").siblings(".thisTimeLineIsConfirm").val());
        var timeVal = $("#dateTimePicker-time").val();
        var dateVal = $("#dateTimePicker-date").val().split(" ")[0];
        var selectedDay = $("#dateTimePicker-date").val().split(" ")[1];
        var currentInstitutionId = Number($(".value-currentInstitution").val());
        var bookResourceId = Number($(".serviceId").first().siblings(".thisTimeLineId").val());
        var currentResourceObject = applicationData.Institutions.filter(function(e) { return e.Id == currentInstitutionId })[0].BookResources.filter(function(e) { return e.Id == bookResourceId })[0];
        if (timeVal != cultureRes.time && dateVal != cultureRes.date) {
            if (currentResourceObject.UseDayTime) {
                var currentDayObject = currentResourceObject.DayForBookResource.filter(function(e) { return e.Day == selectedDay });
                if (currentDayObject.length == 0) {
                    alert(cultureRes.resourcesDontWork);
                    return false;
                } else {
                    currentResourceObject.CloseTime = currentDayObject[0].CloseTime;
                    currentResourceObject.OpenTime = currentDayObject[0].OpenTime;

                    var isInstUsePayment = false;
                    var servId = listServiceForBooking[0].BookDateTime.BookServiceProvideId

                    var isInstUsePayment = false;
                    var servId = listServiceForBooking[0].BookDateTime.BookServiceProvideId

                    applicationData.Institutions.forEach(function(i) {
                        var inst = i;
                        i.BookResources.forEach(function(r) {
                            r.BookServiceProvides.forEach(function(s) {
                                if (s.Id == servId) {
                                    isInstUsePayment = inst.UseCustomerPayment;
                                }
                            });
                        });
                    });
                    var totalAmount = TotalBookingAmount();
                    if (isInstUsePayment && totalAmount >= 1) {
                        $("#bookingAmount").val(totalAmount);
                        $(".booking-amount-count").html(totalAmount + " " + listServiceForBooking[0].BookDateTime.Currency);
                        $(".bt-drop-in-wrapper-booking").removeClass("hidden");
                        GetClientTokenForBooking(sendOrderBooking, dateVal, timeVal, needConfirmation, bookResourceId);
                    } else {
                        $(".dateTimePicker-container").addClass("hidden");
                        $(".order-booking").removeClass("hidden");
                        scrollTop();

                        $(".btn-send-order-booking").unbind().on("click", function() {
                            if (checkValidationAndRequired($(".order-booking"))) {
                                BookingOrderHandlers(dateVal, timeVal, needConfirmation, bookResourceId);
                            }
                        });
                    }
                }
            } else {
                var isInstUsePayment = false;
                var servId = listServiceForBooking[0].BookDateTime.BookServiceProvideId

                applicationData.Institutions.forEach(function(i) {
                    var inst = i;
                    i.BookResources.forEach(function(r) {
                        r.BookServiceProvides.forEach(function(s) {
                            if (s.Id == servId) {
                                isInstUsePayment = inst.UseCustomerPayment;
                            }
                        });
                    });
                });
                var totalAmount = TotalBookingAmount();
                if (isInstUsePayment && totalAmount >= 1) {
                    $("#bookingAmount").val(totalAmount);
                    $(".booking-amount-count").html(totalAmount + " " + listServiceForBooking[0].BookDateTime.Currency);
                    $(".bt-drop-in-wrapper-booking").removeClass("hidden");
                    GetClientTokenForBooking(sendOrderBooking, dateVal, timeVal, needConfirmation, bookResourceId);
                } else {
                    $(".dateTimePicker-container").addClass("hidden");
                    $(".order-booking").removeClass("hidden");
                    scrollTop();

                    $(".btn-send-order-booking").unbind().on("click", function() {
                        if (checkValidationAndRequired($(".order-booking"))) {
                            BookingOrderHandlers(dateVal, timeVal, needConfirmation, bookResourceId);
                        }
                    });
                }
            }
        } else {
            alert(cultureRes.selectServTime);
        }
    });
}

function parseEndDataTime(startTime, duration) {
    var hours = moment(startTime, "h:mm").add(duration, 'minutes').hours().toString();
    var minutes = moment(startTime, "h:mm").add(duration, 'minutes').minutes().toString();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    return hours + ":" + minutes;
}

function sendOrderBooking(dateVal, timeVal, needConfirmation, bookResourceId, token) {

    var client_token = token;
    var form = document.querySelector('#payment-form-booking');

    braintree.dropin.create({
        authorization: client_token,
        container: '#bt-dropin-booking',
        translations: {
            payingWith: cultureRes.payingWith,
            chooseAnotherWayToPay: cultureRes.chooseAnotherWayToPay,
            chooseAWayToPay: cultureRes.chooseAWayToPay,
            otherWaysToPay: cultureRes.otherWaysToPay,
            cardVerification: cultureRes.cardVerification,

            fieldEmptyForCvv: cultureRes.fieldEmptyForCvv,
            fieldEmptyForExpirationDate: cultureRes.fieldEmptyForExpirationDate,
            fieldEmptyForCardholderName: cultureRes.fieldEmptyForCardholderName,
            fieldEmptyForNumber: cultureRes.fieldEmptyForNumber,
            fieldInvalidForCvv: cultureRes.fieldInvalidForCvv,
            fieldInvalidForExpirationDate: cultureRes.fieldInvalidForExpirationDate,
            fieldInvalidForNumber: cultureRes.fieldInvalidForNumber,
            genericError: cultureRes.genericError,
            hostedFieldsFailedTokenizationError: cultureRes.hostedFieldsFailedTokenizationError,
            hostedFieldsTokenizationCvvVerificationFailedError: cultureRes.hostedFieldsTokenizationCvvVerificationFailedError,
            hostedFieldsTokenizationNetworkErrorError: cultureRes.hostedFieldsTokenizationNetworkErrorError,
            hostedFieldsFieldsInvalidError: cultureRes.hostedFieldsFieldsInvalidError,
            unsupportedCardTypeError: cultureRes.unsupportedCardTypeError,

            cvvThreeDigitLabelSubheading: cultureRes.cvvThreeDigitLabelSubheading,
            cardNumberLabel: cultureRes.cardNumberLabel,
            cvvLabel: cultureRes.cvvLabel,
            expirationDateLabel: cultureRes.expirationDateLabel,
            expirationDateLabelSubheading: cultureRes.expirationDateLabelSubheading,
            expirationDatePlaceholder: cultureRes.expirationDatePlaceholderexpirationDatePlaceholder,
            payWithCard: cultureRes.payWithCard,
            endingIn: cultureRes.endingIn,
            Card: cultureRes.Card,
            PayPal: cultureRes.PayPal
        },
        card: {
            overrides: {
                fields: {
                    number: {
                        placeholder: 'XXXX XXXX XXXX XXXX XXXX'
                    },
                    cvv: { placeholder: "XXX" }
                }
            }
        }
    }, function(createErr, instance) {
        dropinInstance = instance;
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            if (checkValidationAndRequired($(".order-booking"))) {
                instance.requestPaymentMethod(function(err, payload) {
                    if (err) {
                        //console.log('Error', err);
                        alert(err);
                        return;
                    }

                    // Add the nonce to the form and submit
                    document.querySelector('#nonce').value = payload.nonce;

                    BookingOrderHandlers(dateVal, timeVal, needConfirmation, bookResourceId);
                });
            }
        });
        $(".btn-send-order-booking").unbind().on("click", function() {
            $("#payment-form-booking button.button").click();
        });
    });

}

function addOrderBookingInJStorage(listServiceForBooking, listOfOrders) {

    var arrayForOrder = [];
    listServiceForBooking.forEach(function(service) {
        var resourceName;
        $(applicationData.Institutions).each(function() {
            $(this.BookResources).each(function() {
                var res = this.Name;
                $(this.BookServiceProvides).each(function() {
                    if (this.Id == service.BookDateTime.BookServiceProvideId) {
                        resourceName = res;
                    }
                });
            });
        });
        arrayForOrder.push({
            status: "pending",
            nemesService: service.BookDateTime.NameServices,
            serviceObject: service.BookDateTime,
            resourceName: resourceName,
            id: 0
        });
    });
    listOfOrders.forEach(function(order, i) {
        arrayForOrder[i].id = order.Id
    });
    var newJsonOrder = JSON.stringify(arrayForOrder);
    if ($.jStorage.get('bookOrderWithStatusPending') == null) {
        $.jStorage.set('bookOrderWithStatusPending', newJsonOrder);
    } else {
        var oldArrOrder = JSON.parse($.jStorage.get('bookOrderWithStatusPending'));
        //We concat old js storage with new order and set new storage
        var oldAndNewJsonOrder = JSON.stringify(JSON.parse(newJsonOrder).concat(JSON.parse($.jStorage.get('bookOrderWithStatusPending'))));
        $.jStorage.set('bookOrderWithStatusPending', oldAndNewJsonOrder);
    }
}

function checkUpdateBooking(isNewVersion) {
    var collectionBookingResource = [];

    $(applicationData.Institutions).each(function() {
        collectionBookingResource.push({
            Id: this.Id,
            Version: this.Version
        });
    });
    $.ajax({
        type: "POST",
        url: applicationData.UrlForUpdateApp + "/Booking/CheckUpdateBooking",
        data: {
            model: collectionBookingResource
        },
        cache: false,
        success: function(object) {
            object = JSON.parse(object);
            if (object.IsUpdated == true) {
                applicationData.Institutions = object.Institutions;
                var storePath = window.myFileSystem.root.nativeURL + "Phonegap/";
                applicationData.Institutions = resourcesOfBooking(applicationData.Institutions, storePath);
                var appJsonString = JSON.stringify(applicationData);
                $.jStorage.set('replaceImagePachJson', appJsonString);
                downloadResources();

            } else if (!isNewVersion) {
                reactRender();
                initGallaryClick();
                submitFormListener();
                unBlockUi()
            }
        },
        error: function(err) {
            reactRender();
            initGallaryClick();
            submitFormListener();
            unBlockUi()
                //  console.log("error");
                // console.log(err);
        }
    });


}

function workToClickBook(itemId) {
    var bookedService = {};
    var ser;
    $(applicationData.Institutions).each(function() {
        $(this.BookResources).each(function() {
            ser = this.Name;
            $(this.BookServiceProvides).each(function() {
                if (this.Id == itemId) {
                    bookedService = this;
                    bookedService.selectedService = ser;
                }
            });
        });
    });

    var thisTimeLineId = bookedService.BookResourceId;
    var serviceId = itemId;
    var durationService = bookedService.Duration;
    var nameServices = bookedService.servicesName;

    var partOfGeneralTimeLine = true;
    var thisServiceNotBooking = true;

    $(listServiceForBooking).each(function(i, e) {
        if (e.BookDateTime.ThisTimeLineId != thisTimeLineId) {
            partOfGeneralTimeLine = false;
        }
    });
    $(listServiceForBooking).each(function(i, e) {
        if (e.BookDateTime.BookServiceProvideId == serviceId) {
            thisServiceNotBooking = false;
        }
    });
    if (thisServiceNotBooking) {
        if (partOfGeneralTimeLine) {
            var BookOrder = {
                BookDateTime: {
                    StringFromTime: null,
                    StringToTime: null,
                    BookServiceProvideId: serviceId,
                    ThisTimeLineId: thisTimeLineId,
                    Duration: Number(durationService),
                    NameServices: bookedService.Name,
                    Currency: bookedService.Currency,
                    Price: bookedService.Price
                }
            }
            listServiceForBooking.push(BookOrder);
            $("#booking-order").append("<div id='bookShopItem'></div>");
            renderBookingCartItem(bookedService);
            window.plugins.toast.showShortBottom(cultureRes.book);
        } else {
            if (confirm(cultureRes.bookConf)) {
                listServiceForBooking = [];
                $("#booking-order").html("");
                var BookOrder = {
                    BookDateTime: {
                        StringFromTime: null,
                        StringToTime: null,
                        BookServiceProvideId: serviceId,
                        ThisTimeLineId: thisTimeLineId,
                        Duration: Number(durationService),
                        Currency: bookedService.Currency,
                        Price: bookedService.Price
                    }
                }
                listServiceForBooking.push(BookOrder);
                $("#cart").append("<div id='bookShopItem'></div>");
                renderBookingCartItem(bookedService);
                window.plugins.toast.showShortBottom(cultureRes.book);
            }
        }
        $("#bookShopItem").attr("id", "");
    } else {
        alert(cultureRes.alreadyBook);
    }
}

function TotalBookingAmount() {
    var amount = 0;
    listServiceForBooking.forEach(function(service) {
        if (service.BookDateTime.Price !== null) {
            amount = amount + parseInt(service.BookDateTime.Price);
        }

    });
    return amount;
}

function BookingOrderHandlers(dateVal, timeVal, needConfirmation, bookResourceId) {
    var btnSendOrder = $(".btn-send-order-booking");
    var duration = 0;
    var durationOfFirstService = listServiceForBooking[0].BookDateTime.Duration;
    var endDataForLoop;
    if (needConfirmation) {
        $(".order-booking span").removeClass("hidden");
    }
    // btnSendOrder.unbind().on("click", function() {
    listServiceForBooking.forEach(function(e, i) {
        duration += e.BookDateTime.Duration;
        e.Email = $("#booking-emailOrder").val();
        e.UserName = $("#booking-nameOrder").val();
        e.Message = $("#booking-commentOrder").val();
        e.Phone = $("#booking-phoneOrder").val();
        e.AppId = $.jStorage.get('ApplicationId');
        e.ConfirmMethod = $("#confirmMethod").val();
        e.IsConfirmated = false;
        if (i == 0) {
            e.BookDateTime.StringFromTime = dateVal + " " + timeVal;
            endDataForLoop = parseEndDataTime(timeVal, e.BookDateTime.Duration);
        } else {
            e.BookDateTime.StringFromTime = dateVal + " " + endDataForLoop;
            endDataForLoop = parseEndDataTime(endDataForLoop, e.BookDateTime.Duration);
        }
        e.BookDateTime.StringToTime = dateVal + " " + endDataForLoop;
    });

    applicationData.Institutions.forEach(function(institution) {
        if (institution.Id == $(".value-currentInstitution").val()) {
            institution.BookResources.forEach(function(bookResources) {
                if (bookResources.Id == listServiceForBooking[0].BookDateTime.ThisTimeLineId) {
                    var arrayCloseTime = bookResources.CloseTime.split("T")[1].split(":");
                    var arrayOpenTime = bookResources.OpenTime.split("T")[1].split(":");
                    var bookedEndTimeHours = listServiceForBooking[listServiceForBooking.length - 1].BookDateTime.StringToTime.split(" ")[1].split(":")[0];
                    var bookedEndTimeMinutes = listServiceForBooking[listServiceForBooking.length - 1].BookDateTime.StringToTime.split(" ")[1].split(":")[1];
                    var bookedStartTimeHours = listServiceForBooking[0].BookDateTime.StringFromTime.split(" ")[1].split(":")[0];
                    var bookedStartTimeMinutes = listServiceForBooking[0].BookDateTime.StringFromTime.split(" ")[1].split(":")[1];
                    var bookedStart = moment(bookedStartTimeHours + ":" + bookedStartTimeMinutes, ["HH:mm"]).format();
                    var bookedEnd = moment(bookedEndTimeHours + ":" + bookedEndTimeMinutes, ["HH:mm"]).format();
                    var startTime = moment(arrayOpenTime[0] + ":" + arrayOpenTime[1], ["HH:mm"]).format();
                    var closeTime = moment(arrayCloseTime[0] + ":" + arrayCloseTime[1], ["HH:mm"]).format();
                    var fromDay = moment().add(Number(bookResources.StartBookDay), "days").format("MM/DD/YYYY");
                    var toDay = moment(fromDay, ["MM/DD/YYYY"]).add(bookResources.CountDaysForBook, "days").format("MM/DD/YYYY");

                    if (!((moment(dateVal, ["MM/DD/YYYY"]).isAfter(fromDay) || moment(dateVal, ["MM/DD/YYYY"]).isSame(fromDay)) && (moment(dateVal, ["MM/DD/YYYY"]).isBefore(toDay)) || moment(dateVal, ["MM/DD/YYYY"]).isSame(toDay))) {
                        alert(cultureRes.cantBookOne + fromDay + cultureRes.cantBookTwo + toDay + "!");
                        return false;
                    } else {
                        if (bookedStart >= startTime && bookedEnd <= closeTime) {
                            BookingAjax();
                            return true;
                        } else {
                            alert(cultureRes.instOpen + arrayOpenTime[0] + ":" + arrayOpenTime[1] + cultureRes.cantBookTwo + arrayCloseTime[0] + ":" + arrayCloseTime[1] + "!")
                            return false;
                        }
                    }
                }
            });
        }
    });


    function BookingAjax() {
        $(".spinner-container").removeClass("hidden")
        var projectId = applicationData.ProjectId;
        var contentId = applicationData.Id;
        var token = $.jStorage.get('notificationToken');
        var nonce = $("#nonce").val();
        $.ajax({
            type: "POST",
            url: applicationData.UrlForUpdateApp + "/Booking/CreateOrder",
            data: {
                model: listServiceForBooking,
                duration: duration,
                start: dateVal + " " + timeVal,
                bookResourceId: bookResourceId,
                projectId: projectId,
                contentId: contentId,
                notificationToken: token,
                nonce: nonce
            },
            cache: false,
            success: function(object) {
                $(".spinner-container").addClass("hidden");
                duration = 0;
                object = JSON.parse(object);
                if (object.IsCreated == true) {
                    alert("success");
                    if (listServiceForBooking[0].ConfirmMethod == "InApplication") {
                        addOrderBookingInJStorage(listServiceForBooking, object.resourceModel);
                    }
                    $(".order-booking").addClass("hidden");
                    $("#container, .classMenu").removeClass("hidden");
                    scrollTop();
                } else if (object.IsCreated == false && typeof object.Times == "object") {
                    if (object.Times.length == 0) {
                        alert("Please, select another day");
                        return false;
                    }
                    var selectFreeTimeBook = $("#select-freeTimeBook");
                    $(".container-selectFreeBookTime").removeClass("hidden");
                    $(".order-booking").addClass("hidden");
                    scrollTop();
                    selectFreeTimeBook.html("");
                    object.Times.forEach(function(time) {
                        selectFreeTimeBook.append("<option>" + time + "</option>");
                    });
                    var selectDate = selectFreeTimeBook.val();
                    $("#bookAfterConfirmFreeTime").unbind().click(function() {
                        $(".spinner-container").removeClass("hidden");
                        var hours = selectDate.split("T")[1].split(":")[0];
                        var minutes = selectDate.split("T")[1].split(":")[1];
                        var timeVal = hours + ":" + minutes;
                        var year = selectDate.split("T")[0].split("-")[0];
                        var month = selectDate.split("T")[0].split("-")[1];
                        var date = selectDate.split("T")[0].split("-")[2];
                        var dateVal = month + "/" + date + "/" + year;
                        var duration = 0;
                        listServiceForBooking.forEach(function(e, i) {
                            duration += e.BookDateTime.Duration;
                            if (i == 0) {
                                e.BookDateTime.StringFromTime = dateVal + " " + timeVal;
                                endDataForLoop = parseEndDataTime(timeVal, e.BookDateTime.Duration);
                            } else {
                                e.BookDateTime.StringFromTime = dateVal + " " + endDataForLoop;
                                endDataForLoop = parseEndDataTime(endDataForLoop, e.BookDateTime.Duration);
                            }
                            e.BookDateTime.StringToTime = dateVal + " " + endDataForLoop;
                        });
                        $.ajax({
                            type: "POST",
                            url: applicationData.UrlForUpdateApp + "/Booking/CreateOrder",
                            data: {
                                model: listServiceForBooking,
                                duration: duration,
                                start: dateVal + " " + timeVal,
                                bookResourceId: bookResourceId,
                                projectId: applicationData.ProjectId,
                                contentId: applicationData.Id,
                                notificationToken: $.jStorage.get('notificationToken'),
                                nonce: nonce
                            },
                            cache: false,
                            success: function(object) {
                                $(".spinner-container").addClass("hidden");
                                duration = 0;
                                object = JSON.parse(object);
                                if (object.IsCreated == true) {

                                    alert("success");
                                    if (listServiceForBooking[0].ConfirmMethod == "InApplication") {
                                        addOrderBookingInJStorage(listServiceForBooking, object.resourceModel);
                                    }
                                    $(".container-selectFreeBookTime").addClass("hidden");
                                    $("#container, .classMenu").removeClass("hidden");
                                    scrollTop();
                                } else {
                                    alert(cultureRes.sorryError);
                                }
                            }
                        });
                    });
                } else {
                    alert(cultureRes.sorryError);
                }
                $(".bt-drop-in-wrapper-booking").addClass("hidden");
            }
        });
    }
}