import React from "react";
import {
    SearchBar, Panel, PanelHeader,
    PanelBody,
    MediaBox,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfo,
    MediaBoxInfoMeta,
} from "react-weui";


class One extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: ''
        }
    }
    searchAction(v) {
        this.setState({ searchText: v })
    }
    render() {
        return (<div>
            <SearchBar className='fixed_top'
                onChange={this.searchAction.bind(this)}
                defaultValue={this.state.searchText}
                placeholder="关键字搜索"
                lang={{
                    cancel: '取消'
                }}
            /><br></br>
            <Panel>
                <PanelHeader>
                    Text Media with addons
                </PanelHeader>
                <PanelBody>
                    <MediaBox type="text">
                        <MediaBoxTitle>Media heading</MediaBoxTitle>
                        <MediaBoxDescription>
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </MediaBoxDescription>
                        <MediaBoxInfo>
                            <MediaBoxInfoMeta>WeUI</MediaBoxInfoMeta>
                            <MediaBoxInfoMeta>2016-8-8</MediaBoxInfoMeta>
                            <MediaBoxInfoMeta extra>More</MediaBoxInfoMeta>
                        </MediaBoxInfo>
                    </MediaBox>
                </PanelBody>
            </Panel>
        </div>);
    }

}

export default One