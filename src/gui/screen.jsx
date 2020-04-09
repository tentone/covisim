import React from "react";
import {Sidebar} from "./sidebar.jsx";
import {Content} from "./content.jsx";
import {Titlebar} from "./titlebar.jsx";

class Screen extends React.Component
{
	constructor(props) {
		super(props);
		this.sidebarSize = "300px";
		this.titlebarSize = "70px";
		this.resizeSize = "20px";

		this.resizing = false;
	}

	startResize(event) {
		if(!this.resizing)
		{
			this.resizing = true;
		}
	}

	endResize(event) {
		this.resizing = false;
	}

	/**
	 * Called when the sidebar is being resized
	 *
	 * @param event
	 */
	mouseMove(event) {
		if(this.resizing)
		{
			console.log("Resize", this.sidebarSize, event.movementX, event.movementY);
			this.sidebarSize = Number.parseInt(this.sidebarSize, 10) + event.movementX + "px";
			this.forceUpdate();
		}
	}

	render()
	{
		return (
			<div onMouseMove={(event) => {this.mouseMove(event);}} onMouseUp={(event) => {this.endResize(event);}}>
				<div style={{overflow: "auto", position: "absolute", height: "100%", width: this.sidebarSize, left: "0px", top: "0px"}}>
					<Sidebar/>
				</div>

				<div style={{ position: "absolute", height: this.titlebarSize, width: "calc(100% - " + this.sidebarSize + ")", right: "0px", top: "0px"}}>
					<Titlebar/>
				</div>
				<div style={{ position: "absolute", height: "calc(100% - " + this.titlebarSize + ")", width: "calc(100% - " + this.sidebarSize + ")", right: "0px", bottom: "0px"}}>
					<Content/>
				</div>
				<div style={{backgroundColor: "#FF0000", overflow: "auto", position: "absolute", height: "100%", width: this.resizeSize, left: this.sidebarSize, top: "0px"}} onMouseDown={(event) => {this.startResize(event);}}/>
			</div>
		);
	}
}

export {Screen};
