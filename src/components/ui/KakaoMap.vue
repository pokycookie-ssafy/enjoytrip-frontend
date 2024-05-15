<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const DEFAULT_ZOOM_LEVEL = 5
const MAX_ZOOM_LEVEL = 8
const OVERLAY_X_ANCHOR = 0.5
const OVERLAY_Y_ANCHOR = 1.23

export interface IMarker {
  lat: number
  lng: number
  overlay?: string
}

const props = defineProps<{
  markers?: IMarker[]
  zoomControl?: boolean
}>()

const kakaoMapREF = ref<HTMLDivElement | null>(null)
const kakaoMap = ref<kakao.maps.Map | null>(null)
const customOverlays = ref<kakao.maps.CustomOverlay[]>([])

const initMap = () => {
  if (!window.kakao || !window.kakao.maps) return
  if (!kakaoMapREF.value) return
  if (!kakao.maps.LatLng) return

  console.group('KAKAO MAP')
  console.info('initMap')
  console.groupEnd()

  const options = {
    center: new kakao.maps.LatLng(0, 0),
    level: DEFAULT_ZOOM_LEVEL,
  }

  // Init map
  kakaoMap.value = new kakao.maps.Map(kakaoMapREF.value, options)

  // Copyright Logo
  kakaoMap.value.setCopyrightPosition(
    kakao.maps.CopyrightPosition.BOTTOMRIGHT,
    true
  )

  // Zoom control
  const zoomControl = new kakao.maps.ZoomControl()
  const controlPosition = kakao.maps.ControlPosition.TOPRIGHT
  if (props.zoomControl) {
    kakaoMap.value.addControl(zoomControl, controlPosition)
  } else {
    kakaoMap.value.removeControl(zoomControl)
  }

  // Max zoom level
  kakaoMap.value.setMaxLevel(MAX_ZOOM_LEVEL)
}

const mountKakaoScript = () => {
  const HOST = import.meta.env.VITE_KAKAO_APP_HOST
  const KEY = import.meta.env.VITE_KAKAO_APP_KEY
  const QUERY = '&autoload=false'

  const script = document.createElement('script')
  script.src = HOST + KEY + QUERY
  script.onload = () => kakao.maps.load(initMap)

  console.group('KAKAO MAP')
  console.info('mountKakaoScript')
  console.groupEnd()

  document.head.appendChild(script)
}

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    kakao.maps.load(() => {
      initMap()
    })
  } else {
    mountKakaoScript()
  }
})

// Marker
watch(
  [() => props.markers, kakaoMap],
  ([markers, map]) => {
    if (!markers) return
    if (!window.kakao || !window.kakao.maps) return
    if (!map) return

    markers.forEach((data, i) => {
      const position = new kakao.maps.LatLng(data.lat, data.lng)
      const marker = new kakao.maps.Marker({ map, position })

      if (i == 0) map.panTo(position)

      // Overlay
      if (data.overlay) {
        const customOverlay = new kakao.maps.CustomOverlay({
          position,
          content: data.overlay,
          xAnchor: OVERLAY_X_ANCHOR,
          yAnchor: OVERLAY_Y_ANCHOR,
        })
        customOverlays.value = [...customOverlays.value, customOverlay]

        kakao.maps.event.addListener(
          map,
          'click',
          (e: kakao.maps.event.MouseEvent) => {
            customOverlays.value.forEach((e) => e.setMap(null))
          }
        )

        kakao.maps.event.addListener(marker, 'click', () => {
          customOverlays.value.forEach((e) => e.setMap(null))
          customOverlay.setMap(map)
        })

        customOverlay.setZIndex(10000)
      }
    })
  },
  { immediate: true }
)

// Init map
watch([kakaoMapREF, () => props.zoomControl], ([ref]) => {
  if (ref) initMap()
})
</script>

<template>
  <div ref="kakaoMapREF" class="w-full h-full"></div>
</template>
