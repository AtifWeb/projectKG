const formButton = document.getElementById("submit-btn");
formButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !email || !phone) {
    alert("Please fill all fields");
    return;
  }

  sessionStorage.setItem("user_name", name);
  sessionStorage.setItem("user_email", email);
  sessionStorage.setItem("user_phone", phone);

  window.location.href = "design.html";
});
