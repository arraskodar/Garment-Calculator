<template>
  <div class="col-md-4 mb-3">
    <div class="card h-100">
      <div class="card-header"><strong>{{ title }}</strong></div>
      <ul class="list-group list-group-flush">
        <li v-for="(val, key) in data"
            class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{ key.replace(/([A-Z])/g,' $1') }}</span>
          <div>
            <span class="me-2">{{ val }}</span>
            <button class="btn btn-sm btn-outline-primary"
                    @click="copy(val)">Copy</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionCard',
  props: {
    title: String,
    data: Object
  },
  methods: {
    copy(val) {
      navigator.clipboard.writeText(val)
        .then(() => alert(`Copied ${val}`))
    }
  }
}
</script>
