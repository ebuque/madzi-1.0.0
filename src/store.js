import { observable, action } from "mobx"

class Loja {
    @observable phone = ""
    @observable smsPin = ""
    @observable fullname = ""
    @observable password = ""
    @observable email = ""
    @observable genero = "M"
    @observable finished = false
    @observable address = ""
    @observable uriFotoFrontal = ""
    @observable uriFotoTrazeira = ""
    @observable selfie = ""
    @observable userid = ""
    @observable loginPhone = ""
    @observable EndPoint = "clica-no.link"
    @observable accessProtocol = "https"
    @observable userdata = {}

    @action addValue = (type, item)  => {
        switch (type) {
            case 'phone':
                this.phone = item;
                break;
                case 'loginPhone':
                    this.loginPhone = item;
                    break;
            case 'userid':
                this.userid = item;
                break;
            case 'smsPin':
                this.smsPin = item;
                break;
            case 'email':
                this.email = item;
                break;
            case 'fullname':
                this.fullname = item;
                break;
            case 'genero':
                this.genero = item;
                break;
            case 'password':
                this.password = item;
                break;
            case 'address':
                this.address = item;
                break;
            case 'uriFotoFrontal':
                this.uriFotoFrontal = item;
                break;
            case 'uriFotoTrazeira':
                    this.uriFotoTrazeira = item;
                    break;
            case 'selfie':
                        this.selfie = item;
                        break;
            case 'fineshed':
                this.finished = item;
                break;
                case 'userdata':
                    this.userdata = item;
                    break;
            default:
                break;
        }
        
          return item;
        
      }
}

store = window.store = new Loja();
export default store;