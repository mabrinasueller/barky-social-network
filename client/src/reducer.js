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
            users: state.user.map((user) => {
                if (user.id === action.id) {
                    return {
                        ...user,
                        accepted: true,
                    };
                }
            }),
        };
    }
    if (action.type === "UNFRIEND_USER") {
        state = {
            ...state,
            users: state.user.map((user) => {
                if (user.id === action.id) {
                    return {
                        ...user,
                        accepted: false,
                    };
                }
            }),
        };
    }
    return state;
}
