"use strict";

function renderRestaurantMenu(menuCollection, position) {

	var RestaurantMenuBlock = React.createClass({
		displayName: "RestaurantMenuBlock",

		getInitialState: function getInitialState() {
			return { data: menuCollection };
		},
		render: function render() {
			var RestaurantMenuItemModels = this.state.data.RestaurantMenuItems.map(function (item) {
				if (position == 1) {

					return React.createElement(
						"div",
						{ className: "shopItem-row shopItem" },
						React.createElement(
							"div",
							{ className: "img-column-shopItem" },
							React.createElement("img", { src: item.RestaurantMenuImages[0].Path, className: "item-shop-img" })
						),
						React.createElement(
							"div",
							{ className: "content-column-shopItem" },
							React.createElement(
								"h4",
								{ className: "item-shop-title" },
								item.ProdName
							),
							React.createElement(
								"b",
								null,
								item.Price
							),
							React.createElement(
								"p",
								null,
								item.Description
							),
							" ",
							React.createElement(
								"button",
								{ type: "button", className: "btn btn-restaurant-menu btn-success" },
								"Add to cart"
							),
							React.createElement(
								"p",
								{ className: "item-shop-categoty" },
								item.Category
							),
							React.createElement("input", { type: "hidden", name: "shopItemId", value: "shopItemId_" + item.Id }),
							React.createElement("input", { type: "hidden", name: "shopItemCount"}),
							React.createElement("b", {  className: "shopItemCountVisible"})
						),
						" "
					);
				} else if (position == 2) {

					return React.createElement(
						"div",
						null,
						React.createElement(
							"div",
							{ className: "content-column-shopItem shopItem" },
							React.createElement(
								"h4",
								{ className: "item-shop-title" },
								item.ProdName
							),
							React.createElement(
								"b",
								null,
								item.Price
							),
							React.createElement(
								"p",
								null,
								item.Description
							),
							" ",
							React.createElement(
								"button",
								{ type: "button", className: "btn btn-restaurant-menu btn-success" },
								"Add to cart"
							),
							React.createElement(
								"p",
								{ className: "item-shop-categoty" },
								item.Category
							)
						),
						React.createElement(
							"div",
							{ className: "img-column-shopItem" },
							React.createElement("img", { src: item.RestaurantMenuImages[0].Path, className: "item-shop-img" })
						),
						" "
					);
				} else if (position == 3) {
					return React.createElement(
						"div",
						null,
						React.createElement(
							"div",
							{ className: "center-img-shopItem shopItem" },
							" ",
							React.createElement("img", { src: item.RestaurantMenuImages[0].Path })
						),
						React.createElement(
							"h4",
							{ className: "item-shop-title" },
							item.ProdName
						),
						React.createElement(
							"b",
							null,
							item.Price
						),
						React.createElement(
							"p",
							{ className: "item-shop-categoty" },
							item.Category
						),
						React.createElement(
							"p",
							null,
							item.Description
						),
						" ",
						React.createElement(
							"button",
							{ type: "button", className: "btn btn-success btn-block btn-restaurant-menu" },
							"Add to cart"
						)
					);
				}
			});

			return React.createElement(
				"div",
				{ className: "custom-restaurant-menu-item" },
				React.createElement(
					"label",
					null,
					" ",
					this.state.data.Name,
					" "
				),
				React.createElement("input", { type: "hidden", name: "restaurantMenuId", value: "restaurantMenuId_" + this.state.data.Id }),
				React.createElement("input", { type: "hidden", name: "restaurantMenuPosition", value: "restaurantMenuPosition_" + position }),
                RestaurantMenuItemModels

			);
		}
	});

	ReactDOM.render(React.createElement(RestaurantMenuBlock, { data: menuCollection }), document.getElementById("custom-restaurant-menu-container"));
}
