var app = angular.module('clockapp',[]);

app.provider('Weather', function(){
    var apiKey = "";

    this.setApiKey = function(key){
        if(key) this.apiKey = key;
    };

    this.$get = function($q, $http) {
      var self = this;
      return {
        getWeatherForecast: function(city) {
          var d = $q.defer();
          $http({
            method: 'GET',
            url: self.getUrl("forecast", city),
            cache: true
          }).success(function(data) {
            d.resolve(data.forecast.simpleforecast);
          }).error(function(err) {
            d.reject(err);
          });
          return d.promise;
        }
      }
    };

    this.getUrl = function(type, ext){
        return "http://api.wunderground.com/api/" + this.apiKey + "/" + type + "/geolookup/lang:BR/q/" + ext + '.json';
    };
});

app.config(function(WeatherProvider){
    WeatherProvider.setApiKey('57bda8330b9a9e77');
});

app.controller('MainCtrl', function ($scope, $timeout, Weather) {
    $scope.date = {};
    $scope.weather = {};
    var self = this;

    this.getMes = function(mes) {
        var retorno = "";
         switch (mes) {
                case 0:
                    retorno = "Janeiro";
                    break
                case 1:
                    retorno = "Fevereiro";
                    break
                case 2:
                    retorno = "Mar&ccedil;o";
                    break
                case 3:
                    retorno = "Abril";
                    break
                case 4:
                    retorno = "Maio";
                    break
                case 5:
                    retorno = "Junho";
                    break
                case 6:
                    retorno = "Julho";
                    break
                case 7:
                    retorno = "Agosto";
                    break
                case 8:
                    retorno = "Setembro";
                    break
                case 9:
                    retorno = "Outubro";
                    break
                case 10:
                    retorno = "Novembro";
                    break
                case 11:
                    retorno = "Dezembro";
                    break
                default:
                    retorno = "erro no mes";
            }
        return retorno;
    }

    this.getDay = function(dia) {
        var retorno = "";
         switch (dia) {
                case 0:
                    retorno = "Domingo";
                    break
                case 1:
                    retorno = "Segunda";
                    break
                case 2:
                    retorno = "Terça";
                    break
                case 3:
                    retorno = "Quarta";
                    break
                case 4:
                    retorno = "Quinta";
                    break
                case 5:
                    retorno = "Sexta";
                    break
                case 6:
                    retorno = "Sabado";
                    break
                default:
                    retorno = "erro no dia";
            }
        return retorno;
    }


    var updateTime = function(){
        $scope.date.raw = new Date();
        $scope.date.mes = self.getDay($scope.date.raw.getDay()) + ", " + $scope.date.raw.getDate() + " de " +
        self.getMes($scope.date.raw.getMonth()) + " de " + $scope.date.raw.getFullYear();
        $timeout(updateTime, 1000);
    };

    updateTime();

    Weather.getWeatherForecast("Brazil/Salvador")
    .then(function(data){
        $scope.weather.forecast = data;
    });
});