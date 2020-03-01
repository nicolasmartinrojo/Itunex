import React, { Component } from 'react';
import { Col, Grid, FormControl, Button,ButtonGroup } from 'react-bootstrap';
import SEARCH_CRITERIA from './SearchCriteria';
import classes from './Header.css';
class Header extends Component {

    state = {
        term: "",
        entity: "",
        attribute: ""
    }
    
    componentDidMount() {
        //@TODO:FIX THIS;
        this.updateCriteria(SEARCH_CRITERIA.ARTIST);
    }
    updateCriteria = (type) => {
        this.setState(() => {
            return {
                entity: type.entity,
                attribute: type.attribute
            };
        });
    }

    handleChange = (event) => {
        this.setState({ term: event.target.value });
    }

    isActive = (criteria) => {
        return this.state.attribute === criteria.attribute;
    }
    enterPressed = (event) => {
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            this.props.search(this.state);
        } 
    }

    render() {
        return (
            <>
                <Grid style={{"height":"29px"}}>
                    <Col md={2} smOffset={10} className="text-right">
                        <Button bsStyle="link">Login</Button>
                        <Button bsStyle="link">Sign up</Button>
                    </Col>
                </Grid>
                <Grid className={classes.Header}>
                    <Col md={2}>
                        <h4>ItuneX</h4>
                    </Col>
                    <Col md={2} xs={12}>
                        <ButtonGroup>
                            <Button
                                active={this.isActive(SEARCH_CRITERIA.ARTIST)}
                                onClick={() => this.updateCriteria(SEARCH_CRITERIA.ARTIST)}
                            >Artist</Button>
                            <Button
                                active={this.isActive(SEARCH_CRITERIA.ALBUM)}
                                onClick={() => this.updateCriteria(SEARCH_CRITERIA.ALBUM)}
                            >Album</Button>
                        </ButtonGroup>
                    </Col>
                    <Col md={6} xs={12}>
                        <FormControl
                            type="text"
                            value={this.state.term}
                            onKeyPress={this.enterPressed.bind(this)}
                            placeholder="I'll be your best and only friend in the next 3 to 4 minutes"
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col md={2} xs={12}>
                        <Button bsStyle="primary" block onClick={() => this.props.search(this.state)}>Search</Button>
                    </Col>
                </Grid>
            </>
        );
    }
}

export default Header;
