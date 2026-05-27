<script>
	import { foundation } from '$lib/site.js';
</script>

<svelte:head>
	<title>{foundation.shortName} | Támogatás</title>
</svelte:head>

<section class="relative w-full overflow-hidden px-4 py-14 sm:px-8 lg:px-12 lg:py-20 2xl:px-16">
	<img src="/tamogatasbackground.jpg" alt="Támogatás háttér" class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 w-full opacity-10" />

	<div class="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
		<div class="space-y-6">
			<p class="font-black uppercase tracking-[0.3em] text-[#68a61c]">Segítség az állatoknak</p>
			<h1 class="section-title text-stone-900">Támogatás</h1>
			<p class="lead-text text-stone-700">Kérjük Önöket és kérünk titeket, segítsétek munkánk adótok 1 %, hiszen egyre több állatka érkezik, akiknek mi vagyunk az utolsó remény, remény az életre.</p>
		</div>

		<div class="glass-card rounded-2xl border-l-4 border-[#69a61e] p-6 sm:p-8">
			<p class="text-sm font-black uppercase tracking-[0.25em] text-[#68a61c]">Adó 1% felajánlás</p>
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