"use strict";

var regionSearch = document.querySelector('.regionSearch');
var scenicList = document.querySelector('.scenicList');
var searchBtn = document.querySelector('.searchBtn');
var region = ['基隆市', '台北市', '新北市', '桃園市', '新竹市', '新竹縣', '宜蘭縣', '苗栗縣', '臺中市', '彰化縣', '南投縣', '雲林縣', '嘉義市', '嘉義縣', '臺南市', '高雄市', '屏東縣', '臺東縣', '花蓮縣', '金門縣', '連江縣', '澎湖縣'];

function init() {
  var str = "<option value=\"\" disabled hidden selected>\u8ACB\u9078\u64C7\u7E23\u5E02</option>\n <option value=\"\u5168\u90E8\u5730\u5340\">\u5168\u90E8\u5730\u5340</option>";
  region.forEach(function (item) {
    str += "<option value=\"".concat(item, "\" class=\"regionOption\">").concat(item, "</option>");
  });
  regionSearch.innerHTML = str;
}

init(); // 地區篩選
// regionSearch.addEventListener('change', function (e) {
//    const area = e.target.value;
//    // console.log(area);
//    axios.get(
//       `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=contains(Name,'${area}')&$format=JSON`,
//       {
//          headers: getAuthorizationHeader()
//       }
//    )
//    .then(function (response) {
//       searchBtn.addEventListener('click', function (e) {
//          const data = response.data;
//          let str = '';
//          data.forEach(function(item){
//             str += `<li class="d-flex py-2 border-bottom overflow-hidden">
//                   <div class="me-ml">
//                      <img src="${item.Picture.PictureUrl1}" alt="${item.Picture.PictureDescription1}" class="rounded-2 h-6.125 w-6.125奧奧">
//                   </div>
//                   <div>
//                      <h2 class="fs-3 mb-xs">${item.Name}</h2>
//                      <div class="mb-xs fs-2 d-flex">
//                         <span class="material-icons-outlined">location_on</span>
//                         <p>${item.Address}</p>
//                      </div>
//                      <div class="mb-xs fs-2 d-flex">
//                         <span class="material-icons-outlined">schedule</span>
//                         <p>${item.OpenTime}</p>
//                      </div>
//                      <div class="fs-2 d-flex">
//                         <span class="material-icons-outlined">attach_money</span>
//                         <p>${item.TicketInfo}</p>
//                      </div>
//                   </div>
//             </li>`
//          })
//          scenicList.innerHTML = str;
//       })
//    })
//    .catch(function (error) {
//      console.log(error);
//    }); 
// })
// 渲染

searchBtn.addEventListener('click', function (e) {
  render();
});

function render() {
  axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$select=Name%2CAddress%2COpenTime%2CTicketInfo%2CPicture&$format=JSON', {
    headers: getAuthorizationHeader()
  }).then(function (response) {
    // document.querySelector('body').textContent=JSON.stringify(response.data);
    var data = response.data;
    var str = '';
    data.forEach(function (item) {
      str += "<li class=\"d-flex py-2 border-bottom overflow-hidden\">\n                  <div class=\"me-ml\">\n                     <img src=\"".concat(item.Picture.PictureUrl1, "\" alt=\"").concat(item.Picture.PictureDescription1, "\" class=\"rounded-2 h-6.125 w-6.125\">\n                  </div>\n                  <div>\n                     <h2 class=\"fs-3 mb-xs\">").concat(item.Name, "</h2>\n                     <div class=\"mb-xs fs-2 d-flex\">\n                        <span class=\"material-icons-outlined\">location_on</span>\n                        <p>").concat(item.Address, "</p>\n                     </div>\n                     <div class=\"mb-xs fs-2 d-flex\">\n                        <span class=\"material-icons-outlined\">schedule</span>\n                        <p>").concat(item.OpenTime, "</p>\n                     </div>\n                     <div class=\"fs-2 d-flex\">\n                        <span class=\"material-icons-outlined\">attach_money</span>\n                        <p>").concat(item.TicketInfo, "</p>\n                     </div>\n                  </div>\n            </li>");
    });
    scenicList.innerHTML = str;
  })["catch"](function (error) {
    console.log(error);
  });
} // API 帶 header 驗證


function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  var AppID = 'e1aa6d263b8549b796b5299c1eae6f21';
  var AppKey = 'KyNX20FckXfQPQ16kYeVMP4jJMQ'; //  填入自己 ID、KEY 結束

  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  var HMAC = ShaObj.getHMAC('B64');
  var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return {
    'Authorization': Authorization,
    'X-Date': GMTString
  };
}
//# sourceMappingURL=all.js.map
