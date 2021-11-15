const regionSearch = document.querySelector('.regionSearch');
const scenicList = document.querySelector('.scenicList');
const searchBtn = document.querySelector('.searchBtn');

function init() {
   let region = ['基隆市','台北市','新北市','桃園市','新竹市','新竹縣','宜蘭縣','苗栗縣','臺中市','彰化縣','南投縣','雲林縣','嘉義市','嘉義縣','臺南市','高雄市','屏東縣','臺東縣','花蓮縣','金門縣','連江縣','澎湖縣'];
   let str = `<option value="地區搜尋" disabled selected hidden>請選擇縣市</option>
 <option value="">全部地區</option>`;
   region.forEach(function(item) {
     str += `<option value="${item}" class="regionOption">${item}</option>`
   })
                  
  regionSearch.innerHTML = str;
}
init();


// 渲染
searchBtn.addEventListener('click', function (e) {
   render();
 });
 
function render() {
axios.get(
   'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$select=Name%2CAddress%2COpenTime%2CTicketInfo%2CPicture&$format=JSON',
   {
      headers: getAuthorizationHeader()
   }
)
  .then(function (response) {
// document.querySelector('body').textContent=JSON.stringify(response.data);
      const data = response.data;
      let str = '';
      data.forEach(function(item){
         str += `<li class="d-flex py-2 border-bottom">
               <div class="me-ml">
                  <img src="${item.Picture.PictureUrl1}" alt="${item.Picture.PictureDescription1}" class="rounded-2 h-6.125 w-6.125">
               </div>
               <div>
                  <h2 class="fs-3 mb-xs">${item.Name}</h2>
                  <div class="mb-xs fs-2 d-flex">
                     <span class="material-icons-outlined">location_on</span>
                     <p>${item.Address}</p>
                  </div>
                  <div class="mb-xs fs-2 d-flex">
                     <span class="material-icons-outlined">schedule</span>
                     <p>${item.OpenTime}</p>
                  </div>
                  <div class="fs-2 d-flex">
                     <span class="material-icons-outlined">attach_money</span>
                     <p>${item.TicketInfo}</p>
                  </div>
               </div>
         </li>`
      })
   scenicList.innerHTML = str;
   })
   .catch(function (error) {
   console.log(error);
   }); 
}









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