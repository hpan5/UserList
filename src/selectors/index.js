import {createSelector} from 'reselect';
import get from "lodash/get";
import orderBy from "lodash/orderBy";

const usersSelector = (state) => state.list && state.list.users;
export const sortSelector = (state) => state.list && state.list.sortParams;

function orderByType(data, type) {
    switch(type) {
        case "number":
            return parseInt(data, 10);
        default:
            return data;
    }
}

export const getSortedUsersList = createSelector (
    usersSelector,
    sortSelector,
    (usersList, sort) => {
        if (sort) {
            return orderBy (
                usersList,
                c => orderByType(get(c, sort.key), sort.type),
                [sort.order || "desc"]
            );
        }
        return usersList;
    }
)