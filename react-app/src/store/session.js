const SET_USER = "session/setUser"
const REMOVE_USER = "session/removeUser"


const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const login = (userr) => async (dispatch) => {
    dispatch(setUser(userr))
    return userr
}

export const logout = () => async (dispatch) => {
    dispatch(removeUser())
    return
}

export const restore = () => async (dispatch) => {
    const res = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const user = await res.json()
    if (!user["errors"]) dispatch(setUser(user))
    return user
}

const sessionReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        case REMOVE_USER:
            return { ...state, user: null }
        default:
            return state
    }

}

export default sessionReducer;
