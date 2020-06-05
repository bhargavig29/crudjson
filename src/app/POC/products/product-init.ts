export class Init {
    load() {
      if (localStorage.getItem('products') === null || localStorage.getItem('products') == undefined) {
        console.log('No Products Found Creating...');
        let products = [];
        localStorage.setItem('products', JSON.stringify(products));
        return
      } else {
        console.log('Found Products...');
      }
    }
  }