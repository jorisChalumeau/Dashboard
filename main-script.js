var mainApp = angular.module('mainApp', ['ngAnimate', 'ngCookies', 'satellizer']);
mainApp.config(function($authProvider) {
  $authProvider.httpInterceptor = function() {
      return true;
    }
  $authProvider.withCredentials = false;
  $authProvider.tokenRoot = null;
  $authProvider.baseUrl = '/';
  $authProvider.loginUrl = '/auth/login';
  $authProvider.signupUrl = '/auth/signup';
  $authProvider.unlinkUrl = '/auth/unlink/';
  $authProvider.tokenName = 'token';
  $authProvider.tokenPrefix = 'satellizer';
  $authProvider.tokenHeader = 'Authorization';
  $authProvider.tokenType = 'Bearer';
  $authProvider.storageType = 'localStorage';
  $authProvider.facebook({
    name: 'facebook',
    url: '/auth/facebook',
    clientId: '191024228290410',
    authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
    redirectUri: window.location.origin + '/',
    requiredUrlParams: ['display', 'scope'],
    scope: ['email'],
    scopeDelimiter: ',',
    display: 'popup',
    oauthType: '2.0',
    popupOptions: {
      width: 580,
      height: 400
    }
  });
  
  $authProvider.twitter({
  url: '/auth/twitter',
  authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
  redirectUri: window.location.origin,
  oauthType: '1.0',
  popupOptions: { width: 495, height: 645 }
});

  $authProvider.google({
    clientId: 'Google Client ID'
  });
  $authProvider.github({
    url: '/auth/github',
    clientId: '6bd02f61d81ac833e4c4',
    authorizationEndpoint: 'https://api.github.com/login/oauth/authorize',
    optionalUrlParams: ['scope'],
    scope: ['user:email'],
    scopeDelimiter: ' ',
    oauthType: '2.0',
    popupOptions: { width: 1020, height: 618 }
  });

  $authProvider.linkedin({
    clientId: 'LinkedIn Client ID'
  });
  $authProvider.spotify({
    clientId: 'Spotify Client ID'
  });

  // No additional setup required for Twitter

  $authProvider.oauth2({
    name: 'foursquare',
    url: '/auth/foursquare',
    clientId: 'Foursquare Client ID',
    redirectUri: window.location.origin,
    authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
  });
});

mainApp.controller('mainCtrl', function($scope, $cookies, $auth) {
  if ($cookies.get('user') === undefined)
    location.href = "/index.html";
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider);
  };
  $scope.main = {};
  $scope.model = {};
  $scope.main.user = $cookies.get('user'); // current user
  $scope.model.authorizations = {};
  $scope.model.tokens = {};
  $scope.model.data = {};

  socket.emit("getAuthorizations", [$scope.main.user]);
  // lorsqu'on se déconnecte du serveur
  $scope.deconnexion = function() {
    $cookies.remove('user');
    location.href = ('/index.html');
  };
  $scope.fillData = function(key, token) {
    // fill the corresponding dashboard
    switch (key) {
      case "horloge":
        break;
      case "facebook":
        break;
      case "twitter":
        break;
      case "youtube":
        break;
      case "gplus":
        break;
      case "github":
        break;
      default:
    }
    $scope.model.data[key] = $scope.getContent(token);
  };
  $scope.getContent = function(token) {

  };
  socket.on("authorizations", function(params) {
    $scope.$apply(function() {
      $scope.model.authorizations = params[0];
      var token;
      for (var key in $scope.model.authorizations) {
        if (!$scope.model.authorizations.hasOwnProperty(key))
          continue;
        token = $scope.model.authorizations[key];
        if (token != null)
          $scope.fillData(key, token);
      }
    });
  });
  socket.on("connexionProblem", function() {
    $scope.$apply(function() {
      // user was removed from db => kick user from server
      $scope.deconnexion();
    });
  });
});


