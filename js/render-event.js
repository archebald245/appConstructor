'use strict';
//RENDER EVENT LIST
var renderEvent = function renderEvent(events) {
    var SingleEvent = React.createClass({
        render: function render() {
            var data = this.props.data;
            var startTime = moment(data.DateStartString, 'DD/MM/YYYY hh:mm').format('hh:mm A');
            var image;
            var isFavorite = -1;

            var img1 = new Image();
            img1.src = data.ImagePath;

            if ($.jStorage.get('FavoriteEvents') != null) {
                isFavorite = $.jStorage.get('FavoriteEvents').indexOf(data.Id);
            }
            var imageTest;
            if (data.ImagePath != null) {

                var img1 = new Image();
                img1.src = data.ImagePath;

                imageTest = React.createElement('div', null,
                    React.createElement('img', { src: data.ImagePath }));
            } else {
                imageTest = null;
            }

            //var image = React.createElement('div', { className: 'event-image-container', style: { backgroundImage: 'url(' + data.ImagePath + ')' } });
            var image = React.createElement('div', { className: 'event-image-container' }, imageTest);
            return React.createElement(
                'div', { className: "event-data-container" },
                image,
                React.createElement(
                    'div', { className: 'event-data ' + data.FloorPlanUrl },
                    React.createElement(
                        'div', { className: 'event-name' },
                        data.Name
                    ),
                    React.createElement(
                        'div', { className: 'event-start-time' },
                        startTime
                    )
                ),
                React.createElement(
                    'div', { className: isFavorite > -1 ? 'event-favorite event-favorite-active' : 'event-favorite' },
                    ""
                ),
                React.createElement('input', { type: 'hidden', className: 'eventId', value: data.Id })
            );
        }
    });

    var DaySeparator = React.createClass({

        render: function render() {
            var day = this.props.data;
            return React.createElement('div', { className: 'event-day-container' }, day);
        }
    });

    var Events = React.createClass({
        componentDidMount: function componentDidMount() {
            addListenerToClickEvent();
        },
        render: function render() {
            var data = this.props.data;
            var dayOfWeek = moment(data[0].DateStartString, 'DD/MM/YYYY hh:mm').format('dddd');
            var eventCollectionForRender = data.map(function(event) {
                var eventDay = moment(event.DateStartString, 'DD/MM/YYYY hh:mm').format('dddd');
                if (dayOfWeek == "") {
                    dayOfWeek = eventDay;
                }
                if (dayOfWeek != eventDay) {
                    var day = React.createElement('div', { className: 'event-day-container' }, eventDay);
                    //eventCollectionForRender.push(day);
                    dayOfWeek = eventDay;
                }
                return (
                    React.createElement('div', { className: 'event-day-container' },
                        React.createElement(SingleEvent, { data: event }),
                        React.createElement(DaySeparator, { data: eventDay })
                    )
                );
            });
            return React.createElement(
                'div', { className: "custom-container-event" },
                React.createElement(
                    'div', { className: 'event-list-header' },
                    "Agenda"
                ),
                eventCollectionForRender
            );
        }
    });

    ReactDOM.render(React.createElement(Events, { data: events }), document.getElementById("event-container"));
};

