"use strict";

axios.get('', {
  headers: getAuthorizationHeader()
}).then(function (response) {
  document.querySelector('body').textContent = JSON.stringify(response.data);
})["catch"](function (error) {
  console.log(error);
});

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
