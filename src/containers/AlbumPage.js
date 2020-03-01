import React, { Component } from 'react';
import axios from '../axios';

export default class AlbumPage extends Component {

    state = {
        song: null
    };

    componentDidMount() {
        axios.get('lookup?id=' + this.props.match.params.id)
            .then(res => {
                this.setState({ song: res.data.results[0] });
            });
    }

    render() {
        return <div>
            {this.state.song ? this.state.song.trackName : null}
        </div>
    };
}