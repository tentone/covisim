import React, { Component } from "react";
import ReactDOM from "react-dom";

class Form extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			value: ""
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event)
	{
		const { value } = event.target;
		this.setState(() => {
			return {
				value
			};
		});
	}

	render()
	{
		// return "<p>Hello Modafoca</p>";
	}
}

export {Form};


