class SegedDiv {
    constructor(elem, szin, ertek, pozicio) {
        this.elem = elem
        this.szin = szin
        this.ertek = ertek
        this.pozicio = pozicio
        this.kattintott = false
        this.elem.on("click", () => {
            this.kattintott = true
            this.off()
        })
    }
}