/*
new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		541: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
	menuButton.classList.toggle('menu-button-active');
	menu.classList.toggle('header-active');
})
*/ 
const getElement = (tagName, classNames, attributes) =>{
	const element = document.createElement(tagName);

	if (classNames){
		element.classList.add(...classNames);
	}

	if (attributes){
		for (const attribute in attributes){
			element[attribute] =attributes[attribute];
		}
	}

	return element;
};


const createHeader  = ({title, header:{logo, menu, social,headerButton}}) =>{
	const header = getElement('header');
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);

	if (logo){
		const logoI = getElement('img', ['logo'],{
		src: logo,
		alt: 'Логотип ' + title,
		});
		wrapper.append(logoI);
	}
	if (menu){
		const headerNav = getElement('nav',['menu-list']);
		const allHeaderNav = menu.map(item=>{
			const menuLink = getElement('a', ['menu-link']);
			menuLink.textContent= item.title; 
			menuLink.href = item.link;
			return menuLink;
		});
		headerNav.append(...allHeaderNav);
		wrapper.append(headerNav);

	}
	if (social){
		const socialWrapper = getElement('div', ['social']);
		const allSocial = social.map (item => {
			const socialLink = getElement('a', ['social-link']);
			socialLink.append(getElement('img',[], {
				src:item.image,
				alt:  item.title,
			}));

			socialLink.href = item.link;

			return socialLink;


		});
		console.log(allSocial);
		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}
	
	if (menu){
		const menuBtn = getElement('button', ['menu-button']);
		menuBtn.addEventListener('click', ()=>{
			menuBtn.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		});

		container.append(menuBtn);

	}
	

	header.append(container);
	container.append(wrapper);

	return header;

};







