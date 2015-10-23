var add = (function(){
  
  var defaults,
      st, catchDom, dom;
  
  defaults = {
    url   : "http:",
    files : []
  },
  
  st = {},
  
  dom = {},
  
  catchDom = function(st){
    dom.content   = $(st.content);
    dom.inputFile = $(st.inputFile);
  },
  
  suscribeEvents = function(){
    dom.inputFile.on("change", events.onChange)
  },
  
  events = {
    onChange : function(e){
      st.files = fn.getFilesCurrent(e)
      if fn.isFilesToUpload()
        fn.initUpload()
    }
  },
  
  fn = {
    initUpload : function(){
      Sb.trigger("validate:validFiles")
      Sb.trigger("validate:getFiles", fn.filesToUpload)
    },
    
    filesToUpload : function(files){
      Sb.trigger("add:files", files)
    },
    
    sharedFiles : function(callback){
      callback.call(st.files, this);
    },
    
    getFilesCurrent : function(e){
      var files  = [],
          target = e.target;
      
      if target.files
        files = target.files;
      else
        files.push(target.value);
      
      return files;
    },
    
    isFilesToUpload : function(){
      var total = st.files.length;
      return (total > 0) ? true : false;
    }
  },
  
  var initialize = function(opts){
    st = $.extends(defaults, opts, {})
    catchDom(st)
    suscribeEvents()
  };
  
  return { 
    init : initialize 
  } 
  
})();
  
