var app = angular.module('customer',['httpdService']);

app.controller('customerRegisterController',customerRegisterController)


customerRegisterController.$inject = ['$scope', '$http', '$rootScope', '$location', '$window','httpdService'];

function customerRegisterController($scope, $http, $rootScope, $location, $window,httpdService) {
    var $injector = angular.injector();
    var vm = $scope;
    vm.saveCustomerRegister = saveCustomerRegister;
    vm.openModalEdit = openModalEdit;
    vm.updateCustomer = updateCustomer;
    vm.deleteCustomer = deleteCustomer;
    vm.getCustomers = getCustomers;
    iniciarController();


    function iniciarController(){
        vm.customerData={
            name:'',
            email:'',
            document:''
        }

        vm.filterModel = {
            name:'',
        }

        getCustomers();
    }

    function saveCustomerRegister(){
        const params = vm.customerData;
             httpdService.get('Laravel_customerRegister', 'register',params,(response) =>{
                 swal("Sucess!", response.message, "success");
                 iniciarController();
         });
    }

    function getCustomers (filter) {
        console.log("filter",filter);
        const params = vm.customerData;
        if(filter){
            params.filter = vm.filterModel.name;
        }
        httpdService.get('Laravel_customerRegister', 'listCustomers',params,(response) =>{
            console.log(response.customers);
            vm.customers = response.customers;
        });
    }

    function openModalEdit(customer){
        vm.editRegister = angular.copy(customer);
        $('#modalEdit').modal('show');
    }

    function updateCustomer(){
        const params = vm.editRegister;
        httpdService.post('Laravel_customerRegister', 'updateCustomer',params,(response) =>{
            swal("Sucess!", response.message, "success");
            iniciarController();
            $('#modalEdit').modal('hide');
        });
    }

    function deleteCustomer(customer){
        const params = customer;
        httpdService.post('Laravel_customerRegister', 'deleteCustomer',params,(response) =>{
            swal("Sucess!", response.message, "success");
            iniciarController();
        });
    }

}