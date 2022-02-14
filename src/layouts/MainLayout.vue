<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="main-bg">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <q-footer>
      <q-tabs
        v-model="tab"
        dense
        class="my-tab"
      >
        <q-route-tab name="map" icon="map" :label="$t('nav.map')" to="/map" />
        <q-route-tab name="instruments" icon="moving" :label="$t('nav.instruments')" to="/instruments" />
        <q-route-tab name="radio" icon="radio" :label="$t('nav.radio')" to="/radio" />
        <q-route-tab name="avionics" icon="flight" :label="$t('nav.avionics')" to="/avionics" />
        <q-route-tab name="settings" icon="settings" :label="$t('nav.settings')" to="/settings" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'MainLayout',

  setup () {
    return {
      tab: ref('index')
    }
  }

})
</script>
