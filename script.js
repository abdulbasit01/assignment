function loadupdateformdata() {
  preLoader();
  const queryParam = window.location.hash;
  const data = JSON.parse(localStorage.getItem("contact-information"));
  for (let index = 0; index < data.length; index++) {
    if (data[index].contactId == queryParam.substring(1)) {
      document.getElementById("phonenumber").defaultValue =
        data[index].phonenumber;
      document.getElementById("lname").defaultValue = data[index].lname;
      document.getElementById("fname").defaultValue = data[index].fname;
      document.getElementById("emailaddress").defaultValue =
        data[index].emailaddress;
      document.getElementById("contactId").defaultValue = data[index].contactId;
    }
  }
}
function loaddata() {
  preLoader();
  if (!localStorage.getItem("contact-information")) return [];
  return JSON.parse(localStorage.getItem("contact-information"));
}
function loaddetailsdata() {
  preLoader();
  const queryParam = window.location.hash;
  const data = JSON.parse(localStorage.getItem("contact-information"));
  for (let index = 0; index < data.length; index++) {
    if (data[index].contactId == queryParam.substring(1)) {
      document.getElementById("fname").innerHTML = data[index].fname;

      document.getElementById("lname").innerHTML = data[index].lname;

      document.getElementById(
        "email"
      ).innerHTML = `<a href=mailto:${data[index].emailaddress} class="text-dark">${data[index].emailaddress}</a>`;
      document.getElementById(
        "contact"
      ).innerHTML = `<a href=tel:${data[index].phonenumber} class="text-dark">${data[index].phonenumber}</a>`;
      const dtpagedbtn = document.getElementById("details-page-delete-btn");
      dtpagedbtn.setAttribute("deletebtn-id", data[index].contactId);
    }
  }
}
function addContact(val) {
  const jsonContact = {
    fname: document.getElementById("fname").value,
    lname: document.getElementById("lname").value,
    phonenumber: document.getElementById("phonenumber").value,
    emailaddress: document.getElementById("emailaddress").value,
    contactId: loaddata().length + 1,
  };
  const errorIds = {
    fname: "fname-error",
    lname: "lname-error",
    phonenumber: "phone-error",
    emailaddress: "email-error",
  };
  errorChecking(jsonContact, errorIds);
  localStorage.setItem(
    "contact-information",
    JSON.stringify([...loaddata(), jsonContact])
  );
  showNotification(val);
}

function errorChecking(values, keys) {
  
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
  showNotification(val);
}

function showNotification(val) {
  $("#notificaion-bar")
    .show()
    .animate(
      {
        opacity: 1,
      },
      4000,
      function () {
        $(this).hide("slow");
      }
    );
}
function preLoader() {
  $("#status").fadeOut();
  $("#preloader").delay(500).fadeOut("slow");
}

function deleteFnOfDetPage() {
  const deletebtnID = document
    .getElementById("details-page-delete-btn")
    .getAttribute("deletebtn-id");

  const actionmodal = document.getElementById("actionmodal");
  actionmodal.setAttribute("delete-action-id", deletebtnID);
  actionmodal.classList.toggle("d-none");
  document.getElementsByTagName("body")[0].classList.toggle("overflow-hidden");
  document.getElementById("main-c-table").classList.toggle("blur");
}
