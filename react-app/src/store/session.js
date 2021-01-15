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
    const { email, password } = userr
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const res = await response.json()
    if (res.email) dispatch(setUser(res))
    return
}

export const signup = (userr) => async (dispatch) => {
    const { username, email, password, firstName, lastName, typeId } = userr
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
            "first_name": firstName,
            "last_name": lastName,
            "type_id": typeId,
        }),
    });
    const res = await response.json();
    // dispatch(setUser(res))
    return
}

export const logout = () => async (dispatch) => {
    const res = await fetch("/api/auth/logout", {
        headers: {
            "Content-Type": "application/json",
        }
    });
    const userMsg = await res.json()
    dispatch(removeUser())
    return userMsg
}

export const restore = () => async (dispatch) => {
    const res = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const user = await res.json()
    console.log("_____IN HERE______")
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
