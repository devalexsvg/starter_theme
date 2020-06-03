export const dispatcher = getDispatcher()

export function initHeader() {
  const header = <HTMLElement>document.getElementById('siteHeader'),
        outer = <HTMLElement>header.querySelector('.siteHeader-outer'),
        inner = <HTMLElement>header.querySelector('.siteHeader-inner'),
        nav = <HTMLElement>inner.querySelector('.-nav'),
        mobile = <HTMLElement>header.querySelector('.siteHeader-mobile')
  
  
  initDroppies()
  initProductsMenu()
  initSearch()
  initMobile()
  
  //dispatcher.mobile.dispatch('open')
  //dispatcher.products.dispatch('open')
  //dispatcher.ptypes.dispatch('open', 1)
  
  
  function initMobile() {
    const top = <HTMLElement>mobile.querySelector('.-top'),
          label = <HTMLElement>top.querySelector('.-label'),
          mobileNav = <HTMLElement>mobile.querySelector('.-nav'),
          triggers = [].slice.apply(document.querySelectorAll('[data-mobile-menu]'))
  
    triggers.forEach(trigger => trigger.addEventListener('click', () => {
      if (dispatcher.ptypes.isOpen()) {
        dispatcher.ptypes.dispatch('close')
        freezeWindowScroll()
      } else if (dispatcher.products.isOpen()) {
        dispatcher.products.dispatch('close')
        freezeWindowScroll()
      } else if (dispatcher.search.isOpen()) {
        dispatcher.search.dispatch('close')
        freezeWindowScroll()
      } else {
        dispatcher.mobile.dispatch(trigger.dataset.mobileMenu)
      }
    }))
    
    dispatcher.products.on('open', backTriggers)
    dispatcher.search.on('open', backTriggers)
    
    dispatcher.products.on('close', normalTriggers)
    dispatcher.search.on('close', normalTriggers)
    
    function backTriggers() {
      triggers.forEach(trigger => trigger.classList.add('is--back'))
    }
    function normalTriggers() {
      triggers.forEach(trigger => trigger.classList.remove('is--back'))
    }
    
    dispatcher.on('label', (value?: string) => {
      if (value) {
        label.innerText = value
      } else {
        label.innerText = label.dataset.title
      }
    })
    
    dispatcher.mobile.on('open', openMenu)
    dispatcher.mobile.on('close', closeMenu)
  
    window.addEventListener('resize', resolve)
    window.addEventListener('orientationchange', resolve)
    resolve()
    
    function openMenu() {
      freezeWindowScroll()
      triggers.forEach(trigger => trigger.classList.add('is--active'))
      mobileNav.classList.add('is--visible')
    }
    
    function closeMenu() {
      releaseWindowScroll()
      dispatcher.search.isOpen() && dispatcher.search.dispatch('close')
      dispatcher.products.isOpen() && dispatcher.products.dispatch('close')
      triggers.forEach(trigger => trigger.classList.remove('is--active'))
      mobileNav.classList.remove('is--visible')
    }
  
    /**
     * Cut and paste contents between mobile and inner headers based on window's width
     */
    function resolve() {
      if (isMobile() && nav.childNodes.length) {
        [].slice.apply(nav.childNodes).forEach((node: Node) => {
          mobileNav.appendChild(node)
        })
      } else if (!isMobile() && mobileNav.childNodes.length) {
        [].slice.apply(mobileNav.childNodes).forEach((node: Node) => {
          nav.appendChild(node)
        })
      }
    }
  }
  
  
  function initDroppies() {
    const menus = [].slice.apply(header.querySelectorAll('li.menu-item-has-children'))
    
    menus.forEach((li: HTMLElement) => {
      const a = [].slice.apply(li.childNodes).find(node => node.nodeName === 'A'),
            subMenu = <HTMLElement>li.querySelector('.sub-menu')
      initDroppie(a, subMenu)
    })
    
    initDroppie(header.querySelector('.-activeLang'), header.querySelector('.-languages'))
  
    function initDroppie(trigger: HTMLButtonElement, menu?: HTMLElement) {
    
      if (!trigger || !menu) {
        trigger && (trigger.disabled = true)
        return
      }
    
      let droppieOpen = false
    
      if (trigger && menu) {
        trigger.addEventListener('click', event => {
          if (!isMobile()) {
            event.preventDefault()
            toggleMenu()
          }
        })
        document.addEventListener('click', event => {
          if (droppieOpen && (event.target !== trigger && event.target !== menu && !menu.contains(<HTMLElement>event.target))) {
            closeMenu()
          }
        })
      }
    
      function openMenu() {
        menu.classList.add('is--open')
        trigger.classList.add('is--active')
        droppieOpen = true
      }
    
      function closeMenu() {
        menu.classList.remove('is--open')
        trigger.classList.remove('is--active')
        droppieOpen = false
      }
    
      function toggleMenu() {
        droppieOpen ? closeMenu() : openMenu()
      }
    }
  }
  
  
  function initProductsMenu() {
    const menu = <HTMLElement>outer.querySelector('.-products'),
          triggers: Array<HTMLElement> = [].slice.apply(document.querySelectorAll('[data-products-menu]'))
    
    let animationFrame = null,
        animationHandler = () => {}
    
    initMenuInternals()
  
    triggers.forEach(trigger => trigger.addEventListener('click',  () => dispatcher.products.dispatch(trigger.dataset.productsMenu)))
  
    dispatcher.products.on('close', closeMenu)
    dispatcher.products.on('open', openMenu)
    
    function openMenu() {
      dispatcher.search.isOpen() && dispatcher.search.dispatch('close')
      showOuter()
      menu.classList.add('is--visible')
      triggers.forEach(trigger => trigger.classList.add('is--active'))
      dispatcher.label.set(menu.getAttribute('aria-label'))
      animationFrame = window.requestAnimationFrame(animationHandler)
    }
    
    function closeMenu() {
      hideOuter()
      menu.classList.remove('is--visible')
      triggers.forEach(trigger => trigger.classList.remove('is--active'))
      dispatcher.label.reset()
      window.cancelAnimationFrame(animationFrame)
    }
  
    function initMenuInternals() {
      const triggers = [].slice.apply(menu.querySelectorAll('.-type')),
            collections = [].slice.apply(menu.querySelectorAll('.-collection')),
            scroller = menu.querySelector('.-products-list-scroller')
    
      if (!triggers.length || !collections.length) {
        console.warn('No product type triggers and collections found')
        return
      }
      
      dispatcher.ptypes.on('open', pickType)
      dispatcher.ptypes.on('close', discardTypes)
  
      triggers.forEach((trigger, idx) => {
        trigger.addEventListener('click', () => dispatcher.ptypes.dispatch('open', idx, trigger))
      })
  
      isMobile() || dispatcher.ptypes.dispatch('open', 0)
    
      // Collection header parallax on overflow scrolling
      // Minimizing calculations only to currently active collection
      // No heavy shit inside animation frame handler!
      let activeCollection: HTMLElement = null,
          activeCollectionHeader: HTMLElement = null,
          activeCollectionList: HTMLElement = null
      
      animationHandler = function animationHandler() {
        if (!isMobile() && activeCollection) {
          if (activeCollection.scrollTop > 0) {
            activeCollectionList.classList.add('is--scrolled')
            activeCollectionHeader.style.transform = `translateY(${activeCollection.scrollTop / 2.5}px)`
            //activeCollectionHeader.style.opacity = (1 - activeCollection.scrollTop / activeCollectionHeader.scrollHeight).toString()
          } else {
            activeCollectionList.classList.remove('is--scrolled')
            activeCollectionHeader.style.transform = ''
          }
        }
        animationFrame = window.requestAnimationFrame(animationHandler)
      }
    
      function pickType(idx = 0) {
        const trigger = triggers[idx],
              collection = collections[idx]
        
        discardTypes()
        
        activeCollection = collection
        activeCollectionHeader = collection.querySelector('.-collection-header')
        activeCollectionList = collection.querySelector('.-collection-list')
      
        scroller.classList.add(`is--index-${idx}`)
        trigger.classList.add('is--active')
        collection.classList.add('is--visible')
      }
      
      function discardTypes() {
        activeCollection = null
        activeCollectionHeader = null
        activeCollectionList = null
        triggers.filter(t => t.classList.contains('is--active')).forEach(t => t.classList.remove('is--active'))
        collections.filter(c => c.classList.contains('is--visible')).forEach(c => c.classList.remove('is--visible'))
        scroller.className = scroller.className.replace(/is--index-\d+/, '')
      }
    }
  }
  
  
  function initSearch() {
    const triggers = [].slice.apply(document.querySelectorAll('[data-search-dialog]')),
          searcher = outer.querySelector('.-search'),
          input = <HTMLInputElement>searcher.querySelector('.-input'),
          link = <HTMLAnchorElement>searcher.querySelector('.-link')
  
    dispatcher.search.on('close', closeMenu)
    dispatcher.search.on('open', openMenu)
  
    triggers.forEach(trigger => trigger.addEventListener('click', () => dispatcher.search.dispatch(trigger.dataset.searchDialog)))
  
    input.addEventListener('keydown', event => {
      switch (event.key) {
        case 'Enter':
          if (input.value) {
            (Object.assign(document.createElement('a'), {
              href: `/?s=${encodeURIComponent(input.value)}`
            })).click()
          }
          break
        case 'Esc':
        case 'Escape':
          closeMenu()
          break
      }
    })
  
    input.addEventListener('keyup', event => {
      if (input.value) {
        link.classList.add('is--active')
        link.href = `/?s=${encodeURIComponent(input.value)}`
      } else {
        link.classList.remove('is--active')
        link.href = ''
      }
    })
    
    function openMenu() {
      dispatcher.products.isOpen() && dispatcher.products.dispatch('close')
      showOuter()
      searcher.classList.add('is--visible')
      triggers.forEach(trigger => trigger.classList.add('is--active'))
      setTimeout(() => input.focus(), 150)
      dispatcher.label.set(searcher.getAttribute('aria-label'))
    }
    
    function closeMenu() {
      hideOuter()
      searcher.classList.remove('is--visible')
      triggers.forEach(trigger => trigger.classList.remove('is--active'))
      dispatcher.label.reset()
    }
  }
  
  
  function showOuter() {
    freezeWindowScroll()
    outer.classList.add('is--visible')
  }
  
  function hideOuter() {
    releaseWindowScroll()
    outer.classList.remove('is--visible')
  }
}


