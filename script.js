const els = {
  avatar: document.getElementById("avatar"),
  name: document.getElementById("name"),
  vipText: document.getElementById("vipText"),
  phone: document.getElementById("phone"),
  current: document.getElementById("current"),

  entry: document.getElementById("editEntry"),
  mask: document.getElementById("mask"),
  sheet: document.getElementById("sheet"),

  avatarInput: document.getElementById("avatarInput"),
  clearAvatar: document.getElementById("clearAvatar"),
  nameInput: document.getElementById("nameInput"),
  vipInput: document.getElementById("vipInput"),
  phoneInput: document.getElementById("phoneInput"),
  currentToggle: document.getElementById("currentToggle"),

  saveBtn: document.getElementById("saveBtn"),
  cancelBtn: document.getElementById("cancelBtn"),
};

const KEY = "account_ui_v1";

function readStore(){
  try{
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  }catch{
    return {};
  }
}

function writeStore(obj){
  localStorage.setItem(KEY, JSON.stringify(obj));
}

function applyUI(data){
  if (typeof data.name === "string" && data.name.trim()) {
    els.name.textContent = data.name.trim();
  }
  if (typeof data.vip === "string" && data.vip.trim()) {
    els.vipText.textContent = data.vip.trim();
  }
  if (typeof data.phone === "string" && data.phone.trim()) {
    els.phone.textContent = data.phone.trim();
  }

  const showCurrent = (data.showCurrent !== false);
  els.current.style.display = showCurrent ? "inline-flex" : "none";
  els.currentToggle.checked = showCurrent;

  if (typeof data.avatarDataUrl === "string" && data.avatarDataUrl.startsWith("data:image")) {
    els.avatar.style.background = `url('${data.avatarDataUrl}') center/cover no-repeat`;
  } else {
    // 恢复默认占位（和 CSS 同风格）
    els.avatar.removeAttribute("style");
  }
}

function openSheet(){
  els.mask.hidden = false;
  els.sheet.classList.add("open");
  els.sheet.setAttribute("aria-hidden", "false");

  const data = readStore();
  els.nameInput.value = data.name ?? els.name.textContent;
  els.vipInput.value = data.vip ?? els.vipText.textContent;
  els.phoneInput.value = data.phone ?? els.phone.textContent;
  els.currentToggle.checked = (data.showCurrent !== false);
}

function closeSheet(){
  els.sheet.classList.remove("open");
  els.sheet.setAttribute("aria-hidden", "true");
  // 等动画结束再隐藏遮罩
  setTimeout(() => { els.mask.hidden = true; }, 220);
}

els.entry.addEventListener("click", openSheet);
els.mask.addEventListener("click", closeSheet);
els.cancelBtn.addEventListener("click", closeSheet);

// 保存
els.saveBtn.addEventListener("click", () => {
  const data = readStore();

  const next = {
    ...data,
    name: els.nameInput.value.trim() || els.name.textContent,
    vip: els.vipInput.value.trim() || els.vipText.textContent,
    phone: els.phoneInput.value.trim() || els.phone.textContent,
    showCurrent: els.currentToggle.checked,
  };

  writeStore(next);
  applyUI(next);
  closeSheet();
});

// 头像上传
els.avatarInput.addEventListener("change", () => {
  const file = els.avatarInput.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const data = readStore();
    const next = { ...data, avatarDataUrl: reader.result };
    writeStore(next);
    applyUI(next);
  };
  reader.readAsDataURL(file);
});

// 恢复默认头像
els.clearAvatar.addEventListener("click", () => {
  const data = readStore();
  const next = { ...data };
  delete next.avatarDataUrl;
  writeStore(next);
  applyUI(next);
});

// 首次加载：应用缓存
applyUI(readStore());