//RENDER EVENT PROFILE
var RenderEventProfile = function RenderEventProfile(event) {
    var Event = React.createClass({
        componentDidMount: function componentDidMount() {
            $(".event-favorite").unbind("click").on("click", function() {
                var id = $(this).parent().siblings(".eventId").val();
                UpdateFavorite(this, id);
            });
            $(".back-to-event-list").on("click", function() {

                if ($("#favorite-events").hasClass("activePage")) {
                    $(".event-profile").addClass("hidden");
                    $(".event-favorite-wrapper").removeClass("hidden");
                } else {
                    $(".event-profile").addClass("hidden");
                    $("#container").removeClass("hidden");
                }
            });
        },
        render: function render() {
            var data = this.props.data;

            var startTime = moment(data.DateStartString, 'DD/MM/YYYY hh:mm').format('hh:mm A');
            var finishTime = moment(data.DateFinishString, 'DD/MM/YYYY hh:mm').format('hh:mm A');

            var startDate = moment(data.DateStartString, 'DD/MM/YYYY hh:mm').format('DD.MM.');
            var finishDate = moment(data.DateFinishString, 'DD/MM/YYYY hh:mm').format('DD.MM.');

            var date = startDate === finishDate ? startDate : startDate + ' - ' + finishDate;

            var image;
            if (data.ImagePath != null) {
                image = React.createElement('div', null,
                    React.createElement('img', { src: data.ImagePath }));
            } else {
                image = null;
            }

            var locationData;
            if (data.MapData != null) {
                locationData = React.createElement(
                    'div', { className: 'event-location' },
                    data.MapData
                );
            } else {
                locationData = null;
            }

            return React.createElement(
                'div', { className: "event-profile-container" },
                React.createElement(
                    'div', { className: 'back-to-event-list' },
                    React.createElement('img', { src: "baseimages/backtoevents.png" })
                ),
                React.createElement(
                    'div', { className: 'event-profile-header' },
                    data.Name
                ),
                React.createElement(
                    'div', { className: 'event-image-profile' },
                    image,
                    React.createElement(
                        'div', { className: 'event-favorite' },
                        ""
                    )
                ),
                React.createElement(
                    'div', { className: 'event-time-container' },
                    React.createElement(
                        'div', { className: 'event-start-time' },
                        startTime + " - " + finishTime
                    ),
                    React.createElement(
                        'div', { className: 'event-start-date' },
                        date
                    ),
                    locationData
                ),
                React.createElement(
                    'div', { className: 'event-description' },
                    data.Description
                ),
                React.createElement('input', { type: 'hidden', className: 'eventId', value: data.Id })
            );
        }
    });
    ReactDOM.render(React.createElement(Event, { data: event }), document.getElementById("event-profile-container"));
};

//RENDER FAVORITE EVENT
var renderFavorite = function renderFavorite(events) {
    var SingleEvent = React.createClass({
        componentDidMount: function componentDidMount() {
            addListenerToClickEvent();
        },
        render: function render() {
            var data = this.props.data;
            var startTime = moment(data.DateStartString, 'DD/MM/YYYY hh:mm').format('hh:mm A');
            var image;
            var isFavorite = -1;
            if ($.jStorage.get('FavoriteEvents') != null) {
                isFavorite = $.jStorage.get('FavoriteEvents').indexOf(data.Id);
            }
            var imageTest;
            if (data.ImagePath != null) {

                var img1 = new Image();
                img1.src = data.ImagePath;

                imageTest = React.createElement('div', null,
                    React.createElement('img', { src: data.ImagePath }));
            } else {
                imageTest = null;
            }

            var image = React.createElement('div', { className: 'event-image-container' }, imageTest);
            return React.createElement(
                'div', { className: "event-data-container" },
                image,
                React.createElement(
                    'div', { className: 'event-data ' + data.FloorPlanUrl },
                    React.createElement(
                        'div', { className: 'event-name' },
                        data.Name
                    ),
                    React.createElement(
                        'div', { className: 'event-start-time' },
                        startTime
                    )
                ),
                React.createElement(
                    'div', { className: isFavorite > -1 ? 'event-favorite event-favorite-active' : 'event-favorite' },
                    ""
                ),
                React.createElement('input', { type: 'hidden', className: 'eventId', value: data.Id })
            );
        }
    });

    var Events = React.createClass({
        render: function render() {

            var data = this.props.data;
            var eventCollectionForRender = data.map(function(event) {
                return React.createElement(SingleEvent, { data: event });
            });

            return React.createElement(
                'div', { className: "custom-container-event" },
                React.createElement(
                    'div', { className: 'event-list-header' },
                    "Schedule"
                ),
                eventCollectionForRender
            );
        }
    });

    ReactDOM.render(React.createElement(Events, { data: events }), document.getElementById("event-favorite-container"));
};