let capturedScrollY = 0
function scrollToCapturedPosition() {
  window.scrollTo({ left: 0, top: capturedScrollY, behavior: 'instant' })
}
function freezeWindowScroll() {
  capturedScrollY = window.pageYOffset
  window.addEventListener('scroll', scrollToCapturedPosition)
}
function releaseWindowScroll() {
  capturedScrollY = 0
  window.removeEventListener('scroll', scrollToCapturedPosition)
}

//function blurBackdrop() {
//  document.documentElement.classList.contains('has--filter') && document.body.classList.add('blur-backdrop')
//}
//function resetBackdrop() {
//  document.body.classList.remove('blur-backdrop')
//}

function getDispatcher() {
  
  function listen<Detail=any>(action: string, cb: (detail: Detail) => any) {
    document.addEventListener(`header-${action}`, (event: CustomEvent) => {
      cb(event.detail)
    })
  }
  
  function dispatch(action: string, detail?: any, origin?: HTMLElement) {
    (origin || document).dispatchEvent(new CustomEvent(`header-${action}`, {
      bubbles: true,
      cancelable: true,
      detail,
    }))
  }
  
  function stdMenu(name: string) {
    let isOpen = false
    return {
      isOpen() {
        return isOpen
      },
      dispatch(action: string, detail?: any, origin?: HTMLElement) {
        switch (action) {
          case 'open':
            isOpen = true
            break
          case 'close':
            isOpen = false
            break
          case 'toggle':
          default:
            const directive = isOpen ? 'close' : 'open'
            this.dispatch(directive)
            dispatch(`${name}-toggle`, directive, origin)
        }
        dispatch(`${name}-${action}`, detail, origin)
      },
      on<Detail=any>(action: 'open'|'close'|'toggle'|string, cb: (detail: Detail) => any) {
        listen(`${name}-${action}`, cb)
      },
    }
  }
  
  return {
    dispatch,
    on: listen,
    mobile: stdMenu('mobile'),
    products:  stdMenu('products'),
    ptypes:  stdMenu('ptypes'),
    search:  stdMenu('search'),
    label: {
      set: (label: string) => dispatch('label', label),
      reset: () => dispatch('label')
    },
  }
}

function isMobile() {
  return window.innerWidth < 720
}
