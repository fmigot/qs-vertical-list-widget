'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VerticalListWidget = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// ====== Util Libs ========================================================= //

// ====== Material UI ======================================================= //

// ====== Utils ============================================================= //

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

var _fastDeepEqual = require('fast-deep-equal');

var _fastDeepEqual2 = _interopRequireDefault(_fastDeepEqual);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _momentJdateformatparser = require('moment-jdateformatparser');

var _momentJdateformatparser2 = _interopRequireDefault(_momentJdateformatparser);

var _List = require('material-ui/List');

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Tabs = require('material-ui/Tabs');

var _person = require('material-ui/svg-icons/social/person');

var _person2 = _interopRequireDefault(_person);

var _people = require('material-ui/svg-icons/social/people');

var _people2 = _interopRequireDefault(_people);

var _importContacts = require('material-ui/svg-icons/communication/import-contacts');

var _importContacts2 = _interopRequireDefault(_importContacts);

var _folder = require('material-ui/svg-icons/file/folder');

var _folder2 = _interopRequireDefault(_folder);

var _work = require('material-ui/svg-icons/action/work');

var _work2 = _interopRequireDefault(_work);

var _GridList = require('material-ui/GridList');

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _moduleUtils = require('module-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ====== Component ======================================================== //

var rows = [];
var subRows = [];

function extractAndBuildList(tab, qsColors, wording) {

    if (!tab.rows || tab.rows && tab.rows.length === 0) {
        rows.push(_react2.default.createElement(EmptyTab, { key: 'empty-if-no-rows', text: wording.emptyTab }));
        return rows;
    }

    var dividerStyle = { padding: '15px 0 0' };

    tab.rows.forEach(function (row, index) {
        row.forEach(function (subRow, rowIndex) {
            var columns = subRow.length > 1 ? 2 : 1;
            var padding = subRow.length > 1 ? 1 : 0;

            for (var k = 0; k < subRow.length; k++) {

                // /!\ Primary and secondary text should be strings. If not, it'll break the whole page!

                var item = subRow[k];
                var listItemStyle = {
                    margin: '15px 10px 0px 0px',
                    padding: '0px',
                    wordWrap: 'break-word'
                };
                var primaryTextStyle = {
                    fontSize: 12,
                    color: qsColors.qsGrey14
                };
                var secondaryTextStyle = {
                    fontSize: 13,
                    lineHeight: '15px',
                    height: '15px',
                    margin: '4px 0px 0px',
                    color: qsColors.qsBlack2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                };

                if (typeof item.label != 'string') {
                    continue;
                }

                var primaryText = item.label;
                var secondaryText = item.value === 0 || !!item.value ? item.value : '';

                // Handle array value

                if (!!item.value && _typeof(item.value) == 'object' && item.value.length > 0) {
                    secondaryText = item.value.map(function (itemValue) {
                        return _react2.default.createElement(
                            'span',
                            null,
                            itemValue,
                            ' '
                        );
                    });
                }

                // Handle date

                if (typeof item.value == 'string' && item.value.length > 0 && item.dataType === 'date') {
                    try {
                        if (typeof item.format == 'string' && item.format.length > 0) {
                            // We use the Java date format instead of the default Moment format
                            secondaryText = (0, _moment2.default)(secondaryText).formatWithJDF(item.format);
                        } else {
                            secondaryText = new Date(secondaryText).toLocaleString();
                        }
                    } catch (e) {
                        console.error("Error reading date '" + secondaryText + "'", e);
                    }
                }

                // Handle no label items

                if (item.label.trim() === '') {

                    if (secondaryText.trim() === '') {
                        continue;
                    }

                    // No label => multi-line value

                    primaryText = secondaryText;
                    secondaryText = '';

                    listItemStyle = _extends({}, listItemStyle, {
                        margin: '4px 10px 0px 0px',
                        textOverflow: 'ellipsis'
                    });
                    primaryTextStyle = _extends({}, secondaryTextStyle, {
                        margin: '0px'
                    });
                    secondaryTextStyle = {
                        display: 'none',
                        lineHeight: 0,
                        height: 0
                    };
                }

                subRows.push(_react2.default.createElement(
                    _GridList.GridTile,
                    { key: k },
                    _react2.default.createElement(_List.ListItem, {
                        secondaryTextLines: 1,
                        style: listItemStyle,
                        disabled: true,
                        primaryText: _react2.default.createElement(
                            'div',
                            { style: primaryTextStyle },
                            primaryText
                        ),
                        secondaryText: _react2.default.createElement(
                            'div',
                            { style: secondaryTextStyle },
                            secondaryText
                        )
                    })
                ));
            }

            rows.push(_react2.default.createElement(
                _GridList.GridList,
                {
                    key: JSON.stringify(subRow),
                    cellHeight: 'auto',
                    cols: columns,
                    padding: padding
                },
                subRows
            ));

            subRows = [];
        });

        if (index < tab.rows.length - 1) {
            rows.push(_react2.default.createElement(
                'div',
                { style: dividerStyle },
                _react2.default.createElement(_Divider2.default, null)
            ));
        }
    });
}

var EmptyTab = function EmptyTab(text) {
    var emptyTabStyles = {
        wrapper: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }
    };

    return _react2.default.createElement(
        'span',
        { style: emptyTabStyles.wrapper },
        text
    );
};

