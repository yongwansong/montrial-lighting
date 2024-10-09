

// define templates for the Flex-Out of the Sandbox-5.0.1 theme

var _usfFilesUrl;
var _usfProductThumbnailSticker = `
<div v-if="(_col_handles = _usfCollectionHandles(product,hasDiscount,isSoldOut))" class="sticker-holder" :class="['sticker-shape-' + _usfGlobalSettings.sticker_shape, 'sticker-position-' + _usfGlobalSettings.sticker_position]">
    <div class="sticker-holder__content sticker-holder__content--thumbnail">
        <div v-if="_col_handles.best_seller" class="thumbnail-sticker thumbnail-sticker--best-seller">
            <span class="thumbnail-sticker__text" v-html="_usfBestSeller"></span>
        </div>
        <div v-if="_col_handles.coming_soon" class="thumbnail-sticker thumbnail-sticker--coming-soon">
            <span class="thumbnail-sticker__text" v-html="_usfComingSoon"></span>
        </div>

        <div v-if="_col_handles.new" class="thumbnail-sticker thumbnail-sticker--new">
            <span class="thumbnail-sticker__text" v-html="_usfNew"></span>
        </div>

        <div v-if="_col_handles.pre_order" class="thumbnail-sticker thumbnail-sticker--pre-order">
            <span class="thumbnail-sticker__text" v-html="_usfPreOrder"></span>
        </div>

        <div v-if="_col_handles.staff_pick" class="thumbnail-sticker thumbnail-sticker--staff-pick">
            <span class="thumbnail-sticker__text" v-html="_usfStaffPick"></span>
        </div>

        <div v-if="_col_handles.show_sale" class="thumbnail-sticker thumbnail-sticker--sale">
            <span class="thumbnail-sticker__text" v-html="loc.sale"></span>
        </div>

        <div v-if="_col_handles.show_soldOut" class="thumbnail-sticker thumbnail-sticker--sold-out">
            <span class="thumbnail-sticker__text" v-html="loc.soldOut"></span>
        </div>
    </div>
</div>
`;
var _usfProductPriceTemplate = `
<span v-if="_col_handles.coming_soon" v-html="_usfComingSoon"></span>
<span v-else class="product-thumbnail__price price" :class="{'sale':hasDiscount}">
  <small v-if="priceVaries && !product.selectedVariantId"><em v-html="_usfFrom"></em></small>
  <span v-if="minDiscountedPrice > 0" class="money" v-html="priceVaries && !product.selectedVariantId ? displayMinDiscountedPrice : displayDiscountedPrice"></span>
  <span v-else v-html="_usfGlobalSettings.free_price_text"></span>
  <span v-if="hasDiscount" class="product-thumbnail__was-price compare-at-price">
      <span class="money" v-html="priceVaries && !product.selectedVariantId ? displayMinPrice : displayPrice"></span>
  </span>
</span>
`;
var _usfFilterBodyTemplate = /*inc_begin_filter-body*/
`<!-- Range filter -->
<div v-if="isRange" class="usf-facet-values usf-facet-range">
    <!-- Range inputs -->
    <div class="usf-slider-inputs usf-clear">
        <span class="usf-slider-input__from">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[0]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[0], 0)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
        <span class="usf-slider-div">-</span>
        <span class="usf-slider-input__to">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[1]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[1], 1)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
    </div>
	<!-- See API reference of this component at https://docs.sobooster.com/search/storefront-js-api/slider-component -->
    <usf-slider :color="facet.sliderColor" :symbols="facet.sliderValueSymbols" :prefix="facet.sliderPrefix" :suffix="facet.sliderSuffix" :min="facet.min" :max="facet.max" :pips="facet.range[0]" :step="facet.range[1]" :decimals="rangeDecimals" :value="range" :converter="rangeConverter" @input="onRangeSliderInput" @change="onRangeSliderChange"></usf-slider>
</div>
<!-- List + Swatch filter -->
<div v-else ref="values" :class="'usf-facet-values usf-scrollbar usf-facet-values--' + facet.display + (facet.navigationCollections ? ' usf-navigation' : '') + (facet.valuesTransformation ? (' usf-' + facet.valuesTransformation.toLowerCase()) : '') + (facet.circleSwatch ? ' usf-facet-values--circle' : '')" :style="!usf.isMobileFilter && facet.maxHeight ? { maxHeight: facet.maxHeight } : null">
    <!-- Filter options -->                
    <usf-filter-option v-for="o in visibleOptions" :facet="facet" :option="o" :key="o.id ? o.id : o.label+'_'+o.min+'_'+o.max"></usf-filter-option>
</div>

<!-- More -->
<div v-if="isMoreVisible" class="usf-more" @click="onShowMore" v-html="loc.more"></div>`
/*inc_end_filter-body*/;

var _usfSearchResultsSkeletonItemTpl = `
<div v-if="view === 'grid'" class="usf-sr-product grid__item  usf-skeleton" :class="[_usf_grid_class]">
    <div class="grid-view-item" v-if="true">
        <div class="usf-img"></div>
        <div class="usf-meta">            
        </div>
    </div>
</div>
<div class="usf-sr-product usf-skeleton" v-else>
    <!-- Image column -->
    <div class="usf-img-column">
        <div class="usf-img"></div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title"></div>
        <div class="usf-vendor"></div>
        <div class="usf-price-wrapper"></div>
    </div>
</div>
`;

var _usfSearchResultsSummaryTpl = /*inc_begin_search-summary*/
`<span class="usf-sr-summary" v-html="loader === true ? '&nbsp;' : usf.utils.format(term ? loc.productSearchResultWithTermSummary : loc.productSearchResultSummary, result.total, usf.utils.encodeHtml(term))"></span>`
/*inc_end_search-summary*/;

var _usfSearchResultsViewsTpl = /*inc_begin_search-views*/
`<div class="usf-views">
    <button class="usf-view usf-btn usf-icon usf-icon-grid" aria-label="Grid view" :class="{'usf-active': view === 'grid'}" @click.prevent.stop="onGridViewClick"></button>
    <button class="usf-view usf-btn usf-icon usf-icon-list" aria-label="List view" :class="{'usf-active': view === 'list'}" @click.prevent.stop="onListViewClick"></button>
</div>`
/*inc_end_search-views*/;

var _usfSearchResultsSortByTpl = /*inc_begin_search-sortby*/
`<usf-dropdown :placeholder="loc.sort" :value="sortBy" :options="sortByOptions" @input="onSortByChanged"></usf-dropdown>`
/*inc_end_search-sortby*/;

