app.controller("myCtrl", ["$scope", "$firebaseAuth","$location",  function($scope, $firebaseAuth,$location) {
    $scope.register = function (){
        var username = $scope.user.email;
        var password = $scope.user.password;
                  
        var auth = $firebaseAuth();
        auth.$createUserWithEmailAndPassword(username, password)
       .then (function(user){
            console.log(user.uid);
            alert("Đăng ký thành công");
            location.replace("./checkout2.html");
        }) 
        .catch(function(error){
            console.log(error);
            alert("Email này đã tồn tại. Vui lòng nhập Email khác");
            
        });
    };

}
]);

// const firebaseConfig = {
//     apiKey: "AIzaSyDLbs7zIXAJYHTic85G8z1DwVFLRUQjzMY",
//     authDomain: "ps18735-cf548.firebaseapp.com",
//     databaseURL: "https://ps18735-cf548-default-rtdb.firebaseio.com/",
//     projectId: "ps18735-cf548",
//     storageBucket: "ps18735-cf548.appspot.com",
//     messagingSenderId: "75478200117",
//     appId: "1:75478200117:web:42458a6b76e93c8d37267c",
//     measurementId: "G-W226RCVPGK"
// };
// firebase.initializeApp(firebaseConfig);
// var database = firebase.database();

// var app = angular.module("myapp",[]);
//     app.controller("myCtrl", function($scope){
    
//         $scope.register = function(){
//             try {
//                 var objKH = {
//                     username: $scope.txtUsername,
//                     password: $scope.txtPassword,
//                     telephone: $scope.txtTelephone,
//                     email : $scope.txtEmail,
//                     address: $scope.txtAddress
//                 };
//                 var refKH = database.ref("KhachHang");
//                 refKH.push(objKH);
//                 alert('Đăng ký thành công');
//                 location.replace("checkout2.html");
//             } catch (error) {
//                 alert('Thiếu thông tin hoặc Email không hợp lệ');
//                 alert('Đăng ký không thành công');
//                 location.replace("checkout2.html");
//             }
//         }
//     });