export default async function handler(req,res){
  const {id,type,s,e}=req.query;
  if(!id) return res.status(400).send('no id');
  const src = type==='tv' ? `https://player.videasy.net/tv/${id}/${s||1}/${e||1}` : `https://player.videasy.net/movie/${id}`;
  res.setHeader('Content-Type','text/html');
  res.send(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>html,body{margin:0;padding:0;background:#000;height:100%;overflow:hidden}iframe{width:100%;height:100%;border:none}</style>
<script>
// BLOQUE LE COFFRE cdn.aabdw.com SANS SANDBOX
window.open = function(){console.log('PUB BLOQUEE');return null;};
window.alert = function(){return null;};
const origCreate = document.createElement;
document.addEventListener('click', function(e){
  const a = e.target.closest('a');
  if(a && (a.href.includes('aabdw') || a.href.includes('cdn.') || a.target==='_blank')){
    e.preventDefault(); e.stopPropagation(); return false;
  }
}, true);
</script>
</head>
<body>
<iframe src="${src}" allowfullscreen allow="autoplay; fullscreen; encrypted-media" style="width:100%;height:100%;border:none"></iframe>
</body>
</html>`);
}