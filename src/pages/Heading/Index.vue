<template>
  <q-page>
    <div class="q-pa-md row q-col-gutter-sm">
      <!-- Card 1 -->
      <div class="col-md-6 col-12">
        <q-card class="my-card" flat>
          <q-card-section>
            <div class="text-h6">{{ $t('instruments.title_instruments') }}</div>
            <q-toggle
              v-model="step"
              :label="$t('instruments.button_step_10')"
              class="q-my-xs"
            />
            <div class="text-overline">HEADING BUG-> {{ heading }}</div>
            <q-slider v-model="heading" :min="0" :max="360" :step="step ? 10 : 1" color="blue-6" @change="changeEvent('heading', heading)"/>
            <q-btn color="grey-9" rounded class="q-mx-xs full-width" @click="clickEvent('heading', 0)">{{ $t('instruments.button_set_now_heading') }}</q-btn>
          </q-card-section>
          <q-card-section>
            <div class="text-overline">VOR1 OBS -> {{ vorobs1 }}</div>
            <q-slider v-model="vorobs1" :min="0" :max="360" :step="step ? 10 : 1" color="blue-7" @change="changeEvent('vorobs1', vorobs1)"/>
            <q-btn color="grey-9" rounded class="q-mx-xs" @click="clickEvent('vorobs1', -10)">-10</q-btn>
            <q-btn color="grey-9" rounded class="q-mx-xs" @click="clickEvent('vorobs1', -1)">-1</q-btn>
            <q-btn color="grey-9" rounded class="q-mx-xs" @click="clickEvent('vorobs1', 1)">+1</q-btn>
            <q-btn color="grey-9" rounded class="q-mx-xs" @click="clickEvent('vorobs1', 10)">+10</q-btn>
          </q-card-section>
          <q-card-section>
            <div class="text-overline">VOR2 OBS -> {{ vorobs2 }}</div>
            <q-slider v-model="vorobs2" :min="0" :max="360" :step="step ? 10 : 1" color="blue-8" @change="changeEvent('vorobs2', vorobs2)"/>
            <q-btn color="grey-9" rounded class="q-mx-xs" @click="clickEvent('vorobs2', -10)">-10</q-btn>
            <q-btn color="grey-9" rounded class="q-mx-xs" @click="clickEvent('vorobs2', -1)">-1</q-btn>
            <q-btn color="grey-9" rounded class="q-mx-xs" @click="clickEvent('vorobs2', 1)">+1</q-btn>
            <q-btn color="grey-9" rounded class="q-mx-xs" @click="clickEvent('vorobs2', 10)">+10</q-btn>
          </q-card-section>
        </q-card>
      </div>
     <!-- Card 2 -->
     <div class="col-md-6 col-12">
      <Card2Vue/>
     </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'
import Card2Vue from './Card2.vue'

export default defineComponent({
  setup () {
    return {
      heading: ref(0),
      vorobs1: ref(0),
      vorobs2: ref(0),
      step: ref(true)
    }
  },
  components: {
    Card2Vue
  },
  methods: {
    changeEvent (target, value) {
      const cmd = {
        heading: 'HEADING_BUG_SET',
        vorobs1: 'VOR1_SET',
        vorobs2: 'VOR2_SET',
        nav1: 'NAV1_RADIO_SET',
        nav2: 'NAV2_RADIO_SET',
        com1: 'COM_RADIO_SET',
        com1stby: 'COM_RADIO_SET',
        com2: 'COM2_RADIO_SET',
        com2stby: 'COM2_RADIO_SET'
      }
      // is freq
      const freq = ['nav1', 'nav2', 'com1', 'com1stby', 'com2', 'com2stby']
      if (freq.includes(target)) {
        // simconnect only accept hex
        value = parseInt(value * 100 - 10000, 16)
      }
      // console.log(cmd[target], value)
      api.post(`/api/event/${cmd[target]}`, { value })
    },
    clickEvent (target, value) {
      const getCMD = {
        heading: 'PLANE_HEADING_DEGREES_TRUE',
        vorobs1: 'NAV_OBS:1',
        vorobs2: 'NAV_OBS:2'
      }
      api.get(`/api/get/${getCMD[target]}`).then(res => {
        let fix = res.data
        if (target === 'heading') {
          fix = fix * 57.295779513
        } else {
          fix = fix + value
        }
        console.log(res.data * 57.295779513, fix)

        this.changeEvent(target, fix)
      })
    },
    setCOM (target) {
      if (target === 1) {
        this.changeEvent('com1stby', parseFloat(`${this.com1stby}.${this.com1stbyDecimal}`))
      } else {
        this.changeEvent('com2stby', parseFloat(`${this.com2stby}.${this.com2stbyDecimal}`))
      }
    }
  }
})
</script>
