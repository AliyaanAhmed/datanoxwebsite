import { GA_TAG_ID } from "@/content/site";

/**
 * Analytics.
 *
 * Carries over the tag already running on datanox.io. The earlier audit
 * concluded GA4 was not firing, which was wrong: it fires through Site Kit as
 * a Google Tag with a GT prefix, and the audit only grepped for the G prefix.
 *
 * Loaded after first paint rather than in the head, so it never competes with
 * rendering. On a static export there is no server to defer it for us.
 *
 * The named events below are what makes the funnel readable. Today every
 * enquiry lands as free text in one inbox, so nothing downstream of a page
 * view is measurable at all.
 */

const events = `
(function(){
  var send = function(name, params){
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, params || {});
  };

  document.addEventListener('click', function(e){
    var el = e.target.closest ? e.target.closest('a, button') : null;
    if (!el) return;

    var label = (el.innerText || '').trim().slice(0, 60);
    var href = el.getAttribute('href') || '';

    // A white paper download
    if (href.indexOf('/papers/') === 0 || el.hasAttribute('download')) {
      send('paper_download', { paper: href.split('/').pop(), page_path: location.pathname });
      return;
    }

    // Any call to action reaching the contact page
    if (href.indexOf('/contact/') === 0) {
      send('cta_click', { cta_label: label, page_path: location.pathname });
      return;
    }

    // Reaching the comparison page, which is the highest intent read
    if (href.indexOf('/compare/') === 0) {
      send('compare_view_click', { cta_label: label, page_path: location.pathname });
    }
  }, { passive: true });

  // Form engagement, so abandonment is separable from never starting.
  // Delegated on the document rather than bound to the form element, because
  // the router mounts the contact form long after this script runs and a
  // direct binding would silently never fire on a client side navigation.
  var formStarted = false;

  document.addEventListener('input', function(e){
    if (formStarted) return;
    var el = e.target.closest ? e.target.closest('form[method="post"]') : null;
    if (!el) return;
    formStarted = true;
    send('form_start', { page_path: location.pathname });
  }, { passive: true, capture: true });

  document.addEventListener('submit', function(e){
    var form = e.target;
    if (!form || !form.matches || !form.matches('form[method="post"]')) return;
    var get = function(n){ var f = form.elements.namedItem(n); return f ? f.value : ''; };
    send('form_submit_demo', {
      product: get('product'),
      sector: get('sector'),
      role: get('role'),
      page_path: location.pathname
    });
  }, { capture: true });

  // How far a long page is actually read
  var marks = { 50: false, 90: false };
  window.addEventListener('scroll', function(){
    var h = document.documentElement;
    var pct = Math.round(((h.scrollTop + window.innerHeight) / h.scrollHeight) * 100);
    for (var key in marks) {
      if (!marks[key] && pct >= Number(key)) {
        marks[key] = true;
        send('scroll_depth', { percent: Number(key), page_path: location.pathname });
      }
    }
  }, { passive: true });

  // Client side navigation produces no document load, so the tag would
  // otherwise record one page view per visit rather than one per page.
  // The scroll marks and the form flag reset with it, so a second page in
  // the same visit measures the same way the first one does.
  var current = location.pathname;

  var routeChanged = function(){
    setTimeout(function(){
      if (location.pathname === current) return;
      current = location.pathname;
      marks = { 50: false, 90: false };
      formStarted = false;
      send('page_view', {
        page_path: current,
        page_location: location.href,
        page_title: document.title
      });
    }, 220);
  };

  ['pushState', 'replaceState'].forEach(function(method){
    var original = history[method];
    history[method] = function(){
      var result = original.apply(this, arguments);
      routeChanged();
      return result;
    };
  });
  window.addEventListener('popstate', routeChanged);
})();
`.trim();

const loader = `
(function(){
  var load = function(){
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_TAG_ID}';
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', '${GA_TAG_ID}', { send_page_view: true });
  };

  // After first paint, and after the browser is idle, so measurement never
  // costs the visitor anything they would notice.
  if ('requestIdleCallback' in window) {
    requestIdleCallback(load, { timeout: 3000 });
  } else {
    window.addEventListener('load', function(){ setTimeout(load, 800); });
  }
})();
`.trim();

export function Analytics() {
  if (!GA_TAG_ID) return null;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: loader }} />
      <script defer dangerouslySetInnerHTML={{ __html: events }} />
    </>
  );
}
