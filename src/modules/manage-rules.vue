<template>
  <div>

    <div id="app-manage-rules-filter-container" class="col-12">
      <div class="card">
        <div class="card-body">
          <h1 class="float-left text-left">Rules</h1>
          <b-btn class="float-right" v-b-toggle.create-tag variant="outline-primary" size="sm">
            <span class="when-opened">-</span>
            <span class="when-closed">+</span>
          </b-btn>
        </div>

        <div class="card-body">
          <b-btn v-on:click="reapplyRules" class="col-2" variant="outline-secondary" size="sm">
            Reapply rules
          </b-btn>
        </div>

        <div class="card-body">
          <b-collapse id="create-tag">
            <div class="card-body">
              <create-rule
                :possibleTags="tags"
                :possibleFilters="filters"
                v-on:createRule="onRuleCreate"
              ></create-rule>
            </div>
          </b-collapse>
        </div>

        <div class="card-body">
          <rules v-on:deleteRule="onDeleteRule" :rules="rules"></rules>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rules from '../components/rules';
import CreateRule from '../components/create-rule';

import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faFilter from '@fortawesome/fontawesome-free-solid/faFilter'

export default {
  name: 'manage-rules',
  data: function() {
    return {
      rules: [],
      tags: [],
      filters: []
    }
  },
  components: {
    Rules,
    FontAwesomeIcon,
    CreateRule
  },
  computed: {
    iconFilter () {
      return faFilter
    },
    subTitle () {
      return 'An overview of rules'
    }
  },
  mounted () {
   this.getRules();
   this.getFilters();
   this.getTags();
  },
  methods: {
    onDeleteRule(ruleId) {
      this.axios.delete(`http://0.0.0.0:8080/api/rules/${ruleId}`).then(() => this.getRules());
    },
    reapplyRules() {
      this.axios.post('http://0.0.0.0:8080/api/rules/_runAll').then(() => alert('done'));
    },
    onRuleCreate(data) {
      console.log('create')
      this.axios.post('http://0.0.0.0:8080/api/rules', data)
        .then((response) => {
          this.getRules();
        })
        .catch( error => { console.log(error); });
    },
    getFilters() {
      this.axios.get('http://0.0.0.0:8080/api/filters')
        .then((response) => this.filters = response.data);
    },
    getTags() {
      this.axios.get('http://0.0.0.0:8080/api/tags')
        .then((response) => this.tags = response.data);
    },
    getRules() {
      this.axios.get('http://0.0.0.0:8080/api/rules')
        .then((response) => {
          this.rules = response.data.map((rule) => {
            return {
              id: rule.id,
              enabled: rule.disabled ? 'Disabled' : 'Enabled',
              archived: rule.archive ? 'Yes' : 'No',
              filter_name: rule.filter.name,
              tag_names: rule.tagsToApply.map((tag) => tag.name).join(', ')
            }
          });
        })
        .catch( error => { console.log(error); });
    }
  }
}

</script>

<style lang="scss" scoped>

#manage-rules-filter-selector {
  line-height: 40px;
  margin-bottom: 0;
}
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
