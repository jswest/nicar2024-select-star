<script>
	import { scaleLinear } from "d3";
	import { Viz } from "midsommer";

	import Header from "$lib/header.svelte";

	import data from './../../../data/vectors.json';

	let active;
	let background;
	let bgs;
	let edges;
	let fgs = [];
	let fill;
	let height = 600;
	let nodes = [];
	let radius;
	let running = false;
	let state = {};
	let viz;
	let width = 600;

	let forceConfig = {};
	let forceCenterStrength = 1;
	let forceFilterEmpties = 'false';
	let forceHideEmpties = 'false';
	let forceIterations = 2;
	let forceManyBodyStrength = -300;
	let forceSpaceStrength = 0.03;

	const SOM_HEIGHT = 12;
	const SOM_WIDTH = 12;

	let somConfig = {};
	let somIterations = 20;
	let somLearningRate = 0.25;
	let somRadius = 1.25;

	const bgScale = scaleLinear()
		.domain([0, 1])
		.range(["rgba(255,100,100,0.5)", "rgba(100,100,255,0.5)"]);
	const callback = (report) => {
		edges = report.edges;
		nodes = report.nodes;
		state = report.state;
	};
	const train = () => {
		running = true;
		viz.run();
	}
	const updateForceConfig = (
		forceCenterStrength,
		forceFilterEmpties,
		forceHideEmpties,
		forceIterations,
		forceManyBodyStrength,
		forceSpaceStrength,
	) => {
		forceConfig.centerStrength = forceCenterStrength;
		forceConfig.filterEmpties = forceFilterEmpties === 'true';
		forceConfig.hideEmpties = forceHideEmpties === 'true';
		forceConfig.iterations = forceIterations;
		forceConfig.manyBodyStrength = forceManyBodyStrength;
		forceConfig.spaceStrength = forceSpaceStrength;
		forceConfig = forceConfig;
	};
	const updateSomConfig = (
		somHeight,
		somIterations,
		somLearningRate,
		somRadius,
		somWidth
	) => {
			somConfig.dimensions = data[0].vector.length;
			somConfig.height = somHeight;
			somConfig.iterations = somIterations;
			somConfig.learningRate = somLearningRate;
			somConfig.radius = somRadius;
			somConfig.randomSeed = 42;
			somConfig.shouldDecay = true;
			somConfig.width = somWidth;
	}

	$: background = (node) => {
		return `url(#node-bg-${node.id})`;
	};
	$: bgs = nodes.map((n) => {
		return {
			id: `node-bg-${n.id}`,
			end: "transparent",
			start: bgScale(
				n.data.filter((n) => n.contains_human === 1).length / n.data.length,
			),
		};
	});
	$: fill = (node) => {
		if (node.data.length > 0) {
			return `url(#node)`;
		} else {
			return 'black'
		}
	};
	$: radius = (node) => {
		if (node.data.length === 0) {
			return 0;
		} else if (active && active.id === node.id) {
			return 14;
		} else {
			return 3.5;
		}
	}
	$: updateForceConfig(
		forceCenterStrength,
		forceFilterEmpties,
		forceHideEmpties,
		forceIterations,
		forceManyBodyStrength,
		forceSpaceStrength,
	);

	$: updateSomConfig(
		SOM_HEIGHT,
		somIterations,
		somLearningRate,
		somRadius,
		SOM_WIDTH
	);
</script>

