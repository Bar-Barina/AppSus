import { utilService } from "../../../services/util.service.js"
import NoteEditor from "./NoteEditor.js"

export default {
    name: 'NoteTodos',
    emits: ['updateInfo'],
    props: ['info', 'editAble'],
    template: `
    <h4 :contenteditable="editAble"  
    @click.stop="" ref="todosTitle" 
    @input="updateTitle" class="content">{{ info.title }}</h4>
    <ul>
        <li :contenteditable="editAble" @click.stop="todoDone(index)" 
        v-for="(info , index) in info.todos" :class="{done: info.doneAt}"
        @input="updateTodo(index)" class="content">{{info.txt}}</li>
    </ul>
    `,
    data() {
        return {
            newInfo: this.info,
        }
    },
    created() {
        this.debounceUpdateInfo = utilService.debounce(this.updateInfo , 400)
    },
    methods: {
        updateTodo(idx) {
            this.newInfo.todos[idx].txt = this.$refs.idx.innerText
        },
        updateTitle() {
            this.newInfo.title = this.$refs.todosTitle.innerText
        },
        updateInfo() {
            this.$emit('updateInfo' , this.newInfo)
        },
        todoDone(idx) {
            this.newInfo.todos[idx].doneAt = 
            (this.newInfo.todos[idx].doneAt) ? null : Date.now()
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