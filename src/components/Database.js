export default class Database {
  constructor(databaseTable) {
    this.table = databaseTable
    if(!localStorage.hasOwnProperty(this.table)) {
      localStorage[this.table] = "[]"
    }
  }

  initialize() {
    localStorage[this.table + '_init'] = ""
  }

  initialized() {
    return localStorage.hasOwnProperty(this.table + '_init')
  }

  get() {
    return JSON.parse(localStorage[this.table])
  }

  save(items) {
    const itemsToSave = []
    for(let i = 0; i < items.length; i++) {
      const item = {...items[i]}
      delete item.input
      itemsToSave.push(item)
    }
    localStorage[this.table] = JSON.stringify(itemsToSave)
  }
}