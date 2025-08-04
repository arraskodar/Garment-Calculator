<template>
  <div class="row mb-4">
    <div class="col-md-6">
      <label class="form-label">
        {{ unit === 'metric'
            ? 'Stitches per 10 cm'
            : 'Stitches per inch' }}
      </label>
      <input
        type="number"
        step="0.1"
        class="form-control"
        v-model.number="stitches"
        @input="emitGauge"
      />
    </div>
    <div class="col-md-6">
      <label class="form-label">
        {{ unit === 'metric'
            ? 'Rows per 10 cm'
            : 'Rows per inch' }}
      </label>
      <input
        type="number"
        step="0.1"
        class="form-control"
        v-model.number="rows"
        @input="emitGauge"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'

export default {
  props: {
    unit: { type: String, default: 'metric' }
  },
  emits: ['update-gauge'],
  setup(props, { emit }) {
    const stitches = ref(0)
    const rows     = ref(0)

    function emitGauge() {
      emit('update-gauge', {
        rawStitches: parseFloat(stitches.value) || 0,
        rawRows:     parseFloat(rows.value)     || 0
      })
    }

    // Reset & emit when unit changes
    watch(() => props.unit, () => {
      stitches.value = 0
      rows.value     = 0
      emitGauge()
    })

    // Emit initial zeros on mount
    onMounted(emitGauge)

    return { stitches, rows, emitGauge }
  }
}
</script>
