import ListItem from './Listitem'
import Listitem from './Listitem'

interface List{
    items : Listitem[],
    // load(): void,
    // save(): void,
    // clearList(): void,
    addItem(objItem : Listitem): void,
    removeItem(id: String): void,
}

export default class FullList implements List {

     static instance: FullList = new FullList; 
    private constructor(
        private _items: ListItem[] = [],
    ){}

    get items(): ListItem[]{
        return this._items;
    }

    load(): void{
        const storedList: string | null = localStorage.getItem('myList');
        if(typeof storedList !== 'string') return
        
        const parsedList : {_id: string, _item: string, _checked: boolean}[] = JSON.parse(storedList);

        parsedList.forEach(objItem =>{
            const newListItem = new ListItem(objItem._id, objItem._item, objItem._checked);
            FullList.instance.addItem(newListItem)
        })

    }

    save(): void {
        localStorage.setItem('myList', JSON.stringify(this._items))
    }
    clearList(): void {
        this._items = [];
        this.save()
    }

    addItem(objItem: ListItem): void {
        this._items.push(objItem);
        this.save()
    }

    removeItem(id: string): void{
        this._items = this._items.filter(item => item.id !== id);
        this.save()
    }
}
