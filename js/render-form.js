"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function renderForm(form, id) {
    var idRadioBtn;
    var isDropdownName;
    var fieldData = $.jStorage.get('fieldData')||[];
    var isLogin = $.jStorage.get('isLogin');
    var token = $.jStorage.get('notificationToken');
    var deviceId = $.jStorage.get('ApplicationId');
    var FormBlock = React.createClass({
        displayName: cultureRes.formBlock,

        getInitialState: function getInitialState() {
            return { data: form };
        },
        render: function render() {
            var fieldModels = this.state.data.FormFields.map(function(field) {
                if (field.FieldTypeId == 1) {
                    if (field.Required) {
                        return React.createElement(
                            "div", { className: "checkBoxFormBlock formBlock form-group required-check" },
                            " ",
                            React.createElement(
                                "div", { className: "label-container" },
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
                            "div", { className: "checkBoxFormBlock formBlock form-group" },
                            " ",
                            React.createElement(
                                "div", { className: "label-container" },
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
                        "div", { className: "radioButtonFormBlock formBlock form-group" },
                        " ",
                        React.createElement(
                            "div", { className: "label-container" },
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
                        "div", { className: "dropDownBlock formBlock form-group" },
                        " ",
                        React.createElement(
                            "div", { className: "label-container" },
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
                    var fieldEl = React.createElement("input", { className: "form-control", name: field.Name, type: "text", id: field.Id })
                        if(field.Remember){
                        var fieldValue= "";
                        fieldData.forEach(function(e){
                            if(+e.id === field.Id && e.userId=== isLogin){
                                fieldValue = e.data;
                            }
                        });
                            if(field.Required){
                                fieldEl = React.createElement("input", { defaultValue:fieldValue, className: "remember required form-control", name: field.Name, type: "text", id: field.Id })
                            }
                            fieldEl = React.createElement("input", { defaultValue:fieldValue, className: "remember form-control", name: field.Name, type: "text", id: field.Id })
                        }else if(field.Required){
                            fieldEl = React.createElement("input", { className: "required form-control", name: field.Name, type: "text", id: field.Id })
                        }

                        return React.createElement(
                            "div", { className: "textElement formBlock form-group" },
                            React.createElement(
                                "div", { className: "label-container" },
                                React.createElement(
                                    "label",
                                    null,
                                    field.Label
                                )
                            ),
                            fieldEl
                        );
                }
                if (field.FieldTypeId == 5) {
                    var fieldEl =  React.createElement("textarea", { className: "form-control", name: field.Name, id: field.Id })
                        if(field.Remember){
                            var fieldValue= "";
                            fieldData.forEach(function(e){
                                if(+e.id === field.Id && e.userId=== isLogin){
                                    fieldValue = e.data;
                                }
                            });
                            if(field.Required){
                                fieldEl =  React.createElement("textarea", { defaultValue:fieldValue, className: "remember required form-control", name: field.Name, id: field.Id })
                            }
                            fieldEl =  React.createElement("textarea", { defaultValue:fieldValue, className: "remember form-control", name: field.Name, id: field.Id })
                        }else if(field.Required){
                            fieldEl =  React.createElement("textarea", { className: "required form-control", name: field.Name, id: field.Id })
                        }
                        return React.createElement(
                            "div", { className: "textAreaElement formBlock form-group" },
                            " ",
                            React.createElement(
                                "div", { className: "label-container" },
                                React.createElement(
                                    "label",
                                    null,
                                    field.Label
                                )
                            ),
                            fieldEl
                        );
                    
                }
                if (field.FieldTypeId == 6) {
                    var fieldEl =   React.createElement("input", { type: "text", name: field.Name, className: "email form-control", id: field.Id })
                    if(field.Remember){
                        var fieldValue= "";
                        fieldData.forEach(function(e){
                            if(+e.id === field.Id && e.userId=== isLogin){
                                fieldValue = e.data;
                            }
                        });
                        if(field.Required){
                            fieldEl =   React.createElement("input", { defaultValue:fieldValue, type: "text", name: field.Name, className: "email remember required form-control", id: field.Id })
                        }
                        fieldEl =  React.createElement("input", { defaultValue:fieldValue, type: "text", name: field.Name, className: "email remember required form-control", id: field.Id })
                    }else if(field.Required){
                        fieldEl =   React.createElement("input", { type: "text", name: field.Name, className: "email required form-control", id: field.Id })
                    }
                        return React.createElement(
                            "div", { className: "emailElement formBlock form-group" },
                            " ",
                            React.createElement(
                                "div", { className: "label-container" },
                                React.createElement(
                                    "label",
                                    null,
                                    field.Label
                                )
                            ),
                            fieldEl
                        );
                }
                if (field.FieldTypeId == 7) {
                    var fieldEl = React.createElement("input", { type: "text", name: field.Name, className: "phoneNumber form-control", placeholder: cultureRes.telPlaceholder, id: field.Id })
                    if(field.Remember){
                        var fieldValue= "";
                        fieldData.forEach(function(e){
                            if(+e.id === field.Id && e.userId=== isLogin){
                                fieldValue = e.data;
                            }
                        });
                        if(field.Required){
                            fieldEl = React.createElement("input", { defaultValue:fieldValue, type: "text", name: field.Name, className: "phoneNumber remember required form-control", placeholder: cultureRes.telPlaceholder, id: field.Id })
                        }
                        fieldEl = React.createElement("input", { defaultValue:fieldValue, type: "text", name: field.Name, className: "phoneNumber remember form-control", placeholder: cultureRes.telPlaceholder, id: field.Id })
                    }else if(field.Required){
                        fieldEl = React.createElement("input", { type: "text", name: field.Name, className: "phoneNumber required form-control", placeholder: cultureRes.telPlaceholder, id: field.Id })
                    }
                        return React.createElement(
                            "div", { className: "phoneNumberElement formBlock form-group" },
                            " ",
                            React.createElement(
                                "div", { className: "label-container" },
                                React.createElement(
                                    "label",
                                    null,
                                    field.Label
                                )
                            ),
                            fieldEl
                        );
                    
                }
                if (field.FieldTypeId == 8) {
                    var fieldEl = React.createElement("input", { type: "text", name: field.Name, className: "form-control", id: field.Id });
                    if(field.Remember){
                        var fieldValue= "";
                        fieldData.forEach(function(e){
                            if(+e.id === field.Id && e.userId=== isLogin){
                                fieldValue = e.data;
                            }
                        });
                        fieldEl = React.createElement("input", { defaultValue:fieldValue, type: "text", name: field.Name, className: "remember form-control", id: field.Id });
                        if(field.Required){
                            fieldEl = React.createElement("input", { defaultValue:fieldValue, type: "text", name: field.Name, className: "required remember form-control", id: field.Id });
                        }
                    }else if(field.Required){
                        fieldEl = React.createElement("input", { type: "text", name: field.Name, className: "required remember form-control", id: field.Id });
                    }
                        return React.createElement(
                            "div", { className: "numberElement formBlock form-group" },
                            " ",
                            React.createElement(
                                "div", { className: "label-container" },
                                React.createElement(
                                    "label",
                                    null,
                                    field.Label
                                )
                            ),
                            fieldEl
                        );
                }
                if (field.FieldTypeId == 9) {
                    return React.createElement(
                        "div", { className: "switcherFormBlock formBlock form-group" },
                        React.createElement(
                            "label", { className: "switcher-inline" },
                            React.createElement("input", { id: field.Id, className: "SwitcherFormElement switcher-inline", name: field.Name, type: "checkbox", value: true }),
                            React.createElement(
                                "div",
                                null,
                                React.createElement("div", null)
                            ),
                            React.createElement(
                                "label", { htmlFor: field.Id, className: "switcher-label-inline" },
                                field.Name
                            )
                        ),
                        " "
                    );
                }
                if (field.FieldTypeId == 10) {
                    if (field.Required) {
                        return React.createElement(
                            "div", { className: "checkBoxFormBlock formBlock form-group required-check" },
                            " ",
                            React.createElement(
                                "label", { className: "CheckBoxFormElement checkbox-inline" },
                                React.createElement("input", { name: field.Label, type: "checkbox", value: true }),
                                " ",
                                field.Label
                            )
                        );
                    } else {
                        return React.createElement(
                            "div", { className: "checkBoxFormBlock formBlock form-group" },
                            " ",
                            React.createElement(
                                "label", { className: "CheckBoxFormElement checkbox-inline" },
                                React.createElement("input", { name: field.Label, type: "checkbox", value: true }),
                                " ",
                                field.Label
                            )
                        );
                    }
                }
                if (field.FieldTypeId == 11) {
                    if (field.Required) {
                        return React.createElement(
                            "div", { className: "passwordElement formBlock form-group" },
                            " ",
                            React.createElement(
                                "div", { className: "label-container" },
                                React.createElement(
                                    "label",
                                    null,
                                    field.Label
                                )
                            ),
                            React.createElement("input", { type: "password", name: field.Name, className: "passElement required form-control", id: field.Id })
                        );
                    } else {
                        return React.createElement(
                            "div", { className: "passwordElement formBlock form-group" },
                            " ",
                            React.createElement(
                                "div", { className: "label-container" },
                                React.createElement(
                                    "label",
                                    null,
                                    field.Label
                                )
                            ),
                            React.createElement("input", { className: "passElement form-control", name: field.Name, type: "password", id: field.Id })
                        );
                    }
                }
            });

            if (isLogin != null && this.state.data.LoginForm == true) {
                return React.createElement(
                    "div", { className: "form-item form-vertical" },
                    React.createElement("div", { className: "formId hidden", id: this.state.data.Id }),
                    React.createElement("input", { className: "loginForm form-control", name: "LoginForm", type: "hidden", value: this.state.data.LoginForm }),
                    React.createElement("input", { className: "registrationForm form-control", name: "RegistrationForm", type: "hidden", value: this.state.data.RegistrationForm }),
                    React.createElement("input", { className: "form-control", name: "NotificationToken", type: "hidden", value: token }),
                    React.createElement("input", { className: "form-control", name: "DeviceId", type: "hidden", value: deviceId }),
                    React.createElement("input", { className: "form-control", name: "UserId", type: "hidden", value: isLogin }),
                    fieldModels,
                    React.createElement(
                        "button", { type: "button", className: "formLogout btn btn-defoult" },
                        cultureRes.logout
                    )
                );
            } else {
                return React.createElement(
                    "div", { className: "form-item form-vertical" },
                    React.createElement("div", { className: "formId hidden", id: this.state.data.Id }),
                    React.createElement("input", { className: "loginForm form-control", name: "LoginForm", type: "hidden", value: this.state.data.LoginForm }),
                    React.createElement("input", { className: "registrationForm form-control", name: "RegistrationForm", type: "hidden", value: this.state.data.RegistrationForm }),
                    React.createElement("input", { className: "form-control", name: "NotificationToken", type: "hidden", value: token }),
                    React.createElement("input", { className: "form-control", name: "DeviceId", type: "hidden", value: deviceId }),
                    React.createElement("input", { className: "form-control", name: "UserId", type: "hidden", value: isLogin }),
                    fieldModels,
                    React.createElement(
                        "button", { type: "button", className: "formSubmit btn btn-defoult" },
                        cultureRes.submit
                    )
                );
            }
        }
    });
    var DropDownModels = React.createClass({
        displayName: cultureRes.dropDown,

        render: function render() {
            var DropDownOptionModels = this.props.data.FieldOptions.map(function(option) {
                return React.createElement(
                    "option", { value: option.Value },
                    option.Name
                );
            });
            return React.createElement(
                "select", { name: isDropdownName, className: "DropDownElement form-control" },
                DropDownOptionModels
            );
        }
    });
    var CheckBoxModels = React.createClass({
        displayName: cultureRes.checkBox,

        render: function render() {
            var CheckBoxOptionModels = this.props.data.FieldOptions.map(function(option) {
                return React.createElement(
                    "label", { className: "CheckBoxFormElement checkbox-inline" },
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
        displayName: cultureRes.RadioButton,
        componentDidMount: function() {
            this.getDOMNode().querySelector('[type="radio"]:first-child').checked = "checked";

        },
        render: function render() {
            var iterator = 0;
            var RadioButtonOptionModels = this.props.data.FieldOptions.map(function(option) {
                iterator = iterator + 1;
                if (iterator == 1) {
                    return React.createElement(
                        "label", { className: "radioButtonFormElement radio-inline" },
                        React.createElement("input", { type: "radio", value: option.Value, name: idRadioBtn }),
                        " ",
                        option.Name
                    );
                } else {
                    return React.createElement(
                        "label", { className: "radioButtonFormElement radio-inline" },
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

    ReactDOM.render(React.createElement(FormBlock, { data: form.FormFields }), document.getElementById("form-container"));
}