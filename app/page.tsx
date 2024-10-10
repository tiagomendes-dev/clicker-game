"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Home() {
	const [clicks, setClicks] = useState(0);
	const [clicksPerSecond, setClicksPerSecond] = useState(0);
	const [upgradeLevel, setUpgradeLevel] = useState(0);
	const [upgradeCost, setUpgradeCost] = useState(10);

	useEffect(() => {
		const timer = setInterval(() => {
			setClicks((prevClicks) => prevClicks + clicksPerSecond);
		}, 1000);

		return () => clearInterval(timer);
	}, [clicksPerSecond]);

	const handleClick = () => {
		setClicks((prevClicks) => prevClicks + 1);
	};

	const handleUpgrade = () => {
		if (clicks >= upgradeCost) {
			setClicks((prevClicks) => prevClicks - upgradeCost);
			setClicksPerSecond((prevCPS) => prevCPS + 1);
			setUpgradeLevel((prevLevel) => prevLevel + 1);
			setUpgradeCost((prevCost) => Math.floor(prevCost * 1.5));
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 flex items-center justify-center">
			<Card className="w-96">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						Clicker Game
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-center mb-4">
						<p className="text-4xl font-bold mb-2">
							{Math.floor(clicks)} cliques
						</p>
						<p className="text-sm text-gray-500">
							{clicksPerSecond} cliques por segundo
						</p>
					</div>
					<Button
						className="w-full h-24 text-2xl mb-4 bg-blue-500 hover:bg-blue-600"
						onClick={handleClick}
					>
						Clique Aqui!
					</Button>
					<Card className="mb-4">
						<CardContent className="p-4">
							<p className="font-semibold mb-2">Upgrade: Clique Automático</p>
							<p className="text-sm mb-2">Nível: {upgradeLevel}</p>
							<Progress value={(clicks / upgradeCost) * 100} className="mb-2" />
							<Button
								className="w-full"
								onClick={handleUpgrade}
								disabled={clicks < upgradeCost}
							>
								Comprar Upgrade ({upgradeCost} cliques)
							</Button>
						</CardContent>
					</Card>
				</CardContent>
			</Card>
		</div>
	);
}