usf.templates = {
    // application
    app: /*inc_begin_app*/
`<div id="usf_container" class="usf-zone usf-clear" :class="{'usf-filters-horz': usf.settings.filters.horz}">
    <template v-if="hasFilters">
        <usf-filters class="usf-sr-filters"></usf-filters>
    </template>
    <usf-sr></usf-sr>
</div>`
/*inc_end_app*/,
    searchResults: `
<div class="usf-sr-container" :class="{'usf-no-facets': noFacets, 'usf-empty': !loader && !hasResults, 'usf-nosearch': !showSearchBox}">
    <!-- Search form -->
    <form v-if="showSearchBox" action="/search" method="get" role="search" class="usf-sr-inputbox">
        <button type="submit" class="usf-icon usf-icon-search usf-btn"></button>
        <input name="q" autocomplete="off" ref="searchInput" v-model="termModel">
        <button v-if="termModel" class="usf-remove usf-btn" @click.prevent.stop="clearSearch"></span>
    </form>

    <div class="usf-sr-config" v-if="usf.isMobile">
        <div class="usf-sr-config__mobile-filters-wrapper">
            <div class="usf-filters" :class="{'usf-has-filters': !!facetFilters}" @click="onMobileToggle">
                <button class="usf-btn" v-html="loc.filters"></button>
            </div>
            ` + _usfSearchResultsSortByTpl + `
        </div>
        
        ` + _usfSearchResultsSummaryTpl + _usfSearchResultsViewsTpl + `
    </div>
    <div class="usf-sr-config" v-else>
        ` + _usfSearchResultsViewsTpl + _usfSearchResultsSummaryTpl + _usfSearchResultsSortByTpl + `
    </div>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && !result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Load previous -->
    <div id="usf-sr-top-loader" :class="{'usf-with-loader':loader === 'prev'}" v-if="(loader === 'prev' || itemsOffset) && loader !== true && hasResults && usf.settings.search.more !== 'page'"></div>

    <div :class="(view === \'grid\' ? \'container collection-matrix\' : \'list-view-items\') + \' usf-results usf-\' + view">
        <template v-if="loader===true">` + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl +
        `</template>
        <template v-else>
            <template v-if="hasResults">
                <template v-if="view === 'grid'">
                    <template v-for="p in result.items"><usf-sr-griditem :product="p" :result="result" :key="p.id"></usf-sr-griditem></template>
                </template>
                <template v-else>
                    <template v-for="p in result.items"><usf-sr-listitem :product="p" :result="result" :key="p.id"></usf-sr-listitem></template>
                </template>
            </template>
            <template v-else>
                <!-- Empty result -->
                <div class="usf-sr-empty">
                    <div class="usf-icon"></div>
                    <span v-html="term ? usf.utils.format(loc.productSearchNoResults, usf.utils.encodeHtml(term)) : loc.productSearchNoResultsEmptyTerm"></span>
                    <button v-if="facetFilters" class="usf-btn usf-btn-action" v-html="loc.clearAllFilters" @click="usf.queryRewriter.removeAllFacetFilters"></button>
                </div>
            </template>
        </template>
    </div>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Paging & load more -->
    <div class="usf-sr-paging" v-if="loader !== true">
        <div class="usf-sr-more" v-if="hasResults && usf.settings.search.more === 'more'">
            <div class="usf-title" v-html="usf.utils.format(loc.youHaveViewed, itemsLoaded, result.total)"></div>
            <div class="usf-progress">
                <div :style="{width: (itemsLoaded * 100 / result.total) + '%'}"></div>
            </div>
            <button v-if="itemsLoaded < result.total" class="usf-load-more" :class="{'usf-with-loader': loader === 'more'}" @click="onLoadMore"><span v-html="loc.loadMore"></span></button>
        </div>
        <usf-sr-pages v-else-if="hasResults && usf.settings.search.more === 'page'" :page="page" :pages-total="pagesTotal" :pages-to-display="4" :side-pages-to-display="1"></usf-sr-pages>
        <div class="usf-sr-loader usf-with-loader" v-else-if="loader === 'more'"></div>
    </div>
</div>
`,
    searchResultsGridViewItem: `
<div class="usf-grid-item" :id="'product-' + product.id" :data-available="available" :data-has-discount="hasDiscount" :class="[{'has-secondary-image-swap': hoverImage && _usfGlobalSettings.show_secondary_image},'product-' + product.id, _usf_grid_class]" :product-selector="product.id" :data-usf-pid="product.id">
  <div class="product-wrap">
      <div class="product-image__wrapper" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave">
          <div class="image__container product__imageContainer">
              <a :href="productUrl"  >
                        `+ _usfProductThumbnailSticker + `
                        <img-element :image="selectedImage" :isRaw="1" :scaledImageUrl="scaledSelectedImageUrl" :args="this"></img-element>
                        <template v-if="hoverImage && _usfGlobalSettings.show_secondary_image">
                            <img-element :additionalClasses="['lazypreload','swap--visible','secondary']" :image="hoverImage" :isRaw="1" :scaledImageUrl="scaledHoverImageUrl" :args="this"></img-element>
                        </template>
                        <template v-if="!_usfGlobalSettings.thumbnail_hover_enabled">
                            <!-- product image extra -->
                            <usf-plugin v-if="!_usfGlobalSettings.enable_quickshop" name="searchResultsProductImageExtra" :data="pluginData"></usf-plugin>
                            <!-- Labels -->
                            <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
                            <!-- Wishlist -->
                            <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
                        </template>
              </a>
          </div>
          <!--thumbnail-->
          <div class="thumbnail-overlay__container" v-if="_usfGlobalSettings.thumbnail_hover_enabled || _usfGlobalSettings.enable_quickshop">
            <a class="hidden-product-link" :href="productUrl" v-html="product.title"></a>
             
            <div class="quick-shop__info animated fadeInDown" v-if="_usfGlobalSettings.thumbnail_hover_enabled">
                  <div class="thumbnail-overlay">
                      <div class="info text-align-center">
                        <!-- vendor -->
                        <span class="product-thumbnail__vendor" v-if="usf.settings.search.showVendor && _usfGlobalSettings.display_vendor" v-html="product.vendor"></span>
                        <p class="product-thumbnail__title" v-html="product.title"></p>
                         <!-- Labels -->
                         <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin> 
                        <!-- price -->
                        <usf-plugin name="searchResultsProductPrice" :data="pluginData"></usf-plugin>
                        `+ _usfProductPriceTemplate +`
                      </div>
                  </div>
              </div>
              <!-- quick-shop__buttons -->
              <div v-if="_usfGlobalSettings.enable_quickshop" class="quick-shop__buttons animated fadeInUp">
                    <span class="quick_shop button action_button js-quick-shop-link" :class="[_usfGlobalSettings.quickshop_button_style]" :data-id="product.id" :data-url="'/products/' + product.urlName" v-html="_usfQuickShopText"></span>
                </div>
              <!-- Product review -->
              <usf-plugin name="searchResultsProductReview" :data="pluginData" v-if="_usfGlobalSettings.thumbnail_hover_enabled"></usf-plugin>
            </div>
            <!--end thumbai-->
      </div>
      <!-- thumbnail__caption -->
      <div class="thumbnail__caption " :class="['text-align-' + _usfGlobalSettings.thumbnail_text_alignment]">
            <div class="product-thumbnail">
                <span v-if="usf.settings.search.showVendor && _usfGlobalSettings.display_vendor" class="product-thumbnail__vendor" v-html="product.vendor"></span>
                <span v-if="_usfGlobalSettings.thumbnail_hover_enabled" class="product-thumbnail__title" v-html="product.title"></span>
                <a v-else :href="productUrl" class="product-thumbnail__title" v-html="product.title"></a>
                <!-- Labels -->
                <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin> 
                <!-- price -->
                <usf-plugin name="searchResultsProductPrice" :data="pluginData"></usf-plugin>
                `+ _usfProductPriceTemplate +`
                <i style="color:#999;" v-if="product.options.length>0">More options available</i>
            </div>
      </div>
  </div>
  <usf-swatches v-if="_usfGlobalSettings.collection_swatches" :product="product"></usf-swatches>
<!-- Swatchs-->
<usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
  <!-- Product review -->
  <div class="product-thumbnail__review-stars is-flex " :class="['is-justify-' + _usfGlobalSettings.thumbnail_text_alignment]" v-if="!_usfGlobalSettings.thumbnail_hover_enabled"> 
    <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
  </div>
</div>
`,

    // Search result pages
    searchResultsPages: `
<center>
<div class="paginate"> <nav class="pagination " role="navigation" aria-label="pagination"> <ul class="pagination-list">
    <template v-for="e in elements">
        <li v-if="e.type === 'prev'"><a href="javascript:void(0)" :title="loc.prevPage" @click="onPrev" class="pagination-previous">←</a></li>

        <li v-else-if="e.type === 'dots'"><span class="pagination-link">…</span></li>
        <li v-else-if="e.type === 'page' && e.current"><a class="pagination-link is-current">{{e.page}}</a></li>
        <li v-else-if="e.type === 'page' && !e.current"> <a href="javascript:void(0)" @click="ev=>onPage(e.page,ev)" :title="usf.utils.format(loc.gotoPage,e.page)" class="pagination-link">{{e.page}}</a></li>

        <li v-if="e.type === 'next'"><a href="javascript:void(0)" :title="loc.nextPage" @click="onNext" class="pagination-next">→</a></li>
    </template>
</div>
</center>
`,

    searchResultsListViewItem: /*inc_begin_search-list-item*/
`<a class="usf-sr-product" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :href="productUrl" :data-usf-pid="product.id">
    <!-- Image column -->
    <div class="usf-img-column">
        <!-- product image -->
        <div class="usf-img-wrapper usf-sr-product__image-container" :class="{'usf-has-second-img': hoverImage}">
            <div class="usf-main-img lazyload" :data-bgset="_usfGetScaledImageUrl(scaledSelectedImageUrl)" :style="{'background-image': 'url(' + getSelectedImageUrl('600') + ')'}"></div>
            <span class="usf-img-loader"></span>
            <template v-if="hoverImage">
                <div class="usf-second-img lazyload" :data-bgset="_usfGetScaledImageUrl(scaledHoverImageUrl)" :style="{'background-image': 'url(' + getHoverImageUrl('600') + ')'}"></div>
                <span class="usf-img-loader"></span>
            </template>
            <!-- product image extra -->
            <usf-plugin name="searchResultsProductPreview" :data="pluginData"></usf-plugin>
            <usf-plugin name="searchResultsProductCart" :data="pluginData"></usf-plugin>
            
            <div v-if="isSoldOut && usf.settings.search.showSoldOut" class="usf-badge"><span v-html="loc.soldOut"></span></div>
            <div v-else-if="hasDiscount && usf.settings.search.showSale" class="usf-badge usf-sale-badge"><span v-html="loc.sale"></span></div>
        </div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title" v-html="product.title"></div>
        <div class="usf-vendor" v-if="usf.settings.search.showVendor" v-html="product.vendor"></div>

        <!-- price -->
        <usf-plugin name="searchResultsProductPrice" :data="pluginData"></usf-plugin>
        <div class="usf-price-wrapper" :class="{'usf-price--sold-out': isSoldOut}" v-if="!usf.plugins.lastRenderResult" :data-variant-id="product.selectedVariantId">
            <span class="usf-price" :class="{'usf-has-discount': hasDiscount}" v-html="displayPrice"></span>
            <span class="usf-discount" v-if="hasDiscount" v-html="displayDiscountedPrice"></span>
            <span v-if="hasDiscount" class="usf-price-savings" v-html="loc.save + ' ' + salePercent + '%'"></span>
        </div>
        <div class="usf-description"></div>
    </div>
</a>`
/*inc_end_search-list-item*/,
    // AddToCart Plugin	
    addToCartPlugin: `<form v-if="!_usfGlobalSettings.thumbnail_hover_enabled"  class="usf-add-to-cart" :data-form-variant-id="variant.id" method="POST" enctype="multipart/form-data" :action="usf.platform.addToCartUrl">
    <input type="hidden" name="form_type" value="product">
    <input type="hidden" name="utf8" value="✓">
    <input type="hidden" name="quantity" value="1">
    <input type="hidden" name="id" :value="variant.id">
    <button type="button" name="add" class="button usf-add-to-cart-btn ajax-submit action_button button--add-to-cart " :data-label="loc.addToCart" data-add-to-cart-trigger="" :class="{'usf-visible': args.isHover}" :style="{borderColor:settings.buttonBorderColor,color:settings.buttonTextColor,backgroundColor:settings.buttonBackgroundColor}"> 
        <span class="text" v-html="loc.addToCart"></span> 
        <svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" class="checkmark"> <path fill="none" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"></path></svg>
    </button>
</form>`,
 // Preview Plugin
 previewPlugin: /*inc_begin_preview-plugin*/
`<div class="usf-sr-preview" :class="['usf-sr-' + settings.iconPosition]" @click.prevent.stop="onShowModal">
    <span class="usf-icon usf-icon-eye"></span>
</div>`
/*inc_end_preview-plugin*/
,
    previewPluginModal: 
        `<div><div class="usf-backdrop"></div><div class="usf-preview__wrapper usf-zone">
    <div class="usf-preview">
        <!-- Close button -->
        <div class="usf-remove" @click="onClose"></div>

        <!-- Body content -->
        <div class="usf-preview__body has-thumbnail-sticker">
            <!-- left - images of product -->
            <div class="usf-preview__content-left">
                <!-- Big image -->
                <div class="usf-preview__image-slider">
                    <div type="button" title="Prev" class="usf-preview__image-slider__prev" @click="onPrevImage(0)" v-if="showBigImageNav">
                        <svg aria-hidden="true" viewBox="0 0 512 512" class=""><path fill="currentColor" d="M358 512c4 0 7-1 9-4 5-5 5-13 0-18L146 269 367 47c5-5 5-13 0-18s-13-5-18 0L119 260c-5 5-5 13 0 18l230 230c3 3 6 4 9 4z"></path></svg>
                    </div>

                    <div class="usf-preview__image-slider__track" :style="'max-width:' + ((image.height/image.width*imageMaxWidth > imageMaxHeight) ? (imageMaxHeight*image.width/image.height) + 'px' : '100%') + ';padding-bottom:' + ((image.height/image.width*imageMaxWidth > imageMaxHeight) ? (imageMaxHeight*100/imageMaxWidth) : (image.height/image.width*100)) + '%'">
                        <div v-for="i in images" class="usf-preview__image" :class="{'usf-active': image === i}">
                            <div class="usf-preview__image-img-wrapper">
                                <img :src="usf.platform.getImageUrl(i.url, 1024)">
                            </div>
                        </div>
                    </div>

                    <div type="button" title="Next" class="usf-preview__image-slider__next" @click="onNextImage(0)" v-if="showBigImageNav">
                        <svg aria-hidden="true" viewBox="0 0 512 512" class=""><path fill="currentColor" d="M128 512c-3 0-7-1-9-4-5-5-5-13 0-18l221-221L119 47c-5-5-5-13 0-18s13-5 18 0l230 231c5 5 5 13 0 18L137 508c-2 3-6 4-9 4z"></path></svg>
                    </div>

                    <ul class="usf-preview__image-slider__dots" v-if="showImageIndices && false">
                        <li :class="{'active':i===image}" v-for="(i,index) in images"  @click="onThumbClick(i)"><button type="button">{{index+1}}</button></li>
                    </ul>
                </div>
                `+ _usfProductThumbnailSticker +`
                <!-- Thumbnails -->
                <div class="usf-preview__thumbs usf-clear" v-if="showThumbs">
                    <div v-if="showThumbNav" class="usf-preview__thumbs-prev" @click="onPrevImage">
                        <svg aria-hidden="true" viewBox="0 0 512 512" class=""><path fill="currentColor" d="M358 512c4 0 7-1 9-4 5-5 5-13 0-18L146 269 367 47c5-5 5-13 0-18s-13-5-18 0L119 260c-5 5-5 13 0 18l230 230c3 3 6 4 9 4z"></path></svg>
                    </div>

                    <div class="usf-preview__thumbs-inner">
                        <div v-for="i in images" class="usf-preview__thumb" :class="{'usf-active': image === i}">
                            <img :src="usf.platform.getImageUrl(i.url, 'small')" @click="onThumbClick(i)">
                        </div>
                    </div>

                    <div v-if="showThumbNav" class="usf-preview__thumbs-next" @click="onNextImage">
                        <svg aria-hidden="true" viewBox="0 0 512 512" class=""><path fill="currentColor" d="M128 512c-3 0-7-1-9-4-5-5-5-13 0-18l221-221L119 47c-5-5-5-13 0-18s13-5 18 0l230 231c5 5 5 13 0 18L137 508c-2 3-6 4-9 4z"></path></svg>                        
                    </div>
                </div>
            </div>

            <!-- right - info of the product -->
            <div class="usf-preview__content-right">
                <!-- Product title -->
                <h1 class="usf-preview__title" v-html="product.title"></h1>

                <!-- Vendor -->
                <div class="usf-preview__vendor" v-html="product.vendor" v-if="usf.settings.search.showVendor"></div>

                <!--Prices -->
                <div class="usf-preview__price-wrapper price" :class="{'price--sold-out': isSoldOut}">
                    <span v-if="_col_handles.coming_soon" v-html="_usfComingSoon"></span>
                    <span v-else class="product-thumbnail__price price" :class="{'sale':hasDiscount}">
                        <span v-if="selectedVariant.price > 0" class="money" v-html="usf.utils.getDisplayPrice(selectedVariant.compareAtPrice || selectedVariant.price)"></span>
                        <span v-else v-html="_usfGlobalSettings.free_price_text"></span>
                        <span v-if="hasDiscount" class="product-thumbnail__was-price compare-at-price">
                                <span class="money" v-html="usf.utils.getDisplayPrice(selectedVariant.price)"></span>
                       </span>
                    </span>
                </div>

                <!-- Description -->
                <div class="usf-preview__description" :class="{'usf-loader':description===undefined}" v-html="description"></div>

                <!-- Add to cart form -->
                <form method="post" enctype="multipart/form-data" :action="usf.platform.addToCartUrl">
                    <!-- variant ID -->
                    <input type="hidden" name="id" :value="selectedVariant.id" />

                    <!-- Options -->
                    <template v-for="(o,index) in product.options">
                        <usf-preview-modal-option :option="o" :index="index"></usf-preview-modal-option>
                    </template>

                    <!-- add to card button -->
                    <div class="usf-preview__field">
                        <label v-html="loc.quantity"></label>
                        <div class="usf-flex usf-preview__add-to-cart">
                            <input pattern="[0-9]*" min="1" :value="quantity" name="quantity" type="number" />
                            <button :title="!hasAvailableVariant ? loc.selectedVariantNotAvailable : ''" type="button" name="add" :style="{color:settings.buttonTextColor,backgroundColor:settings.buttonBackgroundColor}" class="button usf-preview--add-to-cart-btn ajax-submit action_button button--add-to-cart " :data-label="loc.addToCart" data-add-to-cart-trigger="" :class="{ 'usf-disabled': !hasAvailableVariant}"> 
                                <span class="text" v-html=" isSoldOut ? loc.soldOut : loc.addToCart"></span> 
                                <svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" class="checkmark"> <path fill="none" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"></path></svg>
                            </button>
                        </div>
                    </div>
                </form>

                <!-- See details link -->
                <div class="usf-preview__link-wrapper">
                    <a class="usf-preview__link" :href="productUrl" v-html="loc.seeFullDetails"></a>
                </div>
            </div>
        </div>
    </div>
</div></div>`,
    searchResultsBanner: /*inc_begin_search-banner*/        
`<div class="usf-sr-banner">
    <a :href="banner.url || 'javascript:void(0)'" :alt="banner.description">
        <img :src="banner.mediaUrl" style="max-width:100%">
    </a>
</div>
`
/*inc_end_search-banner*/,

    ////////////////////////
    // Filter templates
    // facet filters breadcrumb
    filtersBreadcrumb: /*inc_begin_filters-breadcrumb*/
`<div v-if="usf.settings.filterNavigation.showFilterArea && root.facetFilters && root.facets && facetFilterIds.length" class="usf-refineby">
    <!-- Breadcrumb Header -->
    <div class="usf-title usf-clear">
        <span class="usf-pull-left usf-icon usf-icon-equalizer"></span>
        <span class="usf-label" v-html="loc.filters"></span>

        <!-- Clear all -->
        <button class="usf-clear-all usf-btn" v-html="loc.clearAll" @click.prevent.stop="root.removeAllFacetFilters" :aria-label="loc.clearAllFilters"></button>
    </div>

    <!-- Breadcrumb Values -->
    <div class="usf-refineby__body">
        <template v-for="facetId in facetFilterIds" v-if="(facet = root.facets.find(fc => fc.id === facetId)) && (f = root.facetFilters[facetId])">
            <template v-for="queryValStr in f[1]">
                <div class="usf-refineby__item usf-pointer usf-clear" @click.prevent.stop="root.removeFacetFilter(facetId, queryValStr)">
                    <button class="usf-btn"><span class="usf-filter-label" v-html="facet.title + ': '"></span><b v-html="root.formatBreadcrumbLabel(facet, f[0], usf.utils.encodeHtml(queryValStr))"></b></button><span class="usf-remove"></span>
                </div>
            </template>
        </template>
    </div>
 </div>`
 /*inc_end_filters-breadcrumb*/,

    // facet filters    
    filters: /*inc_begin_filters*/
// Vert & Horz modes have different render order
`<div class="usf-facets usf-no-select usf-zone" :class="{'usf-facets--mobile':usf.isMobileFilter}">
<!-- Mobile view -->
<template v-if="usf.isMobile">
    <div class="usf-close" @click="onMobileBack(1)"></div>
    <div class="usf-facets-wrapper">
        <!-- Header. shows 'Filters', facet name, etc. -->
        <div class="usf-header">
            <!-- Single facet mode -->
            <template v-if="isSingleFacetMode">
                <div class="usf-title" @click="onMobileBack(0)" v-html="facets[0].title"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clear"></div>
            </template>

            <!-- When a filter is selected -->
            <template v-else-if="mobileSelectedFacet">
                <div class="usf-title usf-back" @click="onMobileBack(0)" v-html="mobileSelectedFacet.title"></div>
                <div v-if="facetFilters && facetFilters[mobileSelectedFacet.id]" class="usf-clear" @click="removeFacetFilter(mobileSelectedFacet.id)" v-html="loc.clear"></div>
                <div v-else-if="mobileSelectedFacet.multiple" class="usf-all" @click="selectFacetFilter(mobileSelectedFacet)" v-html="loc.all"></div>
            </template>

            <!-- When no filter is selected -->
            <template v-else>
                <div class="usf-title" @click="onMobileBack(0)" v-html="loc.filters"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clearAll"></div>
            </template>
        </div>

        <div class="usf-body">
            <!-- Desktop-like filter in mobile -->
            <template v-if="usf.settings.filters.desktopLikeMobile">
                <usf-filter-breadcrumb></usf-filter-breadcrumb>
                
                <!-- Facets body -->
                <div class="usf-facets__body">
                    <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
                </div>
            </template>
            
            <!-- Mobile filter -->
            <template v-else>
                <!-- List all filter options, in single facet mode -->
                <usf-filter v-if="isSingleFacetMode" :facet="facets[0]"></usf-filter>

                <!-- List all filter options, when a filter is selected -->
                <usf-filter v-else-if="mobileSelectedFacet" :facet="mobileSelectedFacet"></usf-filter>

                <!-- List all when there are more than one facet -->
                <template v-else v-for="f in facets">
                    <template v-if="canShowFilter(f)">
                        <div :key="f.id" class="usf-facet-value" @click="onMobileSelectFacet(f)">
                            <span class="usf-title" v-html="f.title"></span>
                            <div v-if="(selectedFilterOptionValues = facetFilters && (ff = facetFilters[f.id]) ? ff[1] : null)" class="usf-dimmed">
                                <span v-for="cf in selectedFilterOptionValues" v-html="formatBreadcrumbLabel(f, f.facetName, cf)"></span>
                            </div>
                        </div>
                    </template>
                </template>
            </template>
        </div>

        <!-- View items -->
        <div class="usf-footer">
            <div @click="onMobileBack(1)" v-html="loc.viewItems"></div>
        </div>
    </div>
</template>

<!-- Desktop view -->
<template v-else>
    <usf-filter-breadcrumb></usf-filter-breadcrumb>
    <!-- Filters Loader -->
    <div v-if="!facets" class="usf-facets__first-loader">
        <template v-for="i in 3">
            <div class="usf-facet"><div class="usf-title usf-no-select"><span class="usf-label"></span></div>
                <div v-if="!usf.settings.filters.horz" class="usf-container"><div class="usf-facet-values usf-facet-values--List"><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div></div></div>
            </div>
        </template>
    </div>
    <!-- Facets body -->
    <div v-else class="usf-facets__body">
        <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
    </div>
</template>
</div>`
/*inc_end_filters*/,

    // facet filter item
    filter: /*inc_begin_filter*/
`<div v-if="canShow" class="usf-facet" :class="{'usf-collapsed': collapsed && !usf.isMobileFilter, 'usf-has-filter': isInBreadcrumb}">
    <!-- Mobile filter -->
    <div v-if="usf.isMobileFilter" class="usf-container">
        <!-- Search box -->
        <input v-if="hasSearchBox" class="usf-search-box" :aria-label="loc.filterOptions" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

        <!-- Values -->
        ` + _usfFilterBodyTemplate +
    `</div>

    <!-- Desktop filter -->
    <template v-else>
        <!-- Filter title -->
        <div class="usf-clear">
            <div class="usf-title usf-no-select" @click.prevent.stop="onExpandCollapse">
                <button class="usf-label usf-btn" v-html="facet.title" :aria-label="usf.utils.format(loc.filterBy,facet.title)" :aria-expanded="!collapsed"></button>
                <usf-helptip v-if="facet.tooltip" :tooltip="facet.tooltip"></usf-helptip>            
                <!-- 'Clear all' button to clear the current facet filter. -->
                <button v-if="isInBreadcrumb" class="usf-clear-all usf-btn" :title="loc.clearFilterOptions" :aria-label="usf.utils.format(loc.clearFiltersBy,facet.title)" @click.prevent.stop="onClear" v-html="loc.clear"></button>
                <span class="usf-pm"></span>
            </div>
        </div>

        <!-- Filter body -->
        <div class="usf-container">
            <!-- Search box -->
            <input v-if="hasSearchBox" class="usf-search-box" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

            ` + _usfFilterBodyTemplate +
        `
        </div>
    </template>
</div>`
/*inc_end_filter*/,

    // facet filter option
    filterOption: /*inc_begin_filter-option*/
`<div v-if="children" :class="(isSelected ? 'usf-selected ' : '') + ' usf-relative usf-facet-value usf-facet-value-single usf-with-children' + (collapsed ? ' usf-collapsed' : '')">
    <!-- option label -->
    <button class="usf-pm usf-btn" aria-label="Toggle children" v-if="children" @click.prevent.stop="onToggleChildren"></button>
    <button class="usf-label usf-btn" v-html="label" @click.prevent.stop="onToggle"></button>

    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>    

    <div class="usf-children-container" v-if="children && !collapsed">
        <button :class="'usf-child-item usf-btn usf-facet-value' + (isChildSelected(c) ? ' usf-selected' : '')" v-for="c in children" v-html="getChildLabel(c)" @click="onChildClick(c)"></button>
    </div>
</div>
<button v-else :class="(isSelected ? 'usf-selected ' : '') + (swatchImage ? ' usf-facet-value--with-background' : '') + ' usf-btn usf-relative usf-facet-value usf-facet-value-' + (facet.multiple ? 'multiple' : 'single')" :title="isSwatch || isBox ? label + ' (' + option.value + ')' : undefined" :style="usf.isMobileFilter ? null : swatchStyle" @click.prevent.stop="onToggle">
    <!-- checkbox -->
    <div v-if="!isBox && !isSwatch && facet.multiple" :class="'usf-checkbox' + (isSelected ? ' usf-checked' : '')">
        <span class="usf-checkbox-inner"></span>
    </div>

    <!-- swatch image in mobile -->
    <div v-if="swatchImage && usf.isMobileFilter" class="usf-mobile-swatch" :style="swatchStyle"></div>

    <!-- option label -->
    <span class="usf-label usf-btn" v-html="label"></span>
    
    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>
</button>`
/*inc_end_filter-option*/,



    // Instant search popup
    instantSearch: /*inc_begin_instantsearch*/
`<div :class="'usf-popup usf-zone usf-is usf-is--compact usf-is--' + position + (shouldShow ? '' : ' usf-hide') + (isEmpty ? ' usf-empty' : '') + (hasProductsOnly ? ' usf-is--products-only' : '') + (firstLoader ? ' usf-is--first-loader': '')"  :style="usf.isMobile ? null : {left: this.left + 'px',top: this.top + 'px',width: this.width + 'px'}">
    <!-- Mobile search box -->
    <div v-if="usf.isMobile">
        <form class="usf-is-inputbox" :action="searchUrl" method="get" role="search">
            <span class="usf-icon usf-icon-back usf-close" @click="usf.utils.hideInstantSearch"></span>
            <input name="q" autocomplete="off" ref="searchInput" :value="term" @input="onSearchBoxInput">
            <span class="usf-remove" v-if="term" @click="onClear"></span>
        </form>
    </div>

    <!-- First loader -->
    <div class="usf-is-first-loader" v-if="firstLoader">
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
    </div>

    <!-- All JS files loaded -->
    <template v-else>
        <!-- Empty view -->
        <div v-if="isEmpty" class="usf-is-no-results">
            <div style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-items.png?t=2') center no-repeat;min-height:160px"></div>
            <div v-html="usf.utils.format(loc.noMatchesFoundFor, usf.utils.encodeHtml(term))"></div>
        </div>
        <template v-else>
            <!-- Body content -->
            <div class="usf-is-content">
                <!-- Products -->
                <div class="usf-is-matches usf-is-products" style=" width: 100%; ">
                    <div class="usf-title" v-html="queryOrTerm ? loc.productMatches : loc.trending"></div>
                    
                    <div class="usf-is-list" v-if="result.items.length">
                        <!-- Did you mean -->
                        <span class="usf-is-did-you-mean" v-html="usf.utils.format(loc.didYouMean, usf.utils.encodeHtml(term), result.query)" v-if="termDiffers"></span>

                        <!-- Product -->
                        <usf-is-item v-for="p in result.items" :product="p" :result="result" :key="p.id + '-' + p.selectedVariantId"></usf-is-item>
                    </div>
                    <div class="usf-is-list" v-else style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-products.png?t=2') center no-repeat;min-height:250px"></div>
                </div>

                <!--<div class="usf-is-side"> 
                    <div class="usf-is-matches usf-is-suggestions" v-if="result.suggestions && result.suggestions.length">
                        <div class="usf-title" v-html="loc.searchSuggestions"></div>
                        <button v-for="s in result.suggestions" class="usf-is-match usf-btn" v-html="usf.utils.highlight(s, result.query)" @click="search(s)"></button>
                    </div>
 
                    <div class="usf-is-matches usf-is-collections" v-if="result.collections && result.collections.length">
                        <div class="usf-title" v-html="loc.collections"></div>
                        <button v-for="c in result.collections" class="usf-is-match usf-btn" v-html="usf.utils.highlight(c.title, result.query)" @click="selectCollection(c)"></button>
                    </div>
 
                    <div class="usf-is-matches usf-is-pages" v-if="result.pages && result.pages.length">
                        <div class="usf-title" v-html="loc.pages"></div>
                        <button v-for="p in result.pages" class="usf-is-match usf-btn" v-html="usf.utils.highlight(p.title, result.query)" @click="selectPage(p)"></button>
                    </div>
                </div>-->
            </div>

            <!-- Footer -->
            <div class="usf-is-viewall">
                <button class="usf-btn" @click="search(queryOrTerm)" v-html="usf.utils.format(queryOrTerm ? loc.viewAllResultsFor : loc.viewAllResults, usf.utils.encodeHtml(queryOrTerm))"></button>
            </div>
        </template>
    </template>
</div>`
/*inc_end_instantsearch*/
    ,

    // Instant search item
    instantSearchItem:/*inc_begin_instantsearch-item*/
`<div class="usf-is-product usf-clear" @click="onItemClick">
    <!-- Image -->
    <div class="usf-img-wrapper usf-pull-left">
        <img class="usf-img" :src="selectedImageUrl" :alt="selectedImage.alt">
    </div>
    
    <div class="usf-pull-left">
        <!-- Title -->
        <button class="usf-title usf-btn" v-html="usf.utils.highlight(product.title, result.query)"></button>

        <!-- Vendor -->
        <div class="usf-vendor" v-html="product.vendor" v-if="usf.settings.search.showVendor"></div>

        <!-- Prices -->
        <div class="usf-price-wrapper">
            <span class="usf-price" :class="{ 'usf-has-discount': hasDiscount }" v-html="displayPrice"></span>
            <span v-if="hasDiscount" class="usf-discount" v-html="displayDiscountedPrice"></span>
        </div>
    </div>
</div>`
/*inc_end_instantsearch-item*/,
};


