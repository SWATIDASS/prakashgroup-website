(async ()=>{
  try{
    const res = await fetch('http://192.168.29.90:3000/api/careers/presign',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({filename:'test.pdf', contentType:'application/pdf'})});
    const text = await res.text();
    console.log('STATUS', res.status); console.log(text);
  } catch(e){ console.error('ERR',e); }
})();