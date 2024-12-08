import{a as g,i}from"./assets/vendor-BayO0P1x.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const b="47457730-c1e96e42c58ea46d8ed7b0f32",L="https://pixabay.com/api/";async function f(e,s=1,o=20){try{const n=await g.get(L,{params:{key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:o}});return n.data.hits.length===0?(i.warning({message:"No images found. Please try another query!"}),null):n.data}catch(n){throw i.error({message:"Failed to fetch images. Please try again later!"}),new Error(n)}}function m(e,s){if(!e||e.length===0){s.innerHTML="";return}const o=e.map(({webformatURL:n,largeImageURL:t,tags:r,likes:a,views:y,comments:p,downloads:h})=>`
      <div class="photo-card">
        <a href="${t}" class="gallery-link">
          <img src="${n}" alt="${r}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes:</b> ${a}
          </p>
          <p class="info-item">
            <b>Views:</b> ${y}
          </p>
          <p class="info-item">
            <b>Comments:</b> ${p}
          </p>
          <p class="info-item">
            <b>Downloads:</b> ${h}
          </p>
        </div>
      </div>
    `).join("");s.innerHTML+=o}function q(e){e.innerHTML=""}const v=document.querySelector("#search-form"),u=document.querySelector(".gallery"),c=document.querySelector(".load-more");let l=1,d="";v.addEventListener("submit",async e=>{e.preventDefault();const s=e.target.querySelector("#search-input").value.trim();if(!s){i.warning({message:"Please enter a search query!"});return}d=s,l=1,q(u);try{const o=await f(d,l);o&&o.hits.length>0?(m(o.hits,u),i.success({message:`Found ${o.totalHits} images!`}),c.style.display="block"):c.style.display="none"}catch(o){console.error(o)}});c.addEventListener("click",async()=>{l+=1;try{const e=await f(d,l);e&&e.hits.length>0?m(e.hits,u):(i.info({message:"No more images to load!"}),c.style.display="none")}catch(e){console.error(e)}});document.querySelector("#search-form").addEventListener("submit",onSearch);
//# sourceMappingURL=index.js.map
