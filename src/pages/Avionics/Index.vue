<template>
  <q-page>
    <div class="q-pa-md row q-col-gutter-sm">
      <!-- Card 1 -->
      <type-gns-530 @trigger="triggerEvent"></type-gns-530>
      <div class="col-md-6 col-12">
        <q-card class="my-card" flat>
            <q-card-section>
              <div class="text-center">⚠️</div>
              <span class="text-caption">
                {{ $t('avionics.warning_text') }}
              </span>
              <q-btn rounded unelevated class="q-mt-sm full-width" color="grey-6" @click="goMobiFlight">{{ $t('avionics.warning_btn') }}</q-btn>
            </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { api } from 'boot/axios'
import GNS530 from './GNS530.vue'

export default defineComponent({
  components: {
    'type-gns-530': GNS530
  },
  methods: {
    triggerEvent (cmd) {
      api.post(`/event/${cmd}/mobiflight`)
    },
    goMobiFlight () {
      window.open('https://www.mobiflight.com/en/index.html', '_blank')
    }
  }
})
</script>
