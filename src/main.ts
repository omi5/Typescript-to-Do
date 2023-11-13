import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/Listitem'
import ListTemplete from './templetes/listTempletes'

const initApp = (): void =>{
    const fullList = FullList.instance;
    const templete = ListTemplete.instance;

    const itemEntryFrom = document.getElementById('itemEntryForm') as HTMLFormElement
    itemEntryFrom.addEventListener('submit', (event : SubmitEvent): void =>{
        event.preventDefault()

        const input = document.getElementById('newItem') as HTMLInputElement
        const newEntryText : string = input.value.trim()
        
        const itemId : number = fullList.items.length ? parseInt(fullList.items[fullList.items.length - 1].id) + 1 : 1;

        const newItem = new ListItem(itemId.toString(), newEntryText);
        fullList.addItem(newItem)
        templete.render(fullList)

    })
    const clearItems = document.getElementById('clearItemsButton') as HTMLButtonElement

    clearItems.addEventListener('click' ,(): void =>{
        fullList.clearList()
        templete.clear()
    })
    fullList.load()
    templete.render(fullList)
}

document.addEventListener('DOMContentLoaded', initApp)

