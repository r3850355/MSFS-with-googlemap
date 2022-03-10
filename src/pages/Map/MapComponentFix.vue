<template>
  <div>
    <div id="map" class="window-width">
    </div>
    <q-page-sticky position="top-left" :offset="[18, 18]">
        <div>
          <span>ALT </span>
          <span class="text-h6">{{ filghtStatus.ALT }}</span>
          <span>ft</span>
        </div>
      </q-page-sticky>
      <q-page-sticky position="top" :offset="[18, 18]">
        <div class="text-center">
          <span>HDG </span>
          <br>
          <span class="text-h4">{{ filghtStatus.HDG }}</span>
        </div>
      </q-page-sticky>
      <q-page-sticky position="top-right" :offset="[18, 18]">
        <div>
          <span>GS </span>
          <span class="text-h6">{{ filghtStatus.GS }}</span>
        </div>
      </q-page-sticky>
      <q-page-sticky position="bottom-right" :offset="[10, 18]">
        <q-btn round class="bg-white text-grey-8" size="md" dense :icon="mapConfig.keepCenter ? 'gps_fixed' : 'gps_not_fixed'" @click="mapConfig.keepCenter = !mapConfig.keepCenter"></q-btn>
        <br>
        <q-btn round class="bg-white text-grey-8 q-mt-sm" size="md" dense icon="public" @click="mapChangeType()"></q-btn>
      </q-page-sticky>
      <q-page-sticky position="bottom-left" :offset="[12, 18]">
        <q-btn dense class="bg-white text-grey-8" icon="settings" @click="showBottomSheet()"></q-btn>
      </q-page-sticky>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Loader } from 'google-maps'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'

const globalFightPath = []
const globalBushtripPath = []

