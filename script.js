class Bubble {
	id = 0
	type = ''
	color = 'red'
	startPosition = [0, 0]
	element = null
	container = null

	constructor(type, color, startPosition, id, container) {
		this.type = type
		this.color = color
		this.startPosition = startPosition
		this.id = id
		this.container = container
	}

	moveElement = () => {
		const element = this.element
		const container = this.container
		const containerRect = container.getBoundingClientRect()

		element.addEventListener('mousedown', (e) => {
			element.classList.add('dragged_element')
			const clickX = Math.floor(e.pageX - containerRect.left)
			const clickY = Math.floor(e.pageY - containerRect.top)

			const elementX = parseInt(element.style.left)
			const elementY = parseInt(element.style.top)

			let shiftX = clickX - elementX
			let shiftY = clickY - elementY

			const moveAt = (clickX, clickY) => {
				element.style.left = clickX - shiftX + 'px'
				element.style.top = clickY - shiftY + 'px'
			}
			const onMouseMove = (e) => {
				moveAt(Math.floor(e.pageX - containerRect.left), Math.floor(e.pageY - containerRect.top))
			}

			container.addEventListener('mousemove', onMouseMove)
			document.body.addEventListener('mouseup', () => {
				element.classList.remove('dragged_element')
				container.removeEventListener('mousemove', onMouseMove)
			})
		})
	}
	createElement = () => {
		this.element = document.createElement('div')
		this.element.classList.add(this.type)
		this.element.style.top = `${this.startPosition[0]}px`
		this.element.style.backgroundColor = this.color
		this.element.style.left = `${this.startPosition[1]}px`
		this.moveElement(this.element)
		this.element.addEventListener('dragstart', (e) => {
			e.preventDefault()
		})
		return this.element
	}
}

window.onload = function () {
	const addElementButton = document.querySelector('button')
	const board = document.querySelector('.draggable_area')
	const elements = []

	getRandomColor = () => {
		const letters = '0123456789ABCDEF'
		let color = '#'
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)]
		}
		return color
	}

	addElementButton.addEventListener('click', () => {
		const element = new Bubble('circle', getRandomColor(), [40, 40], elements.length, board)
		board.append(element.createElement())
		elements.push(element)
	})
}
