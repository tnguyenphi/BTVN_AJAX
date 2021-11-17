
function UserService (){
    this.getListUserApi = function (){
        return axios ({
            url: "https://6183cae791d76c00172d1b5b.mockapi.io/api/products",
            method: "GET",
        });
    };
    this.deleteUserApi = function (id){
        return axios({
            url : `https://6183cae791d76c00172d1b5b.mockapi.io/api/products/${id}`,
            method : "DELETE",
        });
    };

    this.addUserApi = function (user){
        return axios({
            url : "https://6183cae791d76c00172d1b5b.mockapi.io/api/products",
            method : "POST",
            data: user,
        });
    };
    this.getUserById = function (id){
        return axios({
            url : `https://6183cae791d76c00172d1b5b.mockapi.io/api/products/${id}`,
            method : "GET",
        });
    };
    this.updateUserApi = function (user){
        return axios({
            url : `https://6183cae791d76c00172d1b5b.mockapi.io/api/products/${user.id}`,
            method : "PUT",
            data: user,
        });
    };

}