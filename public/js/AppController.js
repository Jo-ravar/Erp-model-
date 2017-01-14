var app = angular.module('myApsp', []);
app.controller('customersCtrl', function($scope, $http) {
    $http.get("https://saralapis-demo.herokuapp.com/store/")
    .then(function (response) {$scope.names = response.data;
        console.log(response.data);
    });
    $scope.viewStoreIda = function (id,owner_name,store_name,store_address,store_number,store_email) {
    	console.log(id);
    	console.log(store_name);
    	window.localStorage.setItem("id",id);
        window.localStorage.setItem("store_owner",owner_name);
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
    $scope.viewCustIda = function (id,store_name,store_address,store_number,store_email) {
        console.log(id);
        console.log(store_name);
        window.localStorage.setItem("id",id);
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



app.controller('CustomerOrder', function($scope,$http,$filter){

$scope.submit = function(){
     console.log($scope.customer);
     if ($scope.customer.customerOrderDate == null) {
$http({
    method: 'POST',
    url: 'https://saralapis-demo.herokuapp.com/custord/add',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {custname: $scope.customer.customerName, order: $scope.customer.orderArea ,}
}).success(function (data) {
    console.log(data);
    if (data.success = 'true') {
        Materialize.toast('Order Added Successfully!', 4000);
        printId = data;
    }
});
}else {
    $scope.customer.customerOrderDate = $filter('date')($scope.customer.customerOrderDate, "yyyy-MM-dd");
    console.log("new Date"+$scope.customer.customerOrderDate);
    $http({
    method: 'POST',
    url: 'https://saralapis-demo.herokuapp.com/custord/add',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {custname: $scope.customer.customerName, order: $scope.customer.orderArea ,date : $scope.customer.customerOrderDate}
}).success(function (data) {
    console.log(data);
    if (data.success = 'true') {
        Materialize.toast('Order Added Successfully!', 4000);
        printId = data;
    }
});
}
}
});

app.controller('StoreOrder', function($scope,$http,$filter){

    var printId;


$scope.challan = function(){
    var win = window.open('https://saralapis-demo.herokuapp.com/stord/genchallan?id='+printId, '_blank');
    win.focus();

}

$scope.submit = function(){
    if ($scope.Store.OrderDate == null) {
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
    data: {storename: $scope.Store.Name, order: $scope.Store.orderArea,}
}).success(function (data) {
    console.log(data);
    if (data.success = 'true') {
       Materialize.toast('Order Added Successfully!', 4000);
        printId = data;
        document.getElementById('printChallan').style.display='block';
    }
});
}else {
    $scope.Store.OrderDate = $filter('date')($scope.Store.OrderDate, "yyyy-MM-dd");
    console.log("new Date"+$scope.Store.orderArea);
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
    data: {storename: $scope.Store.Name, order: $scope.Store.orderArea, date : $scope.Store.OrderDate}
}).success(function (data) {
    console.log(data);
    if (data.success = 'true') {
        Materialize.toast('Order Added Successfully!', 4000);
        printId = data;
        document.getElementById('printChallan').style.display='block';

    }
}); 
};

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

}

});

app.controller('viewcustOrders', function($scope,$http,$filter){
   $scope.Submit = function(){
    $scope.OrderDates = $filter('date')($scope.OrderDates, "yyyy-MM-dd");

    console.log($scope.OrderDates);
    $http({
    method: 'POST',
    url: 'https://saralapis-demo.herokuapp.com/custord?',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {date: $scope.OrderDates,}
}).success(function (data) {
    console.log(data);
    console.log(data.success);
        
        if (data.success = 'true') {
            $scope.names = data.data;
            console.log($scope.names)
        }else {
            alert(""+data.message);
        }

    });


}
});

app.controller('viewstoreOrders', function($scope,$http,$filter){
   $scope.Submit = function(){
    $scope.OrderDates = $filter('date')($scope.OrderDates, "yyyy-MM-dd");

    console.log($scope.OrderDates);
    $http({
    method: 'POST',
    url: 'https://saralapis-demo.herokuapp.com/stord?',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {date: $scope.OrderDates,}
}).success(function (data) {
    console.log(data);
    $scope.names = data;
    console.log($scope.names);
    });
}

$scope.EditOrder = function(id,storename,orderstring,date){
    console.log("StoreName ="+storename);
    window.location ="editstoreOrder.html"+"?ID="+id+"&store_name="+storename+"&orderstring="+orderstring+"&date="+date;
}

$scope.PrintBill = function(id){
    var win = window.open('https://saralapis-demo.herokuapp.com/stord/genbill?id='+id, '_blank');
    win.focus();
}

});

