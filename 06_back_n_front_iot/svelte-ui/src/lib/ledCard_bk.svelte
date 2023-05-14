<!-- <script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { mcuLink } from './mcuLink';

	export let id: number = 0;
	export let value: boolean = false;

	let lastUpdateTime: string = '00:00:00.000';

	let status = false;

	const url = `http://localhost:3033/api/led/${id}/get`;

	const update = async () => {
		// const response = await fetch(url);
		// const data = await response.json();
		// id = data.id;
		// value = data.value;
		// status = data.value;
		// console.log(data);
		const data: McuLedData = mcuLink().ledGet(0);
		id = data.id;
		value = data.value;
		status = data.value;
		console.log(data);
	};

	let interval: any = undefined;
	onMount(async () => {
		if (!interval) {
			interval = setInterval(async () => {
				await update();
				updateTime();
				//const data = await mcuLink().ledGet();
				//console.dir(data);
			}, 1000);
		}

		mcuLink().start(); /** Must be called in onMount */
	});

	onDestroy(async () => {
		clearInterval(interval);
		interval = undefined;
	});

	const updateTime = () => {
		const zp2 = (x: number) => (x < 10 ? `0${x}` : `${x}`);
		const zp3 = (x: number) => (x < 100 ? `00${x}` : x < 10 ? `0${x}` : `${x}`);
		const d = new Date();
		lastUpdateTime = `${zp2(d.getHours())}:${zp2(d.getMinutes())}:${zp2(d.getSeconds())}.${zp3(
			d.getMilliseconds()
		)}`;
	};
</script>

<div class="card border-2 border-gray-500 rounded-md">
	<header class="card-header">
		<div class="flex">
			<div class="{status ? 'on' : 'off'} w-8 h-8 rounded-3xl mx-1" />
			<div class="flex px-2 h-8 items-center">
				<span class="px-0">LED</span>
				<span class="px-0">{id}</span>
				<span class="px-1 {status ? 'text-on' : 'text-off'}"
					><strong>{status ? 'ON' : 'OFF'}</strong></span
				>
			</div>
		</div>
	</header>

	<div class="card-body px-4 mt-2">
		<button class="px-3 py-2 btn variant-filled-error rounded-lg text-xs w-12">ON</button>
		<button class="px-3 py-2 btn variant-filled-tertiary rounded-lg text-xs w-12">OFF</button>
		<button class="px-3 py-2 btn variant-filled-warning rounded-lg text-xs w-12">INV</button>
	</div>

	<footer class="p-2 text-xs pl-4">
		<span class="pr-1">update:</span>
		<span>{lastUpdateTime}</span>
	</footer>
</div>

<style>
	.on {
		@apply bg-red-800;
	}
	.off {
		@apply bg-red-500;
	}

	.text-on {
		@apply text-green-400;
	}
	.text-off {
		@apply text-gray-500;
	}
</style> -->
