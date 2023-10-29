import {
	create_element
} from '../helper.js';

let data = await import('../data.js');
let flag = '';
let lang_default = 'VN';

if (localStorage.getItem('lang')) lang_default = localStorage.getItem('lang');

if (lang_default == 'VN') {
	data = data.VI;
	flag = 'background-image: url(/assets/images/VN.png)';
}

if (lang_default == 'EN') {
	data = data.EN;
	flag = 'background-image: url(/assets/images/UK.png)';
}

console.log(data);

export async function render(params) {
	const template = create_element('section');
	template.classList.add('home-page');
	
	async function page_header() {
		let lang_switch = false;
		
		let div = create_element('header'); 
		div.innerHTML = `
		<div class="lang-switcher ml-auto">
			<span class="slider" style="${flag}"></span>
			<span class="lang">
				<span id="EN" style="display: ${lang_switch == true ? 'block' : 'none'}">EN</span>
				<span class="ml-auto" id="VN" style="display: ${lang_switch == false ? 'block' : 'none'}">VN</span>
			</span>
		</div>
		`;
		
		div.querySelector('.lang-switcher').addEventListener('click', (e) => {
			e.currentTarget.classList.toggle('trigger');
			lang_switch = !lang_switch;
			
			if (lang_switch == true) {
				e.currentTarget.querySelector('#EN').style.display = 'block';
				e.currentTarget.querySelector('#VN').style.display = 'none';
				e.currentTarget.querySelector('.slider').style.cssText = 'background-image: url(/assets/images/UK.png)';
				localStorage.setItem('lang', 'EN');
			}
			
			if (lang_switch == false) {
				e.currentTarget.querySelector('#EN').style.display = 'none';
				e.currentTarget.querySelector('#VN').style.display = 'block';
				e.currentTarget.querySelector('.slider').style.cssText = 'background-image: url(/assets/images/VN.png)';
				localStorage.setItem('lang', 'VN');
			}
		});
		
		return div;
	}
	
	async function page_body() {
		let div = create_element('div');
		div.classList.add('page');
		div.innerHTML = `
		<h1><b>Đất nước Việt Nam</b></h1>
		`;
		
		return div;
	}
	
	template.appendChild(await page_header());
	template.appendChild(await page_body());
	
	return template;
}