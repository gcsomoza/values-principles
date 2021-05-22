import { mount, shallowMount } from '@vue/test-utils'
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
