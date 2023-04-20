import { utilService } from "../../../services/util.service.js"
import { mapService } from "../services/map.service.js"

import NoteEditor from "./NoteEditor.js"

export default {
    name: 'NoteMap',
    emits: ['updateInfo'],
    props: ['info' , 'editAble'],
    template: `
    <div ref="map" class="map-container"></div>
    <h4 :contenteditable="editAble"  @click.stop="" class="content" ref="mapTitle" @focusout="updateTitle">{{ info.title }}</h4>
    <h5 :contenteditable="editAble" @click.stop="" class="content" ref="mapTxt" @focusout="updateTxt">{{ info.txt }}</h5>
    `,
    data() {
        return {
            map: null,
            newInfo: this.info,
            center: null,
        }
    },
    created() {
        this.debounceUpdateInfo = utilService.debounce(this.updateInfo , 400)
        return mapService.connectGoogleApi()
        .then(() => {
            this.map = new google.maps.Map(
                this.$refs.map, {
                center: { lat: this.info.coords.lat, lng: this.info.coords.lng },
                zoom: 10
            })
            this.center = JSON.parse(JSON.stringify(this.map.center))
        })
    },
    mounted() {
    },
    methods: {
        updateTxt() {
            this.newInfo.txt = this.$refs.mapTxt.innerText
        },
        updateTitle() {
            this.newInfo.title = this.$refs.mapTitle.innerText
        },
        updateInfo() {
            this.$emit('updateInfo' , this.newInfo)
        }
    },
    watch: {
        newInfo: {
            handler() {
                this.debounceUpdateInfo()
            },
            deep: true
        }
    },
    components: {
        NoteEditor
    },
}