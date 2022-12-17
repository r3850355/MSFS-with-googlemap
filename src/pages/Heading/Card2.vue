<template>
    <q-card class="my-card col-md-4 col-12" flat>
       <q-card-section>
        <div class="text-h6">外部燈光</div>
        <div  v-for="item in extLights" :key="item.name">
          <q-btn :label="`${item.label} [${displayOnOFF(item.value)}]`" @click="triggerEvent(item)" class="q-ma-sm full-width" :color="item.value ? 'positive' : 'grey-9'"></q-btn>
        </div>
        <div class="text-h6">客艙燈光</div>
        <div  v-for="item in cabinLights" :key="item.name">
          <q-btn :label="`${item.label} [${displayOnOFF(item.value)}]`" @click="triggerEvent(item)" class="q-ma-sm full-width" :color="item.value ? 'positive' : 'grey-9'" ></q-btn>
        </div>
      </q-card-section>
     </q-card>
</template>

<script setup>
import { api } from 'boot/axios'
import { reactive } from 'vue'
const extLights = reactive([
  { label: 'LOGO', name: 'TOGGLE_LOGO_LIGHTS', value: 0 },
  { label: 'NAV', name: 'TOGGLE_NAV_LIGHTS', value: 0 },
  { label: 'BEACON', name: 'TOGGLE_BEACON_LIGHTS', value: 0 },
  { label: 'TAXI', name: 'TOGGLE_TAXI_LIGHTS', value: 0 },
  { label: 'LAND', name: 'LANDING_LIGHTS_SET', value: 0 },
  { label: 'STROBES', name: 'STROBES_SET', value: 0 },
  { label: 'WING', name: 'TOGGLE_WING_LIGHTS', value: 0 }
])
const cabinLights = reactive([

  { label: 'PANEL', name: 'PANEL_LIGHTS_SET', value: 0 },
  { label: 'CABIN', name: 'TOGGLE_CABIN_LIGHTS', value: 0 }
  // { label: 'PEDESTRAL', name: 'PEDESTRAL_LIGHTS_SET', value: 0 }
  // { label: 'POTENTIOMETER', name: 'LIGHT_POTENTIOMETER_SET', value: 0 }
])

function displayOnOFF (value) {
  return value ? 'ON' : 'OFF'
}

function triggerEvent (item) {
  const value = item.value ? 0 : 1
  item.value = value
  api.post(`/api/event/${item.name}`, { value })
}
</script>