var TabsViewHeader = function TabsViewHeader(props) {

    try {
        var muiTheme = props.muiTheme,
            tabList = props.tabList,
            verticalListTabActive = props.verticalListTabActive,
            changeVerticalListWidgetTab = props.changeVerticalListWidgetTab,
            mainCardHeaderSize = props.mainCardHeaderSize;
        var qsColors = muiTheme.qsColors;


        var mainCardHeaderHeight = mainCardHeaderSize.height || 0;
        var tabsViewHeaderStyles = {
            tab: { height: mainCardHeaderHeight, textTransform: 'none' },
            inkBarStyle: { backgroundColor: qsColors.qsGreen2 }
        };

        var tabs = [];
        var tooltips = [];
        tabList.forEach(function (tab, index) {

            var tabIcon = _react2.default.createElement(_folder2.default, null);
            var tooltipText = (0, _moduleUtils.capitalizeFirstLetter)(tab.title);
            if (tab.icon == "user") {
                tabIcon = _react2.default.createElement(_person2.default, null);
            }
            if (tab.icon == "user-group") {
                tabIcon = _react2.default.createElement(_people2.default, null);
            }
            if (tab.icon == "global") {
                tabIcon = _react2.default.createElement(_importContacts2.default, null);
            }
            if (tab.icon == "case") {
                tabIcon = _react2.default.createElement(_work2.default, null);
            }

            tabs.push(_react2.default.createElement(_Tabs.Tab, {
                key: 'tabs-' + index,
                buttonStyle: tabsViewHeaderStyles.tab,
                value: index,
                icon: _react2.default.createElement(
                    'span',
                    { 'data-tip': true, 'data-for': tab.title },
                    tabIcon
                )
            }));

            tooltips.push(_react2.default.createElement(
                _reactTooltip2.default,
                {
                    key: tab.title,
                    id: tab.title,
                    place: 'bottom',
                    effect: 'solid'
                },
                tooltipText
            ));
        });

        return _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
                _Tabs.Tabs,
                {
                    value: verticalListTabActive,
                    onChange: changeVerticalListWidgetTab,
                    inkBarStyle: tabsViewHeaderStyles.inkBarStyle,
                    className: 'main-tooltip-no-arrow'
                },
                tabs
            ),
            tooltips
        );
    } catch (e) {
        console.error("Error rendering TabsViewHeader: ", e);
        return _react2.default.createElement('div', null);
    }
};

