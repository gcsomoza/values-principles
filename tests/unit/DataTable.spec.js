import { mount } from '@vue/test-utils'
import DataTable from '@/components/DataTable.vue'

describe('DataTable.vue User Interface', () => {
  test('Add new row when Add New button is clicked', async () => {
    const wrapper = mount(DataTable)

    await wrapper.find('button.btn-add').trigger('click')
    const tr = await wrapper.findAll('tr')
    const btnEdit = await wrapper.findAll('button.btn-edit')
    const btnRemove = await wrapper.findAll('button.btn-delete')

    expect(tr.length).toBe(1)
    expect(btnEdit.length).toBe(1)
    expect(btnRemove.length).toBe(1)
  })

  test('Remove row when Remove button is clicked', async () => {
    const wrapper = mount(DataTable)

    // Add row
    await wrapper.find('button.btn-add').trigger('click')

    // Remove the added row
    await wrapper.find('button.btn-delete').trigger('click')
    await wrapper.vm.$nextTick()
    const tr = await wrapper.findAll('tr')

    expect(tr.length).toBe(0)
  })

  test('Hide input text in row when Save button is clicked', async () => {
    const wrapper = mount(DataTable)

    // Add row
    await wrapper.find('button.btn-add').trigger('click')

    // Click save
    await wrapper.find('button.btn-edit').trigger('click')
    await wrapper.vm.$nextTick()
    const input = await wrapper.findAll('input[type="text"]')

    expect(input.length).toBe(0)
  })

  test('Display input text in row when Edit button is clicked', async () => {
    const wrapper = mount(DataTable)

    // Add row then hide input text
    await wrapper.find('button.btn-add').trigger('click')
    await wrapper.find('button.btn-edit').trigger('click')
    await wrapper.vm.$nextTick()

    // Click edit button
    await wrapper.find('button.btn-edit').trigger('click')
    await wrapper.vm.$nextTick()

    const input = await wrapper.findAll('input[type="text"]')

    expect(input.length).toBe(1)
  })
})

describe('DataTable.vue Interactions', () => {
  test('Call add function when Add New button is clicked', async () => {
    const wrapper = mount(DataTable)
    const mockMethod = jest.spyOn(wrapper.vm, 'add');
    await wrapper.find('button.btn-add').trigger('click')
    expect(mockMethod).toHaveBeenCalled()
  })

  test('Call edit function when Edit/Save button is clicked', async () => {
    const wrapper = mount(DataTable)
    const mockMethod = jest.spyOn(wrapper.vm, 'edit');
    await wrapper.find('button.btn-add').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.find('button.btn-edit').trigger('click')
    expect(mockMethod).toHaveBeenCalled()
  })

  test('Call remove function when Remove button is clicked', async () => {
    const wrapper = mount(DataTable)
    const mockMethod = jest.spyOn(wrapper.vm, 'remove');
    await wrapper.find('button.btn-add').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.find('button.btn-delete').trigger('click')
    expect(mockMethod).toHaveBeenCalled()
  })
})

describe('DataTable.vue Database Mock', () => {
  test('Ensure that Database.js save function was called when Save button is clicked', async () => {
    // Mock Database.js and assign it to wrapper.vm.db later
    const db = {
      save: jest.fn()
    }
    const wrapper = mount(DataTable, {
      props: {
        databaseTable: 'values'
      },
      data() {
        return {
          items: [],
          db: null,
        }
      },
    })
    wrapper.vm.db = db
    wrapper.vm.items = [
      {id: 1, value: 'Individuals and Interactions Over Processes and Tools.', input: true}
    ]
    expect(wrapper.vm.items[0].input).toBeTruthy()

    // When item.input is true and edit function is called then
    // it will perform database save and change item.input to false
    await wrapper.vm.edit(0)
    expect(wrapper.vm.items[0].input).not.toBeTruthy()

    // Ensure that database save function was called successfully
    expect(db.save).toHaveBeenCalledTimes(1)
    expect(db.save).toHaveBeenCalledWith(wrapper.vm.items)
  })

  test('Ensure that Database.js save function was called when Remove button is clicked', async () => {
    // Mock Database.js and assign it to wrapper.vm.db later
    const db = {
      save: jest.fn()
    }
    const wrapper = mount(DataTable, {
      props: {
        databaseTable: 'values'
      },
      data() {
        return {
          items: [],
          db: null,
        }
      },
    })
    wrapper.vm.db = db
    wrapper.vm.items = [
      {id: 1, value: 'Individuals and Interactions Over Processes and Tools.', input: false}
    ]
    await wrapper.vm.remove(0)

    // Ensure that database save function was called successfully
    expect(db.save).toHaveBeenCalledTimes(1)
    expect(db.save).toHaveBeenCalledWith(wrapper.vm.items)
  })
})