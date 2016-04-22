'use strict';

function reactRender() {
	var Rows = React.createClass({
		displayName: 'Rows',

		getInitialState: function getInitialState() {
			return { data: [] };
		},
		componentDidMount: function componentDidMount() {
			/*$.ajax({
   	url: "/Constructor/GetPage",
   	type: "POST",
   	cache: false,
   	data: {
   		id: $("#ProjectId").val(),
   		versionId: $("#versionId").val(),
   		pageId: $("#pageId").val()
   	},
   	success: function(json) {
   		this.setState({data: json.Rows});
   	}.bind(this),
   	error: function(xhr, status, err) {
   		console.error(status, err.toString());
   	}.bind(this)
   });*/
			this.setState({ data: applicationData.Pages[indexPage].Rows });
			setTimeout('initPhotoSwipeFromDOM(".my-gallery")', 1000);
			setTimeout('cutImageOfYoutubeContainer()', 1000);
		},
		render: function render() {
			var rowModels = this.state.data.map(function (row) {
				return React.createElement(CellContainer, { data: row, key: row.Id });
			});
			return React.createElement(
				'div',
				{ className: 'container-fluid' },
				rowModels
			);
		}
	});

	var CellContainer = React.createClass({
		displayName: 'CellContainer',

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
			return React.createElement(
				'div',
				{ className: 'my-gallery' },
				this.createItems(this.props.data)
			);
		},
		createItems: function createItems(items) {
			var output = [];
			for (var i = 0; i < items.length; i++) {
				if (i == 0) {
					output.push(React.createElement(
						'figure',
						{ key: items[i].Id },
						React.createElement(
							'a',
							{ href: items[i].Link, itemProp: 'contentUrl', 'data-size': '964x1024' },
							React.createElement('img', { src: items[i].Link, alt: 'Image description', className: 'gallery-image' })
						)
					));
				} else {
					output.push(React.createElement(
						'figure',
						{ className: 'hidden', key: items[i].Id },
						React.createElement(
							'a',
							{ href: items[i].Link, itemProp: 'contentUrl', 'data-size': '964x1024' },
							React.createElement('img', { src: items[i].Link, alt: 'Image description', className: 'gallery-image' })
						)
					));
				}
			}
			return output;
		}
	});

	var CellContent = React.createClass({
		displayName: 'CellContent',


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
			if (data.ContentTypeId == 7) {
				return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell, dangerouslySetInnerHTML: { __html: data.Value } });
			}
			if (data.ContentTypeId == 9) {
				return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell, dangerouslySetInnerHTML: { __html: data.Value } });
			}
		}
	});

	ReactDOM.render(React.createElement(Rows, null), document.getElementById('container'));
}