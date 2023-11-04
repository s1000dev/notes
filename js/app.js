document.addEventListener('DOMContentLoaded', function () {

	let clear = document.getElementById('clear');
	clear.addEventListener('click', () => {localStorage.clear();localStorage.setItem('quantity', 0);localStorage.setItem('working', false);localStorage.setItem('profiles', JSON.stringify({}));});

	let login = document.getElementById('login');
	let register = document.getElementById('register');
	
	let nameLogin = document.getElementById('nameLogin');
	let pass = document.getElementById('pass');
	let passConfirm = document.getElementById('passConfirm');

	let loginName = document.getElementById('loginName');
	let loginPass = document.getElementById('loginPass');

	//!registration

	if(localStorage.getItem('quantity') == null){
		localStorage.setItem('quantity', 0);
	}
	localStorage.setItem('working', false);
	if(localStorage.getItem('profiles') == null){
		localStorage.setItem('profiles', JSON.stringify({}));
	}

	register.addEventListener('click', function(e){
		e.preventDefault();

		let nameLog = nameLogin.value;
		let password = pass.value;

		if(checkPasswords() && localStorage.getItem(nameLog) == null){
			localStorage.setItem(`${nameLog}`, password);
			let notes = localStorage.getItem('profiles');
			let profs = JSON.parse(notes);
			profs[nameLog] = [{'first note': 'and first text'}];
			localStorage.setItem('profiles', JSON.stringify(profs));
			localStorage.setItem(`${nameLog}`, password);
			let quantity = localStorage.getItem("quantity");
			localStorage.setItem("quantity", ++quantity);
			alert('You successfully registered!');
			nameLogin.value = '';
			pass.value = '';
			passConfirm.value = '';
		} else{
			alert('Theres already user with that username');
		}

	})

	function checkPasswords(){
		if(pass.value === passConfirm.value){
			return true;
		} else{
			alert('Passwords aren`t the same');
		}
	}

	//! login

	let body = document.querySelector('.body');
	
	login.addEventListener('click', function(e){
		e.preventDefault();
		
		if (localStorage.getItem(`${loginName.value}`) != null &&
		localStorage.getItem(`${loginName.value}`) == loginPass.value &&
		localStorage.getItem(`${loginName.value}`) != 'profile'){
			console.log('success');

			localStorage.setItem('profile', loginName.value);
			localStorage.setItem('working', true);
			window.location.href = 'notes.html';
		} else{
			alert('There`s no such person or your password is incorrect!');
		}
	})
})
