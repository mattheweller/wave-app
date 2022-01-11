import React from "react";
import classNames from "classnames";

export default function Wallet({
	loading,
	walletInstalled,
	walletConnected,
	networkName,
	isRinkeby,
	connectWallet,
}) {
	if (loading) {
		return <div className="buttonGroup" />;
	}

	return (
		<div className="buttonGroup justifyCenter fading">
			{walletInstalled && !walletConnected && (
				<button className="button" onClick={connectWallet}>
					Connect your wallet
				</button>
			)}
			{walletConnected && (
				<div>
					<div>
						<span className="dotConnected" />
						Wallet Connected
					</div>
					<div
						className={classNames(
							"network",
							isRinkeby ? "networkValid" : "networkInvalid",
						)}
					>
						Network: <span className="networkName">{networkName}</span>
					</div>
					{!isRinkeby && (
						<div className="network networkInvalid">
							Please switch to Rinkeby
						</div>
					)}
				</div>
			)}
		</div>
	);
}
