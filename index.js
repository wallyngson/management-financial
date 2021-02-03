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
    let income = 0

    transactions.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount
      }
    })

    return income
  },

  expenses() {
    let expense = 0

    transactions.forEach(transaction => {
      if (transaction.amount < 0) {
        expense += transaction.amount
      }
    })

    return expense
  },

  total() {
    return this.incomes() + this.expenses()
  }
}

const DOM = {
  transactionContainer: document.querySelector('#data-table tbody'),

  // criando uma nova transação...
  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = this.innerHTMLTransaction(transaction) 

    DOM.transactionContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction) {
    // definido qual a cor para números negativos e positivos...
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    // chamando a função que formata o valor...
    const amount = Utils.formatCurrency(transaction.amount)

    // criando uma máscara do HTML...
    const html = `
      <td class="description">${transaction.descrition}</td>
      <td class=${CSSclass}>${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="">
      </td>
    `

    return html
  },

  // atualiza os valores de entrada, saída e o valor total...
  updateBalance() {
    document
      .getElementById('incomeDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.incomes())

    document
      .getElementById('expenseDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses())
    
      document
      .getElementById('text-total')
      .innerHTML = Utils.formatCurrency(Transaction.total())
  }
}

// Funções úteis para o programa...
const Utils = {

  // atualiza o formato do valor para BRL - R$000,00
  formatCurrency(value) {
    const signal = Number(value) > 0 ? "" : "-"
    
    value = String(value).replace(/\D/g, "")
    value = Number(value) / 100
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return signal + value
  },
}

// incluido todos as entradas e saidas...
transactions.forEach(transaction => {
  DOM.addTransaction(transaction)
})

DOM.updateBalance()

// CHANGE COLOR

const root = document.documentElement

function changeColor() {
  if (this.checkbox.checked) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}







