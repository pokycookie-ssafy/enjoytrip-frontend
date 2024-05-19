// import { ref, watch } from 'vue'
// import { useRoute } from 'vue-router'

// export const useParams = (name: string) => {
//   const route = useRoute()
//   const param = ref('')

//   watch(
//     () => route.params,
//     (params) => {
//       if (Array.isArray(params[name])) return
//       param.value = params[name]
//     },
//     { immediate: true }
//   )
// }
