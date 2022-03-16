
export class PreventMouse {
    constructor(canvas) {
        // 마우스 클릭방지 
        this.mouseClicked;
        this.mouseTime;
        this.mouseStartX;
        this.mouseStartY;

        canvas.addEventListener('mousedown', e => {
            this.mouseClicked = false
            this.mouseStartX = e.clientX
            this.mouseStartY = e.clientY 
            this.mouseTime = Date.now();
        })

        canvas.addEventListener('mouseup', e => {
            const xgap = Math.abs(e.clientX - this.mouseStartX)
            const ygap = Math.abs(e.clientY - this.mouseStartY)

            // 마우스 드래그 한 시간 
            Date.now() - this.mouseTime > 300 ? this.mouseTime = true : this.mouseTime = false;

            // 마우스 이동한 거리
            xgap > 5 || ygap > 5 ? this.mouseClicked = true : this.mouseClicked = false;
        })

    }
}