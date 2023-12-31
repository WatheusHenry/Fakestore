async function fetchUser() {
  const response = await fetch("https://fakestoreapi.com/users/1");
  const user = await response.json();
  return user;
}

function displayAboutUser(user) {
  const aboutUser = document.getElementById("aboutUser");
  aboutUser.innerHTML = ""; 
  const User = document.createElement("div");
  User.innerHTML = `
      <div class="d-flex flex-column gap-3">
        <input class="form-control" type="text" value="${user.username}" aria-label="username" disabled>
        <input class="form-control" type="text" value="${user.email}" aria-label="email" disabled>
        <input class="form-control" type="text" value="${user.phone}" aria-label="telefone" disabled>
        <input class="form-control" type="text" value="${user.address.street}" aria-label="endereco" disabled>
        <div class="d-flex gap-3">
          <input style="width: 60%;" class="form-control" type="text" value="${user.address.city}" aria-label="endereco" disabled>
          <input style="width: 40%;" class="form-control" type="text" value="${user.address.zipcode}" aria-label="endereco" disabled>
        </div>
      </div>
      `;

  aboutUser.appendChild(User); 
}

document.addEventListener("DOMContentLoaded", async () => {
  const user = await fetchUser();

  const editButton = document.getElementById("editButton");
  const aboutUser = document.getElementById("aboutUser"); 

  function toggleEdit() {
    const inputs = aboutUser.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.hasAttribute("disabled")) {
        input.removeAttribute("disabled"); 
      } else {
        input.setAttribute("disabled", "true"); 
      }
    });
  }

  editButton.addEventListener("click", () => {
    toggleEdit();
    if (editButton.innerText === "Editar") {
      editButton.innerText = "Salvar";
    } else {
      editButton.innerText = "Editar";
    }
  });
  displayAboutUser(user);
});
