import 'focus-within-polyfill';

import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import carousel from './common/carousel';
import svgInjector from './global/svg-injector';

export default class Global extends PageManager {
    onReady() {
        const { cartId, secureBaseUrl } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        mobileMenuToggle();
        svgInjector();

    //header
    $(".navPage-subMenu").appendTo(".mega-menu");
    $(window).on("resize", function () {
      if ($(window).width() < 1028) {
        $(".product-wrapper a").on("click", function (event) {
          event.preventDefault();
        });
      }
    });
 
    $(".navPage-childList").not(":first").css("display", "none");

    let navPage_L1_Link = $(
      ".navPages-list > .nav-desk-warapper > .navPages-item > .productNavAction"
    );
    let navPage_L2_Link = $(
      ".navPage-subMenu-list .navPage-subMenu-item  a.has-subMenu"
    );

    navPage_L1_Link.on("click", function (e) {
      $(".navPage-subMenu-item:nth-child(1)").addClass("active-item");
      e.preventDefault();
      document.querySelector(".mega-menu").classList.toggle("megamenushow");
      document.querySelector(".nav-desk").classList.toggle("box-border");
    });

    function navDesk() {
      navPage_L2_Link.on("click", function (e) {
        e.preventDefault();

        $(".navPage-childList").hide();
        $(".navPage-subMenu-item").removeClass("active-item");
    
        // Get the collapsible ID for the current submenu item
        let collapsibleId = $(this).closest(".navPage-subMenu-item").attr("id");
        $(".l3-container #" + collapsibleId).show();
        $(this).closest(".navPage-subMenu-item").addClass("active-item");
        });
    
    }

    if (window.matchMedia("(min-width: 801px)").matches) {
      navDesk();
    }

    $(window).on("resize", function () {
      if (window.matchMedia("(min-width: 801px)").matches) {
        navDesk();
      }
    });

    let attrLists = document.querySelectorAll("[data-level-id]");

    attrLists.forEach((attr) => {
      attr.addEventListener("click", function (e) {
        document.querySelector(".navPages").scrollTop = 0;
        e.preventDefault();
        let levelId = e.target.dataset.levelId;
        document.querySelector(levelId).classList.toggle("active");
      });
    });

    function updateNavMobMargin() {
      let topHeaderHeight = $('.top-header').outerHeight() || 0;
      let navUserHeight = $('.navUser').outerHeight() || 0;
      let headerSearchHeight = $('.header-search').outerHeight() || 0;

      let totalHeight = topHeaderHeight + navUserHeight + headerSearchHeight;

      $('.nav-mob').css('margin-top', totalHeight + 'px');
  }

  updateNavMobMargin();
  $(window).resize(updateNavMobMargin);

    } // end of onready
}
