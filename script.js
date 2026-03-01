function openEditor() {
  document.getElementById("editorModal").style.display = "flex";
  document.getElementById("nameInput").value =
    document.getElementById("nickname").innerText;
}

function closeEditor() {
  document.getElementById("editorModal").style.display = "none";
}

function saveChanges() {
  const newName = document.getElementById("nameInput").value;
  const newVip = document.getElementById("vipSelect").value;
  const avatarInput = document.getElementById("avatarInput");

  document.getElementById("nickname").innerText = newName;
  document.getElementById("vipLevel").innerText = newVip;

  if (avatarInput.files && avatarInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("avatar").src = e.target.result;
    };
    reader.readAsDataURL(avatarInput.files[0]);
  }

  closeEditor();
}