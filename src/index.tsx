import React from 'react'
import { render } from 'react-dom'

import { Events } from './components/events'

import './styles/styles.css'

const rootElement = document.getElementById('root')

render(<Events />, rootElement)