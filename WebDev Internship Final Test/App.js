var count=0;

function CustomValidation(input) {
	document.getElementById("strength").classList.remove('clear');
	this.invalidities = [];
	this.validityChecks = [];

	//add reference to the input node
	this.inputNode = input;

	//trigger method to attach the listener
	this.registerListener();
}

CustomValidation.prototype = {
	addInvalidity: function(message) {
		this.invalidities.push(message);
	},
	getInvalidities: function() {
		return this.invalidities.join('. \n'); 
	},
	checkValidity: function(input) {
		for ( var i = 0; i < this.validityChecks.length; i++ ) {

			var isInvalid = this.validityChecks[i].isInvalid(input);
			if (isInvalid) {
				this.addInvalidity(this.validityChecks[i].invalidityMessage);
									
			}

			var requirementElement = this.validityChecks[i].element;


			if (requirementElement) {

				if (isInvalid) {
					requirementElement.classList.add('invalid');
					requirementElement.classList.remove('valid');
				} else {
					requirementElement.classList.remove('invalid');
					requirementElement.classList.add('valid');
				}
				
			}								
		}
	},

	clearValidity : function(input) {
		for ( var i = 0; i < this.validityChecks.length; i++ ) {

			var requirementElement = this.validityChecks[i].element;
			requirementElement.classList.remove('valid');
			requirementElement.classList.remove('invalid');
		}
	},

	checkInput: function() {

		this.inputNode.CustomValidation.invalidities = [];
		this.checkValidity(this.inputNode);
											
		if ( this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '' ) {
			this.inputNode.setCustomValidity('');
			return true;
		} else {
			var message = this.inputNode.CustomValidation.getInvalidities();
			this.inputNode.setCustomValidity(message);
		}
		
	},
	registerListener: function() {

		var CustomValidation = this;
		this.inputNode.addEventListener('keyup', function() {
			CustomValidation.checkInput();
		});


	}

};

var usernameValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 5;
		},
		invalidityMessage: 'This input needs to be at least 5 characters',
		element: document.querySelector('label[for="username"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			var illegalCharacters = input.value[0].match(/[^a-zA-Z0-9]/g);
			return illegalCharacters ? true : false;
		},
		invalidityMessage: 'Only letters and numbers are allowed',
		element: document.querySelector('label[for="username"] .input-requirements li:nth-child(2)')
	}
];

var emailValidityChecks = [

	{
		isInvalid: function(input) {
			var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			var illegalCharacters = input.value.match(mailformat);
			return illegalCharacters ? false : true;
		},
		invalidityMessage: 'Incorrect format for email',
		element: document.querySelector('label[for="email"] .input-requirements li:nth-child(1)')
	}
];

var passwordValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 6 | input.value.length > 100;
		},
		invalidityMessage: 'This input needs to be between 8 and 100 characters',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			return !input.value.match(/[0-9]/g);
		},
		invalidityMessage: 'At least 1 number is required',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(2)')
	},
	{
		isInvalid: function(input) {
			return !input.value.match(/[a-z]/g);
		},
		invalidityMessage: 'At least 1 lowercase letter is required',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(3)')
	},
	{
		isInvalid: function(input) {
			return !input.value.match(/[A-Z]/g);
		},
		invalidityMessage: 'At least 1 uppercase letter is required',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(4)')
	},
	{
		isInvalid: function(input) {
			return !input.value.match(/[\!\@\#\$\%\^\&\*]/g);
		},
		invalidityMessage: 'You need one of the required special characters',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(5)')
	}
];

var ageValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 1;
		},
		invalidityMessage: 'This input is required',
		element: document.querySelector('label[for="age"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			var illegalCharacters = input.value.match(/[^0-9]/g);
			return illegalCharacters ? true : false;
		},
		invalidityMessage: 'Only letters and numbers are allowed',
		element: document.querySelector('label[for="age"] .input-requirements li:nth-child(2)')
	},
	{
		isInvalid: function(input) {
			return (input.value>=10&&input.value<=90) ? false : true;
		},
		invalidityMessage: 'Age should between 10 and 90',
		element: document.querySelector('label[for="age"] .input-requirements li:nth-child(3)')
	}
];


var usernameInput = document.getElementById('username');
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var ageInput = document.getElementById('age');

usernameInput.CustomValidation = new CustomValidation(usernameInput);
usernameInput.CustomValidation.validityChecks = usernameValidityChecks;

emailInput.CustomValidation = new CustomValidation(emailInput);
emailInput.CustomValidation.validityChecks = emailValidityChecks;

passwordInput.CustomValidation = new CustomValidation(passwordInput);
passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

age.CustomValidation = new CustomValidation(ageInput);
age.CustomValidation.validityChecks = ageValidityChecks;


var inputs = document.querySelectorAll('input:not([type="submit"])');


var submit = document.querySelector('input[type="submit"');
var reset = document.querySelector('input[type="reset"')


var form = document.getElementById('registration');
var password = document.getElementById('password');
var meter = document.getElementById('password-strength-meter');
var text = document.getElementById('password-strength-text');

var val = password.value;

function validate(event) {
	event.preventDefault();
	for (var i = 0; i < inputs.length; i++) {
		var check = inputs[i].CustomValidation.checkInput();
		if (check==true)	count++;
		if (count==4)	{
			
			document.getElementById("welcome").innerHTML = "Welcome " + document.getElementById("username").value;
			document.getElementById("form-valid").classList.remove('clear');
			document.getElementById("form-valid").classList.add('valid');
		}
	}
	
}

function clear(){
	location.reload();
}

submit.addEventListener('click', validate);
reset.addEventListener('click', clear);
form.addEventListener('submit', validate);
password.addEventListener('input', checkStrength);


/*Password Strength Detection-----------*/

var strength = {
		0: "Very Weak 😧",
		1: "Weak 😦",
		2: "Okay 🙁",
		3: "Good 😀",
		4: "Strong 😁"
}



function checkStrength()
{
	    var val = password.value;
		var result = zxcvbn(val);
	    // Update the password strength meter
	    meter.value = result.score;
	   
	    // Update the text indicator
	    if(val !== "") {
	        text.innerHTML = "Strength: " + "<strong>" + strength[result.score] + "</strong>" 
	        + "<span class='feedback'>" + result.feedback.warning + "</span"; 
	    }
	    else {
	        text.innerHTML = "";
	    }

}