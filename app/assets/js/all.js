const regionSearch = document.querySelector('.regionSearch');
let region = ['基隆市','台北市','新北市','桃園市','新竹市','新竹縣','宜蘭縣','苗栗縣','臺中市','彰化縣','南投縣','雲林縣','嘉義市','嘉義縣','臺南市','高雄市','屏東縣','臺東縣','花蓮縣','金門縣','連江縣','澎湖縣'];
    let str = `<option value="地區搜尋" disabled selected hidden>請選擇縣市</option>
  <option value="">全部地區</option>`;
    region.forEach(function(item) {
      str += `<option value="${item}" class="regionOption">${item}</option>`
    })
                   
  regionSearch.innerHTML = str;





axios.get(
  '',
  {
     headers: getAuthorizationHeader()
  }
)
.then(function (response) {
 document.querySelector('body').textContent=JSON.stringify(response.data);
})
.catch(function (error) {
 console.log(error);
}); 



// API 帶 header 驗證
function getAuthorizationHeader() {
//  填入自己 ID、KEY 開始
   let AppID = 'e1aa6d263b8549b796b5299c1eae6f21';
   let AppKey = 'KyNX20FckXfQPQ16kYeVMP4jJMQ';
//  填入自己 ID、KEY 結束
   let GMTString = new Date().toGMTString();
   let ShaObj = new jsSHA('SHA-1', 'TEXT');
   ShaObj.setHMACKey(AppKey, 'TEXT');
   ShaObj.update('x-date: ' + GMTString);
   let HMAC = ShaObj.getHMAC('B64');
   let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
   return { 'Authorization': Authorization, 'X-Date': GMTString }; 
}