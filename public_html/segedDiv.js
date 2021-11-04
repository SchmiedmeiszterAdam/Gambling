const tdSzelesseg = 100 / 12
const elsoHelye = tdSzelesseg - 3 / 2
const magassag = 100 / 3 - 3 * 2
let szorzo = 0
let irany = "bottom"
let tolas
class segedDiv extends rulettElem {
    constructor(elem, id) {
        super(elem, id)
        this.elhelyez()
    }
    elhelyez() {
        if (this.id > 10) {
            irany = "top"
            tolas = elsoHelye + szorzo * tdSzelesseg
            szorzo++
        }
        else {
            tolas = elsoHelye + this.id * tdSzelesseg
        }
        this.elem.css("left", "" + tolas + "%")
        this.elem.css(irany, "" + magassag + "%")
    }
}