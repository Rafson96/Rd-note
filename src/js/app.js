require('../sass/style.scss')
import 'material-icons/iconfont/material-icons.css'
import { initEvent, closeMove } from './move.js'

// initEvent()
document.addEventListener('DOMContentLoaded', () => {
	//variabels

	const wrappBtn = [...document.querySelectorAll('.notes__btns')]
	const popup = document.querySelector('.notes__popup')
	const noteTemp = document.querySelector('.template-notes')
	const notestWrapp = document.querySelector('.notes__wrapp')
	const noteText = document.querySelector('.notes__text')
	const select = document.querySelector('.notes__popup-select')
	const error = document.querySelector('.notes__popup-error')
	const note = noteTemp.content.cloneNode(true)
	const notes = document.getElementsByClassName('notes__wrapp-note')
	let idNote = 0
	let itemLeft = 0 
	//function

	const popupActive = visibilityValue => {
		popup.style.visibility = visibilityValue
	}

	const showError = visibilityValue => {
		error.style.visibility = visibilityValue
	}

	const showErrorHidden = () => {
		noteText.addEventListener('keyup', () => {
			error.style.visibility = 'hidden'
		})
	}

	const removeAll = () => {
		;[...notes].forEach(e => e.remove())
	}

	const setColor = (index, note) => {
		if (index === 1) {
			note.style.backgroundColor = 'yellow'
		} else if (index === 2) {
			note.style.backgroundColor = 'red'
		}
	}

	showErrorHidden()

	const addNote = () => {
		idNote++
		const note = noteTemp.content.cloneNode(true)
		const textNote = note.querySelector('.notes__wrapp-note-text')
		textNote.textContent = noteText.value
		const titleNote = select.options[select.selectedIndex].text
		textNote.previousElementSibling.textContent = titleNote
		notestWrapp.appendChild(note)
		textNote.parentElement.setAttribute('id', idNote)
		popupActive('hidden')
		noteText.value = ''
		setColor(select.options[select.selectedIndex].index, textNote.parentElement)
		if (textNote.parentElement.getAttribute('id') * 1 === idNote) {
			textNote.parentElement.style.left = `${itemLeft}px`
			itemLeft += 250
			console.log(itemLeft)
		}
	}

	wrappBtn.forEach(e =>
		e.addEventListener('click', e => {
			e.stopPropagation()
			let btnClass = e.target.classList
			switch (true) {
				case btnClass.contains('button--remove'):
					{
						removeAll()
					}
					break
				case btnClass.contains('button--add'):
					{
						popupActive('visible')
					}
					break
				case btnClass.contains('button__popup--cancel'):
					{
						popupActive('hidden')
						showError('hidden')
					}
					break
				case btnClass.contains('button__popup--add'): {
					if (noteText.value !== '') {
						addNote()
						initEvent()
						closeMove()
					} else {
						showError('visible')
					}
				}
			}
		})
	)
})
