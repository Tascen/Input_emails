# Input_emails
 Frontend test assessment

 Demo page: https://tascen.github.io/Form_for_task



### The component is "HTMLElement", to add it to the page you need.

##### At first, import initer
```
import {Emails_input} from './сomponents/inputs/inputs'
```
##### Secondly, init
```
let Emails_input_component = Emails_input("Share <strong>Board name</strong> with others")
```
##### and last, append to document,as if you did it with a "HTMLElement"
```
document.querySelector("#root").appendChild(Emails_input_component)
```
