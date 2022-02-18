<template>
  <div class="col-md-6 col-12">
    <q-card class="my-card" flat>
      <q-card-section>
        <div class="text-overline">GNS530</div>
        <div class="text-subtitle2 q-py-sm">{{ $t('avionics.title_right_large_rotate') }}</div>
        <q-btn-group spread rounded>
          <q-btn color="grey-8" rounded icon="keyboard_arrow_left" @click="$emit('trigger', 'AS530_RightLargeKnob_Left')"/>
          <q-btn color="grey-9" rounded icon="keyboard_arrow_right" @click="$emit('trigger', 'AS530_RightLargeKnob_Right')"/>
        </q-btn-group>
        <div class="text-subtitle2 q-py-sm">{{ $t('avionics.title_right_small_rotate') }}</div>
        <q-btn-group spread rounded>
          <q-btn color="grey-8" icon="keyboard_arrow_left" @click="$emit('trigger', 'AS530_RightSmallKnob_Left')"/>
          <q-btn color="grey-9" :label="$t('avionics.button_push')" @click="$emit('trigger', 'AS530_RightSmallKnob_push')" />
          <q-btn color="grey-8" icon="keyboard_arrow_right" @click="$emit('trigger', 'AS530_RightSmallKnob_Right')"/>
        </q-btn-group>
        <div class="text-subtitle2 q-py-sm">{{ $t('avionics.title_right') }}</div>
          <q-btn class="q-mx-xs" rounded color="grey-8" icon="keyboard_tab" @click="$emit('trigger', 'AS530_DirectTo_push')"/>
          <q-btn class="q-mx-xs" rounded color="grey-9" label="MENU" @click="$emit('trigger', 'AS530_MENU_push')"/>
          <q-btn class="q-mx-xs" rounded color="grey-8" label="CLR" @click="$emit('trigger', 'AS530_CLR_push')" />
          <q-btn class="q-mx-xs" rounded color="grey-9" label="ENT" @click="$emit('trigger', 'AS530_ENT_push')"/>
        <div class="text-subtitle2 q-py-sm">{{ $t('avionics.title_bottom') }}</div>
          <div class="row q-gutter-xs">
            <q-btn class="col-auto" rounded color="grey-8" label="CDI" @click="$emit('trigger', 'AS530_CDI_push')"/>
            <q-btn class="col-auto" rounded color="grey-9" label="OBS" @click="$emit('trigger', 'AS530_OBS_push')"/>
            <q-btn class="col-auto" rounded color="grey-8" label="MSG" @click="$emit('trigger', 'AS530_MSG_push')" />
            <q-btn class="col-auto" rounded color="grey-9" label="FPL" @click="$emit('trigger', 'AS530_FPL_push')"/>
            <q-btn class="col-auto" rounded color="grey-8" label="VNAV" @click="$emit('trigger', 'AS530_VNAV_push')"/>
            <q-btn class="col-auto" rounded color="grey-9" label="PROC" @click="$emit('trigger', 'AS530_PROC_push')"/>
          </div>
        <div class="text-subtitle2 q-py-sm">{{ $t('avionics.title_zoom') }}</div>
          <q-btn-group spread rounded>
            <q-btn color="grey-8" rounded icon="zoom_in" @click="$emit('trigger', 'AS530_RNG_Zoom')"/>
            <q-btn color="grey-9" rounded icon="zoom_out" @click="$emit('trigger', 'AS530_RNG_Dezoom')" />
          </q-btn-group>
      </q-card-section>
    </q-card>
  </div>
</template>
