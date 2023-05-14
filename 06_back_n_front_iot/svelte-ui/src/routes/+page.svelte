<script lang="ts">
	import { mcuLink } from '$lib/mcuLink';
	import { onDestroy, onMount } from 'svelte';
	import LedIndicator from '$lib/ledIndicator.svelte';
	import PswIndicator from '$lib/pswIndicator.svelte';
	import LedController from '$lib/ledController.svelte';
	import AdcIndicator from '$lib/adcIndicator.svelte';

	let leds: McuLedData[] = [];
	let psws: McuPswData[] = [];
	let adcs: McuAdcData[] = [];

	let lastUpdate = mcuLink().timeGet();
	onMount(() => {
		mcuLink().start((data: McuData) => {
			leds = data.led;
			psws = data.psw;
			adcs = data.adc;
			lastUpdate = mcuLink().timeGet();
			console.log(`---`);
			console.log(adcs[0].value, adcs[1].value, adcs[2].value, adcs[3].value);
		});
		console.clear();
	});

	onDestroy(() => {
		mcuLink().stop();
	});
</script>

<div class="container h-full mx-auto flex justify-center items-center flex flex-col">
	<div class="grid grid-cols-2 gap-2 my-4">
		{#each [0, 1, 2, 3] as i}
			<LedIndicator data={leds[i]} time={lastUpdate} />
		{/each}
	</div>

	<div class="grid grid-cols-2 gap-2 my-4">
		{#each [0, 1, 2, 3] as i}
			<PswIndicator data={psws[i]} time={lastUpdate} />
		{/each}
	</div>

	<div class="grid grid-cols-2 gap-2 my-4">
		{#each [0, 1, 2, 3] as i}
			<AdcIndicator data={adcs[i]} time={lastUpdate} />
		{/each}
	</div>

	<div class="grid grid-cols-2 gap-2 my-4">
		{#each [0, 1, 2, 3] as i}
			<LedController data={leds[i]} time={lastUpdate} />
		{/each}
	</div>
</div>
