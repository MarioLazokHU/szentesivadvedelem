<script>
	import { aboutSections, foundation, socialLinks } from '$lib/site.js';

	const openingHours = ['Hétfő 10:00–17:00', 'Kedd 10:00–17:00', 'Szerda 10:00–17:00', 'Csütörtök 10:00–17:00', 'Péntek 10:00–17:00', 'Szombat 10:00–12:00', 'Vasárnap 10:00–12:00'];
</script>

<svelte:head>
	<title>{foundation.shortName} | Szentesi Vadvédelem</title>
</svelte:head>

<section id="kezdolap" class="grid w-full scroll-mt-28 items-center gap-10 px-4 py-14 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-12 lg:py-24 2xl:px-16">
	<div class="relative order-2 lg:order-1">
		<div class="absolute inset-8 rounded-2xl bg-[#69a61e] blur-3xl opacity-20"></div>
		<div class="glass-card relative mx-auto flex aspect-square max-w-md items-center justify-center rounded-2xl p-10">
			<img src="/logo.png" alt="{foundation.name} logó" class="h-full w-full object-contain drop-shadow-2xl" />
		</div>
	</div>

	<div class="order-1 space-y-8 lg:order-2">
		<div class="inline-flex rounded-lg bg-zinc-950 px-4 py-2 text-sm font-black uppercase tracking-[0.25em] text-[#69a61e] shadow-sm">
			Természet- és vadvédelem
		</div>
		<div class="space-y-5">
			<h1 class="section-title text-stone-900">Remény az állatoknak, segítség a természetnek.</h1>
			<p class="lead-text text-stone-700">
				A Szentesi Természet, - és Vadvédelmi Mentőközpont Alapítvány Szentes városában a Bocskai utca 9. szám alatt található. 2020. október hónap 28. napon került nyilvántartásba a Szegedi Törvényszéknél.
			</p>
		</div>

		<div class="flex flex-col gap-3 sm:flex-row">
			<a href="#tamogatas" class="rounded-lg bg-[#69a61e] px-7 py-4 text-center font-black text-white shadow-xl shadow-[#69a61e]/25 transition hover:-translate-y-1 hover:bg-[#558819]">Támogatom az alapítványt</a>
			<a href="#kapcsolat" class="rounded-lg bg-white px-7 py-4 text-center font-black text-zinc-950 ring-1 ring-zinc-300 transition hover:-translate-y-1 hover:bg-zinc-50">Kapcsolatfelvétel</a>
		</div>

		<div class="grid gap-3 sm:grid-cols-3">
			<div class="glass-card rounded-xl border-l-4 border-[#69a61e] p-5">
				<p class="text-3xl font-black text-stone-900">0-24</p>
				<p class="text-sm font-semibold text-stone-600">ügyelet</p>
			</div>
			<div class="glass-card rounded-xl border-l-4 border-[#69a61e] p-5">
				<p class="text-3xl font-black text-stone-900">700-800</p>
				<p class="text-sm font-semibold text-stone-600">mentett egyed évente</p>
			</div>
			<div class="glass-card rounded-xl border-l-4 border-[#69a61e] p-5">
				<p class="text-3xl font-black text-stone-900">2021</p>
				<p class="text-sm font-semibold text-stone-600">óta működünk</p>
			</div>
		</div>
	</div>
</section>

<section class="w-full px-4 pb-16 sm:px-8 lg:px-12 2xl:px-16">
	<div class="glass-card rounded-2xl p-6 sm:p-10 lg:p-12">
		<h2 class="mb-6 text-3xl font-black tracking-tight text-stone-900">Bemutatkozás</h2>
		<div class="space-y-5 text-justify leading-8 text-stone-700">
			<p>Az alapítványnak két alapítója van, Szabó Zoltán Ferenc, valamint Gémes László. Működésünket 2021.01.01 nappal kezdtük meg, Nonprofit szervezetként működünk, Állami támogatás nélkül, magánszemélyek támogatásával.</p>
			<p>Kormányhivatali engedély a Csongrád Csanád Megyei Kormányhivatal által 2021.április. 12 nappal került engedélyezésre. 2021.április.04. nappal a Szegedi Vadaspark Nonprofit Kft együttműködési megállapodást kötöttünk. Saját ellátó állatorvossal rendelkezünk.</p>
			<p>Az alapítvány célja: A természet - , és a Magyarországon honos itt szaporodó, valamint az e területen átvonuló, a természetben vadon élő állatok védelme, a sérült állatok gondozása, ellátása, gyógyítása, terápiás kezelése, felépülésük után a szabad termszetbe való visszahelyezése, az erre alkalmatlan egyedek zárttéri tenyésztése, s az utódainak a szabad természetbe a visszabocsátása, mindezzel e fajoknak a természetben való fennmaradását, valamint a természet ökológiai egyensúlyának megóvását szolgálva.</p>
		</div>
	</div>