var VerticalListWidget = exports.VerticalListWidget = function (_React$Component) {
    _inherits(VerticalListWidget, _React$Component);

    function VerticalListWidget(props) {
        _classCallCheck(this, VerticalListWidget);

        return _possibleConstructorReturn(this, (VerticalListWidget.__proto__ || Object.getPrototypeOf(VerticalListWidget)).call(this, props));
    }

    _createClass(VerticalListWidget, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {

            return this.props.verticalListTabActive != nextProps.verticalListTabActive || JSON.stringify(this.props.mainCardHeaderSize) != JSON.stringify(nextProps.mainCardHeaderSize) || this.props.viewMaxHeight != nextProps.viewMaxHeight || !(0, _fastDeepEqual2.default)(this.props.tabList, nextProps.tabList);
        }
    }, {
        key: 'render',
        value: function render() {

            try {
                // console.log("RENDER X VerticalListWidget");
                var _props = this.props,
                    tabList = _props.tabList,
                    viewMaxHeight = _props.viewMaxHeight,
                    defaultHeader = _props.defaultHeader,
                    mainCardHeaderSize = _props.mainCardHeaderSize,
                    verticalListTabActive = _props.verticalListTabActive,
                    muiTheme = _props.muiTheme,
                    i18n = _props.i18n,
                    showDownloadModal = _props.showDownloadModal,
                    contractsWidget = _props.contractsWidget;
                var qsColors = muiTheme.qsColors;

                var wording = i18n.modules.verticalListWidget;

                // Compute  VerticalListWidget max height

                var cardTextPaddingHeight = 16;
                var cardActionsPaddingHeight = 20;
                var cardActionsHeight = 38;
                var mainCardHeaderHeight = mainCardHeaderSize.height || 0;
                var verticalListWidgetMaxHeight = viewMaxHeight - cardTextPaddingHeight - mainCardHeaderHeight - cardActionsPaddingHeight - cardActionsHeight;

                var verticalListWidgetStyles = {
                    card: {
                        paddingBottom: 0
                    },
                    cardText: {
                        backgroundColor: qsColors.qsWhite1,
                        height: verticalListWidgetMaxHeight,
                        padding: '0px 16px 16px',
                        overflow: 'auto'
                    },
                    cardActions: {
                        style: { padding: 10 },
                        actionButton: {
                            style: { marginRight: 0, display: 'inline-block' },
                            buttonStyle: { height: 'auto', lineHeight: 'normal', backgroundColor: qsColors.qsGrey1, color: qsColors.qsWhite1 },
                            overlayStyle: { height: 'auto', padding: 10 },
                            labelStyle: { padding: 0 }
                        }
                    }
                };

                var header = defaultHeader;

                // Init

                rows = [];
                subRows = [];

                // Extract infos

                if (tabList && tabList.length > 0) {
                    if (tabList[verticalListTabActive]) {
                        extractAndBuildList(tabList[verticalListTabActive], qsColors, wording);
                    } else {
                        // this case should not happened, it would mean that a tab which does not exist would have been selected
                        // i.e. bad default 'verticalListTabActive' in the reducer
                        rows.push(_react2.default.createElement(EmptyTab, { key: 'empty-if-not-active', text: wording.emptyTab }));
                    }

                    if (tabList.length > 1) {
                        header = _react2.default.createElement(TabsViewHeader, this.props);
                    }
                } else {
                    rows.push(_react2.default.createElement(EmptyTab, { key: 'empty-if-no-list', text: wording.emptyTab }));
                }

                // Download button

                var contractButtonTitle = !!contractsWidget && contractsWidget.title || wording.downloadButtonLabel;

                return _react2.default.createElement(
                    _Card.Card,
                    { containerStyle: verticalListWidgetStyles.card },
                    header,
                    _react2.default.createElement(
                        _Card.CardText,
                        { style: verticalListWidgetStyles.cardText },
                        rows
                    ),
                    _react2.default.createElement(
                        _Card.CardActions,
                        { style: verticalListWidgetStyles.cardActions.style },
                        _react2.default.createElement(_RaisedButton2.default, {
                            primary: true,
                            onClick: showDownloadModal,
                            label: contractButtonTitle,
                            labelPosition: 'before',
                            fullWidth: true,
                            labelStyle: verticalListWidgetStyles.cardActions.actionButton.labelStyle,
                            buttonStyle: verticalListWidgetStyles.cardActions.actionButton.buttonStyle,
                            style: verticalListWidgetStyles.cardActions.actionButton.style,
                            overlayStyle: verticalListWidgetStyles.cardActions.actionButton.overlayStyle
                        })
                    )
                );
            } catch (e) {
                console.error("Error rendering VerticalListWidget: ", e);
                return _react2.default.createElement('div', null);
            }
        }
    }]);

    return VerticalListWidget;
}(_react2.default.Component);

VerticalListWidget.propTypes = {
    tabList: _propTypes2.default.array,
    viewMaxHeight: _propTypes2.default.num,
    defaultHeader: _propTypes2.default.object,
    mainCardHeaderSize: _propTypes2.default.object,
    changeVerticalListWidgetTab: _propTypes2.default.func,
    verticalListTabActive: _propTypes2.default.num,
    muiTheme: _propTypes2.default.object,
    i18n: _propTypes2.default.object,
    contractsWidget: _propTypes2.default.object
};

exports.default = VerticalListWidget;