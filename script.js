class Calculator {
	constructor(previousOperandInput, currentOperandInput)
	{
		this.previousOperandInput = previousOperandInput
		this.currentOperandInput = currentOperandInput
		this.allClear()
	}

	allClear() {
		this.previousOperand = ''
		this.currentOperand = ''
		this.operator = undefined
	}

	clear() {
		this.previousOperand = ''
		this.currentOperand = ''
		this.operator = undefined
	}

	chooseOperator(operator) {
		if(this.currentOperand === '') return
		if(this.previousOperand !== '') {
			this.compute()
		}
		this.operator = operator
		this.previousOperand = this.currentOperand
		this.currentOperand = ''
	}

	compute() {
		let computation
		const prev = parseFloat(this.previousOperand)
		const current = parseFloat(this.currentOperand)
		if(isNaN(prev) || isNaN(current)) return
		switch(this.operator) {
			case '+': 
				computation = prev + current
			break;
			case '/':
				computation = prev / current 
			break;
			case '-': 
				computation = prev - current
			break;
			case 'x': 
				computation = prev * current
			break;
			default:
				return
			break;
		}
		this.currentOperand = computation
		this.operator = undefined
		this.previousOperand = ''
	}
	appendNumber(number)
	{
		if (number === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	displayNumber()
	{
		this.currentOperandInput.innerText = this.currentOperand
		this.previousOperandInput.innerText = this.previousOperand
	}
}

const numberButton = document.querySelectorAll('[data-number]')
const operatorButton = document.querySelectorAll('[data-operator]')
const allClear = document.querySelector('[data-all-clear]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandInput = document.querySelector('[data-previous-operand]')
const currentOperandInput = document.querySelector('[data-current-operand]')
const buttonSound = document.querySelector('audio.button-sound')

const calculator = new Calculator(previousOperandInput, currentOperandInput)

numberButton.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.displayNumber();
	})
})

operatorButton.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperator(button.innerText)
		calculator.displayNumber();
	})
})

equalsButton.addEventListener('click', button => {
	calculator.compute()
	calculator.displayNumber()
})

allClear.addEventListener('click', () => {
	calculator.clear();
	calculator.displayNumber();
})


