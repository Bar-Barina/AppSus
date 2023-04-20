import { utilService } from "../../../services/util.service.js"
import NoteEditor from "./NoteEditor.js"


export default {
    props: ['info' , 'editAble'],
    emits: ['updateInfo'],
    template: `
    <video class="video-preview" autoplay loop muted>
    <source :src="info.url" type="video/mp4">
    </video>
    <h4 v-if="info.title" @input="updateTitle" class="content" :contenteditable="editAble" @click.stop="" ref="videoTitle">{{ info.title}}</h4>
    <h5 v-if="info.txt" @input="updateTxt" class="content" :contenteditable="editAble" @click.stop="" ref="videoTxt">{{ info.txt }}</h5>
    `,
    data() {
        return {
            newInfo: this.info
        }
    },
    created() {
        this.debounceUpdateInfo = utilService.debounce(this.updateInfo , 400)
    },
    methods: {
        updateTxt() {
            this.newInfo.txt = this.$refs.videoTxt.innerText
        },
        updateTitle() {
            this.newInfo.title = this.$refs.videoTitle.innerText
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