var _usfCollectionHandles = function (p, hasDiscount, isSoldOut) {
    if (!_usfGlobalSettings.stickers_enabled)
        return false;
    var e = {};
    ////console.log(p.collections)
    p.collections.filter(c => {
        var colHandle = _usfCollectionById[c];
        if(colHandle){
            if (colHandle == 'new')
                e.new = 1;
            if (colHandle == 'coming-soon')
                e.coming_soon = 1;
            if (colHandle == 'pre-order')
                e.pre_order = 1;
            if (colHandle == 'best-seller')
                e.best_seller = 1;
            if (colHandle == 'staff-pick')
                e.staff_pick = 1;
            
        }

        if (!isSoldOut && hasDiscount && usf.settings.search.showSale)
                e.show_sale = 1;
        
        if (isSoldOut && usf.settings.search.showSoldOut)
            e.show_soldOut = 1;
    });
    return (e.new || e.coming_soon || e.pre_order || e.best_seller || e.staff_pick || e.show_sale || e.show_soldOut) ? e : false;
}

var usfImages = {}
function usfImageExists(url, callback) {
    var v = usfImages[url];
    if (v !== undefined) {
        callback(v);
        return v;
    }

    var img = new Image();
    img.onload = function () {
        usfImages[url] = true;
        callback(true);
    };

    img.onerror = function () {
        usfImages[url] = false;
        callback(false);
    };

    img.src = url;
}

