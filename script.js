/* =========================
   PAGE NAVIGATION
========================= */

const menuItems = document.querySelectorAll(".menu-item");
const pages = document.querySelectorAll(".page");
const pageTitle = document.getElementById("pageTitle");

const titles = {
    dashboard: "डैशबोर्ड",
    income: "आय दर्ज करें",
    expense: "व्यय दर्ज करें",
    transactions: "लेन-देन",
    reports: "रिपोर्ट",
    members: "सदस्य"
};

menuItems.forEach(item => {

    item.addEventListener("click", function(e) {

        e.preventDefault();

        const page = this.dataset.page;

        showPage(page);

    });

});


function showPage(page) {

    pages.forEach(p => {
        p.classList.remove("active-page");
    });

    const selectedPage = document.getElementById(page);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }

    menuItems.forEach(item => {
        item.classList.remove("active");

        if (item.dataset.page === page) {
            item.classList.add("active");
        }
    });

    pageTitle.textContent = titles[page] || "डैशबोर्ड";

    closeSidebar();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   MOBILE SIDEBAR
========================= */

function toggleSidebar() {

    document.getElementById("sidebar").classList.toggle("open");

}

function closeSidebar() {

    document.getElementById("sidebar").classList.remove("open");

}


/* =========================
   MODAL
========================= */

function openIncomeModal() {

    document.getElementById("modal").classList.add("show");

}

function closeModal() {

    document.getElementById("modal").classList.remove("show");

}

function openExpenseModal() {

    showPage("expense");

}


/* Modal Save */

function modalSaveIncome(event) {

    event.preventDefault();

    const amount = document.getElementById("modalAmount").value;
    const description = document.getElementById("modalDescription").value;

    addTransaction(
        new Date().toLocaleDateString("en-IN"),
        description,
        "दान",
        "आय",
        amount,
        "income"
    );

    closeModal();

    event.target.reset();

    showToast("आय सफलतापूर्वक दर्ज की गई।");

}


/* =========================
   INCOME FORM
========================= */

function saveIncome(event) {

    event.preventDefault();

    const date =
        document.getElementById("incomeDate").value;

    const amount =
        document.getElementById("incomeAmount").value;

    const description =
        document.getElementById("incomeDescription").value;

    const category =
        document.getElementById("incomeCategory").value;

    addTransaction(
        date,
        description,
        category,
        "आय",
        amount,
        "income"
    );

    event.target.reset();

    showToast("आय सफलतापूर्वक सेव हो गई।");

}


/* =========================
   EXPENSE FORM
========================= */

function saveExpense(event) {

    event.preventDefault();

    const date =
        document.getElementById("expenseDate").value;

    const amount =
        document.getElementById("expenseAmount").value;

    const description =
        document.getElementById("expenseDescription").value;

    const category =
        document.getElementById("expenseCategory").value;

    addTransaction(
        date,
        description,
        category,
        "व्यय",
        amount,
        "expense"
    );

    event.target.reset();

    showToast("व्यय सफलतापूर्वक सेव हो गया।");

}


/* =========================
   ADD TRANSACTION
========================= */

function addTransaction(
    date,
    description,
    category,
    type,
    amount,
    className
) {

    const tbody =
        document.getElementById("allTransactions");

    if (!tbody) return;

    const row = document.createElement("tr");

    const formattedDate =
        formatDate(date);

    const sign =
        className === "income" ? "+" : "−";

    row.innerHTML = `

        <td>${formattedDate}</td>

        <td>
            <strong>${description}</strong>
        </td>

        <td>${category}</td>

        <td>
            <span class="type ${className}">
                ${type}
            </span>
        </td>

        <td class="${className}-text">
            ${sign} ₹${Number(amount).toLocaleString("en-IN")}
        </td>

    `;

    tbody.prepend(row);

}


/* =========================
   DATE FORMAT
========================= */

function formatDate(date) {

    if (!date) {
        return new Date().toLocaleDateString("en-IN");
    }

    const d = new Date(date);

    if (isNaN(d)) return date;

    return d.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================
   SEARCH
========================= */

function searchTransactions() {

    const input =
        document.getElementById("searchInput");

    const filter =
        input.value.toLowerCase();

    const rows =
        document.querySelectorAll("#allTransactions tr");

    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();

        if (text.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}


/* =========================
   TOAST
========================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const text =
        document.getElementById("toastText");

    text.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================
   NOTIFICATION
========================= */

function showNotification() {

    showToast("आपके पास कोई नई सूचना नहीं है।");

}


/* =========================
   LOGOUT
========================= */

function logout() {

    const confirmLogout =
        confirm("क्या आप लॉगआउट करना चाहते हैं?");

    if (confirmLogout) {

        showToast("आप सफलतापूर्वक लॉगआउट हो गए।");

    }

}


/* =========================
   REPORT
========================= */

function downloadReport() {

    showToast("रिपोर्ट तैयार की जा रही है...");

    setTimeout(() => {

        showToast("रिपोर्ट डाउनलोड के लिए तैयार है।");

    }, 1500);

}


/* =========================
   MODAL OUTSIDE CLICK
========================= */

document.getElementById("modal")
    .addEventListener("click", function(e) {

        if (e.target === this) {
            closeModal();
        }

    });


/* =========================
   DEFAULT DATE
========================= */

const today =
    new Date().toISOString().split("T")[0];

const incomeDate =
    document.getElementById("incomeDate");

const expenseDate =
    document.getElementById("expenseDate");

if (incomeDate) {
    incomeDate.value = today;
}

if (expenseDate) {
    expenseDate.value = today;
}



function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "12345") {

        document.getElementById("loginPage").style.display = "none";
        document.getElementById("dashboardApp").style.display = "flex";

    } else {

        document.getElementById("errorMsg").innerHTML =
            "गलत Username या Password";

    }
}

// Page Load होने पर हमेशा Login Page दिखे
window.onload = function () {

    document.getElementById("loginPage").style.display = "flex";
    document.getElementById("dashboardApp").style.display = "none";

};

function logout() {

    document.getElementById("dashboardApp").style.display = "none";
    document.getElementById("loginPage").style.display = "flex";

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

}