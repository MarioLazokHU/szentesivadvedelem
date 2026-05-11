<script>
	import { foundation } from '$lib/site.js';
</script>

<svelte:head>
	<title>{foundation.shortName} | Kezdőlap</title>
</svelte:head>

<section class="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
	<div class="relative order-2 lg:order-1">
		<div class="absolute inset-8 rounded-full bg-amber-200/40 blur-3xl"></div>
		<div class="glass-card relative mx-auto flex aspect-square max-w-md items-center justify-center rounded-[3rem] p-10">
			<img src="/logo.png" alt="{foundation.name} logó" class="h-full w-full object-contain drop-shadow-2xl" />
		</div>
	</div>

	<div class="order-1 space-y-8 lg:order-2">
		<div class="inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-black uppercase tracking-[0.25em] text-stone-700 shadow-sm">
			Természet- és vadvédelem
		</div>
		<div class="space-y-5">
			<h1 class="section-title text-stone-900">Remény az állatoknak, segítség a természetnek.</h1>
			<p class="lead-text max-w-3xl text-stone-700">
				A Szentesi Természet, - és Vadvédelmi Mentőközpont Alapítvány Szentes városában a Bocskai utca 9. szám alatt található. 2020. október hónap 28. napon került nyilvántartásba a Szegedi Törvényszéknél.
			</p>
		</div>

		<div class="flex flex-col gap-3 sm:flex-row">
			<a href="/tamogatas" class="rounded-full bg-stone-900 px-7 py-4 text-center font-black text-white shadow-xl shadow-stone-900/20 transition hover:-translate-y-1">Támogatom az alapítványt</a>
			<a href="/kapcsolat" class="rounded-full bg-white/80 px-7 py-4 text-center font-black text-stone-900 ring-1 ring-stone-200 transition hover:-translate-y-1">Kapcsolatfelvétel</a>
		</div>

		<div class="grid gap-3 sm:grid-cols-3">
			<div class="glass-card rounded-3xl p-5">
				<p class="text-3xl font-black text-stone-900">0-24</p>
				<p class="text-sm font-semibold text-stone-600">ügyelet</p>
			</div>
			<div class="glass-card rounded-3xl p-5">
				<p class="text-3xl font-black text-stone-900">700-800</p>
				<p class="text-sm font-semibold text-stone-600">mentett egyed évente</p>
			</div>
			<div class="glass-card rounded-3xl p-5">
				<p class="text-3xl font-black text-stone-900">2021</p>
				<p class="text-sm font-semibold text-stone-600">óta működünk</p>
			</div>
		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="glass-card rounded-4xl p-6 sm:p-10 lg:p-12">
		<h2 class="mb-6 text-3xl font-black tracking-tight text-stone-900">Bemutatkozás</h2>
		<div class="space-y-5 text-justify leading-8 text-stone-700">
			<p>Az alapítványnak két alapítója van, Szabó Zoltán Ferenc, valamint Gémes László. Működésünket 2021.01.01 nappal kezdtük meg, Nonprofit szervezetként működünk, Állami támogatás nélkül, magánszemélyek támogatásával.</p>
			<p>Kormányhivatali engedély a Csongrád Csanád Megyei Kormányhivatal által 2021.április. 12 nappal került engedélyezésre. 2021.április.04. nappal a Szegedi Vadaspark Nonprofit Kft együttműködési megállapodást kötöttünk. Saját ellátó állatorvossal rendelkezünk.</p>
			<p>Az alapítvány célja: A természet - , és a Magyarországon honos itt szaporodó, valamint az e területen átvonuló, a természetben vadon élő állatok védelme, a sérült állatok gondozása, ellátása, gyógyítása, terápiás kezelése, felépülésük után a szabad termszetbe való visszahelyezése, az erre alkalmatlan egyedek zárttéri tenyésztése, s az utódainak a szabad természetbe a visszabocsátása, mindezzel e fajoknak a természetben való fennmaradását, valamint a természet ökológiai egyensúlyának megóvását szolgálva.</p>
		</div>
	</div>
</section>