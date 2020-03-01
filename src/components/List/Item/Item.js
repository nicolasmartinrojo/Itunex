import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap'
class Item extends Component {

    render() {
        let elem;
        switch (this.props.item.wrapperType) {
            case "collection":
                elem = this.props.item.collectionName;
                break;
            case "artist":
                elem = this.props.item.artistName;
                break;
            default:
                //you shouldn't be here.. ever de los evers
                break;
        }
        return <ListGroupItem onClick={() => this.props.click(this.props.item)}>{elem}</ListGroupItem>
    }
}

export default Item;