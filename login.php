<html lang="en" ng-app="DeliveryApp">
<head>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDANKgBI3KcMeePhW7hnMdNnVBtVa4fmJo&libraries=places"></script>
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css">
    <link rel="stylesheet" href="/kc/app/views/web/DeliveryApp/assets/styles.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <meta name="viewport" content="initial-scale=1"/>
    <script language="JavaScript">
    </script>
</head>

<!-- main controller vars accesable by all controllers and views -->
<body  style="font-family: myFirstFont" layout="row" ng-controller="MainCtrl">
<div layout="column" class="relative" layout-fill role="main" >
    <!-- inject views here-->
    <div ng-view></div>
</div>



<!-- Angular Material requires Angular.js Libraries -->
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.js"></script>
<!-- Angular Material Library -->
<script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/angular-material-icons/0.7.1/angular-material-icons.min.js"></script>
<!--ng-Router -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.js"></script>
<!-- JQuery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<!-- load app main script for configuration and main controllers -->
<script src="/kc/app/views/web/DeliveryApp/app.js"></script>
<!-- Load Controllers-->
<script src="/kc/app/views/web/DeliveryApp/controllers/registercontroller.js"></script>
<script src="/kc/app/views/web/DeliveryApp/controllers/logincontroller.js"></script>
<script src="/kc/app/views/web/DeliveryApp/controllers/requestcontroller.js"></script>


</body>
</html>