app.controller('editStoreOrder', function($scope,$http,$filter){
    
    function getQuerystring(key, default_)
{
  if (default_==null) default_="";
  key = key.replace(/[\\[]/,"\\\\\\[").replace(/[\\]]/,"\\\\\\]");
  var regex = new RegExp("[\\\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
}
  $scope.id = getQuerystring('ID');
  console.log($scope.id);
  var name =   getQuerystring('store_name');
    $scope.name = decodeURIComponent(name);

  var orderdata = getQuerystring('orderstring');
    $scope.area = orderdata.replace(/%20/g, " ");

  $scope.datass = getQuerystring('date');
    var finaldate = $scope.datass.substr(0, $scope.datass.indexOf('T'));
  $scope.dates = finaldate;
  console.log($scope.dates);

$scope.Edit = function(){
    $http({
    method: 'POST',
    url: 'https://saralapis-demo.herokuapp.com/stord/edit?id='+$scope.id,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {storename : $scope.name, order : $scope.area ,date: $scope.dates}
}).success(function (data) {
    console.log(data);
    Materialize.toast(""+data.message,4000);

    });
}

$scope.Delete = function(){
    $http({
        method : 'DELETE',
        url: 'https://saralapis-demo.herokuapp.com/stord/delete?id='+$scope.id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data){
        window.alert(""+data.message);
        console.log(data);
    });
    window.location.href = 'index.html';
}



});

app.controller('viewcustOrders', function($scope,$http,$filter){
   $scope.Submit = function(){
    $scope.OrderDates = $filter('date')($scope.OrderDates, "yyyy-MM-dd");

    console.log($scope.OrderDates);
    $http({
    method: 'POST',
    url: 'https://saralapis-demo.herokuapp.com/custord?',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {date: $scope.OrderDates,}
}).success(function (data) {
    console.log(data);
    $scope.names = data;
    console.log($scope.names);
    });
}

$scope.EditOrder = function(id,storename,orderstring,date){
    console.log("StoreName ="+storename);
    window.location ="editcustOrder.html"+"?ID="+id+"&store_name="+storename+"&orderstring="+orderstring+"&date="+date;
}

$scope.PrintBill = function(id){
    var win = window.open('https://saralapis-demo.herokuapp.com/custord/genbill?id='+id, '_blank');
    win.focus();
}

});
app.controller('editcustOrder', function($scope,$http,$filter){
    
    function getQuerystring(key, default_)
{
  if (default_==null) default_="";
  key = key.replace(/[\\[]/,"\\\\\\[").replace(/[\\]]/,"\\\\\\]");
  var regex = new RegExp("[\\\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
}
  $scope.id = getQuerystring('ID');
  console.log($scope.id);
    var name =   getQuerystring('store_name');
    $scope.name = decodeURIComponent(name);
  console.log($scope.name);

  var orderdata = getQuerystring('orderstring');
    $scope.area = orderdata.replace(/%20/g, " ")

  $scope.datass = getQuerystring('date');
    var finaldate = $scope.datass.substr(0, $scope.datass.indexOf('T'));
  $scope.dates = finaldate;
  console.log($scope.dates);

$scope.Edit = function(){
    $http({
    method: 'POST',
    url: 'https://saralapis-demo.herokuapp.com/custord/edit?id='+$scope.id,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {custname : $scope.name, order : $scope.area ,date: $scope.dates}
}).success(function (data) {
    console.log(data);
    Materialize.toast(""+data.message,4000);

    });
}

$scope.Delete = function(){
    $http({
        method : 'DELETE',
        url: 'https://saralapis-demo.herokuapp.com/custord/delete?id='+$scope.id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data){
        window.alert(""+data.message);
        console.log(data);
    });
    window.location.href = 'index.html';
}



});

app.controller('storevegetables', function($scope,$http,$filter){
$scope.Submit = function(){
    $scope.OrderDates = $filter('date')($scope.OrderDates, "yyyy-MM-dd");
    console.log($scope.OrderDates);
    $http({
    method: 'POST',
    url: 'https://saralapis-demo.herokuapp.com/stord/totalveg',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {date: $scope.OrderDates,}
}).success(function (data) {
    console.log(data);
    $scope.names = data;
    console.log($scope.names);
    });
}
});
app.controller('customervegetables', function($scope,$http,$filter){
$scope.Submit = function(){
    $scope.OrderDates = $filter('date')($scope.OrderDates, "yyyy-MM-dd");
    console.log($scope.OrderDates);
    $http({
    method: 'POST',
    url: 'https://saralapis-demo.herokuapp.com/custord/totalveg',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {date: $scope.OrderDates,}
}).success(function (data) {
    console.log(data);
    $scope.names = data;
    console.log($scope.names);
    });
}
});

app.controller('storeVegCompilation', function($scope,$filter,$http){
    $scope.Submit = function(){
    $scope.OrderDates = $filter('date')($scope.OrderDates, "yyyy-MM-dd");
    $scope.OrderDates2 = $filter('date')($scope.OrderDates2,"yyyy-MM-dd");
    console.log($scope.OrderDates);
    console.log($scope.OrderDates2);
    $http({
    method: 'POST',
    url: 'https://saralapis-demo.herokuapp.com/cs/strveg',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {startDate: $scope.OrderDates,endDate: $scope.OrderDates2}
}).success(function (data) {
    console.log(data);
    $scope.names = data;
    console.log($scope.names);
    });
}
});

app.controller('customerVegCompilation', function($scope,$filter,$http){
    $scope.Submit = function(){
    $scope.OrderDates = $filter('date')($scope.OrderDates, "yyyy-MM-dd");
    $scope.OrderDates2 = $filter('date')($scope.OrderDates2,"yyyy-MM-dd");
    console.log($scope.OrderDates);
    console.log($scope.OrderDates2);
    $http({
    method: 'POST',
    url: 'https://saralapis-demo.herokuapp.com/cs/custveg',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {startDate: $scope.OrderDates,endDate: $scope.OrderDates2}
}).success(function (data) {
    console.log(data);
    $scope.names = data;
    console.log($scope.names);
    });
}
});

