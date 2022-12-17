<template>
  <q-page>
    <div class="q-pa-md row q-col-gutter-sm">
     <!-- Card2 -->
      <div class="col-md-6 col-12">
        <q-card class="my-card" flat>
          <q-card-section>
            <div class="text-h6">{{ $t('instruments.title_frequency_COM') }}</div>
            <div class="text-center q-mt-md">
              <q-option-group
                v-model="comSelect"
                :options="comOptions"
                color="primary"
                inline
              />
            </div>
            <div v-show="comSelect === 1">
              <div class="text-center"><span class="text-h4 ">{{ com1stby }}.{{ com1stbyDecimal }} </span><span class="text-subtitle"> MHz</span></div>
              <div class="text-overline">COM1</div>
              <q-slider v-model="com1stby" :min="118" :max="136" color="blue-4"/>
              <div class="text-overline">COM1 Decimal</div>
              <q-slider v-model="com1stbyDecimal" :min="0" :max="990" :step="5" color="blue-4"/>
              <q-btn color="grey-9" rounded class="full-width" @click="setCOM(1)">{{ $t('instruments.button_set') }}</q-btn>
            </div>
            <div v-show="comSelect === 2">
              <div class="text-center"><span class="text-h4 ">{{ com2stby }}.{{ com2stbyDecimal }} </span><span class="text-subtitle"> MHz</span></div>
              <div class="text-overline">COM2</div>
              <q-slider v-model="com2stby" :min="118" :max="136" color="blue-4"/>
              <div class="text-overline">COM2 Decimal</div>
              <q-slider v-model="com2stbyDecimal" :min="0" :max="990" :step="5" color="blue-4"/>
              <q-btn color="grey-9" rounded class="full-width" @click="setCOM(2)">{{ $t('instruments.button_set') }}</q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!-- Card3 -->
      <div class="col-md-6 col-12">
        <q-card class="my-card" flat>
          <q-card-section>
            <div class="text-h6">{{ $t('instruments.title_frequency_NAV') }}</div>
            <div class="text-overline">NAV1 -> {{ nav1 }}</div>
            <q-slider v-model="nav1" :min="108" :max="117.9" :step="0.05" color="blue-7" @change="changeEvent('nav1', nav1)"/>
          </q-card-section>
          <q-card-section>
            <div class="text-overline">NAV2 -> {{ nav2 }}</div>
            <q-slider v-model="nav2" :min="108" :max="117.9" :step="0.05" color="blue-8" @change="changeEvent('nav2', nav2)"/>
          </q-card-section>
      </q-card>
     </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  setup () {
    return {
      heading: ref(0),
      vorobs1: ref(0),
      vorobs2: ref(0),
      step: ref(true),
      com1: ref(118.0),
      com2: ref(118.0),
      com1stby: ref(118),
      com1stbyDecimal: ref(0),
      com2stby: ref(118),
      com2stbyDecimal: ref(0),
      nav1: ref(108.0),
      nav2: ref(108.0),
      comSelect: ref(1),
      comOptions: [
        { label: 'COM1', value: 1 },
        { label: 'COM2', value: 2 }
      ]
    }
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
      api.post(`/api/event/${cmd[target]}`, { value_to_use: value })
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
