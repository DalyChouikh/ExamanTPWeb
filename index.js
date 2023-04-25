const currentLocation = location.href;
const navLinks = document.querySelectorAll("nav ul li a");
const menuLength = navLinks.length
for (let i = 0; i < menuLength; i++) {
  if (navLinks[i].href === currentLocation) {
    navLinks[i].className = "active";
  }
}