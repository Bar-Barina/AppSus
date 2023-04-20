export default {
  props: {
    txt: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
      required: false,
      default: 100,
    },
  },
  template: `
             Description: {{displayTxt}}
             <button @click="isShown = !isShown" v-if="txt.length > length">
              Read {{isShown ? 'less' : 'more'}}
              </button>
  `,
  data() {
    return {
      isShown: false,
    }
  },

  methods: {},
  computed: {
    displayTxt() {
      if (!this.isShown && this.txt.length > this.length)
        return this.txt.slice(0, this.length) + '...'
      return this.txt
    },
  },
}
