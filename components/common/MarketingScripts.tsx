import Script from 'next/script';

const normalizeTrackingId = (value?: string) => {
  const id = value?.trim();
  return id && /^[A-Za-z0-9_-]+$/.test(id) ? id : undefined;
};

const GTM_ID = normalizeTrackingId(process.env.NEXT_PUBLIC_GTM_ID);
const META_PIXEL_ID =
  normalizeTrackingId(process.env.NEXT_PUBLIC_META_PIXEL_ID) || '1230588375800602';
const CLARITY_ID =
  normalizeTrackingId(process.env.NEXT_PUBLIC_CLARITY_ID) || 'wms3ofk9zf';
const GA4_ID =
  normalizeTrackingId(process.env.NEXT_PUBLIC_GA4_ID) || 'G-B14D9YGVYS';
const GOOGLE_ADS_ID =
  normalizeTrackingId(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID) || 'AW-16592788896';
const GOOGLE_TAG_ID = GA4_ID || GOOGLE_ADS_ID;

const googleTagConfigs = [
  GA4_ID ? `gtag('config', '${GA4_ID}');` : '',
  GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : '',
]
  .filter(Boolean)
  .join('\n');

const MarketingScripts = () => (
  <>
    {GOOGLE_TAG_ID && (
      <>
        <Script
          id="google-tag-loader"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-tag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${googleTagConfigs}
          `}
        </Script>
      </>
    )}

    {GTM_ID && (
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
    )}

    {META_PIXEL_ID && (
      <>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </>
    )}

    {CLARITY_ID && (
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `}
      </Script>
    )}
  </>
);

export default MarketingScripts;
