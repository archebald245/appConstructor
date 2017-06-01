function initCulture() {
    var cultureName = "ru";

    if ($.jStorage.get('cultureName') != null) {
        cultureName = $.jStorage.get('cultureName');
    } else if ($.jStorage.get('cultureName') == null) {
        if (applicationData.CultureName != null) {
            cultureName = applicationData.CultureName;
        }
        $.jStorage.set('cultureName', cultureName);
    }

    if (cultureName == "ru" || cultureName == "Ru" || cultureName == "ru-RU") {
        initRuCulture();
    } else if (cultureName == "ua" || cultureName == "uk" || cultureName == "ua-UK") {
        initUaCulture()
    } else {
        initRuCulture();
    }
    //изменить на ресурсы
    $(".container-statusBooking .cart-top-line span").html("Your book status list");
    $(".bookingServices-container .cart-top-line span").html("Services1111");
    $(".bookingServices-container button.btn-order-booking span").html("Order Booking");
    $(".container-selectFreeBookTime button.back-to-container-from-book span").html("Select free time");
    $(".container-selectFreeBookTime p span").html("We can offer you these times:");
    $(".container-selectFreeBookTime button#bookAfterConfirmFreeTime span").html("Book");
    $(".dateTimePicker-container .cart-top-line span").html("Select Date");
    $("label[for='dateTimePicker-time']").html("Select time");
    $("label[for='dateTimePicker-date']").html("Select date");
    $("label[for='nameOrder']").html("Name");
    $("label[for='confirmMethod']").html("Phone Number");
    $("label[for='commentOrder']").html("Your Order Comments");


    $(".dateTimePicker-container button.btn-confirmDateForBook span").html("Confirm Method");
    $(".order-booking .cart-top-line span").html("Your Order Info");
    $(".order-booking button.btn-send-order-booking span ").html("Book");
    $(".cart .cart-top-line span").html("Your Order");
    $(".cart .totalPrice span ").html("Total $ ");
    $(".cart Button.btn-order span ").html("Order");
    $("#orderInfo .cart-top-line span ").html("Your Order Info");

    $("#orderInfo label[for='nameOrder']").html("Name");
    $("#orderInfo label[for='phoneOrder']").html("Phone Number");
    $("#orderInfo label[for='emailOrder']").html("Email");
    $("#orderInfo label[for='commentOrder']").html("Your Order Comments");
    $("#orderInfo button.placeAnOrder span").html("Buy");
}

function initRuCulture() {
    window.cultureRes = new Object();
    //day of week
    cultureRes.sunday = "Sunday";
    cultureRes.monday = "Monday";
    cultureRes.tuesday = "Tuesday";
    cultureRes.wednesday = "Wednesday";
    cultureRes.thursday = "Thursday";
    cultureRes.friday = "Friday";
    cultureRes.saturday = "Saturday";
    //bookingWork
    cultureRes.time = "Time";
    cultureRes.date = "Date";
    cultureRes.dontAnyBook = "You don't book any service!";
    cultureRes.bookConf = "You can  order only  one kind of time line! If you continue booking this service, other services will be cleared from booking list?";
    cultureRes.book = "Book";
    cultureRes.alreadyBook = "You already have booked this service!";
    cultureRes.resourcesDontWork = "Sorry, resource don't work in this day of week!";
    cultureRes.selectServTime = "Please, select date for this service!";
    cultureRes.cantBookOne = "Извените, но вы можете зарезервировать от";
    cultureRes.cantBookTwo = "и до";
    cultureRes.cantBookThree = "Time";
    cultureRes.ok = "OK";
    cultureRes.instOpen = "Sorry, Institution is open from ";
    cultureRes.sorryError = "Sorry, error!";
    //cartWork
    cultureRes.thankYou = "Thank You";
    cultureRes.nothingOrdered = "You have nothing ordered!";
    //eventWork
    cultureRes.lockedPage = "This page is locked!";
    cultureRes.loginPlease = "Login Please";
    //formWork
    cultureRes.noInternet = "Извините, проверте Интернет соединение!";
    cultureRes.requiredFields = "Please fill in all required fields!";
    cultureRes.validPhone = "Please enter valid phone number!";
    cultureRes.validEmail = "Please enter valid email!";
    cultureRes.passLength = "Password must contain 4 or more characters!";
    cultureRes.pathNotMatgh = "Passwords do not match. Try again.";
    //MobileView
    cultureRes.haveNotOrders = "You haven't any orders!";
    cultureRes.confirmated = "Confirmated";
    cultureRes.pending = "Pending";
    cultureRes.sorryOnline = "Sorry, is only available online!";
    //render-booking
    cultureRes.displayInst = "Institution";
    cultureRes.displayInstTwo = "Institution - ";
    cultureRes.orderBook = "Order Booking";
    cultureRes.timeLine = "Time Line";
    cultureRes.displayName = 'Name - ';
    cultureRes.openTime = "Open Time";
    cultureRes.closeTime = "Close Time";
    cultureRes.startBookDay = "Start book day - ";
    cultureRes.stepMin = "Step Minutes - ";
    cultureRes.countDay = "Count Days For Book - ";
    cultureRes.service = "Service";
    cultureRes.description = "Description - ";
    cultureRes.durationTime = "Duration Time - ";
    cultureRes.book = "Book";

    //render-*-form
    cultureRes.formBlock = "FormBlock";
    cultureRes.telPlaceholder = "Format: +XXXXXXXXXXX";
    cultureRes.dropDown = "DropDownModels";
    cultureRes.checkBox = "CheckBoxModels";
    cultureRes.RadioButton = "RadioButtonModels";
    cultureRes.submit = "Submit";
    cultureRes.logout = "Logout";

    //render-restaurant-menu
    cultureRes.RestMenu = "RestaurantMenuBlock";
    cultureRes.add = "Add";

    //render-inst
    cultureRes.inst = "Institution";
    cultureRes.instDisplay = "Institution - ";

    //render-single-shopitem
    cultureRes.shopitem = "singleShopItem";
    cultureRes.shopitemDesc = "Description:";
    cultureRes.addToCart = "+ Add to Cart";

    cultureRes.itemAdded = "Item add to cart!";
    cultureRes.restConf = "Your shopping cart already has order from previous restaurant. If you add and confirm current order the order from previous restaurant will be removed. Continue?";
    cultureRes.sorryOnline = "Sorry, is only available online!";
    cultureRes.noTime = "No time for this rest!";

    //index.html

}

