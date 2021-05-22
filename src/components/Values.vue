<template>
  <DataTable title="Values of Agile Development" :dataItems="data" databaseTable="values"></DataTable>
</template>

<script>
import DataTable from '@/components/DataTable'

export default {
  name: 'Values',
  components: {
    DataTable,
  },
  data() {
    return {
      data: [
        {id: 1, value: "Individuals and Interactions Over Processes and Tools."},
        {id: 2, value: "Working Software Over Comprehensive Documentation."},
        {id: 3, value: "Customer Collaboration Over Contract Negotiation."},
        {id: 4, value: "Responding to Change Over Following a Plan."},
      ]
    }
  },
}
</script>