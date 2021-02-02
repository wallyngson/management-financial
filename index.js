const modalChange = {
  open() {
    document.querySelector('.modal-overlay').classList.add('active')
  },
  
  close() {
    document.querySelector('.modal-overlay').classList.remove('active')
  }
}

const root = document.documentElement

function changeColor() {
  if (this.checkbox.checked) {
    root.classList.add('dark')
    console.log('sss')
  } else {
    root.classList.remove('dark')
    console.log('saaa')
  }
}







