import React from "react"
const stateDefault = {
    visible: false,
    title: '',
    ComponentContentDrawer: <p>Default content</p>,
    callBackSubmit: (propsValue) => {
        alert("Click demo")
    },
}

export const drawerReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case 'OPEN_DRAWER': {
            return { ...state, visible: true }
        }
        case 'CLOSE_DRAWER': {
            return { ...state, visible: false }
        }

        case 'OPEN_FORM_EDIT_PROJECT': {
            return { ...state, visible: true, ComponentContentDrawer: action.Component, title: action.title }
        }
        case 'OPEN_FORM_CREATE_TASK': {
            return { ...state, visible: true, ComponentContentDrawer: action.Component, title: action.title }
        }
        case 'SET_SUBMIT_EDIT_PROJECT': {

            return { ...state, callBackSubmit: action.submitFunction }
        }
        case 'SET_SUBMIT_CREATE_TASK': {
            // Khi ấn nút submit
            return {
                ...state,
                callBackSubmit:action.submitFunction
            }
            
            }

        default:
            return { ...state }
    }
}
