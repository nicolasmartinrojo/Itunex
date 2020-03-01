import actions from '../components/Sidenav/actions'

const initialState = {
    isSidenavOpen: false,
    isSidenavOpenInner: false,
}

const reducer = (state = initialState, action) => {
    const prevState = {
        ...state,
    }
    switch (action.type) {
        case actions.SIDENAV_OPEN:
            prevState.isSidenavOpen = true
            break;
        case actions.SIDENAV_CLOSE:
            prevState.isSidenavOpen = false
            prevState.isSidenavOpenInner = false
            break;
            case actions.SIDENAV_OPEN_INNER:
            prevState.isSidenavOpenInner = true
            break;
        case actions.SIDENAV_CLOSE_INNER:
            prevState.isSidenavOpenInner = false
            break;
        default:
            break;
    }

    return prevState;
}

export default reducer;