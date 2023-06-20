
```
smart-type
├─ .gitignore
├─ fonts
│  └─ general_sans
│     ├─ GeneralSans-Bold.otf
│     ├─ GeneralSans-Light.otf
│     ├─ GeneralSans-Medium.otf
│     ├─ GeneralSans-Regular.otf
│     └─ GeneralSans-Semibold.otf
├─ index.html
├─ manifest.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ browser_action
│  │  ├─ icon128.png
│  │  ├─ icon16.png
│  │  ├─ icon32.png
│  │  └─ icon48.png
│  ├─ fonts
│  │  ├─ fira_code
│  │  │  └─ FiraCode-VariableFont_wght.ttf
│  │  ├─ general_sans
│  │  │  ├─ GeneralSans-Bold.otf
│  │  │  ├─ GeneralSans-Light.otf
│  │  │  ├─ GeneralSans-Medium.otf
│  │  │  ├─ GeneralSans-Regular.otf
│  │  │  └─ GeneralSans-Semibold.otf
│  │  └─ open_sans
│  │     └─ OpenSans-SemiBold.ttf
│  ├─ icon128.png
│  ├─ icon16.png
│  ├─ icon32.png
│  ├─ icon48.png
│  └─ icons
│     ├─ android-chrome-192x192.png
│     ├─ android-chrome-512x512.png
│     ├─ apple-touch-icon.png
│     ├─ browserconfig.xml
│     ├─ favicon-16x16.png
│     ├─ favicon-32x32.png
│     ├─ favicon.ico
│     ├─ mstile-150x150.png
│     ├─ safari-pinned-tab.svg
│     └─ site.webmanifest
├─ src
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ img
│  │  │  └─ empty.png
│  │  ├─ smart-type.svg
│  │  └─ svg
│  │     └─ blink.svg
│  ├─ classes
│  │  ├─ Shortcut.ts
│  │  └─ ShortcutsManager.ts
│  ├─ components
│  │  ├─ BarsButton
│  │  │  ├─ BarsButton.jsx
│  │  │  └─ index.js
│  │  ├─ Card
│  │  │  ├─ Card.jsx
│  │  │  ├─ components
│  │  │  │  ├─ CardEditor.jsx
│  │  │  │  ├─ CardPreview.jsx
│  │  │  │  ├─ ExpandButton.jsx
│  │  │  │  ├─ RemoveButton.jsx
│  │  │  │  ├─ routes.js
│  │  │  │  └─ SaveButton.jsx
│  │  │  └─ index.js
│  │  ├─ DropButton
│  │  │  ├─ DropButton.jsx
│  │  │  └─ index.js
│  │  ├─ EmptyCardList
│  │  │  ├─ EmptyCardList.jsx
│  │  │  └─ index.js
│  │  ├─ Form
│  │  │  ├─ Form.jsx
│  │  │  └─ index.js
│  │  ├─ Header
│  │  │  ├─ Header.jsx
│  │  │  └─ index.js
│  │  ├─ HeaderNav
│  │  │  ├─ HeaderNav.jsx
│  │  │  └─ index.js
│  │  ├─ MainButton
│  │  │  ├─ index.js
│  │  │  └─ MainButton.jsx
│  │  ├─ Modal
│  │  │  ├─ index.js
│  │  │  └─ Modal.jsx
│  │  ├─ Nav
│  │  │  ├─ index.js
│  │  │  └─ Nav.jsx
│  │  ├─ SecButton
│  │  │  ├─ index.js
│  │  │  └─ SecondaryButton.jsx
│  │  ├─ Section
│  │  │  ├─ components
│  │  │  │  ├─ ManageSection.jsx
│  │  │  │  ├─ routes.js
│  │  │  │  ├─ ShortcutsSection.jsx
│  │  │  │  └─ TestSection.jsx
│  │  │  ├─ index.js
│  │  │  └─ Section.jsx
│  │  ├─ SortedList
│  │  │  ├─ index.js
│  │  │  └─ SortedList.jsx
│  │  ├─ StatsPills
│  │  │  ├─ index.js
│  │  │  └─ StatsPills.jsx
│  │  └─ SwitchButton
│  │     ├─ index.js
│  │     └─ SwitchButton.jsx
│  ├─ constants
│  │  ├─ errorMessages.js
│  │  └─ sortTypes.js
│  ├─ context
│  │  └─ ShortcutsProvider.jsx
│  ├─ extension
│  │  ├─ background.js
│  │  ├─ content.js
│  │  └─ expand.js
│  ├─ helpers
│  │  ├─ cardHelpers.jsx
│  │  └─ handleImportExport.js
│  ├─ hooks
│  │  ├─ useField.jsx
│  │  └─ useLabel.jsx
│  ├─ landing
│  ├─ main.jsx
│  ├─ routes.js
│  ├─ scss
│  │  ├─ base
│  │  │  ├─ _base.scss
│  │  │  ├─ _fonts.scss
│  │  │  └─ _typography.scss
│  │  ├─ components
│  │  │  ├─ _brand.scss
│  │  │  ├─ _btns.scss
│  │  │  ├─ _cards.scss
│  │  │  ├─ _dropdowns.scss
│  │  │  ├─ _empty.scss
│  │  │  ├─ _forms.scss
│  │  │  ├─ _icons.scss
│  │  │  ├─ _links.scss
│  │  │  ├─ _modal.scss
│  │  │  ├─ _navs.scss
│  │  │  ├─ _pills.scss
│  │  │  ├─ _scrollbars.scss
│  │  │  ├─ _sections.scss
│  │  │  ├─ _shapes.scss
│  │  │  └─ _switch.scss
│  │  ├─ layout
│  │  │  ├─ _header.scss
│  │  │  └─ _main.scss
│  │  ├─ pages
│  │  ├─ styles.scss
│  │  └─ utils
│  │     ├─ _functions.scss
│  │     ├─ _mixins.scss
│  │     └─ _variables.scss
│  └─ utils
│     ├─ dateConverter.ts
│     ├─ formUtils
│     │  ├─ keyHandler.ts
│     │  ├─ routes.js
│     │  └─ validators.ts
│     ├─ loadShortcuts.ts
│     ├─ notify.js
│     └─ regexConverter.ts
└─ vite.config.js

```