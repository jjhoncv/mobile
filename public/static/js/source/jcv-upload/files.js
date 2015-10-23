var files = (function(){
  
  var defaults,
      st, catchDom, dom;
  
  defaults = {
    url   : "http://",
    files : [],
    upload: {
      async : true
    },
    index : 0
      
  },
  
  st = {},
  
  dom = {},
  
  catchDom = function(st){
    
  },
  
  suscribeEvents = function(){
    
  },
  
  events = {
  },
  
  fn = {
    add : function(files){
      fn.set(files);
      fn.upload(st.upload)
    },
    
    set : function(files){
      st.files = files;
    },
    
    upload : function(st){
      var type = "sync";
      type = (st.async) ? "a"+type : "";
      fn.list(fn.preview);
      fn[type]();  
    },
    
    async : function(){
      fn.list(function(i, file){
        fn.unique(file);
      });
    },
    
    sync : function(){
      file = st.files[st.index];
      fn.unique(file, fn.next);
    },
    
    next : function(){
      st.index++;
      file = st.files[st.index];
      fn.unique(file, fn.next);
    },
    
    unique : function(file, callback){
      if typeof callback === "function"
        Sb.trigger("upload:add", file, callback)
      else
        Sb.trigger("upload:add", file)
    },
    
    list : function(callback){
      $.each(st.files, callback)
    },
    
    preview : function(i, file){
      Sb.trigger("preview:add", file)
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
  
