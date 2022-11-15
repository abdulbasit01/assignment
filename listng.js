function loaddata() {
  $("#status").fadeOut();
  $("#preloader").delay(500).fadeOut("slow");
  if (!localStorage.getItem("contact-information"))
    return insertDataIntoTable([]);

  insertDataIntoTable(JSON.parse(localStorage.getItem("contact-information")));
}

function insertDataIntoTable(contacts) {
  const tableBody = document.getElementById("table-body");
  contacts.forEach((element, index) => {
    const parentRow = document.createElement("tr");
    const nameColPhone = document.createElement("td");
    nameColPhone.innerHTML = `${element.FName} ${element.LName}`
    const parentColAction = document.createElement("td");
    const deleteBtn = document.createElement("i");
    const editBtn = document.createElement("i");
    const details = document.createElement("i");
    deleteBtn.setAttribute("class", "fa-solid fa-trash-can text-dark mx-2 btn btn-danger btn-sm");
    deleteBtn.setAttribute("onclick", "toggleModal(" + element.contactId + ")");
    parentColAction.appendChild(deleteBtn);
    editBtn.setAttribute("class", "fa-solid mx-2 btn btn-secondary btn-sm fa-pen-to-square");
    editBtn.setAttribute("onclick", "editFn(" + element.contactId + ")");
    parentColAction.appendChild(editBtn);
    details.setAttribute("class", "fa-solid fa-circle-info text-dark mx-2 btn btn-primary btn-sm")
    details.setAttribute("onclick", "detailsFn(" + element.contactId + ")")
    parentColAction.appendChild(details)
    parentRow.appendChild(nameColPhone);
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
      },
      pageLength: 5,
      lengthMenu: [
        [5, 10, 15, 20, -1],
        [5, 10, 15, 20, "All"]
      ]
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
  window.location = "editcontat.html#" + data;
}
function deleteFn() {
  const actionmodal = document.getElementById("actionmodal");
  const filterData = JSON.parse(
    localStorage.getItem("contact-information")
  ).filter((data) => {
    if (data.contactId != +actionmodal.getAttribute("delete-action-id")) {
      return data;
    }
  });
  localStorage.setItem("contact-information", JSON.stringify(filterData));
  window.location.reload();
}
function detailsFn(data) {
  window.location = "details.html#" + data;
}

document.getElementById("Edit-btn").addEventListener('click', (event) => {
  editFn(window.location.hash.substring(1))
})
document.getElementById("Delete-btn").addEventListener('click', (event) => {
})