import "chart.js";
import "hammerjs";
import "chartjs-plugin-zoom";
import {Browser} from "./browser";
import {Node} from "./node";

// Node.JS
if(window === undefined)
{
	Node();
}
// Browser
else
{
	window.initialize = Browser;
}


