
function InfoService(){
    this.getListInfoApi = function (){
        return axios({
            url: "https://6183cae791d76c00172d1b5b.mockapi.io/api/products",
            method: "GET",
        })
    };
}