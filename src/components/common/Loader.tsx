import React from 'react';
import './loader.css';

/**
 * Custom loader
 * @constructor
 */
function Loader (): React.ReactElement {
	return (
		<div className="loader center">
			<img src="resources/images/loading.png" />
		</div>
	);
}

export default Loader;