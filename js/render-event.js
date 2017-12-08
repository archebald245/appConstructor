'use strict';

var renderEvent = function renderEvent(events) {
    var SingleEvent = React.createClass({
        componentDidMount: function componentDidMount() {
            addListenerToClickBookService();
        },
        render: function render() {
            var data = this.props.data;
            var startTime = data.startTime;
            var image;
            if (data.ImagePath != null) {
                image = React.createElement('img', { src: data.ImagePath });
            } else {
                image = null;
            }
            return React.createElement(
                'div', { className: "event-data-container" },
                image,
                React.createElement(
                    'div', { className: 'event-data' },
                    React.createElement(
                        'div', { className: 'event-name' },
                        data.Name
                    ),
                    React.createElement(
                        'div', { className: 'event-start-time' },
                        startTime
                    ),
                    React.createElement(
                        'div', { className: 'event-favorite' },
                        ""
                    ),
                    React.createElement('input', { type: 'hidden', className: 'eventId', value: data.Id })
                ),
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
                'div', { className: "" },
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
                var id = $(this).siblings(".eventId").val();
                if ($(this).hasClass("event-favorite-active")) {
                    var favorites = $.jStorage.get('FavoriteEvents');
                    $(this).removeClass("event-favorite-active");
                } else {
                    $(this).addClass("event-favorite-active");
                }
            });
        },
        render: function render() {
            var data = this.props.data;
            var startTime = data.DateStartString;
            var finishTime = data.DateFinishString;
            var startDate = data.DateStartString;
            var finishDate = data.DateFinishString;

            var image;
            if (data.ImagePath != null) {
                image = React.createElement('img', { src: data.ImagePath });
            } else {
                image = null;
            }
            return React.createElement(

                'div', { className: "event-data-container" },
                React.createElement(
                    'div', { className: 'event-profile-header' },
                    data.Name
                ),
                image,
                React.createElement(
                    'div', { className: 'event-time-container' },
                    React.createElement(
                        'div', { className: 'event-start-time' },
                        startTime + " - " + finishTime
                    ),
                    React.createElement(
                        'div', { className: 'event-start-time' },
                        startDate + " - " + finishDate
                    ),
                    React.createElement(
                        'div', { className: 'event-favorite' },
                        data.MapData
                    )
                ),
                React.createElement(
                    'div', { className: 'event-name' },
                    data.Description
                ),
                React.createElement('input', { type: 'hidden', className: 'eventId', value: data.Id })
            );
        }
    });
    ReactDOM.render(React.createElement(Event, { data: event }), document.getElementById("event-profile-container"));
};