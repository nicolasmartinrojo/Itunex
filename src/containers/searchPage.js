import React, { Component } from 'react';
import Header from '../components/Header/Header';
import List from '../components/List/List';
import axios from '../axios';

class SearchPage extends Component {

    state = {
        results: [],
        dirty: false
    }

    updateList(filters) {
        axios.get('search?',{params:filters})
            .then(res => {
                this.setState({ results: res.data.results, dirty:true });
            });
    }

    render() {
        return (
            <>
                <Header search={this.updateList.bind(this)} />
                {this.state.dirty ? <List results={this.state.results} /> : null}
            </>
        );
    }
}


export default SearchPage;