function initUaCulture() {
    window.cultureRes = new Object();
    //day of week
    cultureRes.sunday = "Sunday";
    cultureRes.monday = "Monday";
    cultureRes.tuesday = "Tuesday";
    cultureRes.wednesday = "Wednesday";
    cultureRes.thursday = "Thursday";
    cultureRes.friday = "Friday";
    cultureRes.saturday = "Saturday";
    //bookingWork
    cultureRes.time = "Time";
    cultureRes.date = "Date";
    cultureRes.dontAnyBook = "You don't book any service!";
    cultureRes.bookConf = "You can  order only  one kind of time line! If you continue booking this service, other services will be cleared from booking list?";
    cultureRes.book = "Book";
    cultureRes.alreadyBook = "You already have booked this service!";
    cultureRes.resourcesDontWork = "Sorry, resource don't work in this day of week!";
    cultureRes.selectServTime = "Please, select date for this service!";
    cultureRes.cantBookOne = "Извените, но вы можете зарезервировать от";
    cultureRes.cantBookTwo = "и до";
    cultureRes.cantBookThree = "Time";
    cultureRes.ok = "OK";
    cultureRes.instOpen = "Sorry, Institution is open from ";
    cultureRes.sorryError = "Sorry, error!";
    //cartWork
    cultureRes.thankYou = "Thank You";
    cultureRes.nothingOrdered = "You have nothing ordered!";
    //eventWork
    cultureRes.lockedPage = "This page is locked!";
    cultureRes.loginPlease = "Login Please";
    //formWork
    cultureRes.noInternet = "Вибачте, перевірте Інтернет з`єднання";
    cultureRes.requiredFields = "Please fill in all required fields!";
    cultureRes.validPhone = "Please enter valid phone number!";
    cultureRes.validEmail = "Please enter valid email!";
    cultureRes.passLength = "Password must contain 4 or more characters!";
    cultureRes.pathNotMatgh = "Passwords do not match. Try again.";
    //MobileView
    cultureRes.haveNotOrders = "You haven't any orders!";
    cultureRes.confirmated = "Confirmated";
    cultureRes.pending = "Pending";
    cultureRes.sorryOnline = "Sorry, is only available online!";
    //render-booking
    cultureRes.displayInst = "Institution";
    cultureRes.displayInstTwo = "Institution - ";
    cultureRes.orderBook = "Order Booking";
    cultureRes.timeLine = "Time Line";
    cultureRes.displayName = 'Name - ';
    cultureRes.openTime = "Open Time";
    cultureRes.closeTime = "Close Time";
    cultureRes.startBookDay = "Start book day - ";
    cultureRes.stepMin = "Step Minutes - ";
    cultureRes.countDay = "Count Days For Book - ";
    cultureRes.service = "Service";
    cultureRes.description = "Description - ";
    cultureRes.durationTime = "Duration Time - ";
    cultureRes.book = "Book";

    //render-*-form
    cultureRes.formBlock = "FormBlock";
    cultureRes.telPlaceholder = "Format: +XXXXXXXXXXX";
    cultureRes.dropDown = "DropDownModels";
    cultureRes.checkBox = "CheckBoxModels";
    cultureRes.RadioButton = "RadioButtonModels";
    cultureRes.submit = "Submit";
    cultureRes.logout = "Logout";

    //render-restaurant-menu
    cultureRes.RestMenu = "RestaurantMenuBlock";
    cultureRes.add = "Add";

    //render-inst
    cultureRes.inst = "Institution";
    cultureRes.instDisplay = "Institution - ";

    //render-single-shopitem
    cultureRes.shopitem = "singleShopItem";
    cultureRes.shopitemDesc = "Description:";
    cultureRes.addToCart = "+ Add to Cart";

    cultureRes.itemAdded = "Item add to cart!";
    cultureRes.restConf = "Your shopping cart already has order from previous restaurant. If you add and confirm current order the order from previous restaurant will be removed. Continue?";
    cultureRes.sorryOnline = "Sorry, is only available online!";
    cultureRes.noTime = "No time for this rest!";
}