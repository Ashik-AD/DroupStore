class Storage {
    constructor(key, data) {
        this.key = key.toLowerCase();
        this.data = data;
    }

    getItems() {
        const req = localStorage.getItem(this.key);
        const data = req ? JSON.parse(req) : [];
        return data;
    }

    setItems() {
        try {
            const getItem = this.getItems(this.key);
            const isExits = this.isExist(this.data.id, getItem);
            if (!isExits) {
                getItem.push(this.data);
                localStorage.setItem(this.key, JSON.stringify(getItem));
                return getItem;
            }
            else {
                return null;
            }
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    isExist(id, items) {
        let exit = false;
        items.forEach(el => {
            if (el.id === id) {
                return exit = true
            }
        })
        return exit
    }
}

export default Storage