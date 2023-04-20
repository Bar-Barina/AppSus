import { utilService } from "../../../services/util.service.js"
import NoteEditor from "./NoteEditor.js"

export default {
    name: 'NoteTxt',
    emits: ['updateInfo'],
    props: ['info' , 'editAble'],
    template: `
    <h4 :contenteditable="editAble" class="content"   ref="txtTitle" @focusout="updateTitle">{{ info.title }}</h4>
    <h5 :contenteditable="editAble" class="content" ref="txtTxt" @focusout="updateTxt">{{ info.txt }}</h5>
    `,
    data() {
        return {
            color: null ,
            newInfo: this.info
        }
    },
    created() {
        this.debounceUpdateInfo = utilService.debounce(this.updateInfo , 400)
    },
    methods: {
        updateTxt() {
            this.newInfo.txt = this.$refs.txtTxt.innerText
        },
        updateTitle() {
            this.newInfo.title = this.$refs.txtTitle.innerText
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