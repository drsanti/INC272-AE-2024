

let _data: McuData;
let _getInterval: NodeJS.Timer;

export const mcuLink = () => {

	const request = async (url: string, callback: (data: McuData) => void) => {
		const response = await fetch(`http://localhost:3033/api/data`);
		_data = await response.json();
		callback?.(_data);
	}

	return {
		start: (callback: (data: McuData) => void) => {

			stop();
			_getInterval = setInterval(async () => {
				// const response = await fetch(`http://localhost:3033/api/data`);
				// _data = await response.json();
				// callback?.(_data);
				request(`http://localhost:3033/api/data`, callback);
			}, 1000);
		},

		stop: () => {
			clearInterval(_getInterval);
		},

		requestData: (callback: (data: McuData) => void) => {
			request(`http://localhost:3033/api/data`, callback);
			return _data;
		},

		mcuData: (): McuData => {
			return _data;
		},

		ledGet: (id: number): McuLedData => {
			//return id ? _data.led[id] : _data.led;
			return _data.led[id];
		},

		pswGet: (id: number): McuPswData => {
			return _data.psw[id]
		},

		adcGet: (id: number): McuAdcData => {
			return _data.adc[id];
		},

		// app.get('/api/:tag/:id/:act', async (req, res)
		ledOn: async (id: number) => {
			const response = await fetch(`http://localhost:3033/api/led/${id}/on`);
			return await response.json();
		},

		ledOff: async (id: number) => {
			const response = await fetch(`http://localhost:3033/api/led/${id}/off`);
			return await response.json();
		},

		ledInv: async (id: number) => {
			const response = await fetch(`http://localhost:3033/api/led/${id}/inv`);
			return await response.json();
		},

		timeGet: () => {
			const zp2 = (x: number) => (x < 10 ? `0${x}` : `${x}`);
			const zp3 = (x: number) => (x < 100 ? `00${x}` : x < 10 ? `0${x}` : `${x}`);
			const d = new Date();
			return `${zp2(d.getHours())}:${zp2(d.getMinutes())}:${zp2(d.getSeconds())}.${zp3(d.getMilliseconds())}`
		}

	}
}

// const _getData = async (url: string) => {
// 	const response = await fetch(url);
// 	return await response.json();
// }


// export const getMcuData = async () => {
// 	return await _getData(`http://localhost:3033/api/data`);
// };

// export const getLedData = async () => {
// 	return await _getData(`http://localhost:3033/api/read/led`);
// };

// export const getPswData = async () => {
// 	return await _getData(`http://localhost:3033/api/read/psw`);
// };

// export const getAdcData = async () => {
// 	return await _getData(`http://localhost:3033/api/read/adc`);
// };