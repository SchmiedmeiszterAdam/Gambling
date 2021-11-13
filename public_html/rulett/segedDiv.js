const elsoHelye = (100 / 12) - 3 / 2
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
            tolas = elsoHelye + szorzo * (100 / 12)
            szorzo++
        }
        else {
            tolas = elsoHelye + this.id * (100 / 12)
        }
        this.elem.css("left", "" + tolas + "%")
        this.elem.css(irany, "" + (100 / 3 - 3 * 2) + "%")
    }
}