<script>
	import Header from '$lib/header.svelte';
</script>

<div class="Page">
	<Header />
	<div class="main">
		<h1>SELECT * FROM interesting</h1>
		<h2>For NICAR 2024</h2>
		<div class="section">
			<p>The course description:</p>
			<blockquote>
				<p>Ever found yourself drowning in a sea of data with editors circling like sharks? You're not alone. In this interactive session, Wall Street <em>Journal</em> data people John West and Rob Barry will dive into a machine learning concept called embeddings, which are at the heart of the current AI craze. Using free and open source tools, we’ll show you how to use this technology to keep afloat in your ocean of unstructured images and text.</p>
			</blockquote>
			<p>Instructor bios:</p>
			<blockquote>
				<p><b>Rob Barry</b> is an investigative journalist at The Wall Street <em>Journal</em>. He tackles a wide range of topics, from unearthing financial frauds to diving into cybersecurity and untangling geopolitical conflicts. Barry's work often mixes deep investigative reporting with data analysis, always aiming to get to the heart of complex and challenging stories.</p>
			</blockquote>
			<blockquote>
				<p><b>John West</b> reports the news with code at the Wall Street <em>Journal</em>, where his work has won multiple awards, including the 2023 Pulitzer Prize for Investigative Reporting. He holds an MFA in writing from Bennington College and degrees in philosophy and music performance from Oberlin College and Conservatory. His first book, <em>Lessons and Carols</em>, was published in 2023.</p>
			</blockquote>
		</div>
		<div class="section">
			<p>Useful links</p>
			<ul>
				<li>The <a href="tag/">tagger</a>.</li>
				<li>The <a href="som/">SOM</a>.</li>
				<li>The <a href="https://github.com/jswest/nicar2024-select-star">Github repository</a>.</li>
			</ul>
		</div>
		<div class="section">
			<p>Steps to reproduce:</p>
			<ul>
				<li>Run the SCRAPE notebook at <span class="pre">/notebooks/SCRAPE.ipynb</span>.</li>
				<li>Tag a bunch of images using the <a href="tag/">tagger</a>.</li>
				<li>Run the CLASSIFY notebook at <span class="pre">/notebooks/CLASSIFY.ipynb</span>.</li>
				<li>Explore the output with the <a href="som/">SOM</a>.</li>
		</div>
	</div>
</div>

<style>
	.main {
		margin: calc(var(--unit) * 6) auto 0 auto;
		width: 800px;
	}
	h1 {
		font-size: calc(var(--unit) * 3);
	}
	h2 {
		font-size: calc(var(--unit));
		font-weight: 800;
		margin: var(--unit) 0 calc(var(--unit) * 3) 0;
	}
	blockquote, ul {
		margin-left: calc(var(--unit) * 2);
	}
	.section {
		margin-bottom: calc(var(--unit) * 3);
	}

</style>