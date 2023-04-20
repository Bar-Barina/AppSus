import { svgService } from "../../../services/svg.service.js"

export default {
    emits: ['color'],
    props: ['note'],
    template: `
    <div class="color-picker">
    <div class="none-color" v-html="getSvg('colorPickerNone')" 
    :class="{selected: selectedColor === '#fff'}" @click.stop="changeColor('#fff')"></div>
        <div v-for="color in colors"  :class="{selected: this.selectedColor === color}" class="color" 
        :style="{'background-color': color}"
        @click.stop="changeColor(color)">
    </div>
    </div>
    `,
    data() {
        return {
            colors: ['#f28b82', '#fbbc04', '#fff475', '#ccff90',
                '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'],
            selectedColor: this.note.style.backgroundColor
        }
    },
    methods: {
        changeColor(color) {
            this.$emit('color', { 'backgroundColor': color })
            this.selectedColor = color
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
    },
}