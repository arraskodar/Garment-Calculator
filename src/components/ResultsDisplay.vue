<template>
  <div class="row">
    <SectionCard title="Front"  :data="front"  />
    <SectionCard title="Back"   :data="back"   />
    <SectionCard title="Sleeve" :data="sleeve" />
  </div>
</template>

<script>
import SectionCard from './SectionCard.vue'

export default {
  components: { SectionCard },
  props: ['front','back','sleeve']
}
</script>
