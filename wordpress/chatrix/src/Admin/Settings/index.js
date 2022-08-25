import React from 'react';
import {render} from '@wordpress/element';
import './settings.scss';

const Settings = () => {
	return (
		<div className={"wrap"}>
			<h1>Chatrix Settings</h1>
		</div>
	);
}

render(<Settings/>, document.getElementById('chatrix-settings'));
