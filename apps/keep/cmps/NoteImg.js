import { utilService } from "../../../services/util.service.js"
import NoteEditor from "./NoteEditor.js"

export default {
    name: 'NoteImg',
    emits: ['updateInfo'],
    props: ['info' , 'editAble'],
    template: `
    <img :src="info.url">
    <h4 :contenteditable="editAble" class="content" ref="imgTitle" @input="updateTitle">{{ info.title }}</h4>
    <h5 :contenteditable="editAble" class="content" ref="imgTxt" @input="updateTxt">{{ info.txt }}</h5>
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
            this.newInfo.txt = this.$refs.imgTxt.innerText
        },
        updateTitle() {
            this.newInfo.title = this.$refs.imgTitle.innerText
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
    }
}