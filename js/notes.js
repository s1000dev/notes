document.addEventListener('DOMContentLoaded', function(){
	let exit = document.querySelector('#exit');
	let logo = document.querySelector('#logo');
	let body = document.querySelector('body');
	let profile = localStorage.getItem('profile');
	localStorage.setItem('adding', false);
	
				exit.addEventListener('click', function(e){
					e.preventDefault();
					
					if(confirm('Do you wanna quit?')){
						localStorage.setItem('profile', '');
						localStorage.setItem('working', false);
						window.location.href = 'index.html';
					}
				})  

				logo.addEventListener('click', function(e){
					e.preventDefault();
					
					if(confirm('Do you wanna quit?')){
						localStorage.setItem('profile', '');
						localStorage.setItem('working', false);
						window.location.href = 'index.html';
					}
				})  
				
	function showNotes(){
		let list = document.querySelector('.notes__inner');
		let notes = JSON.parse(localStorage.getItem('profiles'));
		let user = notes[profile];
		for(let i = 0; i < user.length;i++){
			let key = Object.keys(user[i]);
			list.innerHTML += createNote(key, user[i][key], i);
		}

		let removes = document.querySelectorAll('#remove');
		removes.forEach(el => {
			el.addEventListener('click', function(e){
				e.preventDefault();

				let note = e.target.closest('.note');
				let inner = e.target.closest('.note__inner');
				let heading = inner.childNodes[1].childNodes[3].textContent;
				let notes = JSON.parse(localStorage.getItem('profiles'));
				let user = notes[localStorage.getItem('profile')];
				for(let i = 0; i < user.length;i++){
					let key = Object.keys(user[i]);
					if(key == heading){
						user.splice(i, 1);
					}
				}
				localStorage.setItem('profiles', JSON.stringify(notes));
				note.remove();
			})
		})
		
	}

	function modal(){
		let allnotes = document.querySelectorAll('.note');
			allnotes.forEach(el => {
				el.addEventListener('click', function(e){
					e.preventDefault();

					if(!e.target.closest('#remove')){

					let heading = e.target.closest('.note').childNodes[1].childNodes[1].childNodes[3].textContent;
					let text = e.target.closest('.note').childNodes[1].childNodes[3].textContent;

					main.innerHTML = `<section class="big">
					<div class="container">
						<div class="big__inner">
							<a href="#" class="big__exit" id="bigExit"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" viewBox="0 0 32 30" fill="none">
							<path d="M31.6318 24C31.6318 24.6504 31.3862 25.2032 30.895 25.6585L27.316 28.9756C26.8248 29.4309 26.2283 29.6585 25.5265 29.6585C24.8248 29.6585 24.2283 29.4309 23.7371 28.9756L16.0002 21.8049L8.26339 28.9756C7.77216 29.4309 7.17567 29.6585 6.47392 29.6585C5.77216 29.6585 5.17567 29.4309 4.68444 28.9756L1.10549 25.6585C0.614266 25.2032 0.368652 24.6504 0.368652 24C0.368652 23.3496 0.614266 22.7967 1.10549 22.3415L8.84234 15.1707L1.10549 8C0.614266 7.54471 0.368652 6.99187 0.368652 6.34146C0.368652 5.69105 0.614266 5.13821 1.10549 4.68292L4.68444 1.36585C5.17567 0.910565 5.77216 0.682922 6.47392 0.682922C7.17567 0.682922 7.77216 0.910565 8.26339 1.36585L16.0002 8.53658L23.7371 1.36585C24.2283 0.910565 24.8248 0.682922 25.5265 0.682922C26.2283 0.682922 26.8248 0.910565 27.316 1.36585L30.895 4.68292C31.3862 5.13821 31.6318 5.69105 31.6318 6.34146C31.6318 6.99187 31.3862 7.54471 30.895 8L23.1581 15.1707L30.895 22.3415C31.3862 22.7967 31.6318 23.3496 31.6318 24Z" fill="#FF6969"/>
						</svg></a>
							<img src="./img/bigCat.png" alt="">
							<strong type="text" class="big__heading">${heading}</strong>
							<p type="text" class="big__text">${text}</p>
							<a href="#" class="big__exit" id="bigDelete"><img src="img/bi_trash3-fill.svg" alt=""></a>
						</div>
					</div>
				</section>`;

				let bigDelete = document.querySelector('#bigDelete');
				bigDelete.addEventListener('click', function(e){
					e.preventDefault();
					let note = e.target.closest('.note');

					let notes = JSON.parse(localStorage.getItem('profiles'));
					let user = notes[localStorage.getItem('profile')];
					for(let i = 0; i < user.length;i++){
						let key = Object.keys(user[i]);
						if(key == heading){
							user.splice(i, 1);
						}
					}
					localStorage.setItem('profiles', JSON.stringify(notes));
					main.innerHTML = `<section class="notes">
				<div class="container">
					<ul class="notes__inner">
						
					</ul>
				</div>
			</section>`;
					showNotes();
				})

				let bigExit = document.querySelector('#bigExit');
				bigExit.addEventListener('click', function(e){
					e.preventDefault();
					
					main.innerHTML = `<section class="notes">
				<div class="container">
					<ul class="notes__inner">
						
					</ul>
				</div>
			</section>`;
					showNotes();
					modal();
				})
				}
				})
			})
	}

	checkIt();
	function checkIt(){
		let add = localStorage.getItem('adding');

		if(add != 'true'){
			showNotes();
			modal();
		} else {
			let heading = document.querySelector('.big__heading');
			let text = document.querySelector('.big__text');
			let sumbit = document.getElementById('submit');
			
			sumbit.addEventListener('click', function(e){
				e.preventDefault();
		
				let hea = heading.value;
				let tex = text.value;
				
				let notes = JSON.parse(localStorage.getItem('profiles'));
				let user = notes[profile];
				localStorage.setItem('adding', false);
		
				user[user.length] = {[hea]: tex};
				localStorage.setItem('profiles', JSON.stringify(notes));
				main.innerHTML = `<section class="notes">
				<div class="container">
					<ul class="notes__inner">
						
					</ul>
				</div>
			</section>`;
				showNotes();
				modal();
			})
		}
	}
	
	

	
	function createNote(heading, text, iter){
		let direction;
		if(iter % 2 == 0){
			direction = 'left';
		} else{
			direction = 'right';
		}
		return `<li class="notes__note note note-${direction}">
		<div class="note__inner">
			<div class="note__top">
				<img src="img/cat.png" alt="">
				<strong class="note__heading">${heading}</strong>
			</div>
			<p class="note__text">${text}</p>
			<div class="note__bottom">
				<a href="#" class="note__close" id='remove'>
					<img src="img/bi_trash3-fill.svg" alt="">
				</a>
			</div>
		</div>
		</li>`; 
	}
	
	let create = document.getElementById('create');
	let main = document.querySelector('.main');
	
	let big = `<section class="big">
	<div class="container">
		<div class="big__inner">
			<img src="img/bigCat.png" alt="">
			<input type="text" class="big__heading">
			<input type="text" class="big__text">
			<a href="#" class="big__submit" id="submit"><img src="img/free-sticker-floppy-disc-8136619.png" alt=""></a>
		</div>
	</div>
</section>`;

	create.addEventListener('click', function(e){
		e.preventDefault();
	
		main.innerHTML = big;

		localStorage.setItem('adding', true);
	
		checkIt();
	})
})