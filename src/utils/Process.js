class ProcessData {
    PROC_DATA(ID, item, image) {
        const data = {};
        let imgURLS = [];
        if (item.color.length > 1) {
            imgURLS = this.getImageByColor(item.color, image);
        }
        else {
            let url = '';
            imgURLS = item.image.map(el => {
                image.forEach(el2 => {
                    if (el2.sys.id === el.sys.id) {
                        url = el2.fields.file.url;
                    }
                });
                return {
                    url
                }
            });
        }
        data.id = ID;
        data.name = item.name;
        data.price = item.price;
        data.color = item.color;
        data.imgArr = imgURLS;
        data.size = item.size;
        return data;
    }
    getDetailList = detailArr => {
        const dt = detailArr.map(el => {
            return el.content[0].content[0].value
        })
        return dt
    }
    
    PROC_DATA_RAW(raw) {
        const data = {}
        const { includes, items } = raw;
        let productImage = [];
        if (items[0].fields.color.length > 1) {
            productImage = this.getImageByColor(items[0].fields.color, includes.Asset);
        }
        else {
            productImage = includes.Asset.map(el => {
                return {
                    url: el.fields.file.url,
                }
            })
        }
        data.images = productImage;
        data.details = this.getDetailList(items[0].fields.detials.content[0].content);
        data.size = items[0].fields.size;
        data.color = items[0].fields.color;
        data.price = items[0].fields.price;
        data.name = items[0].fields.name;
        data.id = items[0].sys.id
        return data;
    }
    
    getImageByColor(color, image) {
        const convertIntoObjectKeyVal = Object.fromEntries(color.map(el => {
            return [el, []]
        }))
        const items = { ...convertIntoObjectKeyVal };
        color.forEach(cl => {
            image.forEach(el => {
                if (cl.toLowerCase() === el.fields.title.toLowerCase()) {
                    items[cl].push({url: el.fields.file.url});
                }
            })
        })
        return items;
    }
}

export default ProcessData