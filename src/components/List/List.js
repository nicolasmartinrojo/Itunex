import React, { Component } from 'react';
import Item from './Item/Item'
import Sidenav from '../Sidenav/Sidenav';
import { connect } from 'react-redux';
import actions from '../Sidenav/actions'
import AlbumSummary from '../Summaries/AlbumSummary/AlbumSummary';
import ArtistSummary from '../Summaries/ArtistSummary/ArtistSummary';
import { ListGroup, Grid, ListGroupItem } from 'react-bootstrap';

class List extends Component {

    state = {
        sidenavContent: null
    }

    setActiveItem = (activeItem) => {
        this.props.openSidenav();

        switch (activeItem.wrapperType) {
            case "collection":
                this.setState({ sidenavContent: <AlbumSummary id={activeItem.collectionId} /> });
                break;
            case "artist":
                this.setState({ sidenavContent: <ArtistSummary id={activeItem.artistId} /> });
                break;
            default:
                break;
        }
    }

    render = () => {

        let results = <ListGroupItem>No results matched with your search</ListGroupItem>;
        if (this.props.results.length) {
            results = this.props.results.map(item => {
                return (<Item
                    item={item}
                    key={item.collectionId ? item.collectionId : item.artistId}
                    click={this.setActiveItem.bind(this)}
                />)
            });
        }

        return <Grid>
            <ListGroup>
                {results}
            </ListGroup>
            <Sidenav content={this.state.sidenavContent} />
        </Grid>
    };
}


const mapDispatchToProps = dispatch => {
    return {
        openSidenav: () => dispatch({ type: actions.SIDENAV_OPEN })
    };
}
export default connect(null, mapDispatchToProps)(List);