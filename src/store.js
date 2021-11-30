import { observable, action } from "mobx";

class Loja {
    @observable user = ""
    @observable email = ""
    @observable apiHost = "http://41.223.152.98:8077"
    @observable simulateEndPoint = "/fipagmaputo/api/recharge/simulate"
    @observable eld = "PLUS_TEK"
    @observable eKey = "e2d25046-1cee-4ac8-b917-6879c2f30b36"
    @observable userId = "ptekid"
    @observable token = "63BDAAAC-EC5C-4C38-AC76-8397F46343DA"
    @observable customerName = ""
    @observable meterNumber = ""
    @observable customerAddress =""
    @observable paymentAmount = ""
    @observable mpesaApiHost = "http://api.sandbox.vm.co.mz"
    @observable b2bPaymentEndpoint = "/ipg/v1x/b2bPayment/"
    @observable mpesaAuthorization = "Bearer N1Man00lA2dVOEm8M2IifDPuZGq0UGlZG2sdmt3nYWdPRiuDHCX2K+WPl/7A/4guqKTstavb+sA6r91+TkIWNv9dRew33/rsVZ3FPluHXesOzb6tQWU+ribPpML4SqGpBgwRSn4bXsh0aFpojwfesN/L+391kEC67h6/S7wDAGU3ZSfyVjxWtz1QNNdlhkUVPVR5VTvw9oRBm4H4d40E6jLxkLbntsAIN1ZNj3ijPmjXqaHNO3PlEL856XJDlebT3YbJCrvKKdPf09t9EluEdAhJ9E62gTYhqVWqLs7zp8sVn1yzmD2YE2heyFXPaZQ0hPCkGGOqhPv6uJUvXXrCGNauZmZ1EjzkydCFSotRJT3bSqRTNzyjrrv7bbI1D8/Qku/xqvaPPrAkE/670f3PS4mkNGzVCg3/1yxUY2rXS356fqeR5p4fqDVJHg6VF2mcwBpVXvnQQ3qbOAISFPM4PDHaNipKoucdOgQcslhW/44ZSthIDh3hZ2K7+KnAl4nXNuhz3ZZej4+AkNzFmVEiEJxDGRcnbIA1gHF3dkwqU8zjCAswTt6Nvd5jrzY8nL6Eh8ZuIu0bIb1WyzuD+H/L2Qwiwcd+2tSeGOtO9QmbPi5LVZEt6eSsSijeCYgT4ejC8PQuCV3HdZbTr96+Dzf8tq+UO4IesWF7fM381ZAkRi0="
    
    @action addValue = (type, item)  => {
        switch (type) {
            case 'email':
                this.email = item;
                break;
            case 'fullname':
                this.user = item;
                break;
            case 'customerName':
            this.customerName = item;
            break;
            case 'meterNumber':
            this.meterNumber = item;
            break;
            case 'customerAddress':
            this.customerAddress = item;
            break;
            case 'paymentAmount':
            this.paymentAmount = item;
            break;
            default:
                break;
        }
        
          return item;
        
      }
}

store = window.store = new Loja();
export default store;