const createMain = ({title, main: {genre,rating, description, trailer, slider}}) =>{
	
	const main = getElement('main');
	const container = getElement ('div', ['container']);
	main.append(container);
	const wrapper = getElement ('div', ['main-content']);
	container.append(wrapper);
	const content = getElement ('div', ['content']);
	wrapper.append(content);
    //<span class="genre animated fadeInRight">2019,фэнтези</span>
	if (genre){
		const genreSpan = getElement('span',
			['genre', 'animated', 'fadeInRight'],
			{textContent: genre}
		);

		content.append(genreSpan);
	}

	if (rating){
		const ratingBlock = getElement('div',['rating', 'animated', 'fadeInRight']);
		const ratingStars = getElement('div',['rating-stars']) ;
		const ratingNumber = getElement('div',['rating-number'], {
			textContent:`${rating}/10`,
		});

		for (let i = 0; i<10; i++){
			const star = getElement('img',['star'], {
				alt: i ? '' :`Рейтинг ${rating} из 10`,
				src:  i<rating ? 'img/star.svg':'img/star-o.svg',
			});
			ratingStars.append(star);
		}

		ratingBlock.append(ratingStars, ratingNumber);
		content.append(ratingBlock);
	}
	//<h1 class="main-title animated fadeInRight">Ведьмак</h1>

	content.append(getElement('h1',['main-title', 'animated', 'fadeInRight'],{
		textContent: title,
	}));

	//<p class="main-description animated fadeInRight">
	if (description){
		content.append(getElement('p', ['main-description', 'animated', 'fadeInRight'],{
			textContent:description,
		}));
	}

	//<a href="https://www.youtube.com/watch?v=P0oJqfLzZzQ" class="button animated fadeInRight youtube-modal">Смотреть трейлер</a>
	if (trailer){
		const youtubeLink = getElement('a', 
		['button', 'animated', 'fadeInRight', 'youtube-modal'],
		{href:trailer, textContent : 'Смотреть трейлер'} );

		
		
		//<a href="https://www.youtube.com/watch?v=P0oJqfLzZzQ" class="play youtube-modal">
		const youtubeImageLink = getElement('a', ['play', 'youtube-modal'], {
			href:trailer,
			ariaLabel:'Смотреть трейлер',
		});
		// <img src="img/play.svg" alt="play" class="play-img">

		const IconPlay = getElement('img',['play-img'],{
			alt:'Смотреть трейлер',
			src:'img/play.svg',
			ariaHidden: true,
		});
		content.append(youtubeLink);
		youtubeImageLink.append(IconPlay);
		wrapper.append(youtubeImageLink);
		
	}
	if (slider){
		const sliderBlock= getElement('div',['series']);
		const swiperBlock= getElement('div',['swiper-container']);
		const swiperWrapper= getElement('div',['swiper-wrapper']);
		const arrow= getElement('button',['arrow']);
		
		const slides = slider.map((item)=>{

			const swiperSlide = getElement('div',['swiper-slide']);
			const card = getElement('figure',['card']);
			const cardImage = getElement('img',['card-img'],{
				src: item.img,
				alt: (item.title ? item.title + ' ' :'')+(item.subtitle ? item.subtitle:''),
			})

			card.append(cardImage);

			if (item.title || item.subtitle){
				const cardDescription = getElement('figcaption',['card-description']);
				cardDescription.innerHTML = `
				${item.subtitle?`<p class="card-subtitle">${item.subtitle}</p>`:''}
				${item.title?`<p class="card-title">${item.title}</p>`:''}
				`;
				card.append(cardDescription);
			}
			swiperSlide.append(card);
			return swiperSlide;
		});

		swiperWrapper.append(...slides);
		swiperBlock.append(swiperWrapper);
		sliderBlock.append(swiperBlock,arrow);

		container.append(sliderBlock);

		new Swiper(swiperBlock, {
			loop: true,
			navigation: {
				nextEl: arrow,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});

	}

	return main;
};


const createFooter = ({footer:{copyright,footerLink}}) =>{
	const footer = getElement('footer',[]);
	const footerContainer = getElement('div',['container']);
	const footerConatent = getElement('div',['footer-content']);
	const footerSubContent = getElement('div',['left']);
	const footerSubContenRight = getElement('div',['right']);
	const navFoteer = getElement('nav', ['footer-menu']);
	

	if (copyright){
		const footerSpan = getElement('span',['copyright']);
		footerSpan.textContent = copyright;
		footerSubContent.append(footerSpan);
	}
	
	if (footerLink){
		const footerLinks = footerLink.map((item)=>{
			const footerlLinkA = getElement('a',['footer-link'],{
				href:item.href,
				textContent:item.title,
			});
			return footerlLinkA;
		});
		navFoteer.append(...footerLinks);}




	
	
	footerSubContenRight.append(navFoteer);
	footerConatent.append(footerSubContenRight);
	footerConatent.append(footerSubContent);
	footerContainer.append(footerConatent);
	footer.append(footerContainer);


	return footer;

};


const movieConstructor = (selector, options) =>{

	const app = document.querySelector(selector);
	app.classList.add('body-app');

	app.style.color = options.fontColor || '';
	app.style.backgroundColor = options.backgroundColor||'';
	 
	if (options.subColor){
		document.documentElement.style.setProperty('--sub-color', options.subColor);
	}

	if (options.favicon){
		const index = options.favicon.lastIndexOf('.');
		const type = options.favicon.substring(index+1);
		
		const pageLogo = getElement('link',[],{
			rel:"icon",
			href:options.favicon,
			type:'image/' + (type === 'svg'? 'svg-xml': type),
	});
		document.head.append(pageLogo);
	}

	app.style.backgroundImage = options.background ?
		`url("${options.background}")` : '';

	document.title = options.title;

	

	if (options.header){
		app.append(createHeader(options));
	}

	if (options.main){
		app.append(createMain(options));
	}

	if (options.footer){
		app.append(createFooter(options));
	}


};

movieConstructor('.app', {
	title:'Локи',
	background:'background.jpg',
	favicon:'logo.png',
	fontColor:'#ffffff',
	backgroundColor:'#141218',
	subColor:'#9D2929',
	header:{
		logo: 'logo.png',
		social: [
			{
				title:'facebook',
				link:'https://facebook.com',
				image: 'social/facebook.svg',

			},
			{
				title:'instagram',
				link:'https://instagram.com',
				image: 'social/instagram.svg',
			},
			{
				title:'twitter',
				link:'https://twitter.com',
				image:'social/twitter.svg',
			},
		],

		menu:[
			{
				title:'Описание',
				link:'#',
			},
			{
				title:'Трейлер',
				link:'#',
			},
			{
				title:'Отзывы',
				link:'#',
			},
		],
		headerButton:true,
	},
	main:{
		genre:'2021, фантастика, фэнтези, боевик, приключения',
		rating:'10',
		description:'Локи попадает в таинственную организацию «Управление временными изменениями» после того, как он украл Тессеракт, и путешествует во времени, меняя историю.',
		trailer:'https://youtu.be/YrjHcYqe31g',
		slider:[
			{
				img:'series/series-1.jpg',
				title:'Славная миссия',
				subtitle:'Серия-1',
			},
			{
				img:'series/series-2.jpg',
				title:'Вариант',
				subtitle:'Серия-2',
			},
			{
				img:'series/series-3.jpg',
				title:'Ламентис',
				subtitle:'Серия-3',
			},
			{
				img:'series/series-4.jpg',
				title:'Смежное событие',
				subtitle:'Серия-4',
			},
			{
				img: 'series/series-5.jpg',
				title: 'Путешествие в неизвестность',
				subtitle: 'Серия №5',
			  },
			  {
				img: 'series/series-6.jpg',
				title: 'На все времена. Всегда',
				subtitle: 'Серия №6',
			  }
		],
	},
	footer:{
		copyright:'© 2020. All right reserved.',
		footerLink:[
			{
				href:'#',
				title:'Privacy Policy',
			},
			{
				href:'#',
				title:'Terms of Service',
			},
			{
				href:'#',
				title:'Legal',
			},
			
		],
	},
});





