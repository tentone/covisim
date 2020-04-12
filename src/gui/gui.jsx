import React from "react";
import {ContryList} from "./contry-list.jsx";
import {Content} from "./content.jsx";
import {Titlebar} from "./titlebar.jsx";
import {Global} from "../global";

class Gui extends React.Component
{
	constructor(props) {
		super(props);

		this.sidebarSize = "300px";
		this.titlebarSize = "50px";
		this.resizeSize = "5px";
		this.resizing = false;

		var self = this;
		Global.loadData(function ()
		{
			self.forceUpdate();
		});
	}

	/**
	 * Start resizing side bar.
	 */
	startResize(event) {
		if(!this.resizing)
		{
			this.resizing = true;
		}
	}

	/**
	 * Stop resizing sidebar.
	 */
	endResize(event) {
		this.resizing = false;
	}

	/**
	 * Adjust the sidebar size based on mouse movement.
	 */
	mouseMove(event) {
		if(this.resizing)
		{
			this.sidebarSize = Number.parseInt(this.sidebarSize, 10) + event.movementX + "px";
			this.forceUpdate();
		}
	}

	render()
	{
		return (
			<div style={{position: "absolute", overflow: "hidden", height: "100%", width: "100%"}} onMouseMove={(event) => {this.mouseMove(event);}} onMouseUp={(event) => {this.endResize(event);}}>
				<div style={{position: "absolute", height: "100%", width: this.sidebarSize, left: "0px", top: "0px"}}>
					<ContryList/>
				</div>
				<div style={{position: "absolute", height: "calc(100% - " + this.titlebarSize + ")", width: "calc(100% - " + this.sidebarSize + " - " + this.resizeSize  + ")", right: "0px", bottom: "0px"}}>
					<Content/>
				</div>
				<div style={{position: "absolute", height: this.titlebarSize, width: "calc(100% - " + this.sidebarSize + " - " + this.resizeSize + ")", right: "0px", top: "0px", boxShadow: "0px 3px 8px 0px rgba(0,0,0,0.3)"}}>
					<Titlebar/>
				</div>
				<div style={{position: "absolute", height: "100%", width: this.resizeSize, left: this.sidebarSize, top: "0px", cursor: "ew-resize", backgroundColor: "#EEEEEE"}} onMouseDown={(event) => {this.startResize(event);}}/>
			</div>
		);
	}
}

export {Gui};
