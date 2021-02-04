const ModalIncome = {
  open() {
    document.querySelector('.modal-overlay-income').classList.add('active')
  },
  
  close() {
    document.querySelector('.modal-overlay-income').classList.remove('active')
  }
}

const ModalExpense = {
  open() {
    document.querySelector('.modal-overlay-expense').classList.add('active')
  },
  
  close() {
    document.querySelector('.modal-overlay-expense').classList.remove('active')
  }
}

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finance:transactions")) || []
  },
  set(transactions) {
    localStorage.setItem("dev.finance:transactions",
      JSON.stringify(transactions))
  },
}

const Transaction = {

  all: Storage.get(),

  add(transaction) {
    Transaction.all.push(transaction)
    App.reload()
  },

  remove(index) {
    Transaction.all.splice(index, 1)

    App.reload()
  },

  incomes() {
    let income = 0

    this.all.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount
      }
    })

    return income
  },

  expenses() {
    let expense = 0

    this.all.forEach(transaction => {
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
    tr.innerHTML = this.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    DOM.transactionContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction, index) {
    // definido qual a cor para números negativos e positivos...
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    // chamando a função que formata o valor...
    const amount = Utils.formatCurrency(transaction.amount)

    // criando uma máscara do HTML...
    const html = `
      <td class="description">${transaction.description}</td>
      <td class=${CSSclass}>${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img onclick="Transaction.remove(${index})" 
              src="./assets/minus.svg" 
              alt=""
              id="delete">
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
  },

  clearTransactions() {
    DOM.transactionContainer.innerHTML = ""
  }
}

// Funções úteis para o programa...
const Utils = {

  // atualiza o formato do valor para BRL - R$000,00 
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "")
    value = Number(value) / 100
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return signal + value
  },

  formatAmount(value) {
    value = Number(value) * 100
    return Math.round(value)
  },
  
  formatAmountNegative(value) {
    value = Number(value) * 100 * -1
    return Math.round(value)
  },

  formatDate(date){
    const splittedDate = date.split("-")
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },
}

const FormIncome = {
  description: document.querySelector('#description-income'),
  amount: document.querySelector('#amount-income'),
  date: document.querySelector('#date-income'),

  getValues() {
    return {
      description: this.description.value,
      amount: this.amount.value,
      date: this.date.value,
    }
  },

  validateFields() {
    const { description, amount, date } = this.getValues();
    if(description.trim() === "" || amount.trim() === "" || date.trim() === ""){
      throw new Error("Por favor, preencha todos os campos!")
    }
  },

  formatValues() {
    let {
      description,
      amount,
      date
    } = this.getValues()

    amount = Utils.formatAmount(amount)
    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date
    }
  },

  saveTransaction(transaction) {
    Transaction.add(transaction)
  },

  clearFields() {
    this.description.value = ""
    this.amount.value = ""
    this.date.value = ""
  },

  datasIncome() {

    try {
      this.validateFields()
      const transaction = this.formatValues()

      this.saveTransaction(transaction)
      this.clearFields()

      ModalIncome.close()

    } catch (error) {
      alert(error.message)
    }
  },
}

const FormExpense = {
  description: document.querySelector('#description-expense'),
  amount: document.querySelector('#amount-expense'),
  date: document.querySelector('#date-expense'),

  getValues() {
    return {
      description: this.description.value,
      amount: this.amount.value,
      date: this.date.value,
    }
  },

  validateFields() {
    const { description, amount, date } = this.getValues();
    if(description.trim() === "" || amount.trim() === "" || date.trim() === ""){
      throw new Error("Por favor, preencha todos os campos!")
    }
  },

  formatValues() {
    let {
      description,
      amount,
      date
    } = this.getValues()

    amount = Utils.formatAmountNegative(amount)
    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date
    }
  },

  saveTransaction(transaction) {
    Transaction.add(transaction)
  },

  clearFields() {
    this.description.value = ""
    this.amount.value = ""
    this.date.value = ""
  },

  datasExpense() {

    try {
      this.validateFields()
      const transaction = this.formatValues()

      this.saveTransaction(transaction)
      this.clearFields()

      ModalExpense.close()

    } catch (error) {
      alert(error.message)
    }
  },
}

const App = {
  init() {
    Transaction.all.forEach((transaction, index) => {
      DOM.addTransaction(transaction, index)
      console.log(index)
    })

    DOM.updateBalance()
    Storage.set(Transaction.all)

  },

  reload() {
    DOM.clearTransactions()
    App.init()
  },
}

App.init()


// ADITIONAL FUNCTIONS

// CHANGE COLOR

const root = document.documentElement

function changeColor() {
  if (this.checkbox.checked) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

// SELECT BOX

const SelectBox = {
  
  showOptions () {
    document.querySelector('.transitions-wrapper').classList.toggle('active')
    document.querySelector('.title-wrapper').classList.toggle('active')
  }

}