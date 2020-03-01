import React, { Component } from 'react';
import classes from './Sidenav.css'
import { connect } from 'react-redux';
import actions from './actions'

class Sidenav extends Component {

    close() {
        if (this.props.inner) {
            this.props.closeInner();
        } else {
            this.props.close();
        }
    }
    render() {
        const sidenavClasses = [classes.Sidenav];
        const hoverClasses = [classes.Hover];
        if (this.props.inner) {
            sidenavClasses.push(classes.Inner);
            if (this.props.openInner) {
                sidenavClasses.push(classes.Open);
            }
        } else {
            if (this.props.open) {
                sidenavClasses.push(classes.Open);
                hoverClasses.push(classes.Open);
            }
        }

        return (
            <>
                <div className={sidenavClasses.join(" ")}>
                    <span
                        onClick={() => this.close()}
                        className="closebtn"
                    >&times;</span>
                    {this.props.content}
                </div>
                <div
                    className={hoverClasses.join(" ")}
                    onClick={() => this.close()}
                ></div>
            </>

        )
    }
}


const mapStateToProps = state => {
    return {
        open: state.isSidenavOpen,
        openInner: state.isSidenavOpenInner,

    };
}

const mapDispatchToProps = dispatch => {
    return {
        close: () => dispatch({ type: actions.SIDENAV_CLOSE }),
        closeInner: () => dispatch({ type: actions.SIDENAV_CLOSE_INNER })
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidenav);