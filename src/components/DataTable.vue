<template>
  <div class="data-table__container">
    <h1>{{title}}</h1>
    <table class="table">
      <tr v-for="(item, index) in items" :key="item.id">
        <td>
          <input v-if="item.input" type="text" v-model="item.value" />
          <span v-else>{{item.value}}</span>
        </td>
        <td>
          <button class="btn btn-info btn-edit" @click="edit(index)">
            <span v-if="item.input">Save</span>
            <span v-else>Edit</span>
          </button>
          <button class="btn btn-danger btn-delete" @click="remove(index)">Remove</button>
        </td>
      </tr>
    </table>
    <button class="btn btn-success btn-add" @click="add()">Add New</button>
  </div>
</template>

<script>
import Database from '@/components/Database.js'

export default {
  name: 'DataTable',
  props: {
    title: {
      type: String,
      default: ""
    },
    dataItems: {
      type: Array,
      default: () => {
        return [] 
      }
    },
    databaseTable: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      items: [],
      db: null
    }
  },
  mounted() {
    this.db = new Database(this.databaseTable)
    if(!this.db.initialized()) {
      this.db.save(this.dataItems)
      this.db.initialize()
    }
    this.items = this.db.get()
  },
  methods: {
    add() {
      let prevId = 0
      if(this.items.length > 0) {
        const prevItem = this.items[this.items.length - 1]
        prevId = parseInt(prevItem.id)
      }
      this.items.push({
        id: prevId + 1,
        value: '',
        input: true,
      })
    },
    edit(index) {
      const item = this.items[index]
      if(item.input) {
        item.input = false
        this.save()
      }
      else {
        item.input = true
      }
      this.items[index] = item
    },
    remove(index) {
      const itemToDelete = this.items[index]
      this.items.splice(index, 1)
      this.save()
    },
    save() {
      this.db.save(this.items)
    }
  }
}
</script>

<style lang="scss">
.data-table__container {
  width: 80%;
  .table {
    width: 100%;

    td {
      padding: 5px;
    }
    td:nth-child(1) {
      text-align: left;
      padding-bottom: 10px;

      input[type="text"] {
        width: calc(100% - 20px);
        padding: 10px;
        font-size: 1rem;
      }
    }
    td:nth-child(2) {
      width: 210px;
      padding-right: 0;
      text-align: right;
    }
  }
  .btn {
    background: transparent;
    width: 100px;
    padding: 10px;
    border-radius: 100vh;

    &:hover {
      cursor: pointer;
    }
    &:focus {
        outline: -webkit-focus-ring-color auto 0px;
    }

    &.btn-success {
      border: 1px solid #349d73;
      color: #349d73;

      &:hover {
        background: #349d73;
        color: #fff
      }
    }

    &.btn-danger {
      border: 1px solid #9a1b3e;
      color: #9a1b3e;

      &:hover {
        background: #9a1b3e;
        color: #fff
      }
    }

    &.btn-info {
      border: 1px solid #1e8fc5;
      color: #1e8fc5;

      &:hover {
        background: #1e8fc5;
        color: #fff
      }
    }

    &.btn-add {
      float: right;
    }
    &.btn-edit {
      margin-bottom: 5px;
    }
    &.btn-delete {
      margin-left: 5px;
    }
  }
  
}
</style>