{% assign pagespeed_template_suffix_liquid = template.suffix | append: '.liquid' %}
{% assign pagespeed_page_type = template.name | replace: template_suffix_liquid, '' %}
{%- if blank -%}
  <script type="text/javascript">
    var flspdx = new Worker("data:text/javascript;base64," + btoa('onmessage=function(e){var t=new Request("https://www.montreallighting.com/cdn/shop/t/60/assets/worker-min.js?v=69406592365571008391707454014",{redirect:"follow"});fetch(t).then(e=>e.text()).then(e=>{postMessage(e)})};'));flspdx.onmessage = function (t) {var e = document.createElement("script");e.type = "text/javascript", e.textContent = t.data, document.head.appendChild(e)}, flspdx.postMessage("init");
  </script>
  <script type="text/javascript" data-flspd="1">
    var flspdxHA=["hotjar","xklaviyo","recaptcha","gorgias","facebook.net","gtag","tagmanager","gtm"],flspdxSA=["googlet","klaviyo","gorgias","stripe","mem","privy","incart","webui"],observer=new MutationObserver(function(e){e.forEach(function(e){e.addedNodes.forEach(function(e){if("SCRIPT"===e.tagName&&1===e.nodeType)if(e.innerHTML.includes("asyncLoad")||"analytics"===e.className)e.type="text/flspdscript";else{for(var t=0;t<flspdxSA.length;t++)if(e.src.includes(flspdxSA[t]))return void(e.type="text/flspdscript");for(var r=0;r<flspdxHA.length;r++)if(e.innerHTML.includes(flspdxHA[r]))return void(e.type="text/flspdscript")}})})}),ua=navigator.userAgent.toLowerCase();ua.match(new RegExp("chrome|firefox"))&&-1===window.location.href.indexOf("no-optimization")&&observer.observe(document.documentElement,{childList:!0,subtree:!0});
  </script>
{%- endif -%}

{%- if settings.favicon != null -%}
  <link rel="shortcut icon" type="image/x-icon" href="{{ settings.favicon | img_url: '180x180' }}">
  <link rel="apple-touch-icon" href="{{ settings.favicon | img_url: '180x180' }}">
  <link rel="apple-touch-icon" sizes="57x57" href="{{ settings.favicon | img_url: '57x57' }}">
  <link rel="apple-touch-icon" sizes="60x60" href="{{ settings.favicon | img_url: '60x60' }}">
  <link rel="apple-touch-icon" sizes="72x72" href="{{ settings.favicon | img_url: '72x72' }}">
  <link rel="apple-touch-icon" sizes="76x76" href="{{ settings.favicon | img_url: '76x76' }}">
  <link rel="apple-touch-icon" sizes="114x114" href="{{ settings.favicon | img_url: '114x114' }}">
  <link rel="apple-touch-icon" sizes="180x180" href="{{ settings.favicon | img_url: '180x180' }}">
  <link rel="apple-touch-icon" sizes="228x228" href="{{ settings.favicon | img_url: '228x228' }}">
{%- else -%}
  <link rel="shortcut icon" type="image/x-icon" href="{{ 'favicon.png' | asset_url }}">
{%- endif -%}

<div
  style="position:absolute;font-size:1200px;line-height:1;word-wrap:break-word;top:0;left:0;width:96vw;height:96vh;max-width:99vw;max-height:99vh;pointer-events:none;z-index:99999999999;color:transparent;overflow:hidden;"
  data-optimizer="Speed Boost: pagespeed-javascript"
>
  □
</div>
{{ 'worker.js' | asset_url | script_tag }}
