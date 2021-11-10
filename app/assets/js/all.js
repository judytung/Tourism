
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