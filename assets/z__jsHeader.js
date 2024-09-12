/******/ (() => { // webpackBootstrap
  var __webpack_exports__ = {};
  Shopify.theme.jsHeader = {
    init: function ($section) {

      // Add settings from schema to current object
      Shopify.theme.jsHeader = $.extend(this, Shopify.theme.getSectionData($section));

      // Selectors
      this.$el = $('#header')
      this.$menuToggle = this.$el.find('.header__menu-toggle');
      let announcementHeight = $('.announcement-sticky-wrapper').height();

      // Overlaid header
      if (this.enable_overlay === true && isScreenSizeLarge()) {
        this.updateOverlayStyle(this.sectionUnderlayIsImage());
      }

      // Sticky header
      if (this.enable_sticky === true && isScreenSizeLarge()) {
        this.enableSticky(announcementHeight);

        $(window).on('resize', () => {
          this.enableSticky(announcementHeight);
        });
      }

      if (this.header_layout == 'centered' || this.header_layout == 'search_focus') {
        this.$menuToggle.on('click', () => {
          this.showStickyMenu();
        })
      } else if (this.header_layout == 'vertical') {
        $section.find('.header-sticky-wrapper').stick_in_parent();
        if (Shopify.theme_settings.announcement_enabled == true) {
          Shopify.theme.jsAnnouncementBar.addVerticalHeaderTopMargin();
        }
        this.addOffScreenDropdownCheck();
      }

      if ($('.mega-menu').length > 0) {
        Shopify.theme.jsMegaMenu.init($section);
      }

      if (!isScreenSizeLarge()) {
        this.unload();
        Shopify.theme.mobileMenu.init();
      }

      $('.search-overlay__close').on('click', function () {
        Shopify.theme.jsHeader.hideSearch();
      });

      $(document).on('click', '[data-show-search-trigger]', function () {
        Shopify.theme.jsHeader.showSearch();
      });

      if (isScreenSizeLarge() || !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.dropdown-click--true .header__link:not(.primary-brand, .primary-logo)').on('click touchstart', function (e) {
          var $this = $(this);
          Shopify.theme.jsHeader.toggleMenuClick(e, $this);
        });
      }

      if (this.dropdown_click === false) {
        $('.navbar-item').on('mouseleave', function () {
          Shopify.theme.jsHeader.collapseSubmenu($(this));
        });
      }

      $(document).on('keydown', '[data-show-search-trigger]', function (e) {
        if (e.which === 13) {
          Shopify.theme.jsHeader.showSearch();
        }
      });

    },
    toggleMenuClick: function (e, $this) {
      var $parentWrap = $this.parents('.has-dropdown, .has-mega-menu');

      if (!$parentWrap.hasClass('is-opened') && $parentWrap.length > 0) {
        // Prevent link on first click
        e.preventDefault();

        // Close all dropdowns & mega menu
        $('.has-dropdown, .has-mega-menu').removeClass('is-opened');
        $('.mega-menu__section').removeClass('is-active');

        // Open selected dropdown/mega menu
        $parentWrap.addClass('is-opened');
        $parentWrap.data('clicked', 'true');
      } else {

        // Close all dropdowns & mega menu
        $('.has-dropdown, .has-mega-menu').removeClass('is-opened');
        $('.mega-menu__section').removeClass('is-active');
      }

      // Close dropdown if click anywhere outside dropdown menu
      $(window).on('click', function (e) {
        if ($(e.target).closest('.header__link, .navbar-dropdown').length === 0) {
          $('.has-dropdown, .has-mega-menu').removeClass('is-opened');
          $('.mega-menu__section').removeClass('is-active');
          Shopify.theme.jsHeader.collapseSubmenu($('.navbar-item'));
        }
      });
    },
    collapseSubmenu: function (el) {
      $(el).find('.has-submenu input').prop("checked", false);
    },
    showStickyMenu: function () {
      this.$menuToggle.toggleClass('is-active');
      this.$el.find('.sticky-menu-wrapper').toggleClass('is-visible');
    },
    hideStickyMenu: function () {
      this.$menuToggle.removeClass('is-active');
      this.$el.find('.sticky-menu-wrapper').removeClass('is-visible');
    },
    disableSticky: function () {
      let $stickyEl = $('#header');

      $stickyEl.unstick();
      $stickyEl.removeClass('sticky--enabled');

      setTimeout(function () {
        $stickyEl.css('height', 'auto');
      }, 250)
    },
    enableSticky: function (offset) {
      let $stickyEl = this.$el;

      $stickyEl.addClass('sticky--enabled');

      $stickyEl.sticky({
        wrapperClassName: 'header-sticky-wrapper',
        zIndex: 40,
        topSpacing: offset || 0
      })
        .on('sticky-start', () => {
          let headerHeight;
          let announcementHeight;

          // Hide the mini cart for centered header layout
          if (Shopify.theme_settings.header_layout == 'centered') {
            $('[data-ajax-cart-trigger]').removeClass('show-mini-cart');
          }

          // Get header height is sticky enabled
          if (Shopify.theme.jsHeader.enable_sticky == true && Shopify.theme_settings.header_layout != 'vertical') {
            headerHeight = Shopify.theme.jsHeader.getHeaderHeight();
          }

          // Get announcement height is sticky enabled
          if (typeof Shopify.theme.jsAnnouncementBar !== 'undefined' && Shopify.theme.jsAnnouncementBar.enable_sticky == true && Shopify.theme_settings.header_layout != 'vertical') {
            announcementHeight = Shopify.theme.jsAnnouncementBar.getAnnouncementHeight();
          } else {
            announcementHeight = 0;
          }

          let totalHeight = headerHeight + announcementHeight;
          $stickyEl.parent().parent().find('.search-overlay').addClass('sticky-search').css('top', totalHeight + 'px');

          if (this.enable_overlay === true && this.sectionUnderlayIsImage() === true) {

            $stickyEl.parent().addClass('has-overlaid-header');
            this.disableOverlayStyle();

          } else if (this.enable_overlay === true) {

            this.disableOverlayStyle();

          }
        })
        .on('sticky-end', () => {
          $stickyEl.parent().parent().find('.search-overlay').removeClass('sticky-search').css('top', '100%');

          // Safety timeout for logo width transition which can throw calculated height off
          setTimeout(() => {
            $stickyEl.sticky('update');
          }, 250);

          this.$el.find('.sticky-menu-wrapper').removeClass('is-visible');
          this.$menuToggle.removeClass('is-active');

          if (this.enable_overlay === true && this.sectionUnderlayIsImage() === true) {
            this.updateOverlayStyle(this.sectionUnderlayIsImage());
          }
        })
    },
    disableOverlayStyle: function () {
      $('[data-enable_overlay]').attr('data-enable_overlay', false);
    },
    enableOverlayStyle: function () {
      $('[data-enable_overlay]').attr('data-enable_overlay', true);
    },
    updateOverlayStyle: function (overlayBoolean) {
      $('[data-enable_overlay]').attr('data-enable_overlay', overlayBoolean);
    },
    sectionUnderlayIsImage: function () {

      let $firstSection = $('[data-check-for-order=true]').find('[id^=shopify-section]').first();

      // Check whether the first element has class to indicate it should be under header when overlay is enabled
      if ($firstSection.hasClass('overlaid-header-option') && $.trim($firstSection.html()).length > 0) {
        return true;
      } else {
        return false;
      }

    },
    showSearch: function () {
      $('[data-show-search-trigger]').addClass('is-active');
      if (Shopify.theme_settings.search_layout == 'overlay') {
        $('[data-search-type="' + Shopify.theme_settings.search_layout + '"]').toggleClass('is-opened');
        $('.search-form .search__fields input[type="text"]').focus();
      } else {
        $.fancybox.open($('.js-search-popup'), {
          baseClass: 'search__lightbox',
          hash: false,
          infobar: false,
          toolbar: false,
          loop: true,
          smallBtn: true,
          mobile: {
            preventCaptionOverlap: false,
            toolbar: false,
          },
          beforeClose: function () {
            $('[data-show-search-trigger]').removeClass('is-active');
          }
        })
      }
    },
    hideSearch: function () {
      $('[data-show-search-trigger]').removeClass('is-active');
      if (Shopify.theme_settings.search_layout == 'overlay') {
        $('[data-search-type="' + Shopify.theme_settings.search_layout + '"]').removeClass('is-opened');
      } else {
        $.fancybox.close($('[data-search-type="' + Shopify.theme_settings.search_layout + '"]'));
      }
    },
    addOffScreenDropdownCheck: function () {
      $('.navbar-item.has-dropdown--vertical').hover(function () {

        const dropdown = $(this),
          menu = dropdown.find('.navbar-dropdown');

        menu.removeClass('navbar-dropdown--fix-offscreen');

        if (menu.is(':off-screen')) {
          menu.addClass('navbar-dropdown--fix-offscreen');
        }

      });
    },
    getHeaderHeight: function () {
      const headerHeight = $('.header-section').outerHeight() || 0;

      return headerHeight;
    },
    unload: function ($section) {
      $('.has-overlaid-header').removeClass('has-overlaid-header');
      $('[data-show-search-trigger]').off();
      $('.navbar-item').off();
      $('#header').off();
      $('.dropdown-click--true .header__link').off();
      this.$menuToggle.off();
      this.disableSticky();
      this.disableOverlayStyle();
    }
  }

  /******/
})()
  ;