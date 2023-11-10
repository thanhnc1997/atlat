import {
	create_element
} from '../helper.js';

let data = await import('../data.js');

let lang_default = 'VN';

if (localStorage.getItem('lang')) lang_default = localStorage.getItem('lang');

if (lang_default == 'VN') {
	data = data.VN;
}

if (lang_default == 'EN') {
	data = data.EN;
}

export async function render(params) {
	data = data.province.filter(province => province.id == params.id)[0];
	let {name, desc, sub, thumbnail, cuisine, administrative, places} = data;
	
	const template = create_element('section');
	template.classList.add('detail-page');
	
	async function page_header() {
		const div = create_element('header');
		div.innerHTML = `
		<figure style="background-image: url(${thumbnail})">
			<figcaption>
				<div class="d-flex align-items-center justify-content-between mb-auto" style="padding: 20px 0 0;">
					<span onclick="history.back()" class="round-icon">
						<img src="/assets/images/icons/arrow_left.svg">
					</span>
					<h3 style="color: #fff;">${lang_default == 'VN' ? 'Chi tiết' : 'Detail'}</h3>
					<span class="round-icon">
						<img src="/assets/images/icons/copy.svg">
					</span>
				</div>

				<div class="name">
					<h3 class="mb-6">${name}</h3>
					<p class="d-flex align-items-center">
						<img class="mr-6" src="/assets/images/icons/map_pin.svg">
						<span>${sub}</span>
					</p>
				</div>
			</figcaption>
		</figure>
		`;
		
		return div;
	}
	
	async function page_body() {
		const div = create_element('div');
		div.classList.add('page');
		div.innerHTML = `
		<div class="mb-18 grid grid-2 gap-8">
			<div class="info d-flex align-items-center">
				<span class="round-icon mr-12">
					<img src="/assets/images/icons/user_group.svg">
				</span>
				<p>
					<small class="d-block mb-6">${lang_default == 'VN' ? 'Dân số' : 'Population'}</small>
					<b style="font-size: 16px;">${administrative.population}</b>
				</p>
			</div>
			<div class="info d-flex align-items-center">
				<span class="round-icon mr-12">
					<img src="/assets/images/icons/area.svg">
				</span>
				<p>
					<small class="d-block mb-6">${lang_default == 'VN' ? 'Diện tích' : 'Area'}</small>
					<b style="font-size: 16px;">${administrative.area}</b>
				</p>
			</div>
			<div class="info d-flex align-items-center">
				<span class="round-icon mr-12">
					<img src="/assets/images/icons/map.svg">
				</span>
				<p>
					<small class="d-block mb-6">${lang_default == 'VN' ? 'Quận' : 'Districts'}</small>
					<b style="font-size: 16px;">${administrative.disticts}</b>
				</p>
			</div>
			<div class="info d-flex align-items-center">
				<span class="round-icon mr-12">
					<img src="/assets/images/icons/map.svg">
				</span>
				<p>
					<small class="d-block mb-6">${lang_default == 'VN' ? 'Huyện' : 'Towns'}</small>
					<b style="font-size: 16px;">${administrative.towns}</b>
				</p>
			</div>
		</div>
		
		<h4 class="mb-8">${lang_default == 'VN' ? 'Giới thiệu' : 'Overview'}</h4>
		<p class="mb-24 text-justify">${desc || ''}</p>
		
		${
		cuisine
		? `
		<h4 class="mb-8">${lang_default == 'VN' ? 'Ẩm thực' : 'Culinary'}</h4>
		<p class="mb-18 text-justify">${cuisine.desc}</p>
		<div class="overflow-hidden mb-24">
			<div class="gallery-list" id="cuisine">
				<div class="track">
					
				</div>
			</div>
		</div>
		`
		: ''
		}
		
		${
		places
		? `
		<h4 class="mb-8">${lang_default == 'VN' ? 'Danh lam thắng cảnh' : 'Places'}</h4>
		<p class="mb-18 text-justify">${places.desc}</p>
		<div class="overflow-hidden">
			<div class="gallery-list" id="places">
				<div class="track">
					
				</div>
			</div>
		</div>
		`
		: ''
		}
		
		`;
		
		return div;
	}
	
	async function cuisine_list() {
		if (!cuisine) return false;
		cuisine.list.map((dish, index) => {
			const div = create_element('div');
			div.classList.add('item');
			div.innerHTML = `
			<figure style="background-image: url(${dish.thumbnail})"></figure>
			`;
			
			div.addEventListener('click', async () => {
				document.body.appendChild(await pop_up({
					html: `
					<figure class="mb-18 pop-up-img" style="background-image: url(${dish.thumbnail});"></figure>
					<h3 style="color: #fff;">${dish.name}</h3>
					`,
					gallery: cuisine,
					pos: index
				}));
			});
			
			template.querySelector('#cuisine .track').appendChild(div);
		});
	}
	
	async function places_list() {
		if (!places) return false;
		places.list.map((place, index) => {
			const div = create_element('div');
			div.classList.add('item');
			div.innerHTML = `
			<figure style="background-image: url(${place.thumbnail})"></figure>
			`;
			
			div.addEventListener('click', async () => {
				document.body.appendChild(await pop_up({
					html: `
					<figure class="mb-18 pop-up-img" style="background-image: url(${place.thumbnail});"></figure>
					<h3 style="color: #fff;">${place.name}</h3>
					`,
					gallery: places,
					pos: index
				}));
			});
			
			template.querySelector('#places .track').appendChild(div);
		});
	}
	
	async function pop_up(params) {
		document.body.classList.add('overflow-hidden');
		let {html, gallery, pos} = params;
		
		const modal = create_element('div');
		modal.classList.add('modal', 'image-preview');
		modal.innerHTML = `
		<div class="overlay dark"></div>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header text-right" style="border: 0;">
					<button class="btn"><img src="/assets/images/icons/close.svg"></button>
				</div>
				<div class="modal-body">
					${html}
				</div>
				<div class="modal-footer overflow-hidden">
					<div class="gallery-list">
						<div class="track">

						</div>
					</div>
				</div>
			</div>
		</div>
		`;
		
		async function load_list(params) {
			params.map((item, index) => {
				const div = create_element('div');
				div.classList.add('item');
				if (index == pos) div.classList.add('active');
				div.innerHTML = `
				<figure style="background-image: url(${item.thumbnail})"></figure>
				`;

				div.addEventListener('click', async e => {
					if (div.parentElement.querySelector('.active')) {
						div.parentElement.querySelector('.active').classList.remove('active');
						e.currentTarget.classList.add('active');
					}
					
					modal.querySelector('.modal-body figure').style.cssText = `background-image: url(${item.thumbnail})`;
					modal.querySelector('.modal-body h3').innerHTML = item.name;
				});

				modal.querySelector('.modal-footer .track').appendChild(div);
			});
		}
		
		async function remove_modal(trigger) {
			modal.querySelector(trigger).addEventListener('click', () => {
				document.querySelector('.modal').remove();
				document.body.classList.remove('overflow-hidden');
			});
		}
		
		// remove_modal('.overlay');
		// remove_modal('.modal-footer .btn');
		await remove_modal('.modal-header .btn');
		await load_list(gallery.list);
		
		return modal;
	}
	
	template.appendChild(await page_header());
	template.appendChild(await page_body());
	await cuisine_list();
	await places_list();
	
	return template;
}