// old code from irc application
/*
// lorsqu'on clique sur un autre tab
$scope.switchTab = function(tabName) {
  // si l'utilisateur est connecté à l'onglet
  if ($scope.listMsgInChannel.keys.indexOf(tabName) > -1) {
    selectedChannel = tabName;
  } else {
    console.log("Vous êtes déconnecté de cet onglet");
  }
};
// lorsqu'on ouvre la fenetre pour rejoindre un autre channel
$scope.joinTab = function() {
  socket.emit('newConnection', [$scope.model.chosenChannel, $scope.main.user])
  $scope.model.chosenChannel = '';
};
// lorsqu'on envoie un messages
$scope.sendMessage = function() {
  var msg = $scope.main.message;
  if (msg.substr(0, 1) == '/') {
    $scope.execCommand(msg);
  } else {
    if($scope.model.selectedChannel != '') {
      socket.emit('NewMessage', [msg, $scope.main.user,
        $scope.model.selectedChannel, $scope.get_date_time()]);
    } else {
      alert("Rejoins d'abord un channel pour pouvoir communiquer avec d'autres personnes");
    }
  }
  // on vide inputMessages
  $scope.main.message = "";
};
// pour parser et executer la commande
$scope.execCommand = function(msg) {
  var tmpMsg = $scope.main.message.split(" ");
  if (tmpMsg.length < 1)
    return;
  switch (tmpMsg[0]) {
    case "/pseudo":
      if(tmpMsg.length == 2) {
        // socket.emit('renamePseudo', [$scope.main.user, tmpMsg[1]]);
        // $scope.main.user = tmpMsg[1];
      } else {
        $scope.dispErrorCmd();
      }
      break;
    case "/channels":
      if(tmpMsg.length == 1) {
        socket.emit('getChannels', [$scope.main.user]);
        $scope.model.writeChannels = true;
      } else {
        $scope.dispErrorCmd();
      }
      break;
    case "/disconnect":
      if(tmpMsg.length == 1) {
        $scope.deconnexion();
      } else {
        $scope.dispErrorCmd();
      }
      break;
    case "/delete":
      if(tmpMsg.length == 2 && $scope.main.channelTabs.indexOf(tmpMsg[1] > -1)) {
        // socet.emit('DeletingChannel', [$scope.main.user, tmpMsg[1]])
      } else {
        $scope.dispErrorCmd();
      }
      break;
    case "/rename":
      if(tmpMsg.length == 3 && $scope.main.channelTabs.indexOf(tmpMsg[1] > -1)) {
        // socet.emit('renameChan', [$scope.main.user, tmpMsg[1], tmpMsg[2]])
      } else {
        $scope.dispErrorCmd();
      }
      break;
    case "/leave":
      if(tmpMsg.length == 2 && $scope.main.channelTabs.indexOf(tmpMsg[1] > -1)) {
        socket.emit('deconnexionChannel', [tmpMsg[1], $scope.main.user])
      } else {
        $scope.dispErrorCmd();
      }
      break;
    case "/join":
      if(tmpMsg.length == 2 && $scope.main.channelTabs.indexOf(tmpMsg[1]) == -1 && $scope.main.availableChannelsList.indexOf(tmpMsg[1]) > -1) {
        socket.emit('newConnection', [tmpMsg[1], $scope.main.user])
      } else {
        $scope.dispErrorCmd();
      }
      break;
    case "/new":
      if(tmpMsg.length == 2) {
        socket.emit('newChannel', [$scope.main.user, tmpMsg[1]]);
      }
      break;
    case "/help":
      alert("'/pseudo name' to rename your pseudo into 'name'\n"
           +"'/channels' to display the list of all existing channels\n"
           +"'/disconnect' to disconnect from the server\n"
           +"'/delete chan' to remove the channel 'chan'\n"
           +"'/rename chan name' to rename channel 'chan' into 'name'\n"
           +"'/leave chan' to leave channel 'chan'\n"
           +"'/join chan' to join channel 'chan'\n"
           +"'/new chan' to create a new channel 'chan'");
      break;
    default:
      $scope.dispErrorCmd();
  }
};
$scope.dispErrorCmd = function() {
  var errorMsg = "Command syntaxe error : "+$scope.main.message+"\n";
  errorMsg += "Type '/help' to display the list of available commands";
  // write errorMsg in chat (in red)
  alert(errorMsg);
};
$scope.cancelJoinTab = function() {
  $scope.model.chosenChannel = '';
};
$scope.get_date_time = function() {
  var today = new Date();
  var dd = today.getDate() < 10 ? '0'+today.getDate() : today.getDate();
  var mo = today.getMonth()+1;
  mo = mo < 10 ? '0'+mo : mo;
  var yyyy = today.getFullYear() < 10 ? '0'+today.getFullYear() : today.getFullYear();
  var hh = today.getHours() < 10 ? '0'+today.getHours() : today.getHours();
  var mm = today.getMinutes() < 10 ? '0'+today.getMinutes() : today.getMinutes();
  var ss = today.getSeconds() < 10 ? '0'+today.getSeconds() : today.getSeconds();

  today = dd+'/'+mo+'/'+yyyy+' '+hh+':'+mm+':'+ss;
  return today;
};
socket.on("newConnection", function(params) {
  $scope.$apply(function() {
    if($scope.main.listUsersInChannel.keys.indexOf(params[0]) == -1)
      $scope.main.listUsersInChannel[params[0]] = [];
    if($scope.main.listMsgInChannel.keys.indexOf(params[0]) == -1)
      $scope.main.listMsgInChannel[params[0]] = [];

    if($scope.main.user == params[1]){
      $scope.main.channelTabs.push(params[0]);
      $scope.main.selectedChannel = params[0];
    }
    $scope.main.listUsersInChannel[params[0]].push(params[1]);
    $scope.main.listMsgInChannel[params[0]].push({
      'date':$scope.get_date_time(),
      'sender':'System',
      'content':params[1]+" joined the channel"
    });
    socket.emit("ConnectedOnChannel", params[0]);
    console.log($scope.main.listUsersInChannel);
  });
});
socket.on("ChannelCreated", function(params) {
  $scope.$apply(function() {
    var tabs = params;
    if(tabs == "")
      tabs = "<ul class='tabs'>";
    else {
      tabs.slice(0, -5); // remove '</ul>'
    }
    var newTab = "<li class='tab col m2'><a href='#"+tabName+"'>"+tabName+"</a></li>";
    $scope.main.channelTabs = tabs+newTab+'</ul>';
  });
});
socket.on("ChannelExists", function() {
  alert("channel name already used");
});
socket.on("deconnexionChannel", function(param){
  $scope.$apply(function() {
    if (param[1] == $scope.main.user) {
      // l'utilisateur actuel vient de se déco du channel param[0]
      $scope.main.channelTabs.splice(param[0]);
      delete $scope.main.listUsersInChannel[param[0]];
      delete $scope.main.listMsgInChannel[param[0]];
    } else {
      // un autre utilisateur vient de se déco du channel param[0]
      $scope.main.listUsersInChannel[param[0]].splice(param[1]);
    }
  });
});
socket.on("ChannelNames", function(channels) {
  $scope.$apply(function() {
    $scope.model.availableChannelsList = [];
    var msg = "";
    for(var i = 0 ; i < channels.length ; i++) {
      $scope.model.availableChannelsList.push(channels[i].Name);
      if($scope.model.writeChannels) {
        if (msg == "")
          msg+= ", ";
        msg += channels[i].Name;
      }
    }
    if($scope.model.writeChannels) {
      alert("Liste des channels disponibles :\n"+msg);
      $scope.model.writeChannels = false;
    }
  });
});
socket.on("newMessage", function(params) {
  $scope.$apply(function() {
    $scope.main.listMsgInChannel[params[2]].push({
      'date': params[3],
      'sender': params[1],
      'content': params[0]
    });
  });
});*/
