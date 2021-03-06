import Vue from 'vue'

import './styles/quasar.sass'
import 'quasar/dist/quasar.ie.polyfills'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/material-icons/material-icons.css'
import {
  Quasar, 
  QLayout,
  QHeader,
  QFooter,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QBtnDropdown,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QAvatar,
  QParallax,
  QInput,
  QCard,
  QCardSection,
  QCardActions,
  QImg,
  QTooltip,
  QSeparator,
  QSpace,
  QMarkupTable,
  QPageSticky,
  QScrollArea,
  Ripple,
  QTabs,
  QTab,
  QRouteTab,
  QTabPanels,
  QTabPanel,
  QForm,
  QSelect,
  Loading,
  Notify,
  Dialog,
  QCheckbox,
  QDialog,
  QMenu,
  ClosePopup,
  QPagination,
  QSpinnerDots
} from 'quasar'

Vue.use(Quasar, {
  config: {
    notify: { /* look at QUASARCONFOPTIONS from the API card (bottom of page) */ }
  },
  components: {
    QLayout,
    QHeader,
    QFooter,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QBtnDropdown,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QAvatar,
  QParallax,
  QInput,
  QCard,
  QCardSection,
  QCardActions,
  QImg,
  QTooltip,
  QSeparator,
  QSpace,
  QMarkupTable,
  QPageSticky,
  QScrollArea,
  QTabs,
  QTab,
  QForm,
  QRouteTab,
  QTabPanels,
  QTabPanel,
  QSelect,
  QCheckbox,
  QDialog,
  QMenu,
  QPagination,
  QSpinnerDots,
  },
  directives: {
    Ripple,
    ClosePopup
  },
  plugins: {
    Notify,
    Dialog,
    Loading
  }
 })