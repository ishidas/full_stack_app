'use strict';
(function(){

  angular.module('myApp')
    .controller('gemsController',['$http',function($http){
      var mainRoute = 'http://localhost:3000/gems'
      this.gemsList = [];
      this.gems = [];
      this.newGem = {
        name: '',
        color: '',
        density: ''
      }
      this.getGem = {}
      this.id = ''
      this.editing = false;
      this.buttonShow = false;
      this.deleting = false;
      this.allGems = [];
      this.fetchedData = [];

      this.cancelEdits = function(){
        this.getGem = this.fetchedData;
        console.log('back to original : ' + angular.toJson(this.fetchedData));
      }

      this.removeGemFromArr = function(){
          this.allGems = this.allGems.filter((data)=>{
            return data._id !== this.id;
          });
      };

      this.getGems = function(){
        $http.get(mainRoute)
        .then((result)=>{
          this.gemsList = result.data;
          this.allGems = angular.copy(result.data);
          console.log('Here is gemsList : ' + this.gemsList);
        }, function(err){
          console.log('Err : ' + err);
        });
      }

      this.getGemById = function(){
          $http.get(mainRoute + '/' + this.id)
          .then((result)=>{
            this.buttonShow = true;
            this.getGem = result.data;
            this.fetchedData = angular.copy(result.data);
          }, function(err){
            console.log('Here is err : ' + err);
          })
      }

      this.createGems = function(){
        $http.post(mainRoute, this.newGem)
        .then((result)=>{
          this.gems = result.data;
          console.log('Here is new Gem! : ' + this.gems);
        }, function(err){
          console.log('Err : ' + err);
        })
      }

      this.editGem = function(){
        $http.put(mainRoute + '/' + this.id, this.getGem)
        .then((result)=>{
          this.getGem = this.data;
          this.status = 'Successfully updated : ' + angular.toJson(this.getGem);
        }, function(err){
          console.log('Here is err : ' + err);
        })
      }

      this.deleteGemById = function(){
        this.deleting = true;
        this.removeGemFromArr();
        console.log('Filtered array? : ' + angular.toJson(this.allGems));
        console.log(this.deleting);
        $http.delete(mainRoute + '/' + this.id, this.getGem)
        .then((result)=>{
          this.getGem = result.data;
          this.status = 'Successfully deleted : ' + angular.toJson(this.getGem);
        }, function(err){
          console.log('Here is err : ' + err);
        })
      }
  }])

})()
