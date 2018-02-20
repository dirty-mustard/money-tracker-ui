<template>
  <div id="app-create-filter" class="card">
    <form>
      <b-card border-variant="light" id="app-create-filter-container" header="Create a filter" class="mb-0">

        <b-card border-variant="light" bg-variant="filter-name" class="mb-0">
          <b-form-group horizontal
                        text-variant="white"
                        breakpoint="lg"
                        label="General information"
                        label-size="lg"
                        label-class="font-weight-bold pt-0"
                        class="mb-0">
            <b-form-group horizontal
                          text-variant="white"
                          label="Filter name"
                          label-class="text-sm-right text-white"
                          label-for="name"
                          description="How would you like to name this filter?">
              <b-form-input id="name" v-model="filter.name"></b-form-input>
            </b-form-group>
          </b-form-group>
          <b-form-group horizontal class="d-flex justify-content-end" cols="0">
            <b-button v-if="!hasDescriptionFilter" variant="outline-primary" size="sm" @click="showDescriptionFilter=true">filter by description</b-button>
            <b-button v-if="!hasDateFilter" variant="outline-primary" size="sm" @click="showDateFilter=true">filter by date</b-button>
            <b-button v-if="!hasAmountFilter" variant="outline-primary" size="sm"  @click="showAmountFilter=true">filter by amount</b-button>
            <b-button v-if="!hasAccountFilter" variant="outline-primary" size="sm"  @click="showAccountFilter=true">filter by account</b-button>
            <b-button v-if="!hasTagFilter" variant="outline-primary" size="sm"  @click="showTagFilter=true">filter by tag</b-button>
          </b-form-group>
        </b-card>

        <template v-if="hasDescriptionFilter">
          <b-card border-variant="light" class="mb-0">
            <b-form-group horizontal
                          breakpoint="lg"
                          label="Description filter"
                          label-size="lg"
                          label-class="font-weight-bold pt-0"
                          class="mb-0">

                  <b-button v-if="hasDescriptionFilter" variant="link" @click="showDescriptionFilter=false">(hide filter)</b-button>
                  <b-form-group horizontal
                                label="Description:"
                                label-class="text-sm-right"
                                label-for="dateFrom"
                                description="eg. Dirk van den broek">
                        <b-form-input id="dateFrom" v-model="filter.description"></b-form-input>
                  </b-form-group>
            </b-form-group>
          </b-card>
        </template>

        <template v-if="hasDateFilter">
          <b-card border-variant="light" class="mb-0">
            <b-form-group horizontal
                          breakpoint="lg"
                          label="Date filter"
                          label-size="lg"
                          label-class="font-weight-bold pt-0"
                          class="mb-0">

                  <b-button v-if="hasDateFilter" variant="link" @click="showDateFilter=false">(hide filter)</b-button>
                  <b-form-group horizontal
                                label="From:"
                                label-class="text-sm-right"
                                label-for="dateFrom"
                                description="eg. 2017-01-01">
                        <b-form-input id="dateFrom" v-model="filter.from"></b-form-input>
                  </b-form-group>
                  <b-form-group horizontal
                                label="To:"
                                label-class="text-sm-right"
                                label-for="dateTo"
                                description="eg. 2018-01-01">
                        <b-form-input id="dateTo" v-model="filter.to"></b-form-input>
                  </b-form-group>
            </b-form-group>
          </b-card>
        </template>

        <template v-if="hasAmountFilter">
        <b-card border-variant="light" class="mb-2">
          <b-form-group horizontal
                        breakpoint="lg"
                        label="Amount filter"
                        label-size="lg"
                        label-class="font-weight-bold pt-0"
                        class="mb-0">
            <b-button v-if="hasAmountFilter" variant="link" @click="showAmountFilter=false">(hide filter)</b-button>

              <b-form-group horizontal
                            label="From:"
                            label-class="text-sm-right"
                            label-for="amountFrom">
                    <b-form-input id="amountFrom" v-model="filter.amount.from"></b-form-input>
              </b-form-group>
              <b-form-group horizontal
                            label="To:"
                            label-class="text-sm-right"
                            label-for="amountTo">
                    <b-form-input id="amountTo" v-model="filter.amount.to"></b-form-input>
              </b-form-group>
            </b-form-group>
          </b-card>
        </template>

        <template v-if="hasAccountFilter">
          <b-card border-variant="light" class="mb-0">
            <b-form-group horizontal
                          breakpoint="lg"
                          label="Account filter"
                          label-size="lg"
                          label-class="font-weight-bold pt-0"
                          class="mb-0">
              <b-button v-if="hasAccountFilter" variant="link" @click="showAccountFilter=false">(hide filter)</b-button>
                <b-form-group horizontal
                              label="Account holder:"
                              label-class="text-sm-right"
                              label-for="accountHolder">
                      <b-form-input id="accountHolder" v-model="filter.accountHolder"></b-form-input>
                </b-form-group>
                <b-form-group horizontal
                              label="Account:"
                              label-class="text-sm-right"
                              label-for="account">
                      <b-form-input id="account" v-model="filter.account"></b-form-input>
                </b-form-group>
                <b-form-group horizontal
                              label="Offset account:"
                              label-class="text-sm-right"
                              label-for="offsetAccount">
                      <b-form-input id="offsetAccount" v-model="filter.offsetAccount"></b-form-input>
                </b-form-group>
            </b-form-group>
          </b-card>
        </template>


        <template v-if="hasTagFilter">
          <b-card border-variant="light" class="mb-0">
            <b-form-group horizontal
                          breakpoint="lg"
                          label="Tag filter"
                          label-size="lg"
                          label-class="font-weight-bold pt-0"
                          class="mb-0">
              <b-button v-if="hasTagFilter" variant="link" @click="showTagFilter=false">(hide filter)</b-button>
                <b-form-group horizontal
                              label="Search by tag:"
                              label-class="text-sm-right"
                              label-for="tags">
                      <multiselect
                        v-model="filter.tags"
                        tag-placeholder="Add this as new tag"
                        placeholder="Search or add a tag"
                        label="name"
                        track-by="value"
                        :options="renderPossibleTags"
                        :multiple="true"
                      ></multiselect>
              </b-form-group>
            </b-form-group>
          </b-card>
        </template>

        <button v-if="!isEditMode" v-on:click="createFilter" class="btn btn-outline-primary mt-2">Create</button>
        <button v-if="isEditMode" v-on:click="updateFilter" class="btn btn-outline-primary mt-2">Update</button>
      </b-card>

    </form>
  </div>
