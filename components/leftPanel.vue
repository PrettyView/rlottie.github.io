<template>
  <div class="sidebar">
    <!-- preview -->
    <div class="preview container py-3 d-flex align-items-center">
      <h5
        class="ml-2 name mb-0 text-white"
        id="contentName" 
        title="FileName"
      >
        Anubis.json
      </h5>
    </div>

    <!-- layer input field -->
    <div class="keypath-input-section container">
      <div class="d-flex align-items-center mb-3">
        <p class="title m-0">Keypath</p>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <em
              class="far fa-question-circle fa-sm ml-2"
              v-bind="attrs"
              v-on="on"
            >
            </em>
          </template>
          <span>Keypath should be linked with periods</span>
        </v-tooltip>
      </div>
      <div class="row no-gutters">
        <!-- keypath input field -->
        <v-text-field
          v-model="keypath"
          placeholder="ex) parentLayer.childLayer"
          prepend-icon="mdi-magnify"
          solo
          rounded
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
          @keypress.enter="getKeypath"
          @click:prepend="getKeypath"
        ></v-text-field>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'leftPanel',

  data() {
    return {
      keypath: '',
    }
  },

  methods: {
    getKeypath() {
      if (this.keypath.trim() !== '') {
        this.$emit('keypath-changed', this.keypath)
        this.keypath = null
      }
    },
  }
}
</script>

<style scoped>

  .sidebar {
    height: 92vh;
  }

  .preview {
    height: 12vh;
  }

  .keypath-input-section {
    height: 15vh;
  }

  .title {
    font-size: 1.5rem;
  }

</style>