import React from 'react';
import axios from '../../../axios';
import AbstractSummary from '../AbstractSummary';
import { Col, Image, Grid } from 'react-bootstrap';
import classes from './AlbumSummary.css';
import { FacebookShareButton, GooglePlusShareButton, TwitterShareButton } from 'react-share';
import { SocialIcon } from 'react-social-icons';
class AlbumSummary extends AbstractSummary {

    constructor(props) {
        super(props);
        this.setInitialState(this.state);
    }

    render() {
        if (!this.state.info) {
            axios.get('lookup?id=' + this.props.id)
                .then(res => {
                    this.setState({ info: res.data.results[0] });
                });
        }

        if (!this.state.collection) {
            axios.get('lookup?entity=song&id=' + this.props.id)
                .then(res => {
                    this.setState({ collection: res.data.results.filter(elem => elem.wrapperType === "track") });
                });
        }

        let info = null,
            collection = null,
            photo;
        if (this.state.info) {
            photo = <Image src={this.state.info.artworkUrl60} thumbnail />
            info = <>
                <h4>{this.state.info.collectionName}</h4>
                <h5 className="text-right">
                    By <strong>{this.state.info.artistName}</strong>
                </h5>

                {/* @todo: move the share buttons to a separated component */}
                <FacebookShareButton
                    quote={this.state.info.collectionName}
                    hashtag="b"
                    url="http://localhost:3000/">
                    <SocialIcon network="facebook" />
                </FacebookShareButton>
                <TwitterShareButton
                    quote={this.state.info.collectionName}
                    hashtag="b"
                    url="http://localhost:3000/">
                    <SocialIcon network="twitter" />
                </TwitterShareButton>
                <GooglePlusShareButton
                    quote={this.state.info.collectionName}
                    hashtag="b"
                    url="http://localhost:3000/">
                    <SocialIcon network="google" />
                </GooglePlusShareButton>
                <hr />
            </>;
        }
        if (this.state.collection) {
            collection = (
                <ul className={classes.Songs}>
                    {this.state.collection.map(song => {
                        return <li
                            key={song.trackId}
                        >
                            {song.trackName}
                            <audio ref="audio_tag" src={song.previewUrl} controls />
                        </li>
                    })}
                </ul>);
        }

        return <Grid fluid={true}>
            <Col md={3}>
                {photo}
            </Col>
            <Col md={9}>
                {info}
                {collection}
            </Col>
        </Grid>;
    }
}

export default AlbumSummary;