export default function reducer(state = {}, action) {
    if (action.type === "FRIENDS_REQUESTS") {
        state = {
            ...state,
            users: action.users,
        };
    }
    if (action.type === "ACCEPT_REQUEST") {
        state = {
            ...state,
            users: state.users.map((user) => {
                if (user.id === action.id) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    }
    if (action.type === "UNFRIEND_USER") {
        state = {
            ...state,
            users: state.users.filter((user) => user.id !== action.id),
        };
    }

    if (action.type === "LAST_MESSAGES") {
        state = {
            ...state,
            messages: action.msgs,
        };
    }

    if (action.type === "NEW_MESSAGE") {
        state = {
            ...state,
            messages: action.messages + action.message,
        };
    }

    return state;
}
