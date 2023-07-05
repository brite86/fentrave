import fentravAPI from "../api/fentravAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";
export default class Column{
    constructor(id, title){
        const topDropZone = DropZone.createDropZone()
    this.elements = {}
    this.elements.root = Column.createRoot()
    this.elements.title = this.elements.root.querySelector(".fentrav__column-title")
    this.elements.items = this.elements.root.querySelector(".fentrav__column-items")
    this.elements.addItem = this.elements.root.querySelector(".fentrav__add-item")

    this.elements.root.dataset.id = id
    this.elements.title.textContent = title

    this.elements.items.appendChild(topDropZone);

    this.elements.addItem.addEventListener("click", ()=>{
    const newItem = fentravAPI.insertItem(id, "")
    this.renderItem(newItem)

     });
     fentravAPI.getItems(id).forEach(item =>{
        this.renderItem(item)
     });
    }

    static createRoot(){
        const range=document.createRange()
        range.selectNode(document.body)
        return range.createContextualFragment(`
        <div class="fentrav__column">
        <div class="fentrav__column-title"></div>
        <div class="fentrav__column-items"></div>
        <button class="fentrav__add-item" type="button">+Add a card</button>
        </div>
        
        `).children[0]
    }
        renderItem(data){
            const item = new Item(data.id, data.content)
            this.elements.items.appendChild(item.elements.root)
        }
        
    
}