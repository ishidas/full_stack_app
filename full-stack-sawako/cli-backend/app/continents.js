'use strict';
(function(){

  angular.module('myApp')
    .controller('ContinentCtrl',['$http', function($http){
      var mainRoute = 'http://localhost:3000/continents';
      var self = this;
      this.continentsList = [];
      this.continents = [];
      this.allContinents = [];
      this.newConts = {
        country: '',
        region: '',
        mineral: ''
      }
      this.getCont = {};
      this.id = ''
      this.editing = false;
      this.buttonShow = false;
      this.deleting = false;
      this.fetchedData = [];

      this.cancelEdits = function(){
        this.getCont = this.fetchedData;
        console.log('back to original : ' + angular.toJson(this.fetchedData));
      }

      this.removeContFromArr = function(){
          this.allContinents = this.allContinents.filter((data)=>{
            return data._id !== this.id;
          });
      };

      this.getContinents = function(){
        $http.get(mainRoute)
        .then((result)=>{
          console.log('Here is result ' + result);
          this.continentsList = result.data;
          this.allContinents = angular.copy(result.data);
          console.log('Lets use them later : ' + this.allContinents);
        }, function(err){
          console.log(err);
        })
      }
      this.getByIdContinents = function(){
          $http.get(mainRoute + '/'+ this.id)
          .then((result)=>{
            this.buttonShow = true;
            this.getCont = result.data;
            this.fetchedData = angular.copy(result.data);
            console.log('Fetched data : ' + angular.toJson(this.fetchedData));
          }, function(err){
            console.log(err);
          })
      }

      this.createContinents = function(){
        $http.post(mainRoute, this.newConts)
        .then((result)=>{
          this.continents = angular.toJson(result.data);
          console.log('Here is fromDB : ' + this.continents);
        },function(err){
          console.log('err : ' + err);
        })
      }
      this.editContinents = function(){
        $http.put(mainRoute +'/'+ this.id, this.getCont)
        .then((result)=>{
          this.getCont = result.data;
          this.status = 'Successfully updated : ' + angular.toJson(this.getCont);
          console.log('Here is result of PUT : ' + angular.toJson(this.getCont));
        }, function(err){
          console.log('err : ' + err);
        })
      }

      this.deleteContinentById = function(){
        this.deleting = true;
        this.removeContFromArr();
        console.log('Filtered array? : ' + angular.toJson(this.allContinents));
        console.log(this.deleting);
        $http.delete(mainRoute + '/'+ this.id, this.getCont)
        .then((result)=>{
          this.getCont = this.data;
          this.status = 'Successfully deleted : ' + angular.toJson(this.getCont);
        })
      }
  }]);

})()
