import { reactive, computed } from 'vue'
import { measurements } from '../measurements.js'

export function useCalculator() {
  const gauge = reactive({ stitchesPerCm:0, rowsPerCm:0 })

  function computeSection(section) {
    const out = {}
    for (const [key, cm] of Object.entries(measurements[section])) {
      out[key+'Stitches'] = computed(() => +(cm * gauge.stitchesPerCm).toFixed(1))
      out[key+'Rows']     = computed(() => +(cm * gauge.rowsPerCm).toFixed(1))
    }
    return out
  }

  return {
    gauge,
    front:  computeSection('front'),
    back:   computeSection('back'),
    sleeve: computeSection('sleeve')
  }
}
