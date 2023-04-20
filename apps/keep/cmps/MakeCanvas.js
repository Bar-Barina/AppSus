import { eventBus } from "../../../services/event-bus.service.js"
import { canvasService } from "../services/canvas.service.js"
import { utilService } from "../../../services/util.service.js"

export default {
    name: 'MakeCanvas',
    props: ['info', 'editAble'],
    template: `
    <div class="canvas-container" v-if="isCanvasEdit">
    <canvas 
    class="canvas-edit"
    @mousedown="startDraw"
    @mousemove="draw"
    @mouseup="stopDrawing"
    ref="canvas"></canvas>
    </div>
    <section v-if="info">
    <img :src="info.canvasUrl" v-if="!isCanvasEdit">
    <h4 :contenteditable="editAble" class="content"  @click.stop="" ref="canvasTitle" @focusout="updateTitle">{{ info.title }}</h4>
    <h5 :contenteditable="editAble" class="content" @click.stop="" ref="canvasTxt" @focusout="updateTxt">{{ info.txt }}</h5>
    </section>
    `,
    data() {
        return {
            ctx: null,
            drawMode: false,
            x: null,
            y: null,
            selectedShape: 'rect'
        }
    },
    created() {
        this.debounceUpdateInfo = utilService.debounce(this.updateInfo, 400)
        eventBus.on('getCanvasUrl', () => {
            const url = this.$refs.canvas.toDataURL('images/jpeg')
            eventBus.emit('canvasUrlUpdated', url)
            this.ctx = null
        })
    },
    mounted() {
        if (this.isCanvasEdit) this.ctx = this.$refs.canvas.getContext("2d")
        if (this.isCanvasEdit) this.loadImg()
    },
    methods: {
        drawLine(x1, y1, x2, y2) {
            this.ctx.beginPath()
            this.ctx.strokeStyle = 'black'
            this.ctx.lineWidth = 1
            this.ctx.moveTo(x1, y1)
            this.ctx.lineTo(x2, y2)
            this.ctx.stroke()
            this.ctx.closePath()
        },
        drawShape(ev) {
            if (this.selectedShape === 'rect') canvasService.drawRect(ev, this.ctx)
        },
        startDraw(ev) {
            const rect = this.$refs.canvas.getBoundingClientRect()
            this.x = ev.clientX - rect.left
            this.y = ev.clientY - rect.top
            this.drawMode = true
        },
        draw(ev) {
            if (this.drawMode) {
                const rect = this.$refs.canvas.getBoundingClientRect()
                this.drawLine(this.x, this.y, ev.offsetX, ev.offsetY)
                this.x = ev.clientX - rect.left
                this.y = ev.clientY - rect.top
            }
        },
        stopDrawing() {
            this.drawMode = false
        },
        updateTxt() {
            this.newInfo.txt = this.$refs.canvasTxt.innerText
        },
        updateTitle() {
            this.newInfo.title = this.$refs.canvasTitle.innerText
        },
        updateInfo() {
            this.$emit('updateInfo', this.newInfo)
        },
        loadImg() {
            const img = new Image()
            img.src = this.info.canvasUrl
            img.onload = () => {
                this.ctx.drawImage(img, 0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
            }
        }
    },
    computed: {
        isCanvasEdit() {
            if (this.editAble || !this.info) return true
            else return false
        }
    }
}
// @mousedown="startDraw"
// @mousemove="drawLine"
// @mouseup="stopDraw" 