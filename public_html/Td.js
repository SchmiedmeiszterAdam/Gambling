class Td {
    constructor(elem, id) {
        this.id = id
        this.elem = elem
        this.kattintott = false
        this.setSzin()
        this.elem.on("click",()=>{
            this.kattintasTrigger()
        })
    }
    setSzin() {
        if ((((this.id > 9 && this.id < 18) || (this.id > 27 && this.id % 2 === 0)) && this.id % 2 === 0) || (((this.id < 10) || (this.id > 18 && this.id < 28)) && this.id % 2 === 1)) {
            this.elem.css("background", "black")
        }
        //if ((this.id < 10 && this.id % 2 === 1) || (this.id > 9 && this.id < 18 && this.id % 2 === 0) || (this.id > 18 && this.id < 28 && this.id % 2 === 1) || (this.id > 27 && this.id % 2 === 0))

        else {
            this.elem.css("background", "red")
        }
    }
    kattintasTrigger() {
        let esemeny = new CustomEvent("kikapcsolas", { detail: this })
        window.dispatchEvent(esemeny)
    }
}