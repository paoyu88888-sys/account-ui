function openEditor(){
  document.getElementById("modal").style.display="flex";
}

function closeEditor(){
  document.getElementById("modal").style.display="none";
}

function save(){
  const name=document.getElementById("nameInput").value;
  const vip=document.getElementById("vipInput").value;
  const phone=document.getElementById("phoneInput").value;
  const avatarFile=document.getElementById("avatarInput").files[0];

  if(name) document.getElementById("name").innerText=name;
  if(vip) document.getElementById("vipLevel").innerText=vip;
  if(phone) document.getElementById("phone").innerText=phone;

  if(avatarFile){
    const reader=new FileReader();
    reader.onload=e=>{
      document.getElementById("avatar").style.backgroundImage=`url(${e.target.result})`;
      localStorage.setItem("avatar",e.target.result);
    }
    reader.readAsDataURL(avatarFile);
  }

  localStorage.setItem("name",document.getElementById("name").innerText);
  localStorage.setItem("vip",document.getElementById("vipLevel").innerText);
  localStorage.setItem("phone",document.getElementById("phone").innerText);

  closeEditor();
}

window.onload=()=>{
  if(localStorage.getItem("name"))
    document.getElementById("name").innerText=localStorage.getItem("name");
  if(localStorage.getItem("vip"))
    document.getElementById("vipLevel").innerText=localStorage.getItem("vip");
  if(localStorage.getItem("phone"))
    document.getElementById("phone").innerText=localStorage.getItem("phone");
  if(localStorage.getItem("avatar"))
    document.getElementById("avatar").style.backgroundImage=`url(${localStorage.getItem("avatar")})`;
}
