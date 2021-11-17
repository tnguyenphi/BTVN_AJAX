
var service = new InfoService();

function getEle (id){
    return document.getElementById(id);
}

function getInfo(){
    service.getListInfoApi()
    // thành công trả về then
    .then(function (result) {
        console.log(result.data);
        renderData(result.data);
    })
    // lỗi thì catch
    .catch(function (error) {
        console.log(error);
    });
}
getInfo();

function renderData(data){
    var html = "";
    data.forEach(function(item){
        html += `
        <div class="col-6 col-lg-3">
        <div class="card">
            <img src="./img/${item.hinhAnh}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5>${item.ngonNgu}</h5>
                <h3 class="card-title">${item.hoTen}</h3>
                <p class="card-text">${item.moTa}t</p>
            </div>
        </div>
    </div>
        `
    })
    getEle("card_content").innerHTML = html;
}