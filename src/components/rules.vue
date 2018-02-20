<template>
  <div>
    <b-table hover :items="rules" :fields="fields">
      <template slot="row-details" slot-scope="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
            <b-col>12</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
            <b-col>Yes</b-col>
          </b-row>
          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
      <template slot="actions" slot-scope="row">
        <b-button @click.stop="deleteRule(row.item.id)" class="btn btn-sm mr-2 btn-outline-danger">
          <font-awesome-icon size="sm" :icon="iconTrash" />
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'

export default {
  name: 'rules',
  props: ['rules'],
  components: {
    FontAwesomeIcon,
    faTrashAlt
  },
  computed: {
    iconTrash () {
      return faTrashAlt
    }
  },
  methods: {
    deleteRule: function (ruleId) {
      this.$emit('deleteRule', ruleId)
    },
  },
  data: function() {
    return {
      d: null,
      fields: {
        id: {
          label: '#ID',
          sortable: true
        },
        enabled: {
          label: 'Enabled'
        },
        archived: {
          label: 'Archived'
        },
        filter_name: {
          label: 'Filter applied',
          sortable: true
        },
        tag_names: {
          label: 'Tags applied',
          sortable: false
        },
        actions: {
          label: ''
        }
      }
    }
  }
}
</script>

<style lang="scss">
#app-manage-rules-filter-container {
  margin-bottom: 1rem;

  .card-body {
    padding: 1rem;
  }
}
</style>
