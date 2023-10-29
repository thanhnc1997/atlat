import {
	create_element
} from '../helper.js';

const data;

if 

export async function render(params) {
	const {id} = params;
	const detail = data.filter(item => item.id == id)[0];
	
	const template = create_element('section');
	template.classList.add('detail-page');
	
	async function page_header() {
		const div = create_element('header');
		div.innerHTML = `
		<figure style="background-image: url(${detail.thumbnail})">
			<figcaption>
				<div class="d-flex align-items-center justify-content-between mb-auto" style="padding: 20px 0 0;">
					<span onclick="history.back()" class="round-icon">
						<img src="/assets/images/icons/arrow_left.svg">
					</span>
					<h3 style="color: #fff;">Chi tiết</h3>
					<span class="round-icon">
						<img src="/assets/images/icons/copy.svg">
					</span>
				</div>

				<div class="name">
					<h3 class="mb-6">${detail.name}</h3>
					<p class="d-flex align-items-center">
						<img class="mr-6" src="/assets/images/icons/map_pin.svg">
						<span>${detail.sub}</span>
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
					<small class="d-block mb-6">Dân số</small>
					<b style="font-size: 16px;">${detail.administrative.population}</b>
				</p>
			</div>
			<div class="info d-flex align-items-center">
				<span class="round-icon mr-12">
					<img src="/assets/images/icons/area.svg">
				</span>
				<p>
					<small class="d-block mb-6">Diện tích</small>
					<b style="font-size: 16px;">${detail.administrative.area}</b>
				</p>
			</div>
			<div class="info d-flex align-items-center">
				<span class="round-icon mr-12">
					<img src="/assets/images/icons/map.svg">
				</span>
				<p>
					<small class="d-block mb-6">Quận</small>
					<b style="font-size: 16px;">${detail.administrative.disticts}</b>
				</p>
			</div>
			<div class="info d-flex align-items-center">
				<span class="round-icon mr-12">
					<img src="/assets/images/icons/map.svg">
				</span>
				<p>
					<small class="d-block mb-6">Huyện</small>
					<b style="font-size: 16px;">${detail.administrative.towns}</b>
				</p>
			</div>
		</div>
		
		<h4 class="mb-12">Giới thiệu</h4>
		<p class="mb-18 text-justify">${detail.desc || ''}</p>
		
		${
		detail.cuisine
		? `
		<h4 class="mb-12">Ẩm thực</h4>
		<p class="mb-18 text-justify">${detail.cuisine.desc}</p>
		<div class="overflow-hidden">
			<div class="gallery-list" id="cuisine">
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
		if (!detail.cuisine) return false;
		detail.cuisine.list.map(cuisine => {
			const div = create_element('div');
			div.classList.add('item');
			div.innerHTML = `
			<figure style="background-image: url(${cuisine.thumbnail})"></figure>
			`;
			
			div.addEventListener('click', async () => {
				document.body.appendChild(await pop_up({
					html: `
					<figure class="mb-18 pop-up-img" style="background-image: url(${cuisine.thumbnail});">
						<figcaption><h3>${cuisine.name}</h3></figcaption>
					</figure>
					<p class="text-justify" style="padding: 0 14px;">${cuisine.desc}</p>
					`
				}));
			});
			
			template.querySelector('#cuisine .track').appendChild(div);
		});
	}
	
	async function pop_up(params) {
		document.body.classList.add('overflow-hidden');
		
		const div = create_element('div');
		div.classList.add('modal');
		div.innerHTML = `
		<div class="overlay"></div>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					${params.html}
				</div>
				<div class="modal-footer text-right">
					<button class="btn btn-light">Đóng</button>
				</div>
			</div>
		</div>
		`;
		
		async function remove_modal(trigger) {
			div.querySelector(trigger).addEventListener('click', () => {
				document.querySelector('.modal').remove();
				document.body.classList.remove('overflow-hidden');
			});
		}
		
		remove_modal('.overlay');
		remove_modal('.modal-footer .btn');
		
		return div;
	}
	
	template.appendChild(await page_header());
	template.appendChild(await page_body());
	await cuisine_list();
	
	return template;
}