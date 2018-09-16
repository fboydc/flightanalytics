'use strict';
/***************************************************

NOT YET SURE OF THE API FOR HISTORICAL FLIGHT PRICES.
NEED TO DO MORE RESEARCH.

WILL MOST LIKELY DO SOMETHING WITH SMART CONTRACTS
AND CHANGE THE NAME OF THE APP


***********************************************/


const Hapi = require('hapi');
const fetch = require('node-fetch');


const _TOKEN = '074e4a33c845fe067f48f9f22b0dff56';

const server = Hapi.server({
	host: 'localhost',
	port: 8000
});

server.route({
	method: 'GET',
	path:'/hello',
	handler: (request, h)=>{
		return 'Hello from flight-analytics';
	}
});

server.route({
	method: 'GET',
	path:'/phistory/{currency}&{period_type}&{origin}&{destination}&{year}',
	handler: (request, h)=>{
		const currency = encodeURIComponent(request.params.currency);
		const period_type = encodeURIComponent(request.params.period_type);
		const origin = encodeURIComponent(request.params.origin);
		const dest = encodeURIComponent(request.params.destination);
		const year = encodeURIComponent(request.params.year);


		return fetch('http://api.travelpayouts.com/v2/prices/latest?currency='+currency+'&origin='+origin+'&destination='+dest+'&period_type='+period_type+'&show_to_affiliates=true&sorting=price&trip_class=0&token='+_TOKEN).then(response=>{
			/*return new Promise((resolve, reject)=>{
				resolve(response)
			});*/
			return response.body
		}).then(data=>{
			console.log("data", data);
			return data;
		})


	}
})

const start = async ()=> {

	try {
		await server.start()
	}

	catch(err) {
		console.log(err);
		process.exit(1);

	}

	console.log('Server running at: ', server.info.uri);
};

start();

