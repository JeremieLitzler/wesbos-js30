import { _ as e } from './_rollupPluginBabelHelpers-e36f2efa.js';
import './index-29652b0c.js';
import { a as t, C as i } from './App-c2eca463.js';
import { c as n } from './ResizeObserver-31c1ae3d.js';
import { K as s } from './Keycodes-606604c4.js';
const o = window.PointerEvent
  ? {
      up: 'pointerup',
      enter: 'pointerenter',
      leave: 'pointerleave',
    }
  : {
      up: 'touchend',
      enter: 'mouseenter',
      leave: 'mouseleave',
    };
t.register(
  'SiteHeader',
  class extends i {
    constructor(...t) {
      super(...t),
        e(this, 'el', void 0),
        e(this, 'dropdownTriggers', []),
        e(this, 'menuContainer', void 0),
        e(this, 'menu', void 0),
        e(this, 'menuSections', void 0),
        e(this, 'arrow', void 0),
        e(this, 'menuButton', void 0),
        e(this, 'mobileMenuCloseButton', void 0),
        e(this, 'closeDropdownTimeout', void 0),
        e(this, 'resizeObserver', void 0),
        e(this, 'activeMenuSectionIndex', -1),
        e(this, 'keydownHandler', void 0),
        e(this, 'handleMenuClick', (e) => {
          e.stopPropagation();
        }),
        e(this, 'handleMenuEntered', (e) => {
          'touch' !== e.pointerType && this.stopCloseTimeout();
        }),
        e(this, 'handleMenuLeft', (e) => {
          'touch' !== e.pointerType && this.startCloseTimeout();
        }),
        e(this, 'handleMenuTransitionEnd', (e) => {
          'opacity' === e.propertyName &&
            this.menu.style.setProperty(
              'pointer-events',
              this.isMenuVisible ? 'auto' : 'none',
            );
        }),
        e(this, 'handleMenuButtonClicked', (e) => {
          e.preventDefault(),
            this.el.classList.remove('SiteHeader--noTransitions'),
            this.el.classList.toggle('SiteHeader--mobileMenuVisible');
        }),
        e(this, 'handleTriggerClicked', (e) => {
          e.preventDefault(), e.stopPropagation();
          const t = this.dropdownTriggers.indexOf(e.currentTarget);
          t > -1 && this.toggleDropdown(t);
        }),
        e(this, 'handleTriggerEntered', (e) => {
          if ('touch' === e.pointerType) return;
          const t = this.dropdownTriggers.indexOf(e.currentTarget);
          this.stopCloseTimeout(), t > -1 && this.openDropdown(t);
        }),
        e(this, 'handleTriggerLeft', (e) => {
          'touch' !== e.pointerType && this.startCloseTimeout();
        }),
        e(this, 'handleTriggerFocused', (e) => {
          this.stopCloseTimeout();
          const t = this.dropdownTriggers.indexOf(e.currentTarget);
          t > -1 && this.openDropdown(t, !0);
        }),
        e(this, 'handleResize', () => {
          this.positionElements();
        }),
        e(this, 'handleBodyClick', () => {
          this.closeDropdown();
        }),
        e(this, 'handleEscape', () => {
          this.closeDropdown();
        }),
        e(this, 'startCloseTimeout', () => {
          this.closeDropdownTimeout = setTimeout(this.closeDropdown, 50);
        }),
        e(this, 'stopCloseTimeout', () => {
          clearTimeout(this.closeDropdownTimeout);
        }),
        e(this, 'toggleDropdown', (e) => {
          this.activeMenuSectionIndex === e
            ? this.closeDropdown()
            : this.openDropdown(e);
        }),
        e(this, 'registerArrowKeyNavigation', (e, t) => {
          void 0 !== this.keydownHandler && this.unregisterArrowKeyNavigation();
          const i = Array.from(t.querySelectorAll('a'));
          let n = 0;
          i[n].focus(),
            (this.keydownHandler = (t) => {
              switch (t.keyCode) {
                case s.TAB:
                  e.focus(), this.startCloseTimeout();
                  break;
                case s.UP:
                  t.preventDefault(),
                    (n -= 1),
                    n < 0 && (n += i.length),
                    i[n].focus();
                  break;
                case s.DOWN:
                  t.preventDefault(),
                    (n += 1),
                    n >= i.length && (n -= i.length),
                    i[n].focus();
              }
            }),
            this.el.addEventListener('keydown', this.keydownHandler);
        }),
        e(this, 'unregisterArrowKeyNavigation', () => {
          this.keydownHandler &&
            this.el.removeEventListener('keydown', this.keydownHandler),
            (this.keydownHandler = void 0);
        }),
        e(this, 'openDropdown', (e, t = !1) => {
          e !== this.activeMenuSectionIndex &&
            (this.isMenuVisible ||
              this.el.classList.add('SiteHeader--noTransitions'),
            (this.activeMenuSectionIndex = e),
            this.menuSections.forEach((t, i) => {
              t.classList.remove(
                'SiteMenu__section--left',
                'SiteMenu__section--right',
              ),
                t.setAttribute('aria-hidden', 'true'),
                (t.hidden = !0),
                i < e
                  ? t.classList.add('SiteMenu__section--left')
                  : i > e && t.classList.add('SiteMenu__section--right');
            }),
            this.dropdownTriggers.forEach((t, i) => {
              t.setAttribute('aria-expanded', i === e ? 'true' : 'false');
            }),
            t &&
              this.registerArrowKeyNavigation(
                this.dropdownTriggers[e],
                this.menuSections[e],
              ),
            this.positionElements(),
            setTimeout(() => {
              this.el.classList.add('SiteHeader--dropdownVisible'),
                this.el.classList.remove('SiteHeader--noTransitions'),
                (this.menu.hidden = !1);
            }));
        }),
        e(this, 'closeDropdown', () => {
          -1 !== this.activeMenuSectionIndex &&
            this.isMenuVisible &&
            (this.el.classList.remove('SiteHeader--dropdownVisible'),
            this.menuSections[this.activeMenuSectionIndex].setAttribute(
              'aria-hidden',
              'true',
            ),
            this.dropdownTriggers[this.activeMenuSectionIndex].setAttribute(
              'aria-expanded',
              'false',
            ),
            (this.menu.hidden = !0),
            (this.menuSections[this.activeMenuSectionIndex].hidden = !0),
            (this.activeMenuSectionIndex = -1),
            this.unregisterArrowKeyNavigation());
        }),
        e(this, 'positionElements', () => {
          if (-1 === this.activeMenuSectionIndex) return;
          const e = this.menuSections[this.activeMenuSectionIndex],
            t = this.dropdownTriggers[this.activeMenuSectionIndex],
            i =
              -1 *
              (window.innerWidth / 2 -
                (t.getBoundingClientRect().left + t.offsetWidth / 2));
          this.el.style.setProperty('--siteMenuArrowOffset', `${i}px`);
          const n = e.offsetWidth,
            s = e.offsetHeight;
          (this.menu.style.width = `${n}px`),
            this.menu.style.setProperty('--siteMenuHeight', `${s}px`),
            (e.hidden = !1),
            e.setAttribute('aria-hidden', 'false');
        });
    }
    async connect() {
      this.menuButton &&
        this.menuButton.addEventListener('click', this.handleMenuButtonClicked),
        this.mobileMenuCloseButton &&
          this.mobileMenuCloseButton.addEventListener(
            'click',
            this.handleMenuButtonClicked,
          ),
        this.menu &&
          ((this.menuSections = this.menuSections.filter(
            (e) => !!e.innerHTML.trim(),
          )),
          this.menu.addEventListener(o.up, this.handleMenuClick),
          this.menu.addEventListener(o.enter, this.handleMenuEntered),
          this.menu.addEventListener(o.leave, this.handleMenuLeft),
          this.menuContainer.addEventListener(
            'transitionend',
            this.handleMenuTransitionEnd,
          ),
          document.body &&
            document.body.addEventListener(o.up, this.handleBodyClick),
          document.body &&
            document.body.addEventListener('escape:keydown', this.handleEscape),
          (this.resizeObserver = await n(this.handleResize)),
          this.resizeObserver.observe(this.el)),
        this.dropdownTriggers.forEach((e) => {
          e.addEventListener(o.enter, this.handleTriggerEntered),
            e.addEventListener(o.leave, this.handleTriggerLeft),
            e.addEventListener(o.up, this.handleTriggerClicked),
            e.addEventListener('focusin', this.handleTriggerFocused);
        });
    }
    disconnect() {
      this.menuButton &&
        this.menuButton.removeEventListener(
          'click',
          this.handleMenuButtonClicked,
        ),
        this.mobileMenuCloseButton &&
          this.mobileMenuCloseButton.removeEventListener(
            'click',
            this.handleMenuButtonClicked,
          ),
        this.menu &&
          (this.menu.removeEventListener(o.up, this.handleMenuClick),
          this.menu.removeEventListener(o.enter, this.handleMenuEntered),
          this.menu.removeEventListener(o.leave, this.handleMenuLeft),
          this.menuContainer.removeEventListener(
            'transitionend',
            this.handleMenuTransitionEnd,
          ),
          document.body &&
            document.body.removeEventListener(o.up, this.handleBodyClick),
          document.body &&
            document.body.removeEventListener(
              'escape:keydown',
              this.handleEscape,
            ),
          this.resizeObserver.disconnect()),
        this.dropdownTriggers.forEach((e) => {
          e.removeEventListener(o.enter, this.handleTriggerEntered),
            e.removeEventListener(o.leave, this.handleTriggerLeft),
            e.removeEventListener(o.up, this.handleTriggerClicked),
            e.removeEventListener('focusin', this.handleTriggerFocused);
        });
    }
    get isMenuVisible() {
      return (
        parseFloat(
          getComputedStyle(this.menuContainer).getPropertyValue('opacity'),
        ) > 0
      );
    }
  },
);
