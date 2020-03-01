import { Component } from 'react';

class AbstractSummary extends Component {

    state = {
        info: null,
        collection: null
    };

    setInitialState(childState) {
        this.initialState = childState;
    }

    //Any kind of extra validations from children
    extraValidationsForUpdate(nextProps, nextState) {
        return false;
    }

    shouldComponentUpdate(nextProps, nextState) {

        //shallow comparison between new and old state
        if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
            return true;
        }

        //check if a new item was selected
        if (this.props.id !== nextProps.id) {
            this.setState(this.initialState);
            return true;
        }

        //Any kind of extra validations from children
        if (this.extraValidationsForUpdate(nextProps, nextState)) {
            return true;
        }
        return false;
    }
}


export default AbstractSummary;