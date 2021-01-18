import Btn from './button'
import Textarea from './textarea'
import email_isValidate from '@main_file_js/functions/email_validater'
import random_email from '@main_file_js/functions/random_email'

"use strict";


export function Emails_input(title = "") {
  let main_container = document.createElement("DIV"),
    fieldset = document.createElement("FIELDSET");

  //top fieldset
    //main_container_header
    let header = document.createElement("DIV"), h4 = document.createElement("H4");
    h4.innerHTML = title;
    header.classList.add("emails_input_header");
    header.appendChild(h4);
    fieldset.appendChild(header);
    //Alert wraped
    let alert_wraped = document.createElement("DIV");
    alert_wraped.classList.add("alert_wraped");
    //Textarea
    let textarea = new Textarea({
      validater: email_isValidate,
      placeholder: "add more people…",
      onChange_items: ()=>{
        let isValid_textarea = true;
        textarea.get_items().forEach(item => {
          if (!item.valid) {
            isValid_textarea = false;
          }
        });
        if (!isValid_textarea) {
          alert_wraped.setAttribute("data-text", "Emails-input witch should be implemented as a reusable component");
          alert_wraped.classList.add("active");
        } else {
          alert_wraped.classList.remove("active");
        }
      }
    })
    textarea.set_items("john@miro.com, invalid.email, mike@miro.com alexander@miro.com");
    alert_wraped.appendChild(textarea);
    fieldset.appendChild(alert_wraped);

  main_container.appendChild(fieldset);


  //fieldset class="emails_input_footer"
  fieldset = document.createElement("FIELDSET");
  fieldset.classList.add("emails_input_footer");
    //Buttons
    fieldset.appendChild(Btn({
      title: "add_email",
      onClick_callback: event=>{
        event.preventDefault();
        textarea.set_items([...textarea.get_items().map(item=>item.content), random_email()]);
      }
    }))
    fieldset.appendChild(Btn({
      title: "Get emails count",
      onClick_callback: event=>{event.preventDefault(); alert(textarea.get_items().length);}
    }))
  main_container.appendChild(fieldset);

  main_container.classList.add("emails_input");
  return main_container;
}
