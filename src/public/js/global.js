window.addEventListener('beforeunload', () => {
	const el = document.querySelector('.container')
	el.classList.add('fade-out')
})