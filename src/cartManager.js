import { existsSync, promises } from "fs";


/* por parámetro al constructor le paso la ruta del archivo a utilizar */
class CartManager {
    constructor(path) {
        this.path = path
    }

    async createCart() {
        try {
            let cartFile = []
            let id;

            if (existsSync(this.path)){                
                const file= await promises.readFile(this.path, 'utf-8')
                cartFile = JSON.parse(file)                
                id = cartFile[cartFile.length-1].id + 1                
                
            }else{                             
                id = 1             
            }
            const newCart = {id, 
                products: []
            }

            /* pusheo el nuevo producto al array cartFile */
            cartFile.push(newCart)

            /* hago un segundo await para sobreescribir el archivo */
            await promises.writeFile(this.path, JSON.stringify(cartFile))
            return newCart
        }
        catch(error){
            return(error)
        }        
    }


    async getCartProducts(cid) {
        try{
            if (existsSync(this.path)){
                const cartProductsFile= await promises.readFile(this.path, 'utf-8')
                
                const cartProductsParseado= JSON.parse(cartProductsFile)
                const selectedCart = cartProductsParseado.find(c=> c.id === cid)
                return selectedCart.products
                /* if (selectedCart){
                    return selectedCart.products
                } */
            }
        }
        catch(error){

        }
                    
    }



    async addProductToCart(cid, pid){
        if (existsSync(this.path)){
            const cartProductsFile= await promises.readFile(this.path, 'utf-8')
            
            const cartProductsParseado= JSON.parse(cartProductsFile)
            const selectedCart = cartProductsParseado.find(c=> c.id === cid)

            if (selectedCart){
                const prodExists = selectedCart.products.find(p=>p.pid === pid)
                if (prodExists) {
                    const index = selectedCart.products.findIndex(p=> p.pid == pid)
                    selectedCart.products[index].quantity += 1                    
                }else{
                    const newProd ={
                        pid, 
                        quantity: 1
                    }
                    selectedCart.products.push(newProd)
                }
                
                await promises.writeFile(this.path, JSON.stringify(cartProductsParseado))
            }            
            return selectedCart            
        }  
        }    
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//TESTING



async function test() {
    const cManager = new CartManager("./data/mycart.json")
    
    
    /* CREATE CART */
    await cManager.createCart()
    //await cManager.addProductToCart(2, 4)
    
}
   


//test()

export const cManager = new CartManager("./data/mycart.json");