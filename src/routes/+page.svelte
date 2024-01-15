<script>
	export let data;
</script>

<div class="page">
	<header>
		<h1>SELECT * FROM interesting;</h1>
	</header>
	<div class="main">
		<div class="body">
			<h1>SELECT * FROM interesting;</h1>
			<p>A little tool to rapidly tag images.</p>
		</div>
	</div>
</div>

<style>
	header {
		background-color: black;
		color: white;
		height: calc(var(--unit) * 2);
		left: 0;
		position: fixed;
		text-align: center;
		top: 0;
		width: 100%;
	}
	header h1 {
		font-family: var(--font);
		font-size: var(--unit);
		font-weight: 800;
		line-height: 1;
		margin: calc(var(--unit) / 2) 0;
	}
	.main {
		height: calc(100vh - (var(--unit) * 2));
		left: 0;
		position: fixed;
		top: calc(var(--unit) * 2);
		width: 100%;
	}
	.main .body {
		margin: calc(var(--unit) * 2) auto;
		width: 800px;
	}
	.body h1 {
		font-size: calc(var(--unit) * 3);
		font-style: italic;
		line-height: 1;
	}
</style>