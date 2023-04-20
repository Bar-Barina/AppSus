import { eventBus } from "../../../services/event-bus.service.js"
import { svgService } from "../../../services/svg.service.js"

export default {
    props: ['filterBy'],
    template: `
    <section class="side-bar">
        <div @click="changeType('')" :class="{typeSelected: !filterBy.noteType}">
    <div class="icon-side" v-html="getSvg('lightBolb')"></div>
    <span>Notes</span>
    </div>
    <div @click="changeType('NoteTodos')" :class="{typeSelected: filterBy.noteType === 'NoteTodos'}">
    <div class="icon-side" v-html="getSvg('listSide')"></div>
    <span>Todos</span>
    </div>
    <div @click="changeType('NoteImg')" :class="{typeSelected: filterBy.noteType === 'NoteImg'}">
    <div class="icon-side" v-html="getSvg('imgSide')"></div>
    <span>Images</span>
    </div>
    <div @click="changeType('NoteMap')" :class="{typeSelected: filterBy.noteType === 'NoteMap'}">
    <div class="icon-side" v-html="getSvg('map')"></div>
    <span>Maps</span>
    </div>
    <div @click="changeType('NoteAudio')" :class="{typeSelected: filterBy.noteType === 'NoteAudio'}">
    <div class="icon-side" v-html="getSvg('audioSide')"></div>
    <span>Audios</span>
    </div>
    <div @click="changeType('NoteCanvas')" :class="{typeSelected: filterBy.noteType === 'NoteCanvas'}">
    <div class="icon-side" v-html="getSvg('pencilSide')"></div>
    <span>Canvas</span>
    </div>
    
</section>
    `,
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        changeType(type) {
            eventBus.emit('filterByType', type)
        },
    }
}