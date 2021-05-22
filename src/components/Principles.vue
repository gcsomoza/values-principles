<template>
  <DataTable title="Principles of Agile Development" :dataItems="data" databaseTable="principles"></DataTable>
</template>

<script>
import DataTable from '@/components/DataTable'

export default {
  name: 'Principles',
  components: {
    DataTable,
  },
  data() {
    return {
      data: [
        {id: 1, value: "Customer satisfaction through early and continuous software delivery."},
        {id: 2, value: "Accommodate changing requirements throughout the development process."},
        {id: 3, value: "Frequent delivery of working software."},
        {id: 4, value: "Collaboration between the business stakeholders and developers throughout the project."},
        {id: 5, value: "Support, trust, and motivate the people involved."},
        {id: 6, value: "Enable face-to-face interactions."},
        {id: 7, value: "Working software is the primary measure of progress."},
        {id: 8, value: "Agile processes to support a consistent development pace."},
        {id: 9, value: "Attention to technical detail and design enhances agility."},
        {id: 10, value: "Simplicity."},
        {id: 11, value: "Self-organizing teams encourage great architectures, requirements, and designs."},
        {id: 12, value: "Regular reflections on how to become more effective."},
      ]
    }
  },
}
</script>