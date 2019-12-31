//把函数绑定在页面加载完毕时调用；
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
      window.onload = func;
    } else {
      window.onload = function() {
        oldonload();
        func();
      };
    }
  }
  
  //在原型链上增加一个方法，是一个元素，添加到另一个元素之后；
  Element.prototype.insertAfter = function(target, origin) {
    if (!this.children) {
      return false;
    }
    var originTure = origin.nextElementSibling;
    if (originTure) {
      this.insertBefore(target, originTure);
    } else {
      this.appendChild(target);
    }
    return;
  };
  
  //给元素添加 class 属性；（解决了如果元素的 class 有属性的话，赋予新的值的时候会覆盖之前的数；
  function addClass(element, value) {
    if (!element.className) {
      element.className = value;
    } else {
      newClassName = element.className;
      newClassName += " ";
      newClassName += value;
      element.className = newClassName;
    }
  }
  
  //解决部分浏览器不支持 placeholder 属性的函数；
  function resetFields(wihchForm) {
    if (Modernizr.input.placeholder) return;
  
    for (var i = 0; i < wihchForm.elements.length; i++) {
      var element = wihchForm.elements[i];
      if (element.type == "submit") continue;
      var check = element.placeholder || element.getAttribute("placeholder");
      if (!check) continue;
      element.onfocus = function() {
        var text = this.placeholder || this.getAttribute("placeholder");
        if (this.value === text) {
          this.value = "";
          this.className = "";
        }
      };
      element.onblur = function() {
        if (this.value === "") {
          this.value = this.placeholder || this.getAttribute("placeholder");
          this.className = "placeholder";
        }
      };
      element.onblur();
    }
  }
  
  //检查用户是否输入内容
  function isFilled(field) {
    if (field.value.replace(" ", "").length == 0) return false;
    var placeholder = field.placeholder || field.getAttribute("placeholder");
    return field.value != placeholder;
  }
  
  //检查用户邮箱地址是否正确；
  function isEmail(field) {
    return field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1;
  }
  
  //验证表单；
  function validateForm(wihchForm) {
    for (var i = 0; i < wihchForm.elements.length; i++) {
      var elements = wihchForm.elements[i];
      if (elements.required) {
        console.log(123);
        if (!isFilled(elements)) {
          alert("请填写内容");
          return false;
        }
      }
      if (elements.type == "email") {
        if (!isEmail(elements)) {
          alert("请填写带 “@” 与 “.” 的邮箱");
          return false;
        }
      }
    }
    return true;
  }
  
  //使所有 form 元素都进行表单验证；
  function prepareForms() {
    for (var i = 0; i < document.forms.length; i++) {
      var thisform = document.forms[i];
      resetFields(thisform);
      thisform.onsubmit = function() {
        if (!validateForm(this)) return false;
        var article = document.getElementsByTagName("article")[0];
        if (submitFormWithAjax(this, article)) return false;
        return true;
      };
    }
  }
  


  