'use strict';

function reactRender() {
    function onYouTubeIframeAPIReady(element, id) {
        var player = new YT.Player(element, {
            heidth: 'auto',
            width: '100%',
            videoId: id,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
    function onPlayerReady(event) {
        // event.target.playVideo();
    }

    function onPlayerStateChange(event) {}

    var Rows = React.createClass({
        displayName: 'Rows',

        getInitialState: function getInitialState() {
            return { data: [] };
        },
        componentDidMount: function componentDidMount() {
            for (var i = 0; i < applicationData.Pages.length; i++) {
                if (indexPage == applicationData.Pages[i].Id) {
                    this.setState({ data: applicationData.Pages[i].Rows });
                }
            }
        },
        render: function render() {
            var rowModels = this.state.data.map(function (row) {
                return React.createElement(CellContainer, { data: row, key: row.Id });
            });
            if(applicationData.RestaurantMenus != null){
                  return React.createElement(
                'div',
                null,
                React.createElement(
                    'button',
                    { type: 'button', className: 'cart-btn' },
                    React.createElement('img', { src: 'file:///android_asset/www/baseimages/cart.png' })
                ),
                React.createElement(
                    'div',
                    { className: 'container-fluid' },
                    rowModels
                )
            );
            }else{
                  return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'container-fluid' },
                    rowModels
                )
            );
            }

        }
    });

    var CellContainer = React.createClass({
        displayName: 'CellContainer',

        componentDidMount: function componentDidMount() {
            var styleRow = this.props.data.Style;

            if (styleRow == undefined || styleRow == null) {
                styleRow = "";
            }

            console.log(styleRow);

            $(React.findDOMNode(this)).attr("style", styleRow);
        },
        render: function render() {
            var cellModels = this.props.data.CellContents.map(function (cell) {
                return React.createElement(CellContent, { data: cell, key: cell.Id });
            });
            return React.createElement(
                'div',
                { className: 'row' },
                cellModels
            );
        }
    });

    var GalleryContainer = React.createClass({
        displayName: 'GalleryContainer',

        render: function render() {
            var icon = _.where(this.props.data, { IsGalleryIcon: true });
            var items = _.without(this.props.data, icon);
            if (icon.length > 0) {
                return React.createElement(
                    'div',
                    { className: 'gallery-images-container' },
                    React.createElement(
                        'div',
                        { className: 'icon-container' },
                        this.createIcon(this.props.data)
                    ),
                    React.createElement(
                        'div',
                        { id: 'lightgallery' },
                        this.createItems(this.props.data)
                    )
                );
            } else {
                return React.createElement(
                    'div',
                    { className: 'gallery-images-container' },
                    React.createElement(
                        'div',
                        { className: 'shadow-container' },
                        this.createIcon(this.props.data)
                    ),
                    React.createElement(
                        'div',
                        { id: 'lightgallery' },
                        this.createItems(this.props.data)
                    )
                );
            }
        },
        componentDidMount: function componentDidMount() {
         $("#lightgallery").lightGallery({
           controls: false,
           download: false
         });
        },
        createIcon: function createIcon(items) {
            var icon = _.where(items, { IsGalleryIcon: true });
            items = _.without(items, icon);
            if (icon.length > 0) {
                return React.createElement('img', { src: icon[0].Link, className: 'gallery-icon' });
            } else {
                //return React.createElement('img',{src:"file:///android_asset/www/baseimages/gallery-shadow.png", className: 'gallery-icon gallery-shadow'});
                return React.createElement('img', { src: "file:///android_asset/www/baseimages/noimage.gif", className: 'gallery-icon gallery-shadow' });
            }
        },
        createItems: function createItems(items) {
            var output = [];

            var icon = _.where(items, { IsGalleryIcon: true });
            items = _.where(items, { IsGalleryIcon: false });
            for (var i = 0; i < items.length; i++) {
                if (i == 0 && icon.length == 0) {
                    output.push(React.createElement(
                            'a',
                            { href: items[i].Link, className: 'galleryHref', itemProp: 'contentUrl', 'data-size': '964x1024' },
                            React.createElement('img', { src: items[i].Link,  className: 'gallery-image' })
                        )
                    );
                } else {
                    output.push(React.createElement(
                            'a',
                            { href: items[i].Link, className: 'galleryHref hidden', itemProp: 'contentUrl', 'data-size': '964x1024' },
                            React.createElement('img', { src: items[i].Link, className: 'gallery-image' })
                        )
                    );
                }
            }
            return output;
        }
    });

    var YoutubeContainer = React.createClass({
        displayName: "YoutubeContainer",

        render: function render() {
            return React.createElement('div', { className: 'my-youtube' });
        },

        componentDidMount: function componentDidMount() {

            var reg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
            var value = this.props.data;
            if (value.split('src="').length > 1) {
                value = value.split('src="');
                value = value[1].split('"');
            } else {
                value = value.split("src='");
                value = value[1].split("'");
            }

            var url = value[0];
            var id = url.match(reg);
            var player;
            onYouTubeIframeAPIReady(ReactDOM.findDOMNode(this), id[1]);
        }
    });

    var Hbox = React.createClass({
        displayName: 'Hbox',

        componentDidMount: function componentDidMount() {
            var data = this.props.data;
            var json = data;
            //$(ReactDOM.findDOMNode(this));
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: json.quantity,
                paginationClickable: true,
                spaceBetween: 10
            });
        },
        render: function render() {
            var data = this.props.data;
            var json = data;

            var elementModels = json.elements.map(function (element) {
                element.Value = replaceData(element.Value);
                if (element.ContentTypeId == 2) {
                    return React.createElement(
                        'div',
                        { className: 'swiper-slide' },
                        React.createElement('div', { className: 'link-item', dangerouslySetInnerHTML: { __html: element.Value } })
                    );
                }
                if (element.ContentTypeId == 3) {
                    return React.createElement(
                        'div',
                        { className: 'swiper-slide' },
                        React.createElement('div', { className: 'image-item', dangerouslySetInnerHTML: { __html: element.Value } })
                    );
                }
                if (element.ContentTypeId == 4) {
                    return React.createElement(
                        'div',
                        { className: 'swiper-slide' },
                        React.createElement('div', { className: 'image-link-item', dangerouslySetInnerHTML: { __html: element.Value } })
                    );
                }
                if (element.ContentTypeId == 5) {
                    return React.createElement(
                        'div',
                        { className: 'swiper-slide' },
                        React.createElement('div', { className: 'text-item', dangerouslySetInnerHTML: { __html: element.Value } })
                    );
                }
                if (element.ContentTypeId == 6) {
                    return React.createElement(
                        'div',
                        { className: 'swiper-slide' },
                        React.createElement('div', { className: 'botton-item', dangerouslySetInnerHTML: { __html: element.Value } })
                    );
                }
                if (element.ContentTypeId == 7) {
                    return React.createElement(
                        'div',
                        { className: 'swiper-slide' },
                        React.createElement(YoutubeContainer, { data: element.Value })
                    );
                }
                if (element.ContentTypeId == 8) {
                    return React.createElement(
                        'div',
                        { className: 'swiper-slide' },
                        React.createElement(GalleryContainer, { data: element.Resourceses })
                    );
                }
                if (element.ContentTypeId == 9) {
                    return React.createElement(
                        'div',
                        { className: 'swiper-slide' },
                        React.createElement('div', { className: 'difficult-botton-item', dangerouslySetInnerHTML: { __html: element.Value } })
                    );
                }
            });

            return React.createElement(
                'div',
                { className: 'hBox-container swiper-container' },
                React.createElement(
                    'div',
                    { className: 'swiper-wrapper' },
                    elementModels
                ),
                React.createElement('div', { className: 'swiper-pagination' })
            );
        }
    });

    var Vbox = React.createClass({
        displayName: 'Vbox',

        componentDidMount: function componentDidMount() {
            var data = this.props.data;
            var json = data;
            //$(ReactDOM.findDOMNode(this));
        },
        render: function render() {
            var data = this.props.data;
            var json = data;

            var elementModels = json.elements.map(function (element) {
                element.Value = replaceData(element.Value);
                if (element.ContentTypeId == 2) {
                    return React.createElement('div', { className: 'link-item', dangerouslySetInnerHTML: { __html: element.Value } });
                }
                if (element.ContentTypeId == 3) {
                    return React.createElement('div', { className: 'image-item', dangerouslySetInnerHTML: { __html: element.Value } });
                }
                if (element.ContentTypeId == 4) {
                    return React.createElement('div', { className: 'image-link-item', dangerouslySetInnerHTML: { __html: element.Value } });
                }
                if (element.ContentTypeId == 5) {
                    return React.createElement('div', { className: 'text-item', dangerouslySetInnerHTML: { __html: element.Value } });
                }
                if (element.ContentTypeId == 6) {
                    return React.createElement('div', { className: 'botton-item', dangerouslySetInnerHTML: { __html: element.Value } });
                }
                if (element.ContentTypeId == 7) {
                    return React.createElement(YoutubeContainer, { data: element.Value });
                }
                if (element.ContentTypeId == 8) {
                    return React.createElement(GalleryContainer, { data: element.Resourceses });
                }
                if (element.ContentTypeId == 9) {
                    return React.createElement('div', { className: 'difficult-botton-item', dangerouslySetInnerHTML: { __html: element.Value } });
                }
            });
            return React.createElement('div', { className: 'vBox' }, elementModels);
        }
    });

    var CellContent = React.createClass({
        displayName: 'CellContent',

        componentDidMount: function componentDidMount() {
            var styleCell = this.props.data.Style;

            if (styleCell == undefined || styleCell == null) {
                styleCell = "";
            }
            var data = this.props.data;
            var value = data.Value;
            var formId;
            var fieldId;
            if (data.ContentTypeId == 12) {

                formId = this.props.data.FormId;
                var objectForm = applicationData.Forms;
                var styleLabel = this.props.data.Value.split("|")[0];
                var styleSubmit = this.props.data.Value.split("|")[1];
                $(ReactDOM.findDOMNode(this)).html("<form class='form-container' id='form-container'></form>");
                $(objectForm).each(function (i, element) {
                    if (element.Id == formId) {
                        renderForm(element);
                        $("#form-container").find(".formSubmit").attr("style", styleSubmit);
                        $("#form-container").find("label").attr("style", styleLabel);
                        $("#form-container").attr("id", "");
                        if (data.CountFormColumn == 2) {
                            $(".formBlock").addClass("formHalf");
                            $(".form-quantity-columns-select").val(2);
                        } else if (data.CountFormColumn == 3) {
                            $(".formBlock").addClass("formThird");
                            $(".form-quantity-columns-select").val(3);
                        }
                        if (data.LablePosition == "left") {
                            $(".label-container").addClass("label-form-left");
                            $(".form-item input, .form-item textarea").addClass("input-form");
                        } else if (data.LablePosition == "right") {
                            $(".label-container").addClass("label-form-right");
                            $(".form-item input, .form-item textarea").addClass("input-form");
                        } else if (data.LablePosition == "placeholder") {
                            addPlaceholder();
                        }
                        if (data.ButtonPosition == "left") {
                            $(".formSubmit").addClass("submit-form-left");
                        } else if (data.ButtonPosition == "right") {
                            $(".form-item").addClass("submit-form-right");
                            $(".form-item div").addClass("submit-form-right-text-left");
                        } else if (data.ButtonPosition == "allWidth") {
                            $(".formSubmit").addClass("submit-form-allWidth");
                        } else if (data.ButtonPosition == "center") {
                            $(".form-item").addClass("submit-form-center");
                            $(".form-item div").addClass("submit-form-right-text-left");
                        } else {
                            $(".formSubmit").addClass("submit-form-left");
                        }
                    }
                });
            }
            if (data.ContentTypeId == 15) {
                $(ReactDOM.findDOMNode(this)).attr("id", "custom-restaurant-menu-container");
                var restaurantMenu = applicationData.RestaurantMenus;
                var ThisRestaurantMenuBlock = this;
                var weekday = new Array(7);
          			weekday[0]=  "Sunday";
          			weekday[1] = "Monday";
          			weekday[2] = "Tuesday";
          			weekday[3] = "Wednesday";
          			weekday[4] = "Thursday";
          			weekday[5] = "Friday";
          			weekday[6] = "Saturday";
          			var dayNow = weekday[new Date().getDay()];


                $(restaurantMenu).each(function () {
                    if (this.Id == data.RestaurantMenuId) {
                      var thisRestaurantMenu = this;
                        if (this.IsOnline == false) {

                            if(this.UseDateTime == false){
                              renderRestaurantMenu(this, data.LablePosition, data.StateShopItemResponsiveModel, data.StateShopItemName, data.StateShopItemPrice, data.StateShopItemDescription, data.StateShopItemButton, data.StateShopItemImage);
                            }else{
                              $(thisRestaurantMenu.DateTimeRestaurantMenu).each(function(index, dataItem){
                                if(dataItem.IsChecked && dataItem.Day == dayNow && ThisRestaurantMenuBlock.checkRestarauntTime(dataItem.FromHour, dataItem.ToHour, ThisRestaurantMenuBlock.getClockTime())){
                                renderRestaurantMenu(thisRestaurantMenu, data.LablePosition, data.StateShopItemResponsiveModel, data.StateShopItemName, data.StateShopItemPrice, data.StateShopItemDescription, data.StateShopItemButton, data.StateShopItemImage);
                                }
                              });
                            }

                        } else {
                            var networkState = navigator.connection.type;
                            if (networkState == Connection.NONE) {
                                $("#custom-restaurant-menu-container").html("Sorry, is only available online!");
                            } else {
                              if(this.UseDateTime == false){
                                renderRestaurantMenu(this, data.LablePosition, data.StateShopItemResponsiveModel, data.StateShopItemName, data.StateShopItemPrice, data.StateShopItemDescription, data.StateShopItemButton, data.StateShopItemImage);
                              }else{
                                $(thisRestaurantMenu.DateTimeRestaurantMenu).each(function(index, dataItem){
                                  if(dataItem.IsChecked && dataItem.Day == dayNow && ThisRestaurantMenuBlock.checkRestarauntTime(dataItem.FromHour, dataItem.ToHour, ThisRestaurantMenuBlock.getClockTime())){
                                  renderRestaurantMenu(thisRestaurantMenu, data.LablePosition, data.StateShopItemResponsiveModel, data.StateShopItemName, data.StateShopItemPrice, data.StateShopItemDescription, data.StateShopItemButton, data.StateShopItemImage);
                                  }
                                });
                              }
                            }
                        }

                        $("#custom-restaurant-menu-container").attr("id", "");
                    }
                });
            }

            if (data.ContentTypeId == 13) {
                fieldId = this.props.data.FieldId;
                formId = this.props.data.FormId;
                var styleLabel = this.props.data.Value;
                var objectForm = applicationData.Forms;

                $(ReactDOM.findDOMNode(this)).attr("id", "custom-form-container");

                $(objectForm).each(function (i, element) {
                    if (element.Id == formId) {
                        $(element.FormFields).each(function (i, field) {
                            if (field.Id == fieldId) {
                                var formToRender = {};
                                formToRender.FormFields = [];
                                formToRender.FormFields.push(field);
                                formToRender.Id = element.Id;
                                formToRender.Name = element.Name;
                                renderCustomForm(formToRender);
                                $("#custom-form-container").find("label").attr("style", styleLabel);
                                $("#custom-form-container").attr("id", "");
                            }
                        });
                    }
                });
            }

            //$(React.findDOMNode(this)).attr("style", styleCell);
            $(ReactDOM.findDOMNode(this)).attr("style", styleCell);
        },
        checkRestarauntTime: 	function CheckRestarauntTime(FromHourModel, ToHourModel, NowHoursModel){
          var FromDataArray = FromHourModel.split("T")[1].split(":");
          var ToDataArray = ToHourModel.split("T")[1].split(":");
          var NowDataArray = NowHoursModel.split("T")[1].split(":");
            var FromHour = Number(FromDataArray[0]);
            var FromMinuts = Number(FromDataArray[1]);
            var FromSeconds = Number(FromDataArray[2]);

            var ToHour =  Number(ToDataArray[0]);
            var ToMinuts =  Number(ToDataArray[1]);
            var ToSeconds =  Number(ToDataArray[2]);

            var NowHour =  Number(NowDataArray[0]);
            var NowMinuts =  Number(NowDataArray[1]);
            var NowSeconds = Number(NowDataArray[2]);

            var timeCheker = false;
            if((FromHour <= NowHour) && (NowHour <= ToHour)) {

                timeCheker = true;
        }else{
          timeCheker = false;
        }
          if(!timeCheker){
            if( (FromMinuts <= NowMinuts) && (NowMinuts <= ToMinuts) ){
              timeCheker = true;
            }else{
            timeCheker = false;
            }
          }
          if(!timeCheker){
            if( (FromSeconds <= NowSeconds) && (NowSeconds <= ToSeconds)){
              timeCheker = true;
            }else{
            timeCheker = false;
            }
          }
          if(timeCheker){
            return true;
          }else{
            return false;
          }
        },
        getClockTime: function GetClockTime(){
           var now    = new Date();
           var hour   = now.getHours();
           var minute = now.getMinutes();
           var second = now.getSeconds();
           var ap = "12T";
           if (hour   > 11) { ap = "24T"; }
           if (hour   < 10) { hour   = "0" + hour;   }
           if (minute < 10) { minute = "0" + minute; }
           if (second < 10) { second = "0" + second; }
           var timeString = ap+hour + ':' + minute + ':' + second;
           return timeString;
    },
        render: function render() {
            var data = this.props.data;

            if (data.ContentTypeId == 3) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
            }
            if (data.ContentTypeId == 4) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
            }
            if (data.ContentTypeId == 5) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
            }
            if (data.ContentTypeId == 6) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
            }
            if (data.ContentTypeId == 2) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
            }
            if (data.ContentTypeId == 1) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
            }
            if (data.ContentTypeId == 8) {
                return React.createElement(
                    'div',
                    { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell },
                    React.createElement(GalleryContainer, { data: data.Resourceses })
                );
            }
            if (data.ContentTypeId == 9) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell, dangerouslySetInnerHTML: { __html: data.Value } });
            }
            if (data.ContentTypeId == 7) {
                return React.createElement(
                    'div',
                    { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell },
                    React.createElement(YoutubeContainer, { data: data.Value })
                );
            }

            //ContentTypeId - 10 start
            if (data.ContentTypeId == 10) {
                return React.createElement(
                    'div',
                    { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan },
                    React.createElement(Hbox, { data: data.Json })
                );
            }
            if (data.ContentTypeId == 11) {
                return React.createElement(
                    'div',
                    { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan },
                    React.createElement(Vbox, { data: data.Json })
                );
            }
            if (data.ContentTypeId == 12) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell, dangerouslySetInnerHTML: { __html: data.Value } });
            }
            if (data.ContentTypeId == 13) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell, dangerouslySetInnerHTML: { __html: data.Value } });
            }
            if (data.ContentTypeId == 14) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell, dangerouslySetInnerHTML: { __html: data.Value } });
            }
            if (data.ContentTypeId == 15) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell });
            }
        }
    });

    //ContentTypeId - 10 end

    ReactDOM.render(React.createElement(Rows, null), document.getElementById('container'));
}