</section>

<section id="rolunk" class="w-full scroll-mt-28 px-4 py-16 sm:px-8 lg:px-12 lg:py-20 2xl:px-16">
	<div class="relative left-1/2 mb-12 w-screen -translate-x-1/2 space-y-5 border-y border-t-2 border-[#69a61e] bg-zinc-900/85 px-4 py-8 sm:px-8 lg:px-12 2xl:px-16">
		<p class="font-black uppercase tracking-[0.3em] text-[#69a61e]">Kik vagyunk</p>
		<h2 class="section-title text-stone-200">Rólunk</h2>
		<p class="lead-text text-stone-200">Mentés, gondozás, gyógyítás, oktatás és közösségi összefogás a természetben élő vagy bajba jutott állatokért.</p>
	</div>

	<div class="space-y-8">
		{#each aboutSections as section, index}
			<article class={`glass-card flex flex-col items-center gap-8 rounded-2xl p-6 sm:p-8 lg:flex-row lg:gap-12 lg:p-10 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
				<div class="w-full lg:w-2/5">
					<div class="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-xl bg-zinc-100 shadow-2xl shadow-zinc-900/10">
						<img src={section.image} alt={section.title} class="h-full w-full object-cover transition duration-500 hover:scale-105" />
					</div>
				</div>
				<div class="w-full space-y-4 lg:w-3/5">
					<span class="inline-flex rounded-lg bg-[#69a61e] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">{String(index + 1).padStart(2, '0')}</span>
					<h3 class="text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">{section.title}</h3>
					<p class="text-justify leading-8 text-stone-700">{section.text}</p>
				</div>
			</article>
		{/each}
	</div>
</section>

<section id="tamogatas" class="relative w-full scroll-mt-28 overflow-hidden px-4 py-16 sm:px-8 lg:px-12 lg:py-20 2xl:px-16">
	<img src="/tamogatasbackground.jpg" alt="Támogatás háttér" class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 w-full opacity-10" />
	<div class="relative left-1/2 mb-10 w-screen -translate-x-1/2 border-y border-t-2 border-[#69a61e] bg-zinc-900/85 px-4 py-8 sm:px-8 lg:px-12 2xl:px-16">
		<div class="space-y-6">
			<p class="font-black uppercase tracking-[0.3em] text-[#69a61e]">Segítség az állatoknak</p>
			<h2 class="section-title text-stone-200">Támogatás</h2>
			<p class="lead-text text-stone-200">Kérjük Önöket és kérünk titeket, segítsétek munkánk adótok 1 %, hiszen egyre több állatka érkezik, akiknek mi vagyunk az utolsó remény, remény az életre.</p>
		</div>
	</div>
	<div class="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
		<div class="glass-card rounded-2xl p-6 sm:p-8">
			<p class="text-xl font-black uppercase leading-9 text-stone-900">Minden támogatás közvetlenül a mentési és gondozási munkát segíti.</p>
			<p class="mt-4 leading-8 text-stone-700">Adó 1 százalék felajánlása Természet és Állatvédelemre! Nonprofit szervezetként működünk, Állami támogatás nélkül.</p>
		</div>
		<div class="glass-card rounded-2xl border-l-4 border-[#69a61e] p-6 sm:p-8">
			<p class="text-sm font-black uppercase tracking-[0.25em] text-green-700">Adó 1% felajánlás</p>
			<p class="mt-3 text-4xl font-black text-stone-900">{foundation.tax}</p>
			<div class="mt-6 border-t border-stone-200 pt-6">
				<p class="text-sm font-black uppercase tracking-[0.25em] text-stone-600">Számlaszám</p>
				<p class="mt-3 text-2xl font-black text-stone-900">11735043-23537536-00000000</p>
				<p class="mt-2 font-bold text-stone-600">HU 33 1173 5043 2353 7536 0000 0000</p>
			</div>
		</div>
	</div>
	<div class="mt-10 w-full">
		<div class="glass-card rounded-2xl p-6 sm:p-10 lg:p-12">
			<div class="space-y-6 text-justify leading-8 text-stone-700">
				<p class="text-xl font-black uppercase leading-9 text-stone-900">NE FELEDD , MINÉL TÖBB 1% FELAJÁNLÁS ÉRKEZIK, ANNÁL TÖBB ELESETT ÉS SÉRÜLT ÁLLATON SEGÍTHETÜNK, EGYÜTT KÖZÖS ÖSSZEFOGÁSSAL. ADÓ 1 % FELAJÁNLÁS : 19287283-1-06</p>
				<p>Adó 1 százalék felajánlása Természet és Állatvédelemre! Nonprofit szervezetként működünk, Állami támogatás nélkül, a működésünk kizárólag Önöknek és Nektek köszönhetjük. Csongrád Csanád vármegye és Békés vármegye területén végezzük a mentési munkánk.</p>
				<p>Segítse ön is a működésünk, az állatok védelmét, gyógyítását, műtéti költségeiket, a cicák és kutyusok ivartalanítását, az elesett árva cicák és kutyusok felnevelését, a gyermekek oktatását, adóbevalláskor az adó 1% felajánlással.</p>
				<p class="font-black text-stone-900">Szentesi Természet, - és Vadvédelmi Mentőközpont Alapítvány</p>
			</div>
		</div>
	</div>
</section>

<section id="kapcsolat" class="w-full scroll-mt-28 px-4 py-16 sm:px-8 lg:px-12 lg:py-20 2xl:px-16">
	<div class="relative left-1/2 mb-10 w-screen -translate-x-1/2 space-y-5 border-y border-t-2 border-[#69a61e] bg-zinc-900/85 px-4 py-8 sm:px-8 lg:px-12 2xl:px-16">
		<p class="font-black uppercase tracking-[0.3em] text-[#69a61e]">Elérhetőségek</p>
		<h2 class="section-title text-stone-200">Kapcsolat</h2>
		<p class="lead-text text-stone-200">Ha bajba jutott állatot találtál, hívd az ügyeleti számot. 0-24 órás ügyelet!</p>
	</div>
	<div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
		<div class="glass-card rounded-2xl p-6 sm:p-8">
			<div class="space-y-6">
				<div><p class="text-sm font-black uppercase tracking-[0.25em] text-stone-600">Cím</p><p class="mt-2 text-xl font-black text-stone-900">{foundation.address}</p></div>
				<div><p class="text-sm font-black uppercase tracking-[0.25em] text-stone-600">Mobil</p><a href="tel:+36306332900" class="mt-2 block text-xl font-black text-green-700">{foundation.phone}</a></div>
				<div><p class="text-sm font-black uppercase tracking-[0.25em] text-stone-600">E-mail</p><a href={`mailto:${foundation.email}`} class="mt-2 block text-xl font-black text-stone-900">{foundation.email}</a></div>
				<div>
					<p class="text-sm font-black uppercase tracking-[0.25em] text-stone-600">Nyitvatartás</p>
					<div class="mt-3 grid gap-2">{#each openingHours as row}<p class="rounded-lg bg-zinc-100 px-4 py-3 font-semibold text-stone-700">{row}</p>{/each}</div>
				</div>
				<div class="rounded-xl bg-green-50 p-5 text-center text-xl font-black uppercase text-green-800 ring-1 ring-green-200">0-24 órás ügyelet!</div>
			</div>
		</div>
		<div class="space-y-8">
			<div class="glass-card overflow-hidden rounded-2xl p-4"><img src="/map.png" alt="Térkép" class="h-full max-h-130 w-full rounded-xl object-cover shadow-lg shadow-stone-900/10" /></div>
			<div class="glass-card rounded-2xl p-6 sm:p-8">
				<h3 class="text-3xl font-black tracking-tight text-stone-900">Közösségi Média</h3>
				<div class="mt-5 flex flex-wrap gap-4">
					{#each socialLinks as link}<a href={link.href} target="_blank" rel="noreferrer" class="flex items-center gap-3 rounded-lg bg-zinc-100 px-5 py-4 font-black text-stone-900 shadow-sm transition hover:-translate-y-1 hover:bg-green-50"><img src={link.icon} alt={link.label} class="h-10 w-10 object-contain" />{link.label}</a>{/each}
				</div>
			</div>
		</div>
	</div>
</section>

