var bartenderButtonClicked = false;

document.getElementById("bartender").addEventListener("click", function() {
  if (bartenderButtonClicked) {
      return;
  }

  bartenderButtonClicked = true;

  var buttonsDiv = document.querySelector(".buttons");

  var loginForm = document.createElement("div");
  loginForm.classList.add("login-form");

  loginForm.innerHTML = `
      <h2>Pultos Belépés</h2>
      <form>
          <div class="form-group">
              <label for="password">Jelszó:</label>
              <input type="password" class="form-control" id="passwordBar">
          </div>
          <button type="button" class="btn btn-primary" onclick="checkBartenderCredentials()">Belépés</button>
      </form>
  `;

  buttonsDiv.appendChild(loginForm);
});

function checkBartenderCredentials() {
  var passwordBar = document.getElementById("passwordBar").value;

  if (passwordBar === "0000") {
      window.location.href = "drinks.html";
  } else {
      alert("Helytelen jelszó! Próbáld újra.");
  }
}