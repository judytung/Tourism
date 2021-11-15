"use strict";

var regionSearch = document.querySelector('.regionSearch');
var region = ['基隆市', '台北市', '新北市', '桃園市', '新竹市', '新竹縣', '宜蘭縣', '苗栗縣', '臺中市', '彰化縣', '南投縣', '雲林縣', '嘉義市', '嘉義縣', '臺南市', '高雄市', '屏東縣', '臺東縣', '花蓮縣', '金門縣', '連江縣', '澎湖縣'];
var str = "<option value=\"\u5730\u5340\u641C\u5C0B\" disabled selected hidden>\u8ACB\u9078\u64C7\u7E23\u5E02</option>\n  <option value=\"\">\u5168\u90E8\u5730\u5340</option>";
region.forEach(function (item) {
  str += "<option value=\"".concat(item, "\" class=\"regionOption\">").concat(item, "</option>");
});
regionSearch.innerHTML = str;
axios.get('', {
  headers: getAuthorizationHeader()
}).then(function (response) {
  document.querySelector('body').textContent = JSON.stringify(response.data);
})["catch"](function (error) {
  console.log(error);
}); // API 帶 header 驗證

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
