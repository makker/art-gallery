
const lumi = {
    topColor: "#ddd",
    sideColor: "#eee",
    bottomColor: "#fff",
    befMarg: "-.8vmin",
    aftMarg: "-1.2vmin",
};

const gold = {
    topColor: "#af8f3a",
    sideColor: "#9f7928",
    bottomColor: "#866314",
    befMarg: "-1vmin",
    aftMarg: "-1.5vmin",
};

const wood = {
    topColor: "rgb(87, 63, 42)",
    sideColor: "rgb(94, 70, 43)",
    bottomColor: "rgb(102, 76, 47)",
    befMarg: "-1vmin",
    aftMarg: "-1.5vmin",
};

export const frameJSS = {
    frameSnow: {
        "backgroundColor": "#ddc",
        "border": "solid 2vmin " + lumi.sideColor,
        "borderTopColor": lumi.topColor,
        "borderLeftColor": lumi.sideColor,
        "borderRadius": "2px",
        "borderRightColor": lumi.sideColor,
        "borderBottomColor": lumi.bottomColor,
        "boxShadow": "0 0 5px 0 rgba(0,0,0,.25) inset, 0 5px 10px 5px rgba(0,0,0,.25)",
        "boxSizing": "border-box",
        "display": "inline-block",
        "padding": "2vmin",
        "position": "relative",
        "textAlign": "center",
        "&:before": {
            "borderRadius": "2px",
            "bottom": lumi.befMarg,
            "boxShadow": "0 2px 5px 0 rgba(0, 0, 0, .25) inset",
            "content": " ",
            "left": lumi.befMarg,
            "position": "absolute",
            "right": lumi.befMarg,
            "top": lumi.befMarg,
        },
        "&:after": {
            "borderRadius": "2px",
            "bottom": lumi.aftMarg,
            "boxShadow": "0 2px 5px 0 rgba(0, 0, 0, .25)",
            "content": "\"\"",
            "left": lumi.aftMarg,
            "position": "absolute",
            "right": lumi.aftMarg,
            "top": lumi.aftMarg,
        }
    },
    imageSnow: {
        "border": "solid 2px",
        "borderBottomColor": "#ffe",
        "borderLeftColor": "#eed",
        "borderRightColor": "#eed",
        "borderTopColor": "#ccb",
    },
    framePigeon: {
        "border": "1px solid",
        "borderColor": "#bbb #999",
        padding: "10px",
        "boxShadow": "0 2px 5px hsla(0,0%,0%,.4), inset 0 1px 0 #ccc, inset 1px 0 0 #aaa, inset 0 -1px 0 #ccc, inset -1px 0 0 #aaa, inset 0 2px 0 #c6c6c6, inset 2px 0 0 #a6a6a6, inset 0 -2px 0 #c6c6c6, inset -2px 0 0 #a6a6a6, inset 0 3px 0 #c0c0c0, inset 3px 0 0 #a0a0a0, inset 0 -3px 0 #c0c0c0, inset -3px 0 0 #a0a0a0, inset 0 4px 0 #b9b9b9, inset 4px 0 0 #999, inset 0 -4px 0 #b9b9b9, inset -4px 0 0 #999, inset 0 5px 0 #b6b6b6, inset 5px 0 0 #969696, inset 0 -5px 0 #b6b6b6, inset -5px 0 0 #969696, inset 0 6px 0 #b0b0b0, inset 6px 0 0 #909090, inset 0 -6px 0 #b0b0b0, inset -6px 0 0 #909090, inset 0 7px 0 #a9a9a9, inset 7px 0 0 #898989, inset 0 -7px 0 #a9a9a9, inset -7px 0 0 #898989, inset 0 8px 0 #a6a6a6, inset 8px 0 0 #868686, inset 0 -8px 0 #a6a6a6, inset -8px 0 0 #868686, inset 0 9px 0 #a0a0a0, inset 9px 0 0 #808080, inset 0 -9px 0 #a0a0a0, inset -9px 0 0 #808080, inset 0 10px 0 #888, inset 10px 0 0 #666, inset 0 -10px 0 #888, inset -10px 0 0 #666, inset 0 0 10px 10px hsla(0,0%,0%,.5)"
    },
    matPigeon: {
        "padding": "3vmin",
        "backgroundColor": "#ddc",
        "WebkitBoxShadow": "inset 0px 1px 3px 0px rgba(0,0,0,0.4)",
        "MozBoxShadow": "inset 0px 1px 3px 0px rgba(0,0,0,0.4)",
        "boxShadow": "inset 0px 1px 3px 0px rgba(0,0,0,0.4)",
    },
    imagePigeon: {
        "border": "solid 2px",
        "borderBottomColor": "#ffe",
        "borderLeftColor": "#eed",
        "borderRightColor": "#eed",
        "borderTopColor": "#ccb",
    },
    frameBW: {
        "position": "relative",
        "background": "black",
        "boxShadow": "0 10px 7px -5px rgba(0, 0, 0, 0.3)",
    },
    matBW: {
        "padding": "1.2vmin",
        "boxShadow": "0px 0px 20px 0px rgba(0,0,0,0.5) inset",
    },
    imageBW: {
        "padding": "2.8vmin",
        backgroundColor: "white",
        "&:after": {
            "content": "''",
            "display": "block",
            "boxShadow": "0px 0px 20px 0px rgba(0,0,0,0.5) inset",
        }
    },
    frameGold: {
        "border": "solid 3vmin " + gold.sideColor,
        "borderTopColor": gold.topColor,
        "borderLeftColor": gold.sideColor,
        "borderRadius": "2px",
        "borderRightColor": gold.sideColor,
        "borderBottomColor": gold.bottomColor,
        "boxShadow": "0 0 5px 0 rgba(0,0,0,.25) inset, 0 5px 10px 5px rgba(0,0,0,.25)",
        "boxSizing": "border-box",
        "display": "inline-block",
        "position": "relative",
        "textAlign": "center",
        "&:before": {
            "borderRadius": "2px",
            "bottom": gold.befMarg,
            "boxShadow": "0 2px 5px 0 rgba(0, 0, 0, .25) inset",
            "content": " ",
            "left": gold.befMarg,
            "position": "absolute",
            "right": gold.befMarg,
            "top": gold.befMarg,
        },
        "&:after": {
            "borderRadius": "2px",
            "bottom": gold.aftMarg,
            "boxShadow": "0 2px 5px 0 rgba(0, 0, 0, .25)",
            "content": "\"\"",
            "left": gold.aftMarg,
            "position": "absolute",
            "right": gold.aftMarg,
            "top": gold.aftMarg,
        }
    },
    matGold: {
        "backgroundColor": "#ddc",
        "padding": "3vmin",
        "WebkitBoxShadow": "inset 0px 1px 3px 0px rgba(0,0,0,0.4)",
        "MozBoxShadow": "inset 0px 1px 3px 0px rgba(0,0,0,0.4)",
        "boxShadow": "inset 0px 1px 3px 0px rgba(0,0,0,0.4)",
    },
    imageGold: {
        "border": "solid 2px",
        "borderBottomColor": "#ffe",
        "borderLeftColor": "#eed",
        "borderRightColor": "#eed",
        "borderTopColor": "#ccb",
    },
    frameWood: {
        "border": "solid 3vmin " + wood.sideColor,
        "borderTopColor": wood.topColor,
        "borderLeftColor": wood.sideColor,
        "borderRadius": "2px",
        "borderRightColor": wood.sideColor,
        "borderBottomColor": wood.bottomColor,
        "boxShadow": "0 0 5px 0 rgba(0,0,0,.25) inset, 0 5px 10px 5px rgba(0,0,0,.25)",
        "boxSizing": "border-box",
        "display": "inline-block",
        "position": "relative",
        "textAlign": "center",
        "&:before": {
            "borderRadius": "2px",
            "bottom": wood.befMarg,
            "boxShadow": "0 2px 5px 0 rgba(0, 0, 0, .25) inset",
            "content": " ",
            "left": wood.befMarg,
            "position": "absolute",
            "right": wood.befMarg,
            "top": wood.befMarg,
        },
        "&:after": {
            "borderRadius": "2px",
            "bottom": wood.aftMarg,
            "boxShadow": "0 2px 5px 0 rgba(0, 0, 0, .25)",
            "content": "\"\"",
            "left": wood.aftMarg,
            "position": "absolute",
            "right": wood.aftMarg,
            "top": wood.aftMarg,
        }
    },
    matWood: {
        "backgroundColor": "#ddc",
        "padding": "3vmin",
        "WebkitBoxShadow": "inset 0px 1px 3px 0px rgba(0,0,0,0.4)",
        "MozBoxShadow": "inset 0px 1px 3px 0px rgba(0,0,0,0.4)",
        "boxShadow": "inset 0px 1px 3px 0px rgba(0,0,0,0.4)",
    },
    imageWood: {
        "border": "solid 2px",
        "borderBottomColor": "#ffe",
        "borderLeftColor": "#eed",
        "borderRightColor": "#eed",
        "borderTopColor": "#ccb",
    },
    testFrame: { // To make transparent darkening for colored bg
        "border": "1px solid",
        "padding": "10px",
        "boxShadow": "0 1px 14px hsl(241, 34%, 40%), inset 0 1px 0 #ccc0, inset 1px 0 0 #dc941100, inset 0 -1px 0 #ccc0, inset -1px 0 0 #aaaaaa00, inset 0 2px 0 #c6c6c600, inset 2px 0 0 #a6a6a600, inset 0 -2px 0 #c6c6c600, inset -2px 0 0 #a6a6a685, inset 0 3px 0 #c0c0c000, inset 3px 0 0 #a0a0a000, inset 0 -3px 0 #c0c0c000, inset -3px 0 0 #8888881a, inset 0 4px 0 #b3272700, inset 4px 0 0 #c7282800, inset 0 -4px 0 #3faf8500, inset -4px 0 0 #75757524, inset 0 5px 0 #b6b6b600, inset 5px 0 0 #96969600, inset 0 -5px 0 #b6b6b600, inset -5px 0 0 #96969614, inset 0 6px 0 #b0b0b000, inset 6px 0 0 #ff000000, inset 0 -6px 0 #b0b0b000, inset -6px 0 0 #90909026, inset 0 7px 0 #a9a9a900, inset 7px 0 0 #89898959, inset 0 -7px 0 #a9a9a900, inset -7px 0 0 #89898914, inset 0 8px 0 #a6a6a647, inset 8px 0 0 #86868600, inset 0 -8px 0 #a6a6a600, inset -8px 0 0 #8686860d, inset 0 9px 0 #a0a0a000, inset 9px 0 0 #80808000, inset 0 -9px 0 #a0a0a000, inset -9px 0 0 #80808017, inset 0 10px 0 #8880, inset 10px 0 0 #00bcd414, inset 0 -10px 0 #8880, inset -10px 0 0 #6666660d, inset 0 0 59px 34px hsl(66, 91%, 54%)",
        "borderColor": "#9696967a #86868673"
    }
}

const frames = [
    {
        id: 1,
        name: "Lumi",
        height: '8vmin',
        classFrame: "frameSnow",
        classImage: "imageSnow",
    },
    {
        id: 2,
        name: "Pulu",
        height: 'calc(6vmin + 22px)',
        classFrame: "framePigeon",
        classMat: "matPigeon",
        classImage: "imagePigeon",
    },
    {
        id: 3,
        name: "B&W",
        height: '4vmin',
        classFrame: "frameBW",
        classMat: "matBW",
        classImage: "imageBW",
    },
    {
        id: 4,
        name: "Kulta",
        height: '12vmin',
        classFrame: "frameGold",
        classMat: "matGold",
        classImage: "imageGold",
    },
    {
        id: 5,
        name: "Puu",
        height: '12vmin',
        classFrame: "frameWood",
        classMat: "matWood",
        classImage: "imageWood",
    },
];

export default frames;