import React from "react";

import TwitterIcon from "./TwitterIcon";

export default function Header() {
	return (
		<div className="header">
			<div>
				<span role="img" aria-label="Wave">
					👋
				</span>
				<h1>Wave at Matt</h1>
			</div>
			<div>
				<a
					href="https://twitter.com/intent/user?screen_name=matteller"
					aria-label="Follow me on Twitter"
					title="Follow me on Twitter"
				>
					<TwitterIcon />
				</a>
			</div>
		</div>
	);
}
