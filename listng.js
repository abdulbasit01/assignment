function loaddata() {
  if (!localStorage.getItem("contact-information"))
    return insertDataIntoTable([]);

  insertDataIntoTable(JSON.parse(localStorage.getItem("contact-information")));
}

function insertDataIntoTable(contacts) {
  const tableBody = document.getElementById("table-body");
  contacts.forEach((element, index) => {
    const parentRow = document.createElement("tr");
    const parentColEmail = document.createElement("td");
    parentColEmail.innerHTML = `<a href="mailto:${element.emailaddress}">${element.emailaddress}</a>`;
    const parentColPhone = document.createElement("td");
    parentColPhone.innerHTML = `<a href="tel:${element.phonenumber}">${element.phonenumber}</a>`;
    const parentColAction = document.createElement("td");
    const deleteBtn = document.createElement("i");
    const editBtn = document.createElement("i");
    deleteBtn.setAttribute("class", "fa-solid fa-trash-can text-dark mx-2 btn btn-danger btn-sm");
    deleteBtn.setAttribute("onclick", "toggleModal(" + element.contactId + ")");
    parentColAction.appendChild(deleteBtn);
    editBtn.setAttribute("class", "fa-solid mx-2 btn btn-secondary btn-sm fa-pen-to-square");
    editBtn.setAttribute("onclick", "editFn(" + element.contactId + ")");
    parentColAction.appendChild(editBtn);
    parentRow.appendChild(parentColEmail);
    parentRow.appendChild(parentColPhone);
    parentRow.appendChild(parentColAction);
    parentRow.setAttribute("class", "border m-1 text-center");
    tableBody.appendChild(parentRow);
  });
  $("#contact-tables")
    .DataTable({
      pagingType: 'simple',
      responsive: true,
      language: {
        searchPlaceholder: "Search Contact.",
        search: "",
        'paginate': {
          'previous': '<span class="prev-icon"><i class="fa-solid fa-arrow-left"></i></span>',
          'next': '<span class="next-icon"><i class="fa-solid fa-arrow-right"></i></span>'
        }
      }

    })
    .columns.adjust();
}

function toggleModal(id) {
  const actionmodal = document.getElementById("actionmodal");
  actionmodal.setAttribute("delete-action-id", id);
  actionmodal.classList.toggle("d-none");
  document.getElementsByTagName('body')[0].classList.toggle("overflow-hidden")
  document.getElementById('main-c-table').classList.toggle("blur")
}
function editFn(data) {
  window.location = "/editcontat.html#" + data;
}
function deleteFn() {
  const actionmodal = document.getElementById("actionmodal");
  const filterData = JSON.parse(
    localStorage.getItem("contact-information")
  ).filter((data) => {
    console.log(data.contactId, actionmodal.getAttribute("delete-action-id"));
    if (data.contactId !== +actionmodal.getAttribute("delete-action-id")) {
      return data;
    }
  });
  localStorage.setItem("contact-information", JSON.stringify(filterData));
  window.location.reload();
}
