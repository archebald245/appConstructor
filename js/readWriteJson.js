var jsonStringify;

function onCheckJson(){
   
      
  
    
    if($.jStorage.get('appData') != null){
        
        applicationData = JSON.parse($.jStorage.get('appData'));
        var projectId = applicationData.ProjectId;
        var versionId = applicationData.Version;
          
        createMenu(applicationData);
        
        $(".my-youtube").attr("height", "auto");
    }else{
        
        data = replaceData(data);
        applicationData = JSON.parse(data);
        downloadResources();
        initMenuYoutunbe();
        if(resources.length==0){
            var jsonString = JSON.stringify(applicationData);
            cutImageOfYoutubeContainer();
             console.log(jsonString);
            $.jStorage.set('appData', jsonString);
            createMenu(applicationData);
            
            $(".my-youtube").attr("height", "auto");
        }
      
    }
    var pageStyles = applicationData.Pages[0].Style;
   
    
    $("body").attr("style", pageStyles);
      var networkState = navigator.connection.type;
  if(networkState==Connection.NONE){
       reactRender();
       initGallaryClick();
    $(".blockUI").remove();
  }
 
}

function checkConnection(){
     var networkState = navigator.connection.type;
  if(networkState!=Connection.NONE){
    var siteUrl = "http://appconstructor.newlinetechnologies.net"    
    
    if($.jStorage.get('appData') != null){
        
        applicationData = JSON.parse($.jStorage.get('appData'));
        var projectId = applicationData.ProjectId;
        var versionId = applicationData.Version;
    }else{
        data = replaceData(data);
        applicationData = JSON.parse(data);
        var projectId = applicationData.ProjectId;
        var versionId = applicationData.Version;
    }
    
    if(applicationData.UrlForUpdateApp != "" && applicationData.UrlForUpdateApp != null && typeof applicationData.UrlForUpdateApp != 'undefined'){
        siteUrl = applicationData.UrlForUpdateApp;
    }
    
    $.ajax({
        type: "POST",
        url: siteUrl + "/Constructor/CheckNewVersion",
        data: {projectId: projectId, versionName:versionId},
        cache:false,
        success: function(jsonObjectOfServer){
            if(jsonObjectOfServer.IsUpdated ==true){
                data = JSON.stringify(jsonObjectOfServer.Content);
                $.jStorage.deleteKey('appData');
                 onCheckJson();
            }else{
                 onCheckJson();
                 reactRender();
                initGallaryClick();
                 $(".blockUI").remove();
            }
        }
    });
  }else{
      onCheckJson();
  }
} 



function initMenuYoutunbe(){
     createMenu();
     if(resources.length == 0){
        reactRender();  
        $(".blockUI").remove();
     }
   
    $(".my-youtube").attr("height", "auto");
   

  
}

function callback(){
    applicationData = JSON.parse($.jStorage.get('replaceImagePachJson'));
    var jsonString = JSON.stringify(applicationData);
     $.jStorage.set('appData', jsonString);
     deleteResources();
     reactRender();
       initGallaryClick();
    $(".blockUI").remove();
}

function replaceData(element){
    element = element.replace(/&lt;/g,'<');
    element = element.replace(/&gt;/g,'>');
    element = element.replace(/\n/g,'');
    element = element.replace(/\t/g,'');
    element = element.replace(/\b/g,'');
    element = element.replace(/\r/g,'');
    element = element.replace(/\v/g,'');
    element = element.replace(/\f/g,'');
    return element;
}

function initGallaryClick(){
    $(".gallery-icon").unbind("click");
    $(".gallery-icon").on("click", function(){
        //$($(this).siblings()).find("figure")[0].click();
        $(this).parent().siblings().find("figure")[0].click();
    });
}