//// swatchs color
var widthFiltervalues ={
    '13in-18in-w':'13" - 18"',
    '19in-24in-w':'19" - 24"',
    '25in-30in-w':'25" - 30"',
    '31in-36in-w':'31" - 36"',
    '37in-48in-w':'37" - 48"',
    '49in-58in-w':'49" - 58"',
    '59in-72in-w':'59" - 72"',
    '72in-and-more-w':'72" and up"',
}
usf.event.add('sr_dataReceived', function(t, data){
    if(data.facets.find(e=>e.title=='Width Range')){
        var widthFilter=data.facets.find(e=>e.title=='Width Range').labels
        widthFilter.forEach(function(e){
            if(widthFiltervalues[e.label])
                e.llabel=widthFiltervalues[e.label]
        })
        console.log(widthFilter)
    }
});
usf.event.add('init', function () {
    var nodes = document.head.children;
    for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n.href && (n.href.indexOf('styles.css') !== -1 || n.href.indexOf('theme.css') !== -1)) {
            _usfFilesUrl = n.href;
            var m = _usfFilesUrl.indexOf('/assets/');
            while (_usfFilesUrl[--m] !== '/');
            while (_usfFilesUrl[--m] !== '/');
            _usfFilesUrl = _usfFilesUrl.substring(0, m) + "/files/";
            break;
        }
    }
    window._usfGlobalSettings = window._usfGlobalSettings || {
        collection_swatches: true,
        collection_swatches_shape: "circle",
        display_vendor: true,
        enable_quickshop: true,
        free_price_text: "Free",
        image_loading_style: "appear",
        quickshop_button_style: "button--secondary",
        show_secondary_image: true,
        sticker_position: "left",
        sticker_shape: "square",
        stickers_enabled: true,
        thumbnail_border_enabled: null,
        thumbnail_hover_enabled: true,
        thumbnail_text_alignment: "left"
    };
    window._usfSectionSettings = window._usfSectionSettings || {
        align_height: false,
        collection_height: 200,
        image_crop: null
    };
    window._usfBestSeller = window._usfBestSeller || "Best Seller";
    window._usfComingSoon = window._usfComingSoon || "Coming Soon";
    window._usfNew = window._usfNew || "New";
    window._usfPreOrder = window._usfPreOrder || "Pre-Order";
    window._usfStaffPick = window._usfStaffPick || "Staff Pick";
    window._usfFrom = window._usfFrom || "from";
    window._usf_grid_class = window._usf_grid_class || "one-third medium-down--one-half small-down--one-whole column quick-shop--true quick-shop--closed js-product_section has-thumbnail-sticker thumbnail  product__thumbnail  product__grid-item  thumbnail__hover-overlay--true  has-padding-bottom";
    _usfImageWidths = _usfIsDynamicImage ? [200, 400, 600, 700, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2500, 3000, 3500, 4000, 5000] : [usf.settings.search.imageSize];
    window._usfQuickShopText = window._usfQuickShopText || 'Quick View';
    window._usfSoldOutText = window._usfSoldOutText || usf.settings.translation.soldOut
    window._usfCollectionById = window._usfCollectionById || {};
    //prevent url changing
    if(Shopify.OptionSelectors && Shopify.OptionSelectors.HistoryState && Shopify.OptionSelectors.HistoryState.prototype && Shopify.OptionSelectors.HistoryState.prototype.onVariantChange)
        Shopify.OptionSelectors.HistoryState.prototype.onVariantChange = function(t, e, o) {
            this.browserSupports() && (!t || o.initialLoad || o.popStateCall )
        };
    

    var imgElement = {
        props: {
            image: {
                type: Object,
                required: true
            },
            additionalClasses: {
                type: String,
                default: ''
            },

            scaledImageUrl: {
                type: String
            },
            args: {
                type: Object
            }
        },
        computed: {
            _ratio() {
                return _usfGetImageRatio(this.image)
            },
            _style() {
                var max_height = _usfSectionSettings.collection_height;
                var image_background_color = "";
                if (_usfGlobalSettings.image_loading_style == 'color')
                    image_background_color = `background: url(${_usfGetScaledImageUrl(this.scaledImageUrl, '1')});`;
                var height_style = "";
                var width_style = "";
                if (_usfSectionSettings.image_crop)
                    height_style = `max-height: ${max_height}px;`;
                else if (_usfSectionSettings.align_height)
                    height_style = `max-height: ${max_height}px; width: calc(${this.image.width / this.image.height * max_height}px);`;

                if (!_usfSectionSettings.align_height)
                    width_style = `max-width: ${this.image.width}px;`;

                return `${image_background_color} ${height_style} ${width_style}`;
            },
            _dataSrc() {
                return _usfGetScaledImageUrl(this.scaledImageUrl, '1600')
            },
            _dataSrcSet() {
                return _usfGetImageUrls(this.scaledImageUrl)
            },
            _src() {
                return _usfGlobalSettings.image_loading_style === 'blur-up' ? _usfGetScaledImageUrl(this.scaledImageUrl, '600') : false
            }
        },
        render(h) {
            return h('div', {
                staticClass: 'image-element__wrap',
                style: this._style
            }, [
                h('img', {
                    attrs: {
                        alt: this.args.product.title,
                        src: this._src,
                        'data-src': this._dataSrc,
                        'data-sizes': "auto",
                        'data-aspectratio': this._ratio,
                        'data-srcset': this._dataSrcSet,
                        height: this.image.height,
                        width: this.image.width
                    },
                    staticClass: `lazyload Image--fadeIn transition--${_usfGlobalSettings.image_loading_style}`,
                    class: this.additionalClasses ? this.additionalClasses : ""
                }),
                    h('div', { class:'usf-img-loader'})
                ])
        }
    }
    usf.register(imgElement, null, 'img-element');

     /**
      * color swatch component
      * */
      var UsfSwatches = {
        props: {
            product: Object,
        },
        data() {
            var product = this.product;
            var option;
            var option_index = 0;
            var optionWithValues = [];
            var optionRendereds = {};
            var selectedOptionValue = '';
            for (let i = 0; i < product.options.length; i++) {
                var o = product.options[i];
                var downcased_option = o.name.toLowerCase();
                if (downcased_option == 'color' || downcased_option == 'colour') {
                    option_index = i;
                    option = o;
                    break;
                }
            }
            if (option) {
                selectedOptionValue = this.$parent.selectedVariantForPrice.options[option_index] != undefined ? option.values[this.$parent.selectedVariantForPrice.options[option_index]] : '';
                option.values.filter(o => {
                    for (let x = 0; x < product.variants.length; x++) {
                        var v = product.variants[x];
                        if (v.options[option_index] != undefined) {
                            var vrOpt = option.values[v.options[option_index]];
                            if (o === vrOpt && !optionRendereds[o]) {
                                optionRendereds[o] = 1;
                                optionWithValues.push({
                                    value: o,
                                    image: product.images[v.imageIndex],
                                    variant: v
                                })
                            }
                        }
                    }
                })
            }
            return {
                product: product,
                option: option,
                selectedOptionValue: selectedOptionValue,
                optionWithValues: optionWithValues,
                downcasedOption: downcased_option,
                currentBgImages: {},
            }
        },
        methods: {
            _variantUrl(v) {
                return _usfAddQuery(this.$parent.productUrl, `variant=${v.id}`)
            },
         
        },
        render(h) {
            if (this.optionWithValues.length) return h('div', {
                class: 'thumbnail-swatch is-flex-wrap is-justify-' + _usfGlobalSettings.thumbnail_text_alignment
            }, [
                this.optionWithValues.map((o, index) => {
                    var optHandled = _usfHandlezie(o.value);
                    var temp = o.value.split(' ').pop();
                    var opt_handle_last = _usfHandlezie(temp);
                    var imgUrl = usf.platform.emptyImage.url;
                    if (o.image) {
                        imgUrl = _usfGetOriginImgWithSize(o.image.url, usf.settings.search.imageSize + 'x')
                    }
                    var imgFiles = _usfFilesUrl + optHandled + '_50x.png';
                    usfImageExists(imgFiles, (v) => {
                        if (v)
                            this.$set(this.currentBgImages, o.value, imgFiles);
                    });
                    return h('a', {
                        class: 'swatch swatch__style--' + _usfGlobalSettings.collection_swatches_shape,
                        attrs: {
                            href: this._variantUrl(o.variant),
                            'data-swatch-name': 'meta-' + this.downcasedOption + '_' + o.value.replace(/ /g, '_').toLowerCase()
                        }
                    }, [
                        h('span', {
                            attrs: {
                                'data-image': imgUrl,
                                style: 'background-color:' + opt_handle_last
                            }
                        }, [
                            h('img', {
                                staticClass: 'swatch__image',
                                class:{
                                    'swatch__image--empty': !this.currentBgImages[o.value]
                                },
                                attrs: {
                                    src: _usfFilesUrl + optHandled + '_50x.png',
                                    title: o.value
                                }
                            })
                        ])
                    ])
                }),
            ])

        }
    }
    usf.register(UsfSwatches, null, 'usf-swatches');

    usf.event.add(['sr_updated', 'sr_viewChanged', 'rerender'], function () {
        setTimeout(function () {
            if(window.PXUTheme && window.PXUTheme.thumbnail){
                window.PXUTheme.thumbnail.showQuickShop();
                window.PXUTheme.thumbnail.showVariantImage();
            }
        }, 500);
    });

});

/* Begin theme ready code */
if (usf.settings.instantSearch.online) {
    document.body.classList.add('usf-hide-theme-search');

    if(usf.isMobile){
        // click on search icon -> show our instant search
        var searchIcon = document.querySelector('[data-show-search-trigger]');
        if (searchIcon)
            searchIcon.addEventListener('click',function(){
                var target  = document.createElement('input');
                usf.utils.loadAndShowInstantSearch(target, true);
            });

        // still register to 'is_show' event to hide the drawer.
        usf.event.add('is_show', function () {
            setTimeout(() => {
                var closeSearch = document.querySelector('.search-overlay__close');
                if(closeSearch)
                    closeSearch.click();
                // refocus on our input box
                usf.instantSearch.focus();
            }, 300);
        })
    }
 
}
/* End theme ready code */