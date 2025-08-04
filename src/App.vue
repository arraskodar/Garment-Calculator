<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-white" :class="{ 'dark-mode': darkMode }">
    <div class="container">
      <a class="navbar-brand" href="#">SPEC-1 Garment Calculator</a>
      <div class="d-flex align-items-center ms-auto d-print-none">
        <!-- Unit toggle -->
        <div class="form-check form-switch me-3">
          <input class="form-check-input" type="checkbox" id="unitSwitch" v-model="isImperial" />
          <label class="form-check-label" for="unitSwitch">
            {{ isImperial ? 'Imperial' : 'Metric' }}
          </label>
        </div>
        <!-- Dark-mode toggle -->
        <div class="form-check form-switch me-3">
          <input class="form-check-input" type="checkbox" id="darkSwitch" v-model="darkMode" />
          <label class="form-check-label" for="darkSwitch">Dark Mode</label>
        </div>
        <!-- Print -->
        <button class="btn btn-outline-secondary" @click="printPage">Print</button>
      </div>
    </div>
  </nav>

  <!-- Main content -->
  <div class="container my-5" :class="{ 'dark-mode': darkMode }">
    <!-- GaugeInput -->
    <GaugeInput
      :unit="isImperial ? 'imperial' : 'metric'"
      @update-gauge="onGaugeUpdate"
    />

    <!-- Calculate -->
    <div class="text-center my-4">
      <button class="btn btn-primary" @click="calculate">Calculate</button>
    </div>

    <!-- Results -->
    <ResultsDisplay :front="front" :back="back" :sleeve="sleeve" />
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import GaugeInput     from './components/GaugeInput.vue'
import ResultsDisplay from './components/ResultsDisplay.vue'
import { useCalculator } from './composables/useCalculator.js'

// Calculator logic
const { gauge, front, back, sleeve } = useCalculator()

// Buffer raw inputs
const raw = reactive({ stitches: 0, rows: 0 })

// UI toggles
const isImperial = ref(false)
const darkMode    = ref(false)
watch(darkMode, v => document.body.classList.toggle('dark-mode', v), { immediate: true })

// Receive GaugeInput emits
function onGaugeUpdate({ rawStitches, rawRows }) {
  raw.stitches = rawStitches
  raw.rows     = rawRows
}

// Calculate button
function calculate() {
  const divisor = isImperial.value ? 2.54 : 10
  gauge.stitchesPerCm = raw.stitches / divisor
  gauge.rowsPerCm     = raw.rows     / divisor
}

// Print helper
function printPage() {
  window.print()
}
</script>
