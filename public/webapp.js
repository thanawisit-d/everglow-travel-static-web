let allProgram = [];

/* =========================
   LOAD JSON
========================= */
fetch("tours.json")
    .then(res => res.json())
    .then(data => {

        allProgram = Array.isArray(data) ? data : [data];

        console.log("โหลดข้อมูลสำเร็จ:", allProgram);

        const box = document.getElementById("resultBox");
        if (box) box.innerHTML = "";
    })
    .catch(err => console.error("โหลด JSON ไม่ได้:", err));


/* =========================
   SEARCH
========================= */
function searchTour() {
    sessionStorage.setItem("beforeSearch", window.location.href);
    const country = document.getElementById("country")?.value || "";
    const code = (document.getElementById("code")?.value || "").toLowerCase();
    const dateValue = document.getElementById("travelDate")?.value || "";

    // 🔥 แปลง YYYY-MM-DD → YYYY-MM
    const selectedMonth = dateValue ? dateValue.slice(0, 7) : "";

    const result = allProgram.filter(tour => {

        const matchCountry =
            !country || tour.country === country;

        const matchCode =
            !code || tour.id?.toLowerCase().includes(code);

        // 🔥 FIX สำคัญ: เทียบช่วงเดือน
        const matchDate =
            !selectedMonth ||
            (
                tour.startMonth &&
                tour.endMonth &&
                selectedMonth >= tour.startMonth &&
                selectedMonth <= tour.endMonth
            );

        return matchCountry && matchCode && matchDate;
    });


    /* =========================
       ซ่อน section อื่น
    ========================= */
    ["sliderSection", "popularSection", "monthlySection"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });


    /* =========================
       title
    ========================= */
    const title = document.getElementById("resultTitle");
    if (title) {
        title.style.display = "block";
        title.innerText = `ผลการค้นหา (${result.length} รายการ)`;
    }


    showResult(result);

    document.getElementById("resultBox")
        ?.scrollIntoView({ behavior: "smooth" });
}


/* =========================
   SHOW RESULT
========================= */
function showResult(data) {

    const box = document.getElementById("resultBox");
    if (!box) return;

    if (!data || data.length === 0) {
        box.innerHTML = `<p class="no-result">
  <img src="assets/images/iconNo.png">
  <span>ไม่พบโปรแกรมทัวร์</span>
  </p>`;
        return;
    }

    box.innerHTML = data.map(tour => `
        <div class="tour-card">

            <img src="${tour.image}" class="tour-img">

            <p class="tour-desc">${tour.desc || tour.name || ""}</p>

            <div class="tour-info">
                <p><img src="pin.png"> ${tour.id}</p>
                <p><img src="stopwatch.png"> ${tour.duration}</p>
                <p><img src="clock_13819249.png"> ${tour.periodText}</p>
            </div>

            <div class="tour-bottom">
                <img src="plane logo/${tour.airline}" class="airline">

                <div class="price">
                    <span class="price-main">${tour.price}.-</span>
                    <span class="price-sub">บาท/ท่าน</span>
                </div>
            </div>

        </div>
    `).join("");

}
function goBackSmart() {

    const fromSearch = sessionStorage.getItem("beforeSearch");

    // 1️⃣ ถ้ามี history จากการค้นหา → กลับไปหน้าที่มาก่อน
    if (fromSearch) {
        sessionStorage.removeItem("beforeSearch");
        window.location.href = fromSearch;
        return;
    }

    const path = window.location.pathname;

    // 2️⃣ อยู่หน้าอื่น (detail page) → กลับ home-th
    if (!path.includes("home-th.html")) {
        window.location.href = "home-th.html";
        return;
    }

    // 3️⃣ อยู่หน้า home-th แล้ว → แค่เลื่อนขึ้นบน (ไม่ไป index)
    window.scrollTo({ top: 0, behavior: "smooth" });
} sessionStorage.setItem("beforeSearch", window.location.href);
