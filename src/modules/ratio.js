const ratio = () => {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    const ratio = w / h;
    const ratioStr = (ratio >= 1) ? "horizontal" : "vertical";

    return ratioStr;
}

export default ratio;