const notes = document.getElementsByClassName('notes__wrapp-note')
const notestWrapp = document.querySelector('.notes__wrapp')
const bin = document.querySelector('.notes__bin')
const line = bin.querySelector('line')
const wrapp = document.querySelector('.notes')
let clientX
let clientY
export const initEvent = () => {
	;[...notes].forEach(e =>
		e.addEventListener('mousedown', e => {
			e.target.style.position = 'absolute'
			e.target.style.zIndex = '100'
			e.target.moveActive = true

			if (e.target.moveActive === true) {
				move(e.target, e.offsetY, e.offsetX)
			}
		})
	)
}

const move = (element, noteY, noteX) => {
	document.addEventListener('mousemove', e => {
		const elementRect = element.getBoundingClientRect()
		clientY = e.clientY - noteY
		clientX = e.clientX - noteX

		if (element.moveActive && clientX < window.innerWidth - elementRect.width) {
			element.style.left = `${clientX}px`
			element.style.top = `${clientY - 200}px`

			let elPoint = document.elementFromPoint(e.clientX, e.clientY)
			let binTarget = elPoint.closest('.n.notes__bin')
			
			if (clientY >= window.innerHeight - 200 || clientX === window.innerWidth - 200) {
				e.target.style.zIndex = '100'
				e.target.classList.add('active')
				line.style.strokeDashoffset = -1000
				console.log(binTarget);
				initListenerItem(element)
				
				
			} else {
				e.target.classList.remove('active')
				line.style.strokeDashoffset = -1
		e.target.removeEventListener('mouseup', removeItem)
			}
		} else if (element.moveActive && clientX > window.innerWidth - elementRect.width) {
			clientX = window.innerWidth - elementRect.width
			element.style.left = `${clientX}px`
			element.style.top = `${clientY - 200}px`
		}

		if (element.moveActive && clientY < window.innerHeight - elementRect.height) {
			element.style.left = `${clientX}px`
			element.style.top = `${clientY - 200}px`
		} else if (element.moveActive && clientY > window.innerHeight - elementRect.height) {
			clientY = window.innerHeight - elementRect.height
			element.style.left = `${clientX}px`
			element.style.top = `${clientY - 200}px`
		}
	})
}



const removeItem = item => {
	item.target.remove()
	line.style.strokeDashoffset = 0
}

const initListenerItem = item => {
	item.addEventListener('mouseup', removeItem)
}

export const closeMove = () => {
	document.addEventListener('mouseup', e => {
		e.target.moveActive = false
		e.target.style.zIndex = '0'
	})
}
