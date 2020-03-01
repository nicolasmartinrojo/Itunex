import React from 'react';
import axios from '../../../axios';
import Sidenav from '../../Sidenav/Sidenav';
import AlbumSummary from '../AlbumSummary/AlbumSummary';
import {connect} from 'react-redux';
import actions from '../../Sidenav/actions'
import AbstractSummary from '../AbstractSummary';
import { ListGroup, Grid } from 'react-bootstrap';
import classes from './ArtistSummary.css';
class ArtistSummary extends AbstractSummary {

    state = {
        info: null,
        collection: null,
        innerSummary: null,
        activeCollection: null
    };

    constructor(props) {
        super(props);
        this.setInitialState(this.state);
    }

    extraValidationsForUpdate(nextProps, nextState) {
        return this.props.openInner !== nextProps.openInner;
    }
    
    openSidenav(id) {
        this.setState({ activeCollection: id });
        this.setState({innerSummary : <AlbumSummary id={id} /> });
        this.props.openSidenav();
    }
    isActive = (collectionId) => {
        return collectionId === this.state.activeCollection;
    }
    render() {

        if (!this.state.info) {
            axios.get('lookup?id=' + this.props.id)
                .then(res => {
                    this.setState({ info: res.data.results[0] });
                });
        }

        if (!this.state.collection) {
            axios.get('lookup?entity=album&id=' + this.props.id)
                .then(res => {
                    this.setState({ collection: res.data.results.filter(elem => elem.wrapperType==="collection")});
                });
        }

        let info = null,
            collection = null;
        if (this.state.info) {
            info = <>
                <h4>
                    {this.state.info.artistName}
                </h4>
                <h5 className="text-right">Style: <strong>{this.state.info.primaryGenreName}</strong></h5>
                <hr />
            </>;
        }
        if (this.state.collection) {
            this.sidenavContent =
                collection = <>
                    <h5>List of Albums:</h5>
                    <ListGroup className={classes.Album}>
                        {this.state.collection.map(album => {
                            return <li 
                                key={album.collectionId} 
                                onClick={() => this.openSidenav(album.collectionId)}
                                className={this.isActive(album.collectionId) ? classes.Active : null}
                            >
                                {album.collectionName}
                            </li>
                        })}
                    </ListGroup>
                </>;
        }
        return <Grid fluid={true} className={this.props.openInner?classes.Reduced:null}>
            {info}
            {collection}
            <Sidenav inner content={this.state.innerSummary}/>
        </Grid>;
    }
}

const mapStateToProps = state => {
    return {
        openInner: state.isSidenavOpenInner,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        openSidenav: () => dispatch({ type: actions.SIDENAV_OPEN_INNER})
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ArtistSummary);