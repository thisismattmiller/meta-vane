import { defineCustomElement } from 'vue'
import Vanes from './components/Vanes.ce.vue'

const VanesEl = defineCustomElement(Vanes)

customElements.define('meta-vane', VanesEl)