<div class="bg">
	<Header />
	<div class="Page">
		<div class="controls">
			<h2>SOM configuration</h2>
			<div class="field">
				<p>iterations</p>
				<input type="text" bind:value={somIterations} />
			</div>
			<div class="field">
				<p>learning rate</p>
				<input type="text" bind:value={somLearningRate} />
			</div>
			<div class="field">
				<p>radius</p>
				<input type="text" bind:value={somRadius} />
			</div>
			<h2>Force configuration</h2>
			<div class="field">
				<p>center strength</p>
				<input type="text" bind:value={forceCenterStrength} />
			</div>
			<div class="field">
				<p>filter empty nodes</p>
				<input type="text" bind:value={forceFilterEmpties} />
			</div>
			<div class="field">
				<p>hide empty nodes</p>
				<input type="text" bind:value={forceHideEmpties} />
			</div>
			<div class="field">
				<p>iterations</p>
				<input type="text" bind:value={forceIterations} />
			</div>
			<div class="field">
				<p>many-body strength</p>
				<input type="text" bind:value={forceManyBodyStrength} />
			</div>
			<div class="field">
				<p>space strength</p>
				<input type="text" bind:value={forceSpaceStrength} />
			</div>
			{#if !running}
				<button on:click={train}>Train SOM.</button>
			{/if}
		</div>
		<div class="viz">
			<svg height={height + 40} width={width + 40}>
				<g class="defs">
					<defs>
						<radialGradient id="node">
							<stop offset="0%" stop-color="white" />
							<stop offset="50%" stop-color="white" />
							<stop offset="100%" stop-color="transparent" />
						</radialGradient>
						{#each bgs as bg}
							<radialGradient id="{bg.id}">
								<stop offset="0%" stop-color="{bg.start}" />
								<stop offset="100%" stop-color="{bg.end}" />
							</radialGradient>
						{/each}
						{#each fgs as fg}
							<radialGradient id="{fg.id}">
								<stop offset="0%" stop-color="{fg.start}" />
								<stop offset="100%" stop-color="{fg.end}" />
							</radialGradient>
						{/each}
					</defs>
				</g>
				<Viz
					bind:this={viz}
					background={background}
					callback={callback}
					click={(node) => {active = active && active.id === node.id ? null : node}}
					data={data}
					fill={fill}
					forceConfig={forceConfig}
					height={height}
					radius={radius}
					somConfig={somConfig}
					xOffset={40}
					yOffset={40}
					width={width}
				/>
			</svg>
		</div>
		<div class="pictures">
			{#if active}
				{#each active.data as d}
					<figure>
						<img src="./../../../data/image-{d.image_filename}" />
						<figcaption>
							{d.contains_human === 1 ? 'contains a human' : 'does not contain a human.'}
						</figcaption>
					</figure>
				{/each}
			{/if}
		</div>
		<div class="inspector">
			{#if (state.learningRate && state.radius)}
				<p>iteration: {state.iteration + 1}</p>
				<p>learning rate: {Math.round(state.learningRate * 100) / 100}</p>
				<p>radius: {Math.round(state.radius * 100) / 100}</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.bg {
		background-color: black;
		height: 100vh;
		width: 100vw;
	}
	.Page {
		margin: 0 auto;
		position: relative;
		width: calc((var(--unit) * 4) + 300px + 300px + 640px);
	}
	.controls {
		background-color: black;
		border: 1px solid white;
		box-sizing: border-box;
		height: 640px;
		left: var(--unit);
		padding: var(--unit);
		position: absolute;
		top: calc(var(--unit) * 3);
		width: 300px;
	}
	.controls h2 {
		color: white;
		font-weight: 800;
	}
	.controls p {
		color: white;
		line-height: 1;
	}
	.controls button {
		background-color: black;
		border: 1px solid white;
		box-sizing: border-box;
		color: white;
		cursor: pointer;
		height: calc(var(--unit) * 1.25);
		margin: calc(var(--unit) / 2) 0;
		width: calc(300px - var(--unit) - var(--unit));
	}
	.controls input {
		background-color: black;
		border: 1px solid white;
		box-sizing: border-box;
		color: white;
		height: calc(var(--unit) * 1.25);
		outline: none;
		padding: calc(var(--unit) * 0.25);
		width: calc(300px - var(--unit) - var(--unit));

	}
	.controls .field {
		margin-bottom: calc(var(--unit) / 2);
	}
	.viz {
		border: 1px solid white;
		box-sizing: border-box;
		height: 640px;
		left: calc(300px + (var(--unit) * 2));
		position: absolute;
		top: calc(var(--unit) * 3);
		width: 640px;
	}
	.pictures {
		background-color: black;
		border: 1px solid white;
		box-sizing: border-box;
		height: 640px;
		left: calc((var(--unit) * 3) + 640px + 300px);
		overflow: scroll;
		position: absolute;
		top: calc(var(--unit) * 3);
		width: 300px;
	}
	.pictures figure {
		border: 1px solid white;
		box-sizing: border-box;
		color: white;
		margin: var(--unit);
		padding: var(--unit);
	}
	.pictures img {
		margin-bottom: var(--unit);
		width: 100%;
	}
	.inspector {
		background-color: black;
		border: 1px solid white;
		box-sizing: border-box;
		color: white;
		height: calc(var(--unit) * 3);
		left: var(--unit);
		padding: var(--unit);
		position: absolute;
		top: calc((var(--unit) * 4) + 640px);
		width: calc(300px + 300px + 640px + (var(--unit) * 2));
	}
	.inspector p {
		float: left;
		margin-right: var(--unit);
	}

</style>