<template>
  <q-page>
    <map-component></map-component>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import MapComponent from './MapComponent.vue'
export default defineComponent({
  components: {
    'map-component': MapComponent
  }
})
</script>
