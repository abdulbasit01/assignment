function loaddata() {
  $("#status").fadeOut();
  $("#preloader").delay(500).fadeOut("slow");
  if (!localStorage.getItem("contact-information"))
    return insertDataIntoTable([]);

  insertDataIntoTable(JSON.parse(localStorage.getItem("contact-information")));
}

function insertDataIntoTable(contacts) {
  const tableBody = document.getElementById("table-body");
  contacts.forEach((element) => {
    const parentRow = document.createElement("tr");

    const parentColName = document.createElement("td");
    parentColName.innerHTML = `${element.fname} ${element.lname}`;
    parentColName.setAttribute(
      "onclick",
      "changeLoc(" + element.contactId + ",'details.html')"
    );
    const parentColAction = document.createElement("td");
    const deleteBtn = document.createElement("i");
    const editBtn = document.createElement("i");
    const detailsBtn = document.createElement("i");
    deleteBtn.setAttribute(
      "class",
      "fa-solid fa-trash-can text-dark mx-2 btn btn-danger btn-sm"
    );
    deleteBtn.setAttribute("onclick", "toggleModal(" + element.contactId + ")");
    deleteBtn.setAttribute("title", "Click to delete this contact");
    parentColAction.appendChild(deleteBtn);
    detailsBtn.setAttribute(
      "class",
      "fa-solid fa-user text-dark mx-2 btn btn-success btn-sm"
    );
    detailsBtn.setAttribute("title", "Click to view details");
    detailsBtn.setAttribute(
      "onclick",
      "changeLoc(" + element.contactId + ",'details.html')"
    );
    parentColAction.appendChild(detailsBtn);
    editBtn.setAttribute(
      "class",
      "fa-solid mx-2 btn btn-secondary btn-sm fa-pen-to-square"
    );
    editBtn.setAttribute(
      "onclick",
      "changeLoc(" + element.contactId + ",'editcontat.html')"
    );
    editBtn.setAttribute("title", "Click to update this contact");
    parentColAction.appendChild(editBtn);
    parentRow.appendChild(parentColName);
    parentRow.appendChild(parentColAction);
    parentRow.setAttribute("class", "border m-1 text-center");
    tableBody.appendChild(parentRow);
  });
  $("#contact-tables")
    .DataTable({
      pagingType: "simple",
      responsive: true,
      language: {
        searchPlaceholder: "Search Contact.",
        search: "",
        paginate: {
          previous:
            '<span class="prev-icon"><i class="fa-solid fa-arrow-left"></i></span>',
          next: '<span class="next-icon"><i class="fa-solid fa-arrow-right"></i></span>',
        },
      },
      pageLength: 5,
      lengthMenu: [
        [5, 10, 15, 20, -1],
        [5, 10, 15, 20, "All"],
      ],
    })
    .columns.adjust();
}

function toggleModal(id) {
  const actionmodal = document.getElementById("actionmodal");
  actionmodal.setAttribute("delete-action-id", id);
  actionmodal.classList.toggle("d-none");
  document.getElementsByTagName("body")[0].classList.toggle("overflow-hidden");
  document.getElementById("main-c-table").classList.toggle("blur");
}
function changeLoc(data, name) {
  window.location = `${name}#` + data;
}
function deleteFn() {
  const actionmodal = document.getElementById("actionmodal");
  const filterData = JSON.parse(
    localStorage.getItem("contact-information")
  ).filter((data) => {
    console.log(data.contactId, actionmodal.getAttribute("delete-action-id"));
    if (data.contactId != +actionmodal.getAttribute("delete-action-id")) {
      return data;
    }
  });
  localStorage.setItem("contact-information", JSON.stringify(filterData));
  window.location = "listing.html";
}
