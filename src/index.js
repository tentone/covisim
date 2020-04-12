import ReactDOM from "react-dom";
import React from "react";
import {Gui} from "./gui/gui.jsx";

var div = document.createElement("div");
div.style.position = "absolute";
div.style.top = "0px";
div.style.left = "0px";
div.style.width = "100%";
div.style.height = "100%";
document.body.append(div);

ReactDOM.render(React.createElement(Gui), div);
