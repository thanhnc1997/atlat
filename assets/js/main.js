const pathname = location.pathname;

async function draw(blocks) {
	let app = document.getElementById('app');
	app.innerHTML = '';
	for (const block of blocks) {
		const _block = await block;
		if(_block )app.appendChild(_block);
	}
}

const render = {
	async home() {
		await draw([
			(await import('./pages/home_page.js')).render(),
		]);
	},
	async detail(params) {
		await draw([
			(await import('./pages/detail_page.js')).render(params),
		]);
	}
}

const app = {
	page: [
		{
			url: '/detail/id=',
			async render() {
				const id = pathname.split('/')[2].replace('id=', '');
				await render.detail({id: id});
			}
		}
	],
	async init() {
		if (pathname == '/' || pathname == '') {
			await render.home();
		}
		else {
			this.page.map(item => {
				if (pathname.includes(item.url) && pathname != '/') item.render();
			});
		}
	}
}

app.init();