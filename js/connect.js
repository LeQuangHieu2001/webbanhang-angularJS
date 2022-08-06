var app = angular.module("myapp", ["firebase"]);
app.config(function() {
  var config = {
        apiKey: "AIzaSyDLbs7zIXAJYHTic85G8z1DwVFLRUQjzMY",
        authDomain: "ps18735-cf548.firebaseapp.com",
        databaseURL: "https://ps18735-cf548-default-rtdb.firebaseio.com/",
        projectId: "ps18735-cf548",
        storageBucket: "ps18735-cf548.appspot.com",
        messagingSenderId: "75478200117",
        appId: "1:75478200117:web:42458a6b76e93c8d37267c",
        measurementId: "G-W226RCVPGK"
  };
  firebase.initializeApp(config);
});

app.controller("myCtrl", ["$scope", "$firebaseArray",
      function($scope, $firebaseArray){
         var ref = firebase.database().ref("SanPham");      
         var list = $firebaseArray(ref);
         var id = new URL(document.URL).searchParams.get('id');
         console.log(id);

         var objSP ={};
         list.$add(objSP);
         $scope.data = list;
         console.log(list)


        //  list.$loaded()
        //  .then(function(x) {
            //  x.forEach((v) => {
            //      if (id) {
            //          $scope.item = x.filter((x) => x.$id === id)
            //      }
            //  })
        //  })

         // list.$loaded()
         // .then(function(x) {
         //    $scope.data=x; // true
            
         // })
         // .catch(function(error) {
         //    console.log("Error:", error);
         // });

         list.$loaded()
        .then(function (x) {
          x.forEach((v) => {
            if (id) {
                $scope.item = x.filter((x) => x.$id === id)
            }
          })

          $scope.SanPhamList = x; // true
          $scope.begin = 0;
          $scope.pageCount = Math.ceil($scope.SanPhamList.length / 8);
          
          $scope.prev = function(){
              if($scope.begin > 0){
                  $scope.begin -=8;
              }
          }
          $scope.next = function(){
              if($scope.begin < ($scope.pageCount - 1) * 8){
                  $scope.begin +=8;
              }
          }
          
        })
        .catch(function (error) {
          console.log("Error:", error);
        });

        
        //gio hang

        $scope.total = localStorage.getItem("total");
        $scope.gioHang = JSON.parse(localStorage.getItem("GioHang")|| '[]');
        $scope.addCart = function(sp){
            var idx = $scope.gioHang.findIndex((item) => {
               return(item.sanpham.$id == sp.$id);
            });

            if(idx < 0){
               var newSp = {
               sanpham: sp,
               slBan:1
               };
               $scope.gioHang.push(newSp);
            }else{
               $scope.gioHang[idx].slBan++;
            }

           
            $scope.total++;
            localStorage.setItem("total", JSON.stringify($scope.total));
            $scope.total = parseInt(localStorage.getItem("total"));
          //  console.log($scope.gioHang);
           localStorage.setItem("GioHang", JSON.stringify($scope.gioHang));
           $scope.gioHang = JSON.parse(localStorage.getItem("GioHang")|| '[]');

        }

        // Tăng số lượng sp
        $scope.increase = (sp) => {
          $scope.gioHang.forEach(x => {
              if (x.sanpham.$id === sp.sanpham.$id) {
                  x.slBan++;
                  $scope.total++;
              }
          })
          localStorage.setItem("total", JSON.stringify($scope.total));
          localStorage.setItem("GioHang", JSON.stringify($scope.gioHang));
        }

        // giảm số lượng sp
      $scope.decrease = (sp) => {
          if (sp.slBan > 1) {
              $scope.gioHang.forEach(x => {
                  if (x.sanpham.$id === sp.sanpham.$id) {
                      x.slBan--;
                      $scope.total--;
                  }
              })
              localStorage.setItem("total", JSON.stringify($scope.total));
              localStorage.setItem("GioHang", JSON.stringify($scope.gioHang));
          }
      }


      $scope.removeCart = (sp) => {
          $scope.gioHang = $scope.gioHang.filter(x => x.sanpham.$id !== sp.sanpham.$id)
          $scope.total -= sp.slBan
          localStorage.setItem("total", JSON.stringify($scope.total));
          localStorage.setItem("GioHang", JSON.stringify($scope.gioHang));
      }

      //Tổng tiền sản phẩm
      $scope.subtotal = () => {
          var subtotal = 0;
          if ($scope.total != 0) {
              for (let i in $scope.gioHang) {

                  subtotal += parseInt($scope.gioHang[i].sanpham.gia) * parseInt($scope.gioHang[i].slBan);
              }
          }
          return subtotal;
      }

      }
      
   ]);