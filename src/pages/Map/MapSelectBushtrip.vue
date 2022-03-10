<template>
  <div class="q-pa-md row q-col-gutter-sm">
    <div class="col-md-6 col-12" v-for="trip in bushtrips" :key="trip.name">
        <q-card class="my-card" flat @click="selectBushtrip(trip.idx)">
            <q-card-section>
              <div class="text-h6">{{ trip.name }}</div>
              <div class="text-caption q-mt-sm">
                <q-icon name="place" size="xs"/>
                {{ trip.location }}
              </div>
              <div class="text-caption q-mt-sm">
                <q-icon name="flight_takeoff" size="xs"/>
                {{ trip.aircraft }}
              </div>
              <div class="text-caption q-mt-sm">
                <q-icon name="moving" size="xs"/>
                {{ trip.legs }} Legs, {{ trip.distance }} nm, {{ trip.times }}
              </div>
            </q-card-section>
        </q-card>
      </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import list from './bushtrip/list4now.json'
import map18 from './bushtrip/18.json'
export default defineComponent({
  data () {
    return {
      bushtrips: list
    }
  },
  methods: {
    selectBushtrip (idx) {
      console.log(idx)
      // for test
      if (idx === 18) this.$emit('load', map18)
    }
  }
})
</script>
