"use strict";

function renderBookingCartItem(cartItem) {
    var bookCartShopItem = React.createClass({
        displayName: "cartShopItem",

        getInitialState: function getInitialState() {
            return { data: cartItem };
        },
        componentDidMount: function componentDidMount() {
            addListenerToClickBookService();
        },
        render: function render() {
            var data = this.state.data;
            return React.createElement(
                "div", { className: "bookingCartItem" },
                React.createElement(
                    "div", { className: "cartItem-data" },
                    React.createElement(
                        "div", { className: "cartItem-name" },
                        data.Name
                    ),
                    React.createElement(
                        "div", { className: "cartItem-name" },
                        data.Name
                    ),
                    React.createElement(
                        "div", { className: "cartItem-duration" },
                        data.Duration
                    ),
                    React.createElement(
                        "div", { className: "cartItem-duration" },
                        data.Price + " " + data.Currency
                    )
                ),
                React.createElement(
                    "div", { className: "cartItem-delete" },
                    "delete"
                ),
                React.createElement('input', { type: 'hidden', className: 'cart-service-itemId', value: data.Id })
            );
        }
    });
    ReactDOM.render(React.createElement(bookCartShopItem, { data: cartItem }), document.getElementById("bookShopItem"));
}