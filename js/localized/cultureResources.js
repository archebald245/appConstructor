function initCulture() {
    var cultureName = "en";

    if (applicationData.CultureName != null) {
        cultureName = applicationData.CultureName;

        if ($.jStorage.get('cultureName') == null) {
            $.jStorage.set('cultureName', cultureName);
        }
    } else {
        if ($.jStorage.get('cultureName') != null) {
            cultureName = $.jStorage.get('cultureName');
        } else if ($.jStorage.get('cultureName') == null) {
            $.jStorage.set('cultureName', cultureName);
        }
    }



    // if ($.jStorage.get('cultureName') != null) {
    //     cultureName = $.jStorage.get('cultureName');
    // } else if ($.jStorage.get('cultureName') == null) {
    //     if (applicationData.CultureName != null) {
    //         cultureName = applicationData.CultureName;
    //     }
    //     $.jStorage.set('cultureName', cultureName);
    // }

    if (cultureName == "ru" || cultureName == "Ru" || cultureName == "ru-RU") {
        initRuCulture();
    } else if (cultureName == "ua" || cultureName == "uk" || cultureName == "ua-UK") {
        initUaCulture()
    } else {
        initEnCulture();
    }
    $(".container-statusBooking .cart-top-line span").html(cultureRes.bookStatus);
    $(".bookingServices-container .cart-top-line span").html(cultureRes.services);
    $(".bookingServices-container button.btn-order-booking span").html(cultureRes.orderBook);
    $(".container-selectFreeBookTime button.back-to-container-from-book span").html(cultureRes.selectFreeTime);
    $(".container-selectFreeBookTime p span").html(cultureRes.offerTimes);
    $(".container-selectFreeBookTime button#bookAfterConfirmFreeTime span").html(cultureRes.book);
    $(".dateTimePicker-container .cart-top-line span").html(cultureRes.selectDate);
    $("label[for='dateTimePicker-time']").html(cultureRes.selectTime);
    $("label[for='dateTimePicker-date']").html(cultureRes.selectDate);
    $("label[for='nameOrder']").html(cultureRes.name);
    $("label[for='confirmMethod']").html(cultureRes.phone);
    $("label[for='commentOrder']").html(cultureRes.orderComments);
    $(".dateTimePicker-container button.btn-confirmDateForBook span").html(cultureRes.confirmMeth);
    $(".order-booking .cart-top-line span").html(cultureRes.orderInfo);
    $(".order-booking button.btn-send-order-booking span ").html(cultureRes.book);
    $(".cart .cart-top-line span").html(cultureRes.yourOrder);
    $(".cart .totalPrice span ").html(cultureRes.total);
    $(".cart Button.btn-order span ").html(cultureRes.order);
    $("#orderInfo .cart-top-line span ").html(cultureRes.orderInfo);
    $("#orderInfo label[for='nameOrder']").html(cultureRes.name);
    $("#orderInfo label[for='phoneOrder']").html(cultureRes.phone);
    $("#orderInfo label[for='emailOrder']").html(cultureRes.email);
    $("#orderInfo label[for='commentOrder']").html(cultureRes.orderComments);
    $("#orderInfo button.placeAnOrder span").html(cultureRes.buy);
}

function initEnCulture() {
    window.cultureRes = new Object();
    //index.html
    cultureRes.bookStatus = "Your book status list";
    cultureRes.services = "Services";
    cultureRes.selectFreeTime = "Select free time";
    cultureRes.offerTimes = "We can offer you these times:";
    cultureRes.selectDate = "Select Date";
    cultureRes.selectTime = "Select time";
    cultureRes.name = "Name";
    cultureRes.phone = "Phone Number";
    cultureRes.email = "Email";
    cultureRes.orderComments = "Your Order Comments";
    cultureRes.confirmMeth = "Confirm Method";
    cultureRes.orderInfo = "Your Order Info";
    cultureRes.yourOrder = "Your Order";
    cultureRes.total = "Total ";
    cultureRes.order = "Order";
    cultureRes.buy = "Buy";

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

}

function initRuCulture() {
    window.cultureRes = new Object();
    //index.html
    cultureRes.bookStatus = "Your book status list";
    cultureRes.services = "Сервисы";
    cultureRes.selectFreeTime = "Select free time";
    cultureRes.offerTimes = "We can offer you these times:";
    cultureRes.selectDate = "Select Date";
    cultureRes.selectTime = "Select time";
    cultureRes.name = "Имя";
    cultureRes.phone = "Номер телефона";
    cultureRes.email = "Email";
    cultureRes.orderComments = "Your Order Comments";
    cultureRes.confirmMeth = "Метод подтверждения";
    cultureRes.orderInfo = "Your Order Info";
    cultureRes.yourOrder = "Your Order";
    cultureRes.total = "Total ";
    cultureRes.order = "Order";
    cultureRes.buy = "Buy";

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
}

function initUaCulture() {
    window.cultureRes = new Object();
    //index.html
    cultureRes.bookStatus = "Your book status list";
    cultureRes.services = "Services";
    cultureRes.selectFreeTime = "Select free time";
    cultureRes.offerTimes = "We can offer you these times:";
    cultureRes.selectDate = "Select Date";
    cultureRes.selectTime = "Select time";
    cultureRes.name = "Ім`я";
    cultureRes.phone = "Номер телефону";
    cultureRes.email = "Email";
    cultureRes.orderComments = "Your Order Comments";
    cultureRes.confirmMeth = "Confirm Method";
    cultureRes.orderInfo = "Your Order Info";
    cultureRes.yourOrder = "Your Order";
    cultureRes.total = "Всього ";
    cultureRes.order = "Order";
    cultureRes.buy = "Buy";

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
    cultureRes.noInternet = "Вибачте, відсутнє Інтернет з`єднання!";
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