<script>
	import '../../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
	<title>szentesivadvédelem.hu</title>
	<meta
		name="description"
		content="Szentesi Természet- és Vadvédelmi Mentőközpont Alapítvány célja a vadon élő állatok és élőhelyeik védelme, valamint a sérült állatok gondozása és visszahelyezése."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div>