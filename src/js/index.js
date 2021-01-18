import '@styles/gen.scss'
import React, { Suspense, lazy, useState } from 'react';
import { render } from 'react-dom'

import {Emails_input} from './сomponents/inputs/inputs'





let Emails_input_component = Emails_input("Share <strong>Board name</strong> with others")
document.querySelector("#root").appendChild(Emails_input_component)
