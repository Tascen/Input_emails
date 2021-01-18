"use strict";

export default function random_email() {
  let str_values="abcdefghynso",
    email = "",
    tmp;

  for (let i = 0 ; i < 10; i++) {
    tmp = str_values.charAt(Math.round(str_values.length*Math.random()));
    email = email + tmp;
  }
  tmp = "";
  email = email + "@";
  for (let j = 0; j < 8; j ++) {
    tmp = str_values.charAt(Math.round(str_values.length*Math.random()));
    email = email + tmp;
  }
  email = email + ".com";
  return email;
}
