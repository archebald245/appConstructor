function reactRender() {
    "use strict";

var Rows = React.createClass({
	displayName: "Rows",

	getInitialState: function getInitialState() {
		return { data: [] };
	},
	componentDidMount: function componentDidMount() {
		// $.ajax({
		// 	url: "/Constructor/GetPage",
		// 	type: "POST",
		// 	cache: false,
		// 	data: {
		// 		id: $("#ProjectId").val(),
		// 		versionId: $("#versionId").val(),
		// 		pageId: $("#pageId").val()
		// 	},
		// 	success: function (json) {
		// 		this.setState({ data: json.Rows });
		// 	}.bind(this),
		// 	error: function (xhr, status, err) {
		// 		console.error(status, err.toString());
		// 	}.bind(this)
		// });
        this.setState({data: data.Pages[indexPage].Rows})
        console.log(data.Pages[0].Rows)
	},
	render: function render() {
		var rowModels = this.state.data.map(function (row) {
			return React.createElement(CellContainer, { data: row, key: row.Id });
		});
		return React.createElement(
			"div",
			{ className: "container-fluid" },
			rowModels
		);
	}
});

var CellContainer = React.createClass({
	displayName: "CellContainer",

	render: function render() {
		var cellModels = this.props.data.CellContents.map(function (cell) {
			cell.Value = cell.Value.replace(/&lt;/g, '<');
			cell.Value = cell.Value.replace(/&gt;/g, '>');
			return React.createElement(CellContent, { data: cell, key: cell.Id });
		});
		return React.createElement(
			"div",
			{ className: "row" },
			cellModels
		);
	}
});

var CellContent = React.createClass({
	displayName: "CellContent",


	render: function render() {
		var data = this.props.data;

		if (data.ContentTypeId == 3) {
			return React.createElement("div", { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
		}
		if (data.ContentTypeId == 4) {
			return React.createElement("div", { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
		}
		if (data.ContentTypeId == 5) {
			return React.createElement("div", { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
		}
		if (data.ContentTypeId == 6) {
			return React.createElement("div", { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
		}
		if (data.ContentTypeId == 2) {
			return React.createElement("div", { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
		}
		if (data.ContentTypeId == 1) {
			return React.createElement("div", { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
		}
	}
});

ReactDOM.render(React.createElement(Rows, null), document.getElementById('container'));
}

(function() {
  reactRender();
})();