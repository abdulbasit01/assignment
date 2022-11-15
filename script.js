function loadupdateformdata() {
  preLoader()
  const queryParam = window.location.hash;
  const data = JSON.parse(localStorage.getItem("contact-information"));
  for (let index = 0; index < data.length; index++) {
    if (data[index].contactId == queryParam.substring(1)) {
      console.log(data[index]);
      document.getElementById("phonenumber").defaultValue =
        data[index].phonenumber;
      document.getElementById("emailaddress").defaultValue =
        data[index].emailaddress;
      document.getElementById("contactId").defaultValue = data[index].contactId;
    }
  }
}
function loaddata() {
  preLoader()
  if (!localStorage.getItem("contact-information")) return [];
  return JSON.parse(localStorage.getItem("contact-information"));
}

function addContact(val) {
  const formData = new FormData(val);
  let jsonContact = {};
  for (const [key, value] of formData.entries()) {
    if (!value.trim()) {
      errorBinding(key);
    } else {
      errorClearing(key);
      jsonContact = {
        ...jsonContact,
        [key]: value,
        contactId: loaddata().length + 1,
      };
    }
  }
  if (Object.keys(jsonContact).length > 2) {
    localStorage.setItem(
      "contact-information",
      JSON.stringify([...loaddata(), jsonContact])
    );
    showNotification(val)
  }
}

function errorBinding(key) {
  document.getElementById(key).classList.remove("d-none");
  return;
}
function errorClearing(key) {
  document.getElementById(key).classList.add("d-none");
  return;
}
function updateContact(val) {
  const formData = new FormData(val);
  let jsonContact = {};
  for (const [key, value] of formData.entries()) {
    jsonContact = {
      ...jsonContact,
      [key]: value,
    };
  }
  const data = JSON.parse(localStorage.getItem("contact-information"));
  const tempData = [jsonContact];
  for (let index = 0; index < data.length; index++) {
    if (data[index].contactId != jsonContact.contactId) {
      tempData.push(data[index]);
    }
  }
  localStorage.setItem("contact-information", JSON.stringify(tempData));
  showNotification(val)
}

function showNotification(val) {
  val.reset();
  $("#notificaion-bar").show().animate({
    opacity: 1,
  }, 4000, function () {
    $(this).hide("slow");
  });
}
function preLoader() {
  $("#status").fadeOut();
  $("#preloader").delay(500).fadeOut("slow");
}