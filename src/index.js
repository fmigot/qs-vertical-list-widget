import React from 'react'
import PropTypes from 'prop-types'

// ====== Util Libs ========================================================= //

import ReactTooltip from 'react-tooltip'
import deepEquals from 'fast-deep-equal'

import moment from 'moment'
import momentJdateformatparser from 'moment-jdateformatparser'

// ====== Material UI ======================================================= //

import { ListItem } from 'material-ui/List';
import {
    Card,
    CardText,
    CardActions
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Tabs, Tab } from 'material-ui/Tabs';
import UserIcon from 'material-ui/svg-icons/social/person';
import UserGroupIcon from 'material-ui/svg-icons/social/people';
import GlobalIcon from 'material-ui/svg-icons/communication/import-contacts';
import FileFolder from 'material-ui/svg-icons/file/folder';
import CaseIcon from 'material-ui/svg-icons/action/work';
import { GridList, GridTile } from 'material-ui/GridList';
import Divider from 'material-ui/Divider';

// ====== Utils ============================================================= //

import { capitalizeFirstLetter } from 'module-utils'

// ====== Component ======================================================== //

var rows = [];
var subRows = [];

function extractAndBuildList( tab, qsColors, wording ) {

    if (!tab.rows || (tab.rows && tab.rows.length === 0)) {
        rows.push(<EmptyTab key={'empty-if-no-rows'} text={wording.emptyTab} />);
        return rows;
    }

    let dividerStyle = { padding: '15px 0 0' };

    tab.rows.forEach((row, index) => {
        row.forEach((subRow, rowIndex) => {
            const columns = subRow.length > 1 ? 2 : 1;
            const padding = subRow.length > 1 ? 1 : 0;

            for (let k = 0; k < subRow.length; k++) {

                // /!\ Primary and secondary text should be strings. If not, it'll break the whole page!

                const item = subRow[k];
                let listItemStyle = {
                    margin: '15px 10px 0px 0px',
                    padding: '0px',
                    wordWrap: 'break-word'
                };
                let primaryTextStyle = {
                    fontSize: 12,
                    color: qsColors.qsGrey14
                };
                let secondaryTextStyle = {
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

                let primaryText = item.label;
                let secondaryText = item.value === 0 || !!item.value ? item.value : '';

                // Handle array value

                if (!!item.value && typeof item.value == 'object' && item.value.length > 0) {
                    secondaryText = item.value.map(itemValue => <span>{ itemValue } </span>);
                }

                // Handle date

                if (typeof item.value == 'string' && item.value.length > 0 && item.dataType === 'date') {
                    try {
                        if (typeof item.format == 'string' && item.format.length > 0) {
                            // We use the Java date format instead of the default Moment format
                            secondaryText = moment(secondaryText).formatWithJDF(item.format);
                        }
                        else {
                            secondaryText = new Date(secondaryText).toLocaleString();
                        }
                    }
                    catch (e) {
                        console.error("Error reading date '"+ secondaryText +"'", e);
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

                    listItemStyle = {
                        ...listItemStyle,
                        margin: '4px 10px 0px 0px',
                        textOverflow: 'ellipsis',
                    };
                    primaryTextStyle = {
                        ...secondaryTextStyle,
                        margin: '0px',
                    };
                    secondaryTextStyle = {
                        display: 'none',
                        lineHeight: 0,
                        height: 0,
                    };
                }

                subRows.push(
                    <GridTile key={k}>
                        <ListItem
                            secondaryTextLines={1}
                            style={listItemStyle}
                            disabled={true}
                            primaryText={<div style={primaryTextStyle}>{ primaryText }</div>}
                            secondaryText={<div style={secondaryTextStyle}>{ secondaryText }</div>}
                        />
                    </GridTile>
                );
            }

            rows.push(
                <GridList
                    key={JSON.stringify(subRow)}
                    cellHeight="auto"
                    cols={columns}
                    padding={padding}
                >
                    { subRows }
                </GridList>
            );

            subRows = [];
        });

        if (index < tab.rows.length - 1) {
            rows.push(<div style={dividerStyle}><Divider /></div>);
        }
    });
}

const EmptyTab = text => {
    const emptyTabStyles = {
        wrapper: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }
    };

    return <span style={emptyTabStyles.wrapper}>{ text }</span>;
};

const TabsViewHeader = props => {

    try {
        const { muiTheme, tabList, verticalListTabActive, changeVerticalListWidgetTab, mainCardHeaderSize } = props;
        const { qsColors } = muiTheme;

        const mainCardHeaderHeight = mainCardHeaderSize.height || 0;
        const tabsViewHeaderStyles = {
            tab: { height: mainCardHeaderHeight, textTransform: 'none' },
            inkBarStyle: { backgroundColor: qsColors.qsGreen2 }
        };

        let tabs = [];
        let tooltips = [];
        tabList.forEach((tab, index) => {

            let tabIcon = <FileFolder />;
            let tooltipText = capitalizeFirstLetter(tab.title);
            if (tab.icon == "user") {
                tabIcon = <UserIcon />;
            }
            if (tab.icon == "user-group") {
                tabIcon = <UserGroupIcon />;
            }
            if (tab.icon == "global") {
                tabIcon = <GlobalIcon />;
            }
            if (tab.icon == "case") {
                tabIcon = <CaseIcon />;
            }

            tabs.push(
                <Tab
                    key={`tabs-${index}`}
                    buttonStyle={tabsViewHeaderStyles.tab}
                    value={index}
                    icon={
                        <span data-tip data-for={tab.title}>
                            { tabIcon }
                        </span>
                    }
                />
            );

            tooltips.push(
                <ReactTooltip
                    key={tab.title}
                    id={tab.title}
                    place="bottom"
                    effect="solid"
                >
                    { tooltipText }
                </ReactTooltip>
            );
        });

        return (
            <span>
                <Tabs
                    value={verticalListTabActive}
                    onChange={changeVerticalListWidgetTab}
                    inkBarStyle={tabsViewHeaderStyles.inkBarStyle}
                    className="main-tooltip-no-arrow"
                >
                    { tabs }
                </Tabs>
                { tooltips }
            </span>
        );
    }
    catch (e) {
        console.error("Error rendering TabsViewHeader: ", e);
        return <div />;
    }
};

export class VerticalListWidget extends React.Component {

    constructor( props ) {
        super(props);
    }

    shouldComponentUpdate( nextProps, nextState ) {

        return this.props.verticalListTabActive != nextProps.verticalListTabActive ||
            JSON.stringify(this.props.mainCardHeaderSize) != JSON.stringify(nextProps.mainCardHeaderSize) ||
            this.props.viewMaxHeight != nextProps.viewMaxHeight ||
            !deepEquals(this.props.tabList, nextProps.tabList);
    }

    render() {

        try {
            // console.log("RENDER X VerticalListWidget");
            const { tabList, viewMaxHeight, defaultHeader, mainCardHeaderSize, verticalListTabActive, muiTheme, i18n,
                showDownloadModal, contractsWidget } = this.props;
            const { qsColors } = muiTheme;
            const wording = i18n.modules.verticalListWidget;

            // Compute  VerticalListWidget max height

            const cardTextPaddingHeight = 16;
            const cardActionsPaddingHeight = 20;
            const cardActionsHeight = 38;
            const mainCardHeaderHeight = (mainCardHeaderSize.height || 0);
            const verticalListWidgetMaxHeight = viewMaxHeight - cardTextPaddingHeight - mainCardHeaderHeight - cardActionsPaddingHeight - cardActionsHeight;

            const verticalListWidgetStyles = {
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
                        labelStyle: { padding: 0 },
                    }
                }
            };

            let header = defaultHeader;

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
                    rows.push(<EmptyTab key={'empty-if-not-active'} text={wording.emptyTab}/>);
                }

                if (tabList.length > 1) {
                    header = <TabsViewHeader {...this.props} />;
                }
            } else {
                rows.push(<EmptyTab key={'empty-if-no-list'} text={wording.emptyTab}/>);
            }

            // Download button

            const contractButtonTitle = (!!contractsWidget && contractsWidget.title) || wording.downloadButtonLabel;

            return (
                <Card containerStyle={verticalListWidgetStyles.card}>
                    { header }
                    <CardText style={verticalListWidgetStyles.cardText}>
                        { rows }
                    </CardText>
                    <CardActions style={verticalListWidgetStyles.cardActions.style}>
                        <RaisedButton
                            primary={true}
                            onClick={showDownloadModal}
                            label={contractButtonTitle}
                            labelPosition="before"
                            fullWidth={true}
                            labelStyle={verticalListWidgetStyles.cardActions.actionButton.labelStyle}
                            buttonStyle={verticalListWidgetStyles.cardActions.actionButton.buttonStyle}
                            style={verticalListWidgetStyles.cardActions.actionButton.style}
                            overlayStyle={verticalListWidgetStyles.cardActions.actionButton.overlayStyle}
                        />
                    </CardActions>
                </Card>
            );
        } catch (e) {
            console.error("Error rendering VerticalListWidget: ", e);
            return <div/>;
        }
    }
}

VerticalListWidget.propTypes = {
    tabList: PropTypes.array,
    viewMaxHeight: PropTypes.num,
    defaultHeader: PropTypes.object,
    mainCardHeaderSize: PropTypes.object,
    changeVerticalListWidgetTab: PropTypes.func,
    verticalListTabActive: PropTypes.num,
    muiTheme: PropTypes.object,
    i18n: PropTypes.object,
    contractsWidget: PropTypes.object
};

export default VerticalListWidget;
