import Text_block from '../page_elements/text_block'
"use strict";
export default class Textarea {
  constructor(props = {}) {
    this.container = null
    this.state = {
      items: [
        //{valid: true/false, is_mounted: true/false, content: "Sume text"}
     ]
    }


    this.render = render.bind(this)
    this.setState = function(property) {
      Object.assign(this.state, property);
      this.render(this.container)
      typeof(props.onChange_items) == "function" && props.onChange_items()
    }

    if (props.validater) {
      this.validater = props.validater
    } else {
      this.validater = ()=>false
    }
    this.structure_to_items = structure_to_items.bind(this)


    this.container = document.createElement("DIV");
    this.container.classList.add("textarea")
    this.container.setAttribute("contenteditable", "true")
    this.container.setAttribute("data-placeholder", props.placeholder || "")
    this.container.onblur = onBlur.bind(this);
    this.container.onfocus = event=>{this.focus = true}; this.focus = false;
    this.container.onpaste = onPaste.bind(this)
    this.container.oninput = event=>{event.preventDefault()}
    this.container.onkeydown = onKeyDown.bind(this)

    this.container.set_items = set_items.bind(this)
    this.container.get_items = get_items.bind(this)
    return this.container
  }



}

function render(textarea) {
  let items_content = this.state.items.map(item=>item.content)
  Array.from(textarea.childNodes).forEach(child => {
    if (child.nodeType == 3) {
      child.nodeValue = " "
    } else if (child.nodeType == 1) {
      if (!items_content.includes(child.innerText)) {
        textarea.removeChild(child)
      } else {
        let pos = items_content.indexOf(child.innerText)
        items_content = items_content.slice(0, pos).concat(items_content.slice(pos + 1))
      }
    }
  });




  this.state.items.forEach((item, index) => {
    if (!item.is_mounted) {
        let component = Text_block(
          item.content,
          !item.valid,
          ()=>{
            this.setState({items: this.state.items.filter((it)=>it.content!=item.content)  })
          }
        )
        component.setAttribute("contenteditable", "false")
        textarea.appendChild(component)
        textarea.appendChild(document.createTextNode(" "))
      item.is_mounted = true
    }
  });
  this.focus && setCaret(textarea)
}




//Events ----------------------

function onBlur(event) {
  if (this.focus) {
    this.focus = false
    this.structure_to_items(event.currentTarget.innerText)
    event.currentTarget.blur();
  }
}

function onKeyDown(event) {
  if (event.code == "Enter" || event.key == ",") {
    this.structure_to_items(event.currentTarget.innerText)
    event.preventDefault()
  }
}

function onPaste(event) {
  event.preventDefault()
  let paste = (event.clipboardData || window.clipboardData).getData('text');
  this.structure_to_items(event.currentTarget.innerText + "," + paste)
}

//-----------------------------

function setCaret(el) {
    if (el.childNodes[el.childNodes.length - 1]) {
      let range = document.createRange(),
        sel = window.getSelection()
      range.setStart(el.childNodes[el.childNodes.length - 1], 0)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
}

function set_items(value) {
  let items = []
  if (value instanceof Array) {
    value.forEach(word => {
      if (word) {
        let is_mounted = false
        this.state.items.forEach((item, i) => {
          if (item.content === word) {is_mounted = true}
        });
        items.push({valid: this.validater(word), content: word, is_mounted: is_mounted})
      }
    });
    this.setState({items: items})
  } else {
    this.structure_to_items(`${value}`)
  }
}

function get_items() {
   return this.state.items
}

function structure_to_items(string) {
  let items = []
  string.split(/[\s,]+/).forEach(word => {
    if (word) {
      let is_mounted = false
      this.state.items.forEach((item, i) => {
        if (item.content === word) {is_mounted = true}
      });
      items.push({valid: this.validater(word), content: word, is_mounted: is_mounted})
    }
  });
  this.setState({items: items})

}
