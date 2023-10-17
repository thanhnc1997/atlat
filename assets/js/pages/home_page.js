import {
	create_element
} from '../helper.js';

import {
	data
} from '../data.js';

let typing_timer = null;

export async function render() {
	const template = create_element('section');
	template.classList.add('home-page');
	
	async function page_header() {
		const div = create_element('header');
		div.innerHTML = `
		<h1 class="text-center">Đồng bằng <br> sông Hồng</h1>
		`;
		
		return div;
	}
	
	async function done_typing(params) {
		const filter_data = data.filter(item => {
			return item.name.toLocaleLowerCase().includes(params.value);
		});
		
		await render_list(filter_data);
	}
	
	async function search_form() {
		const div = create_element('div');
		div.classList.add('search-form');
		div.innerHTML = `
		<div class="search-box">
			<img class="mr-8" src="/assets/images/icons/search.svg">
			<input class="input" name="search" placeholder="Tìm kiếm tỉnh, thành phố">
		</div>
		`;
		
		div.querySelector('input').addEventListener('input', e => {
			clearTimeout(typing_timer);
			typing_timer = setTimeout(async () => {
				await done_typing({value: e.target.value});
			}, 250);
		});
		
		return div;
	}
	
	async function list() {
		const ul = create_element('ul');
		ul.classList.add('list');
		
		return ul;
	}
	
	async function render_list(params) {
		template.querySelector('.list').innerHTML = '';
		
		params.map(item => {
			const li = create_element('li');
			li.innerHTML = `
			<a href="/detail/id=${item.id}">
				<figure style="background-image: url(${item.thumbnail})">
					<figcaption>
						<div class="mt-auto d-flex align-items-center">
							<h3 class="mr-auto">${item.name}</h3>
							<span class="round-icon">
								<img src="/assets/images/icons/arrow_right.svg">
							</span>
						</div>
					</figcaption>
				</figure>
			</a>
			`;
			
			template.querySelector('.list').appendChild(li);
		});
	}
	
	template.appendChild(await page_header());
	template.appendChild(await search_form());
	template.appendChild(await list());
	await render_list(data);
	
	return template;
}