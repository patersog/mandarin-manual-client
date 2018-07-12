import React from 'react';

export class SpacedRepetition extends React.Component {

	constructor(props) {
		super(props);
		this.propmt = props.prompt;

		this.state = {
			answer:''
		};
	}
	render() {
		return (
			<div>Here is the prompt: {prompt}</div>
		);
	}
}

export default SpacedRepetition;