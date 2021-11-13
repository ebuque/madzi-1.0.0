import { observable, action } from "mobx";

class Loja {
    @observable user = ""
    @observable email = ""
    @action addValue = (type, item)  => {
        switch (type) {
            case 'email':
                this.email = item;
                break;
            case 'fullname':
                this.user = item;
                break;
            default:
                break;
        }
        
          return item;
        
      }
}

store = window.store = new Loja();
export default store;