<template>
  <q-page>
    <div class="q-pa-md row q-col-gutter-sm">
      <div class="col-md-6 col-12">
        <q-card class="my-card" flat>
          <q-card-section>
            <div class="text-overline">{{ $t('settings.title_language') }}</div>
            <q-select dense filled v-model="selectedLocale" :options="localeOptions"/>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import _ from 'lodash'

export default defineComponent({
  setup () {
    const { locale } = useI18n()
    const localeOptions = [
      { label: 'English', value: 'en-US' },
      { label: '繁體中文', value: 'zh-TW' }
    ]
    const selectedLocale = ref(_.find(localeOptions, { value: locale.value }))

    watch(selectedLocale, newLocale => {
      locale.value = newLocale.value
      localStorage.setItem('language', newLocale.value)
    })

    return {
      selectedLocale,
      localeOptions: reactive(localeOptions)
    }
  }
})
</script>
