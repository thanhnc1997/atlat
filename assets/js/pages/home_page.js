import {
	create_element
} from '../helper.js';

let data = await import('../data.js');
let flag = '';
let lang_default = 'VN';
let lang_switch = false;

if (localStorage.getItem('lang')) lang_default = localStorage.getItem('lang');

if (lang_default == 'VN') {
	data = data.VN;
	flag = 'background-image: url(/assets/images/VN.png)';
}

if (lang_default == 'EN') {
	data = data.EN;
	flag = 'background-image: url(/assets/images/UK.png)';
	lang_switch = true;
}

export async function render(params) {
	const template = create_element('section');
	template.classList.add('home-page');
	
	async function page_header() {
		let div = create_element('header'); 
		div.innerHTML = `
		<div class="lang-switcher ml-auto ${lang_default == 'EN' ? 'trigger' : ''}">
			<span class="slider" style="${flag}"></span>
			<span class="lang">
				<span id="EN">EN</span>
				<span class="ml-auto" id="VN">VN</span>
			</span>
		</div>
		`;
		
		div.querySelector('.lang-switcher').addEventListener('click', async (e) => {
			e.currentTarget.classList.toggle('trigger');
			lang_switch = !lang_switch;
			
			if (lang_switch == true) {
				e.currentTarget.querySelector('#EN').style.display = 'block';
				e.currentTarget.querySelector('#VN').style.display = 'none';
				e.currentTarget.querySelector('.slider').style.cssText = 'background-image: url(/assets/images/UK.png)';
				lang_default = 'EN';
				localStorage.setItem('lang', 'EN');
			}
			
			if (lang_switch == false) {
				e.currentTarget.querySelector('#EN').style.display = 'none';
				e.currentTarget.querySelector('#VN').style.display = 'block';
				e.currentTarget.querySelector('.slider').style.cssText = 'background-image: url(/assets/images/VN.png)';
				lang_default = 'VN';
				localStorage.setItem('lang', 'VN');
			}
			
			template.querySelector('.page').innerHTML = await page_content(lang_default);
		});
		
		return div;
	}
	
	async function page_content(lang) {
		let html = '';
		
		if (lang == 'VN') {
			html = `
			<h1><b>Đất nước Việt Nam</b></h1>
			<p>
				Nằm ở Đông Nam Á, Việt Nam là một đất nước nhỏ bé và xinh đẹp với lịch sử hào hùng, tinh thần yêu nước sâu sắc và phong cảnh tuyệt vời.<br><br>
				Việt Nam xã hội chủ nghĩa, được biết đến rộng rãi là Việt Nam, không phải là một cái tên xa lạ với toàn thế giới.
			</p>
			<a class="btn" href="/category/id=1" style="background: #ACD7FF; color: #00328E; font-size: 16px; padding: 18px; height: auto;"><b>Khám phá</b></a>
			`;
		}
		
		if (lang == 'EN') {
			html = `
			<h1><b>Việt Nam (Vietnam)</b></h1>
			<p>
				Located in Southeast Asia, Vietnam is a small and beautiful country with victorious history, profound patriotism and wonderful landscapes.<br><br>
				The Socialist Republic of Vietnam, widely known as Vietnam, is not a strange name to the whole world.
			</p>
			<a class="btn" href="/category/id=1" style="background: #ACD7FF; color: #00328E; font-size: 16px; padding: 18px; height: auto;"><b>Explore now</b></a>
			`;
		}
		
		return html;
	}
	
	async function page_body() {
		let div = create_element('div');
		div.classList.add('page');
		div.innerHTML = await page_content(lang_default);
		
		return div;
	}
	
	template.appendChild(await page_header());
	template.appendChild(await page_body());
	
	return template;
}