export default defineComponent({
  async mounted () {
    // fit the map's hight to fullscreen
    const fit = document.getElementById('map')
    const h = window.screen.height - 56
    fit.style.height = `${h}px`

    await this.mapInit()
    this.mapDrawPastPath()
    this.getFilghtData()
    setInterval(() => this.getFilghtData(), this.mapLoadFreq)
  },
  data () {
    return {
      $q: useQuasar(),
      $t: useI18n(),
      //
      google: null,
      map: null,
      //
      mapLoadFreq: 3000,
      mapLastFilghtPath: null,
      mapFlightPath: [],
      //
      filghtStatus: { HDG: 0, GS: 0, ALT: 0 },
      mapConfig: { keepCenter: true, mapType: 'roadmap' }
    }
  },
  methods: {
    async mapInit () {
      const key = await this.getApiKey()
      console.log('key => ', key.data)
      const loader = new Loader(key.data)
      this.google = await loader.load()
      this.map = new this.google.maps.Map(document.getElementById('map'), {
        center: { lat: -35.31166666666666, lng: 149.20277777777778 },
        zoom: 14,
        callback: 'myMap',
        disableDefaultUI: true
      })
    },
    mapDrawPastPath () {
      if (localStorage.getItem('flightPathRecord')) {
        this.mapFlightPath = JSON.parse(localStorage.getItem('flightPathRecord'))
        let lastPoint = null
        this.mapFlightPath.forEach(e => {
          if (lastPoint) {
            globalFightPath.push(new this.google.maps.Polyline({
              path: [lastPoint, e],
              geodesic: true,
              strokeColor: this.__pathColor(e.ALT),
              strokeOpacity: 0.8,
              strokeWeight: 3,
              map: this.map
            }))
          }
          this.mapLastFilghtPath = e
          lastPoint = e
        })
      }
    },
    mapDrawPlane (data) {
      if (!data.lat) return false
      const svgbase = {
        plane: 'M 1.9565564,41.694305 C 1.7174505,40.497708 1.6419973,38.448747 ' +
                          '1.8096508,37.70494 1.8936398,37.332056 2.0796653,36.88191 2.222907,36.70461 ' +
                          '2.4497603,36.423844 4.087816,35.47248 14.917931,29.331528 l 12.434577,' +
                          '-7.050718 -0.04295,-7.613412 c -0.03657,-6.4844888 -0.01164,-7.7625804 ' +
                          '0.168134,-8.6194061 0.276129,-1.3160905 0.762276,-2.5869575 1.347875,' +
                          '-3.5235502 l 0.472298,-0.7553719 1.083746,-0.6085497 c 1.194146,-0.67053522 ' +
                          '1.399524,-0.71738842 2.146113,-0.48960552 1.077005,0.3285939 2.06344,' +
                          '1.41299352 2.797602,3.07543322 0.462378,1.0469993 0.978731,2.7738408 ' +
                          '1.047635,3.5036272 0.02421,0.2570284 0.06357,3.78334 0.08732,7.836246 0.02375,' +
                          '4.052905 0.0658,7.409251 0.09345,7.458546 0.02764,0.04929 5.600384,3.561772 ' +
                          '12.38386,7.805502 l 12.333598,7.715871 0.537584,0.959688 c 0.626485,1.118378 ' +
                          '0.651686,1.311286 0.459287,3.516442 -0.175469,2.011604 -0.608966,2.863924 ' +
                          '-1.590344,3.127136 -0.748529,0.200763 -1.293144,0.03637 -10.184829,-3.07436 ' +
                          'C 48.007733,41.72562 44.793806,40.60197 43.35084,40.098045 l -2.623567,' +
                          '-0.916227 -1.981212,-0.06614 c -1.089663,-0.03638 -1.985079,-0.05089 -1.989804,' +
                          '-0.03225 -0.0052,0.01863 -0.02396,2.421278 -0.04267,5.339183 -0.0395,6.147742 ' +
                          '-0.143635,7.215456 -0.862956,8.845475 l -0.300457,0.680872 2.91906,1.361455 ' +
                          'c 2.929379,1.366269 3.714195,1.835385 4.04589,2.41841 0.368292,0.647353 ' +
                          '0.594634,2.901439 0.395779,3.941627 -0.0705,0.368571 -0.106308,0.404853 ' +
                          '-0.765159,0.773916 L 41.4545,62.83158 39.259237,62.80426 c -6.030106,-0.07507 ' +
                          '-16.19508,-0.495041 -16.870991,-0.697033 -0.359409,-0.107405 -0.523792,' +
                          '-0.227482 -0.741884,-0.541926 -0.250591,-0.361297 -0.28386,-0.522402 -0.315075,' +
                          '-1.52589 -0.06327,-2.03378 0.23288,-3.033615 1.077963,-3.639283 0.307525,' +
                          '-0.2204 4.818478,-2.133627 6.017853,-2.552345 0.247872,-0.08654 0.247455,' +
                          '-0.102501 -0.01855,-0.711959 -0.330395,-0.756986 -0.708622,-2.221756 -0.832676,' +
                          '-3.224748 -0.05031,-0.406952 -0.133825,-3.078805 -0.185533,-5.937448 -0.0517,' +
                          '-2.858644 -0.145909,-5.208974 -0.209316,-5.222958 -0.06341,-0.01399 -0.974464,' +
                          '-0.0493 -2.024551,-0.07845 L 23.247235,38.61921 18.831373,39.8906 C 4.9432155,' +
                          '43.88916 4.2929558,44.057819 3.4954426,43.86823 2.7487826,43.690732 2.2007966,' +
                          '42.916622 1.9565564,41.694305 z'
      }
      const svg = {
        path: 'M 0,0 ' + svgbase.plane,
        fillColor: '#ff005e',
        fillOpacity: 0.9,
        scale: 0.4,
        anchor: new this.google.maps.Point(32, 32),
        rotation: data.rotation
      }
      const maker = new this.google.maps.Marker({
        position: { lat: data.lat, lng: data.lng },
        map: this.map,
        icon: svg
      })
      // remove old mark
      setTimeout(() => {
        maker.setMap(null)
      }, this.mapLoadFreq - 50)
    },
    mapDrawPath (data) {
      if (!data.lat) return false
      const path = new this.google.maps.Polyline({
        path: [this.mapLastFilghtPath, data],
        geodesic: true,
        strokeColor: this.__pathColor(data.ALT),
        strokeOpacity: 0.8,
        strokeWeight: 3,
        map: this.map
      })
      this.mapLastFilghtPath = data
      globalFightPath.push(path)
      this.mapFlightPath.push(data)
      localStorage.setItem('flightPathRecord', JSON.stringify(this.mapFlightPath))
    },
    mapChangeType () {
      if (this.mapConfig.mapType === 'roadmap') {
        this.map.setMapTypeId('hybrid')
        this.mapConfig.mapType = 'hybird'
      } else {
        this.map.setMapTypeId('roadmap')
        this.mapConfig.mapType = 'roadmap'
      }
    },
    mapClearPath () {
      localStorage.removeItem('flightPathRecord')
      this.mapFlightPath = []
      globalFightPath.forEach(e => {
        e.setMap(null)
      })
      globalBushtripPath.forEach(e => {
        e.setMap(null)
      })
    },
    mapLoadBushtrip (data) {
      this.$emit('selectPage', 'map')
      const infoWindow = new this.google.maps.InfoWindow()

      globalBushtripPath.forEach(e => {
        e.setMap(null)
      })
      //
      let lastPath = null
      data.forEach(e => {
        // Marker
        const marker = new this.google.maps.Marker({
          position: { lat: e.lat, lng: e.lng },
          map: this.map,
          label: {
            text: e.name,
            fontWeight: 'bold'
          },
          title: e.label,
          icon: {
            path: this.google.maps.SymbolPath.CIRCLE,
            scale: 4,
            labelOrigin: new this.google.maps.Point(0, 5)
          }
        })

        marker.addListener('click', () => {
          infoWindow.close()
          infoWindow.setContent(marker.getTitle())
          infoWindow.open(marker.getMap(), marker)
        })
        globalBushtripPath.push(marker)

        // Path
        if (lastPath) {
          const path = new this.google.maps.Polyline({
            path: [lastPath, { lat: e.lat, lng: e.lng }],
            geodesic: true,
            strokeColor: '#ff005e',
            strokeOpacity: 0.8,
            strokeWeight: 6,
            map: this.map
          })
          globalBushtripPath.push(path)
        }
        lastPath = { lat: e.lat, lng: e.lng }
      })
    },
    showBottomSheet () {
      this.$q.bottomSheet({
        dark: true,
        message: 'Map Settings',
        actions: [
          {
            label: 'Delete Path',
            icon: 'delete',
            id: 'bs_deletePath'
          },
          {
            label: 'Load BustTrip',
            icon: 'file_download',
            id: 'bs_test'
          }
        ]
      }).onOk(e => {
        console.log(e)
        switch (e.id) {
          case 'bs_deletePath':
            this.mapClearPath()
            break
          case 'bs_test':
            this.$emit('selectPage', 'bushtrip')
            break
        }
      })
    },
    async getFilghtData () {
      api.get('/dataset/navigation/').then(res => {
        const data = {
          lat: res.data.PLANE_LATITUDE,
          lng: res.data.PLANE_LONGITUDE,
          rotation: res.data.PLANE_HEADING_DEGREES_TRUE * 57.295779513,
          HDG: this.__fixHDG(res.data.PLANE_HEADING_DEGREES_TRUE),
          GS: parseInt(res.data.GROUND_VELOCITY),
          ALT: parseInt(res.data.PLANE_ALTITUDE)
        }
        this.mapDrawPlane(data)
        this.mapDrawPath(data)
        this.filghtStatus = data

        if (this.mapConfig.keepCenter) this.map.panTo({ lat: data.lat, lng: data.lng })
      })
    },
    async getApiKey () {
      return await api.get('/key').catch(() => {
      // handle no-key or error
        // this.$q.notify({
        //   message: this.$t('map.error_message_nokey'),
        //   icon: 'announcement',
        //   timeout: 4000,
        //   color: 'red',
        //   position: 'center'
        // })
        return { data: null }
      })
    },
    __fixHDG (value) {
      return parseInt(value * 57.295779513).toString().padStart(3, '0')
    },
    __pathColor (alt) {
      let color = '#FFFFF'
      if (alt <= 5000) color = `rgb(255, ${150 + parseInt(alt * 100 / 5000)}, 0)`
      if (alt > 5000 && alt <= 17000) color = `rgb(${255 - parseInt((alt - 5000) * 255 / 12000)}, 255, 0)`
      if (alt > 17000 && alt < 29000) color = `rgb(0, 255, ${parseInt((alt - 17000) * 255 / 12000)})`
      if (alt >= 29000 && alt < 41000) color = `rgb(0, ${255 - parseInt((alt - 29000) * 255 / 12000)}, 255)`
      if (alt >= 41000) color = 'rgb(0, 0, 255)'
      return color
    }
  }
})
</script>
