var app = angular.module('myApsp', []);
app.controller('customersCtrl', function($scope, $http) {
    $http.get("https://saralapis-demo.herokuapp.com/store/")
    .then(function (response) {$scope.names = response.data;
        console.log(response.data);
    });
    $scope.viewStoreIda = function (id,store_name,store_address,store_number,store_email) {
    	console.log(id);
    	console.log(store_name);
    	window.localStorage.setItem("id",id);
    	window.localStorage.setItem("store_name",store_name);
		window.localStorage.setItem("store_address",store_address);
		window.localStorage.setItem("store_number",store_number);
		window.localStorage.setItem("store_email",store_email);

    	window.location.href ="viewstore.html";
    }
});
// var apap = angular.module('myApsp',);
app.controller('CustomerCtrl', function($scope, $http) {
    $http.get("https://saralapis-demo.herokuapp.com/customer/")
    .then(function (response) {$scope.names = response.data;
        console.log(response.data);
    });

    $scope.viewStoreIda = function (id,store_owner,store_name,store_address,store_number,store_email) {
        console.log(id);
        console.log(store_name);
        window.localStorage.setItem("id",id);
        window.localStorage.setItem("store_owner",store_owner);
        window.localStorage.setItem("store_name",store_name);
        window.localStorage.setItem("store_address",store_address);
        window.localStorage.setItem("store_number",store_number);
        window.localStorage.setItem("store_email",store_email);

        window.location.href ="viewcustomerdetailangular.html";
    }
});

app.controller('productStoreCtrl', function($http,$scope){
$http.get("https://saralapis-demo.herokuapp.com/stpro/")
    .then(function (response) {$scope.names = response.data;
        console.log(response.data);
    });
    
    $scope.EditStoreProduct = function (id,productName,price){
        console.log(id);
        window.localStorage.setItem("id",id);
        window.localStorage.setItem("productName",productName);
        window.localStorage.setItem("price",price);
         window.location.href = "editStoreProduct.html";
    };
});
app.controller('productCustomerCtrl', function($http,$scope){
$http.get("https://saralapis-demo.herokuapp.com/custpro/")
    .then(function (response) {$scope.names = response.data;
        console.log(response.data);
    });
    
    $scope.EditCustomerProduct = function (id,productName,price){
        console.log(id);
        window.localStorage.setItem("id",id);
        window.localStorage.setItem("productName",productName);
        window.localStorage.setItem("price",price);
         window.location.href = "editCustomerProduct.html";
    };
});



app.controller('CustomerOrder', function($scope,$http){
$scope.customer;

$http.get('https://saralapis-demo.herokuapp.com/customer/').success(function(data) {    
        questions = data;
        console.log(questions);  

    });  
$scope.submit = function(){
     console.log($scope.customer);
}
});

app.controller('StoreOrder', function($scope,$http){
$scope.customer;

$http.get('https://saralapis-demo.herokuapp.com/store/').success(function(data) {    
        questions = data;
        console.log(questions);  

    });  
$scope.submit = function(){
     console.log($scope.customer);
      $http({
    method: 'POST',
    url: 'https://saralapis-demo.herokuapp.com/stord/add',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {storename: $scope.customer.customerName, order: $scope.customer.orderArea , date : null}
}).success(function (data) {
    console.log("Response"+data);
    if (data.success = 'true') {
        alert("Successfully created Store");
    }
});

}
});

app.controller('AddStore', function($scope,$http){

   $scope.addStore = function(){
    console.log($scope.Store);
    $http({
    method: 'POST',
    url: 'https://saralapis-demo.herokuapp.com/store/add',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {storename: $scope.Store.Name, number: $scope.Store.Number , email : $scope.Store.Email, address : $scope.Store.Address , ownername : $scope.Store.Owner}
}).success(function (data) {
    console.log(data);
    if (data.success = 'true') {
        alert("Successfully created Store");
    }
});



   }

});

app.controller('AddCustomer', function($scope,$http){
    
    $scope.addCustomer = function(){
        console.log($scope.Customer);
    $http({
    method: 'POST',
    url: 'https://saralapis-demo.herokuapp.com/customer/add',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {customername: $scope.Customer.Name, number: $scope.Customer.Number , email : $scope.Customer.Email, address : $scope.Customer.Address }
}).success(function (data) {
    console.log(data);
    console.log(data.success);
        
        if (data.success = 'true') {
            alert(""+data.message);
        }else {
            alert(""+data.message);
        }

    });


}
});

app.controller('EditCustomer',function($scope,$http){

$scope.EditeCustomer = function(){
        // 
alert("sdfdsf");
  var edited_store_name = document.getElementById('stores_name').value ;
  var edited_store_number = document.getElementById('store_number').value ;
  var edited_store_email = document.getElementById('email').value ; 
  var edited_store_address = document.getElementById('address').value ;

  console.log("Store NAme:"+edited_store_name+"\n Store Number : "+edited_store_number+"\n Store Email : "+edited_store_email+"\n Store Address :"+edited_store_address);

//     $http({
//     method: 'POST',
//     url: 'https://saralapis-demo.herokuapp.com/customer/edit?id'+$scope.Customer.customerID,
//     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//     transformRequest: function(obj) {
//         var str = [];
//         for(var p in obj)
//         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//         return str.join("&");
//     },
//     data: {customername: $scope.Customer.Name, number: $scope.Customer.Number , email : $scope.Customer.Email, address : $scope.Customer.Address }
// }).success(function (data) {
//     console.log(data);
//     console.log(data.success);
        
//         if (data.success = 'true') {
//             alert(""+data.message);
//         }else {
//             alert(""+data.message);
//         }

//     });



}

});




