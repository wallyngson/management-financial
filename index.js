const modalChange = {
  open() {
    document.querySelector('.modal-overlay').classList.add('active')
  },
  
  close() {
    document.querySelector('.modal-overlay').classList.remove('active')
  }
}

const transactions = [
  {
    id: 1,
    descrition: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    id: 2,
    descrition: 'Website',
    amount: 51000,
    date: '24/01/2021'
  },
]

const Transaction = {
  incomes() {
    // somar as entradas
  },

  expenses() {
    // somar as saídas
  },

  total() {

  }
}

const DOM = {
  transactionContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = this.innerHTMLTransaction(transaction) 

    DOM.transactionContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    // const amount = 

    // criando uma máscara do HTML...
    const html = `
      <td class="description">${transaction.descrition}</td>
      <td class=${CSSclass}>${transaction.amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="">
      </td>
    `

    return html
  }
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) > 0 ? "" : "-"
  },
}

// incluido todos as entradas e saidas...
transactions.forEach(transaction => {
  DOM.addTransaction(transaction)
})

// CHANGE COLOR

const root = document.documentElement

function changeColor() {
  if (this.checkbox.checked) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}







