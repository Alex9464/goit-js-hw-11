import{a as w,i as n,S as P}from"./assets/vendor-LKfbwt14.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const q="47457730-c1e96e42c58ea46d8ed7b0f32",v="https://pixabay.com/api/";async function m(e,a=1,o=20){try{const s=await w.get(v,{params:{key:q,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:o}});return s.data.totalHits===0?(n.warning({message:"No images found. Please try another query!"}),null):s.data}catch(s){throw n.error({message:"Failed to fetch images. Please try again later!"}),s}}function p(e,a){if(!e||e.length===0){g(a);return}const o=e.map(({webformatURL:s,largeImageURL:t,tags:r,likes:l,views:h,comments:b,downloads:L})=>S({webformatURL:s,largeImageURL:t,tags:r,likes:l,views:h,comments:b,downloads:L})).join("");a.innerHTML+=o}function g(e){e.innerHTML=""}function S({webformatURL:e,largeImageURL:a,tags:o,likes:s,views:t,comments:r,downloads:l}){return`
    <div class="photo-card">
      <a href="${a}" class="gallery-link">
        <img src="${e}" alt="${o}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes:</b> ${s}
        </p>
        <p class="info-item">
          <b>Views:</b> ${t}
        </p>
        <p class="info-item">
          <b>Comments:</b> ${r}
        </p>
        <p class="info-item">
          <b>Downloads:</b> ${l}
        </p>
      </div>
    </div>
  `}const $=document.querySelector("#search-form"),y=document.querySelector(".gallery"),i=document.createElement("button");i.textContent="Load More";i.classList.add("load-more");i.style.display="none";document.body.appendChild(i);const c=document.querySelector("#loading");let d=null,u=1,f="";$.addEventListener("submit",async e=>{e.preventDefault();const a=e.target.querySelector("#search-input").value.trim();if(!a){n.warning({message:"Please enter a search query!"});return}f=a,u=1,g(y),c.style.display="block";try{const o=await m(f,u);c.style.display="none",o&&o.hits.length>0?(p(o.hits,y),n.success({message:`Found ${o.totalHits} images!`}),i.style.display="block",x()):(n.warning({message:"No images found. Try another query."}),i.style.display="none")}catch(o){c.style.display="none",n.error({message:"Failed to fetch images. Please try again later."}),console.error(o)}});i.addEventListener("click",async()=>{u+=1,c.style.display="block";try{const e=await m(f,u);c.style.display="none",e&&e.hits.length>0?(p(e.hits,y),n.info({message:"Loaded more images."}),E()):(n.info({message:"No more images to load!"}),i.style.display="none")}catch(e){c.style.display="none",n.error({message:"Failed to load more images."}),console.error(e)}});function x(){d&&d.destroy(),d=new P(".gallery a",{captionsData:"alt",captionDelay:250})}function E(){d&&d.refresh()}
//# sourceMappingURL=index.js.map