</template>

<script>

import Multiselect from 'vue-multiselect'

const removeEmpty = (obj) => {
  Object.keys(obj).forEach((key) => (obj[key] == null) && delete obj[key]);
  return obj;
}

export default {
  name: 'create-filter',
  components: {
    Multiselect
  },
  props: ['possibleTags', 'selectedFilter'],
  watch: {
    selectedFilter: function() {
      if (!_.isNull(this.selectedFilter)) {
        _.assign(this.filter, this.selectedFilter)
      } else {
        this.filter = {
          name: null,
          from: null,
          to: null,
          description: null,
          amount: {
            from: null,
            to: null
          },
          accountHolder: null,
          account: null,
          offsetAccount: null,
          tags: []
        };
      }
    }
  },
  methods: {
    createFilter: function() {
      this.$emit('createFilter', removeEmpty(this.collectFormData()))
    },
    updateFilter: function() {
      console.log(removeEmpty(this.collectFormData()));
    },
    collectFormData() {
      let data = {
        name: (this.filter.name !== null && this.filter.name !== "") ? this.filter.name : null,
        from: (this.filter.from !== null && this.filter.from !== "") ? this.filter.from : null,
        to: (this.filter.to !== null && this.filter.to !== "") ? this.filter.to : null,
        description: (this.filter.description !== null && this.filter.description !== "") ? this.filter.description : null,
        accountHolder: (this.filter.accountHolder !== null && this.filter.accountHolder !== "") ? this.filter.accountHolder : null,
        account: (this.filter.account !== null && this.filter.account !== "") ? this.filter.account : null,
        offsetAccount: (this.filter.offsetAccount !== null && this.filter.offsetAccount !== "") ? this.filter.offsetAccount : null,
        amount: (this.filter.amount !== null && this.filter.amount !== "") ? this.filter.amount : null,
        tags: (this.filter.tags !== null && this.filter.tags.length > 0) ? this.filter.tags.map((t) => t.value) : null
      };

      if (data.tags !== null && data.tags.length <= 0) delete data['tags']
      if (data.amount.to === null && data.amount.from === null) delete data['amount']

      return data;
    }
  },
  computed: {
    isEditMode() {
      return !_.isNull(this.selectedFilter);
    },
    hasDescriptionFilter() {
      return this.showDescriptionFilter
        || !_.isNull(this.filter.description) || (!_.isNull(this.selectedFilter) && !_.isNull(this.selectedFilter.description));
    },
    hasAmountFilter() {
      return this.showAmountFilter
          || (!_.isNull(this.filter.amount) && (!_.isNull(this.filter.amount.from) || !_.isNull(this.filter.amount.to)))
          || (!_.isNull(this.selectedFilter) && !_.isNull(this.selectedFilter.amount));
    },
    hasDateFilter() {
      return this.showDateFilter
        || (!_.isNull(this.filter.from) || !_.isNull(this.filter.to))
        || (!_.isNull(this.selectedFilter) && (!_.isNull(this.selectedFilter.from) || !_.isNull(this.selectedFilter.to)));
    },
    hasAccountFilter() {
      return this.showAccountFilter
        || (!_.isNull(this.filter.account) || !_.isNull(this.filter.accountHolder) || !_.isNull(this.filter.offsetAccount))
        || (
              !_.isNull(this.selectedFilter) &&
              (
                !_.isNull(this.selectedFilter.account)
                || !_.isNull(this.selectedFilter.accountHolder)
                || !_.isNull(this.selectedFilter.offsetAccount)
              )
          );
    },
    hasTagFilter() {
      return this.showTagFilter
        || (!_.isNull(this.filter.tags) && !_.isEmpty(this.filter.tags))
        || (!_.isNull(this.selectedFilter && !_.isEmpty(this.selectedFilter.tags)));
    },
    renderPossibleTags() {
      if (this.possibleTags.length === 0) return [];
      return this.possibleTags.map((tag) => {
        return { name: tag.name, value: tag.id }
      });
    }
  },
  data: function() {
    return {
      showDescriptionFilter: false,
      showDateFilter: false,
      showAmountFilter: false,
      showAccountFilter: false,
      showTagFilter: false,
      filter: {
        name: null,
        from: null,
        to: null,
        description: null,
        amount: {
          from: null,
          to: null
        },
        accountHolder: null,
        account: null,
        offsetAccount: null,
        tags: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
}

.bg-filter-name {
    background-color: rgba(222,224,225,0.2) !important;
}

#app-create-filter-container {
  border: 1px solid #dee0e1;
}

#app-create-filter {
  padding: 0.5rem;
  border: 0;
}
</style>
