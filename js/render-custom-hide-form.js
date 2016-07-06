"use strict";

function renderHideCustomForm(form, id) {
	var idRadioBtn;
	var isDropdownName;
	var FormBlock = React.createClass({
		displayName: "FormBlock",

		getInitialState: function getInitialState() {
			return { data: form, projectId: applicationData.ProjectId };
		},
		render: function render() {
			var fieldModels = this.state.data.FormFields.map(function (field) {
				if (field.FieldTypeId == 1) {
					if (field.Required) {
						return React.createElement(
							"div",
							{ className: "checkBoxFormBlock formBlock form-group required-check" },
							" ",
							React.createElement(
								"div",
								{ className: "label-container" },
								React.createElement(
									"label",
									null,
									field.Label
								)
							),
							React.createElement(CheckBoxModels, { data: field })
						);
					} else {
						return React.createElement(
							"div",
							{ className: "checkBoxFormBlock formBlock form-group" },
							" ",
							React.createElement(
								"div",
								{ className: "label-container" },
								React.createElement(
									"label",
									null,
									field.Label
								)
							),
							React.createElement(CheckBoxModels, { data: field })
						);
					}
				}
				if (field.FieldTypeId == 2) {
					idRadioBtn = field.Name;
					return React.createElement(
						"div",
						{ className: "radioButtonFormBlock formBlock form-group" },
						" ",
						React.createElement(
							"div",
							{ className: "label-container" },
							React.createElement(
								"label",
								null,
								field.Label
							)
						),
						React.createElement(RadioButtonModels, { data: field })
					);
				}
				if (field.FieldTypeId == 3) {
					isDropdownName = field.Name;
					return React.createElement(
						"div",
						{ className: "dropDownBlock formBlock form-group" },
						" ",
						React.createElement(
							"div",
							{ className: "label-container" },
							React.createElement(
								"label",
								null,
								field.Label
							)
						),
						React.createElement(DropDownModels, { data: field })
					);
				}
				if (field.FieldTypeId == 4) {
					if (field.Required) {
						var _React$createElement;

						return React.createElement(
							"div",
							{ className: "textElement formBlock form-group" },
							React.createElement(
								"div",
								{ className: "label-container" },
								React.createElement(
									"label",
									null,
									field.Label
								)
							),
							React.createElement("input", (_React$createElement = { className: "form-control", name: field.Name, type: "text" }, _defineProperty(_React$createElement, "className", "required  form-control"), _defineProperty(_React$createElement, "id", field.Id), _React$createElement))
						);
					} else {
						return React.createElement(
							"div",
							{ className: "textElement formBlock form-group" },
							React.createElement(
								"div",
								{ className: "label-container" },
								React.createElement(
									"label",
									null,
									field.Label
								)
							),
							React.createElement("input", { className: "form-control", name: field.Name, type: "text", id: field.Id })
						);
					}
				}
				if (field.FieldTypeId == 5) {
					if (field.Required) {
						return React.createElement(
							"div",
							{ className: "textAreaElement formBlock form-group" },
							" ",
							React.createElement(
								"div",
								{ className: "label-container" },
								React.createElement(
									"label",
									null,
									field.Label
								)
							),
							React.createElement("textarea", { className: "required form-control", name: field.Name, id: field.Id })
						);
					} else {
						return React.createElement(
							"div",
							{ className: "textAreaElement formBlock form-group" },
							" ",
							React.createElement(
								"div",
								{ className: "label-container" },
								React.createElement(
									"label",
									null,
									field.Label
								)
							),
							React.createElement("textarea", { className: "form-control", name: field.Name, id: field.Id }),
							" "
						);
					}
				}
				if (field.FieldTypeId == 6) {
					if (field.Required) {
						return React.createElement(
							"div",
							{ className: "emailElement formBlock form-group" },
							" ",
							React.createElement(
								"div",
								{ className: "label-container" },
								React.createElement(
									"label",
									null,
									field.Label
								)
							),
							React.createElement("input", { type: "text", name: field.Name, className: "email required form-control", id: field.Id })
						);
					} else {
						return React.createElement(
							"div",
							{ className: "emailElement formBlock form-group" },
							" ",
							React.createElement(
								"div",
								{ className: "label-container" },
								React.createElement(
									"label",
									null,
									field.Label
								)
							),
							React.createElement("input", { type: "text", name: field.Name, className: "email form-control", id: field.Id })
						);
					}
				}
				if (field.FieldTypeId == 7) {
					if (field.Required) {
						return React.createElement(
							"div",
							{ className: "phoneNumberElement formBlock form-group" },
							" ",
							React.createElement(
								"div",
								{ className: "label-container" },
								React.createElement(
									"label",
									null,
									field.Label
								)
							),
							React.createElement("input", { type: "text", name: field.Name, className: "phoneNumber required form-control", placeholder: "Format: +XXXXXXXXXXX", id: field.Id })
						);
					} else {
						return React.createElement(
							"div",
							{ className: "phoneNumberElement formBlock form-group" },
							" ",
							React.createElement(
								"div",
								{ className: "label-container" },
								React.createElement(
									"label",
									null,
									field.Label
								)
							),
							React.createElement("input", { type: "text", name: field.Name, className: "phoneNumber form-control", placeholder: "Format: +XXXXXXXXXXX", id: field.Id })
						);
					}
				}
				if (field.FieldTypeId == 8) {
					if (field.Required) {
						return React.createElement(
							"div",
							{ className: "numberElement formBlock form-group" },
							" ",
							React.createElement(
								"div",
								{ className: "label-container" },
								React.createElement(
									"label",
									null,
									field.Label
								)
							),
							React.createElement("input", { type: "number", name: field.Name, className: "required form-control", id: field.Id })
						);
					} else {
						return React.createElement(
							"div",
							{ className: "numberElement formBlock form-group" },
							" ",
							React.createElement(
								"div",
								{ className: "label-container" },
								React.createElement(
									"label",
									null,
									field.Label
								)
							),
							React.createElement("input", { className: "form-control", name: field.Name, type: "number", id: field.Id })
						);
					}
				}
			});

			return React.createElement(
				"div",
				{ className: "form-item form-vertical" },
               
				React.createElement("input", {type: "hidden",name: "projectId", value: this.state.projectId }),
                React.createElement("input", {type: "hidden",name: "formId", value: this.state.data.Id }),
				fieldModels,
				React.createElement(
					"button",
					{ type: "button", className: "formSubmit btn btn-defoult" },
					"Submit"
				)
			);
		}
	});
	var DropDownModels = React.createClass({
		displayName: "DropDownModels",

		render: function render() {
			var DropDownOptionModels = this.props.data.FieldOptions.map(function (option) {
				return React.createElement(
					"option",
					{ value: option.Value },
					option.Name
				);
			});
			return React.createElement(
				"select",
				{ name: isDropdownName, className: "DropDownElement form-control" },
				DropDownOptionModels
			);
		}
	});
	var CheckBoxModels = React.createClass({
		displayName: "CheckBoxModels",

		render: function render() {
			var CheckBoxOptionModels = this.props.data.FieldOptions.map(function (option) {
				return React.createElement(
					"label",
					{ className: "CheckBoxFormElement checkbox-inline" },
					React.createElement("input", { name: option.Name, type: "checkbox", value: option.Value }),
					" ",
					option.Name
				);
			});

			return React.createElement(
				"div",
				null,
				CheckBoxOptionModels
			);
		}
	});
	var RadioButtonModels = React.createClass({
		displayName: "RadioButtonModels",

		render: function render() {
			var iterator = 0;
			var RadioButtonOptionModels = this.props.data.FieldOptions.map(function (option) {
				iterator = iterator + 1;
				if (iterator == 1) {
					return React.createElement(
						"label",
						{ className: "radioButtonFormElement radio-inline" },
						React.createElement("input", { type: "radio", value: option.Value, name: idRadioBtn, checked: true }),
						" ",
						option.Name
					);
				} else {
					return React.createElement(
						"label",
						{ className: "radioButtonFormElement radio-inline" },
						React.createElement("input", { type: "radio", value: option.Value, name: idRadioBtn }),
						" ",
						option.Name
					);
				}
			});

			return React.createElement(
				"div",
				null,
				RadioButtonOptionModels
			);
		}
	});

	ReactDOM.render(React.createElement(FormBlock, { data: form.FormFields }), document.getElementById("custom-form-hide-container"));
}