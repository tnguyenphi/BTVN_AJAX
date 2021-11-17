function ListUser(){
    this.arrayUser = []; 
    this.setUserList = function(data){
        this.arrayUser = data;
    }
}

ListUser.prototype.searchName = function(key){
    var arrayKey=[];
    var key = key.trim().toLowerCase();
    this.arrayUser.map(function(user){
        var name = user.hoTen.toLowerCase();
        if(name.indexOf(key) > -1){
            console.log("Tìm thấy tên Tài Khoảng");
            arrayKey.push(user);
        }
    });
    return arrayKey;
}