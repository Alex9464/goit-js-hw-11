import{S as a}from"./assets/vendor-CgTBfC_f.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();const l="47457730-c1e96e42c58ea46d8ed7b0f32",u="https://pixabay.com/api/";async function d(e){if(!e.trim())throw new Error("Search query cannot be empty.");const n=`${u}?key=${l}&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true`;try{const t=await fetch(n);if(!t.ok)throw new Error(`Error: ${t.status}`);const s=await t.json();if(!s.hits.length)throw new Error("No images found for this query.");return s.hits}catch(t){throw console.error("Fetch error:",t),t}}function f(e){const n=document.querySelector("#gallery");n.innerHTML=e.map(p).join("")}function p(e){return`
      <div class="photo-card">
        <a href="${e.largeImageURL}">
          <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${e.likes}</p>
          <p><b>Views:</b> ${e.views}</p>
          <p><b>Comments:</b> ${e.comments}</p>
          <p><b>Downloads:</b> ${e.downloads}</p>
        </div>
      </div>
    `}let i=null;async function y(e){e.preventDefault();const n=document.querySelector("#search-input").value.trim();document.querySelector("#loading").style.display="block";try{const t=await d(n);f(t),i?i.refresh():i=new a(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250})}catch(t){console.error(t.message)}finally{document.querySelector("#loading").style.display="none"}}document.querySelector("#search-form").addEventListener("submit",y);
//# sourceMappingURL=index.js.map
