

export const viewportWidth = function() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
};

export const viewportHeight = function() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
};

const ratio = () => {
    var w = viewportWidth();
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    const ratio = w / h;
    const ratioStr = (ratio >= 1.1) ? "horizontal" : "vertical";

    return ratioStr;
}


export default ratio;