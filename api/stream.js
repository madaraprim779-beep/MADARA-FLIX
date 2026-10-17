// API MADARA FLIX - 0 PUB 0 REDIRECTION - TU CONTRÔLES
export default async function handler(req,res){
  const {type,id,s,e} = req.query;
  if(!id) return res.status(400).send('Missing id');
  
  // SOURCES 0 PUB - Videasy est 0 pub, VidRift backup
  let src="";
  if(type==='tv'){
    src=`https://player.videasy.net/tv/${id}/${s||1}/${e||1}`;
  } else {
    src=`https://player.videasy.net/movie/${id}`;
  }
  
  // On renvoie une page qui embed Videasy sans pub et sans redirection possible
  res.setHeader('Content-Type','text/html');
  return res.send(`
  <!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <style>html,body{margin:0;padding:0;background:#000;height:100%;overflow:hidden}iframe{width:100%;height:100%;border:none}</style>
  </head><body>
  <iframe src="${src}" allowfullscreen allow="autoplay; fullscreen"></iframe>
  </body></html>
  `);
}