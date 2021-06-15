import { auth } from '../../firebase'

export function startLogIn(user) {
    return (dispatch) => {
        sessionStorage.setItem("user", JSON.stringify(user));
        dispatch(logIn(user))
    };
}

export function loadUser() {
    return (dispatch) => {
        dispatch(logIn(JSON.parse(sessionStorage.getItem("user"))))
    }
}

export function logIn(user) {
    return {
        type: "LOGIN",
        user
    }
}

export function startLogOut() {
    return (dispatch) => {
        auth.signOut().then(() => {
            sessionStorage.setItem("user", null)
            dispatch(logOut())
            })
    }
}

export function logOut() {
    return {
        type: "LOGOUT"
    }
}

export function updateName(updatedName) {
    return (dispatch) => {
        // console.log(auth.currentUser.updateProfile)
        auth.currentUser.updateProfile({
            displayName: updatedName
        })
        dispatch({
            type: 'UPDATE_NAME',
            updatedName
        })
    }
}

