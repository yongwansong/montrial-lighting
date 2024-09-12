/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
window.PXUTheme.jsRecommendedProducts = {
  init: function($section) {

    // Add settings from schema to current object
    window.PXUTheme.jsRecommendedProducts = $.extend(this, window.PXUTheme.getSectionData($section));

    // Look for an element with class 'product-recommendations'
    $section.hide();
    const $productRecommendations = $section.find('.product-recommendations');

    // Selectors
    const productID = $productRecommendations.data('product-id');
    const limit = $productRecommendations.data('limit');

    const sectionID = $productRecommendations.data('section-id');

    // If showing custom collection we do not want to build request url
    if (this.show_custom_collection) {
      this.showCustomCollection($section);
      return;
    }

    // Build request URL
    const shopURL = $productRecommendations.data('base-url');
    var requestUrl = `${shopURL}?section_id=${sectionID}&limit=${limit}&product_id=${productID}`;
  
    // SV-24.06.21
    if(typeof product_vendor !== 'undefined' && product_vendor !== '') {
      requestUrl = '/collections/vendors?q=' + product_vendor + '&constraint=' + product_type;
    }
    
    if (typeof current_collection !== 'undefined' && false) {
      if (current_collection.products_count > 1) {
        requestUrl = '/collections/' + current_collection.handle + '?view=recommended-products-json';
      }
    }
    console.log(requestUrl);  

    $.ajax({
      type: 'GET',
      url: requestUrl,
      success: function(data) {

        let $recommendedProductsElement = $(data).find('.product-recommendations').html();
        
        // Insert product list into the product recommendations container
        $productRecommendations.html($recommendedProductsElement);
        $section.show();

        //window.PXUTheme.jsProduct.relatedProducts();

        // Initialize shopify payment buttons
        if (Shopify.PaymentButton) {
          Shopify.PaymentButton.init();
        }

        // Converting the currencies
        if (window.PXUTheme.currencyConverter) {
          window.PXUTheme.currencyConverter.convertCurrencies();
        }
      }
    });
  },
  setupRecommendedVideoPlayer: function($section) {
    const videosInRecommendedProducts = $section.find('[data-product-recommendations-container] [data-html5-video] video, [data-product-recommendations-container] [data-youtube-video]').get();

    // Only run Plyr.setup if videosInRecommendedProducts exists
    if (videosInRecommendedProducts.length > 0) {
      videosInRecommendedProductsPlayer = Plyr.setup(videosInRecommendedProducts, {
        controls: videoControls,
        fullscreen: {
          enabled: true,
          fallback: true,
          iosNative: true
        },
        storage: {
          enabled: false
        }
      });
      if (videoPlayers !== null) {
        var combinedArray = videoPlayers.concat(videosInRecommendedProductsPlayer);
        videoPlayers = combinedArray;
      } else {
        videoPlayers = videosInRecommendedProductsPlayer;
      }
    }

    window.PXUTheme.jsVideo.setupListeners();
  },
  showCustomCollection: function($section) {
    const $recommendedProductsElement = $section.find('.product-recommendations').html();

    const $productRecommendationsContainer = $('.product-recommendations');
    $productRecommendationsContainer.html($recommendedProductsElement);

    window.PXUTheme.jsProduct.relatedProducts();
  },
  unload: function($section) {
  }
}

/******/ })()
;