import{a as w,i as n,S as q}from"./assets/vendor-D0cagnvz.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const v="47457730-c1e96e42c58ea46d8ed7b0f32",S="https://pixabay.com/api/";async function p(e,a=1,r=20){try{const s=await w.get(S,{params:{key:v,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:r}});return s.data.totalHits===0?(n.warning({message:"No images found. Please try another query!"}),null):s.data}catch(s){throw n.error({message:"Failed to fetch images. Please try again later!"}),s}}function y(e,a){if(!e||e.length===0){g(a);return}const r=e.map(({webformatURL:s,largeImageURL:t,tags:o,likes:i,views:b,comments:P,downloads:L})=>$({webformatURL:s,largeImageURL:t,tags:o,likes:i,views:b,comments:P,downloads:L})).join("");a.innerHTML+=r}function g(e){e.innerHTML=""}function $({webformatURL:e,largeImageURL:a,tags:r,likes:s,views:t,comments:o,downloads:i}){return`
    <div class="photo-card">
      <a href="${a}" class="gallery-link">
        <img src="${e}" alt="${r}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes:</b> ${s}
        </p>
        <p class="info-item">
          <b>Views:</b> ${t}
        </p>
        <p class="info-item">
          <b>Comments:</b> ${o}
        </p>
        <p class="info-item">
          <b>Downloads:</b> ${i}
        </p>
      </div>
    </div>
  `}const N=document.querySelector("#search-form"),f=document.querySelector(".gallery"),c=document.querySelector(".load-more");let l=1,m="",d=0,u=20;const h=new q(".gallery a",{captionsData:"alt",captionDelay:250});N.addEventListener("submit",async e=>{e.preventDefault();const a=e.target.querySelector("#search-input").value.trim();if(!a){n.warning({message:"Please enter a search query!"});return}m=a,l=1,g(f);try{const r=await p(m,l,u);r&&r.hits.length>0&&(d=r.totalHits,y(r.hits,f),h.refresh(),n.success({message:`Found ${d} images!`}),r.hits.length<u||l*u>=d?c.style.display="none":c.style.display="block")}catch(r){console.error(r)}});c.addEventListener("click",async()=>{l+=1;try{const e=await p(m,l,u);e&&e.hits.length>0?(y(e.hits,f),h.refresh(),l*u>=d&&(c.style.display="none",n.info({message:"No more images to load!"}))):(n.info({message:"No more images to load!"}),c.style.display="none")}catch(e){n.error({message:"Failed to fetch more images. Please try again later!"}),console.error(e)}});
//# sourceMappingURL=index.js.map
