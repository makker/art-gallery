
import URLSearchParams from 'url-search-params';

export const setQueryStrings = (items, toString) => {
    const query = new URLSearchParams(window.location.search);
    for(var key in items) {
        query.set(key, items[key]);
    }
    return (toString) ? query.toString() : query;
}

export const removeQueryStrings = (items, toString) => {
    const query = new URLSearchParams(window.location.search);
    for (var i in items) {
        query.delete(items[i]);
    }
    return (toString) ? query.toString() : query;
}