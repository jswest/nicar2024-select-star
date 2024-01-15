<script>
	import { scaleLinear } from "d3";
	import { Viz } from "midsommer";
	import data from './../../../data/vectors.json';

	let active;
	let background;
	let bgs;
	let edges;
	let fgs = [];
	let fill;
	let height = 600;
	let iteration;
	let nodes = [];
	let radius;
	let state;
	let viz;
	let width = 600;

	const bgScale = scaleLinear()
		.domain([0, 1])
		.range(["rgba(255,100,100,0.5)", "rgba(100,100,255,0.5)"]);
	const callback = (report) => {
		edges = report.edges;
		iteration = report.iteration;
		nodes = report.nodes;
		state = report.state;
	};
	const forceConfig = {
		centerStrength: 1,
		filterEmpties: false,
		hideEmpties: false,
		iterations: 2,
		manyBodyStrength: -300,
		spaceStrength: 0.03,
	}
	const somConfig = {
		dimensions: data[0].vector.length,
		height: 10,
		iterations: 20,
		learningRate: 0.25,
		radius: 1.25,
		randomSeed: 42,
		shouldDecay: true,
		width: 10,
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
			return 3.5;
		} else if (active && active.id === node.id) {
			return 14;
		} else {
			return 3.5;
		}
	}

	$: background = (node) => {
		return `url(#node-bg-${node.id})`;
	};
</script>

<div class="Page">
	<div class="controls">
		<button on:click={() => {viz.run()}}>Start</button>
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
			<g transform="translate(20,20)">
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
					width={width}
				/>
			</g>
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
</div>

<style>
	.controls {
		background-color: black;
		height: calc(var(--unit) * 2);
		left: 0;
		position: fixed;
		top: 0;
		width: 100%;
	}
	.viz {
		height: calc(100vh - (var(--unit) * 3));
		left: var(--unit);
		position: fixed;
		top: calc(var(--unit) * 3);
		width: 640px;
	}
	svg {
		background-color: black;
	}
	.pictures {
		height: calc(100vh - (var(--unit) * 3));
		left: calc((var(--unit) * 2) + 640px);
		overflow: scroll;
		position: fixed;
		top: calc(var(--unit) * 3);
		width: 300px;
	}
	.pictures figure {
		border: 1px solid black;
		box-sizing: border-box;
		margin-bottom: var(--unit);
		padding: var(--unit);
	}
	.pictures img {
		margin-bottom: var(--unit);
		width: 100%;
	}

</style>