"use strict";

function renderRestaurantMenu(menuCollection, position) {

	var RestaurantMenuBlock = React.createClass({
		displayName: "RestaurantMenuBlock",

		getInitialState: function getInitialState() {
			return { data: menuCollection };
		},
		componentDidMount: function componentDidMount() {
		cartShopPrice();
		},
		render: function render() {
			var RestaurantMenuItemModels = this.state.data.RestaurantMenuItems.map(function (item) {
                 var image;
                 if(item.RestaurantMenuImages.length == 0){
                        image = "file:///android_asset/www/baseimages/cartItem.png";
                    }else{
                        image = item.RestaurantMenuImages[0].Path;
                    }

				if (position == 1) {

					return React.createElement(
						"div",
						{ className: "shopItem-row shopItem" },
						React.createElement(
							"div",
							{ className: "img-column-shopItem" },
							React.createElement("img", { src: image, className: "item-shop-img" })
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
								"p",
								null,
								item.Description
							),
							" ",
							React.createElement(
					      "button",
					      { type: "button", className: "btn-restaurant-menu" },
					      "Add"
					    ),
					    React.createElement(
					      "div",
					      { className: "cartShop-price" },
					      item.Price
					    ),
					    React.createElement(
					      "p",
					      { className: "item-shop-categoty" },
					      item.Category
					    ),
							React.createElement(
								"input",
								{ type: "hidden", name: "shopItemId", value: item.Id }
							)
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
							React.createElement("img", { src: image, className: "item-shop-img" })
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
							React.createElement("img", { src: image })
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
				React.createElement("input", { type: "hidden", name: "restaurantMenuId", value:  this.state.data.Id }),
				React.createElement("input", { type: "hidden", name: "restaurantMenuPosition", value:  position }),
                RestaurantMenuItemModels

			);
		}
	});

	ReactDOM.render(React.createElement(RestaurantMenuBlock, { data: menuCollection }), document.getElementById("custom-restaurant-menu-container"));
}
