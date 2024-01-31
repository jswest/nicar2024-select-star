<script>
	import Header from '$lib/header.svelte';
	export let data;
</script>

<div class="page">
	<Header />
	<div class="main">
		<div class="body">
			<div>
				<p>Count of images: {data.counts.images}</p>
				<p>Count of tagged images: {data.counts.taggedImages}</p>
				<p>Count of images tagged as containing a human: {data.counts.human}</p>
				<p>Count of images tagged as not containing a human: {data.counts.noHuman}</p>
			</div>
			<figure>
				<img src="./../data/image-{data.metadata.image_filename}" />
				<figcaption>{data.metadata.title}</figcaption>
			</figure>
			<form action="?/human" method="POST">
				<input class="hidden-input" name="image_id" type="text" value="{data.metadata.id}">
				<button type="submit">Contains a human.</button>
			</form>
			<form action="?/no_human" method="POST">
				<input class="hidden-input" name="image_id" type="text" value="{data.metadata.id}">
				<button type="submit">Does not contain a human.</button>
			</form>
		</div>
	</div>
</div>

<style>
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
	.body figure {
		border: 1px solid black;
		box-sizing: border-box;
		display: block;
		margin: 0 auto;
		padding: var(--unit);
		width: 640px;
	}
	.body figure img {
		display: block;
		height: 460px;
		margin: 0 auto var(--unit) auto;
		width: auto;
	}
	form {
		box-sizing: border-box;
		float: left;
		padding: var(--unit);
		width: 50%;
	}
	form button {
		cursor: pointer;
		height: calc(var(--unit) * 2);
		width: 100%;
	}
	form .hidden-input {
		display: none;
	}
</style>