<template>
  <q-page>
    <map-component v-show="page === 'map'" ref="mapComponent" @selectPage="e => page = e"></map-component>
    <map-select-bushtrip v-show="page === 'bushtrip'" @load="data => $refs.mapComponent.mapLoadBushtrip(data)"></map-select-bushtrip>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import MapComponent from './MapComponentFix.vue'
import MapSelectBushtrip from './MapSelectBushtrip.vue'
export default defineComponent({
  components: {
    'map-component': MapComponent,
    'map-select-bushtrip': MapSelectBushtrip
  },
  data () {
    return {
      page: 'map'
    }
  }
})
</script>
