class KeyController {
    constructor() {
        this.keys = [];
        
        window.addEventListener('keydown', e => {
            console.log('눌림')
            this.keys[e.code] = true;
        })

        window.addEventListener('keyup', e => {
            console.log('뗌')
            delete this.keys[e.code]
        })

        console.log(this.keys)

    }
}


export default KeyController;