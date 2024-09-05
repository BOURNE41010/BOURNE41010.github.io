const rateData = {
    EMS: [
        { min: 0, max: 0.02, cost: 32 },
        { min: 0.0201, max: 0.1, cost: 37 },
        { min: 0.1001, max: 0.25, cost: 42 },
        { min: 0.2501, max: 0.5, cost: 52 },
        { min: 0.5001, max: 1, cost: 67 },
        { min: 1.0001, max: 1.5, cost: 82 },
        { min: 1.5001, max: 2, cost: 97 },
        { min: 2.0001, max: 2.5, cost: 100 },
        { min: 2.5001, max: 3, cost: 105 },
        { min: 3.0001, max: 3.5, cost: 110 },
        { min: 3.5001, max: 4, cost: 120 },
        { min: 4.0001, max: 4.5, cost: 120 },
        { min: 4.5001, max: 5, cost: 120 },
        { min: 5.0001, max: 5.55, cost: 130 },
        { min: 5.5001, max: 6, cost: 140 },
        { min: 6.0001, max: 6.5, cost: 150 },
        { min: 6.5001, max: 7, cost: 160 },
        { min: 7.0001, max: 7.5, cost: 170 },
        { min: 7.5001, max: 8, cost: 180 },
        { min: 8.0001, max: 8.5, cost: 190 },
        { min: 8.5001, max: 9, cost: 200 },
        { min: 9.0001, max: 9.5, cost: 210 },
        { min: 9.5001, max: 10, cost: 220 },
        { min: 10.0001, max: 11, cost: 230 },
        { min: 11.0001, max: 12, cost: 240 },
        { min: 12.0001, max: 13, cost: 250 },
        { min: 13.0001, max: 14, cost: 260 },
        { min: 14.0001, max: 15, cost: 270 },
        { min: 15.0001, max: 16, cost: 280 },
        { min: 16.0001, max: 17, cost: 290 },
        { min: 17.0001, max: 18, cost: 300 },
        { min: 18.0001, max: 19, cost: 310 },
        { min: 19.0001, max: 20, cost: 320 },
        { min: 20.0001, max: 21, cost: 330 },
        { min: 21.0001, max: 22, cost: 340 },
        { min: 22.0001, max: 23, cost: 350 },
        { min: 23.0001, max: 24, cost: 360 },
        { min: 24.0001, max: 25, cost: 380 },
        { min: 25.0001, max: 26, cost: 400 },
        { min: 26.0001, max: 27, cost: 420 },
        { min: 27.0001, max: 28, cost: 440 },
        { min: 28.0001, max: 29, cost: 460 },
        { min: 29.0001, max: 30, cost: 480 },
        // เพิ่มข้อมูลที่เหลือ
    ],
    ECO: [
        { min: 0, max: 0.02, cost: 20 },
        { min: 0.0201, max: 0.1, cost: 22 },
        { min: 0.1001, max: 0.25, cost: 26 },
        { min: 0.2501, max: 0.5, cost: 30 },
        { min: 0.5001, max: 1, cost: 40 },
        { min: 1.0001, max: 1.5, cost: 60 },
        { min: 1.5001, max: 2, cost: 60 },
        { min: 2.0001, max: 2.5, cost: 80 },
        { min: 2.5001, max: 3, cost: 80 },
        { min: 3.0001, max: 3.5, cost: 80 },
        { min: 3.5001, max: 4, cost: 80 },
        { min: 4.0001, max: 4.5, cost: 120 },
        { min: 4.5001, max: 5, cost: 120 },
        { min: 5.0001, max: 5.55, cost: 120 },
        { min: 5.5001, max: 6, cost: 120 },
        { min: 6.0001, max: 6.5, cost: 160 },
        { min: 6.5001, max: 7, cost: 160 },
        { min: 7.0001, max: 7.5, cost: 160 },
        { min: 7.5001, max: 8, cost: 160 },
        { min: 8.0001, max: 8.5, cost: 160 },
        { min: 8.5001, max: 9, cost: 260 },
        { min: 9.0001, max: 9.5, cost: 260 },
        { min: 9.5001, max: 10, cost: 220 },
        // เพิ่มข้อมูลที่เหลือ
    ],
    PA: [
        { min: 0, max: 1, cost: 20 },
        { min: 1.0001, max: 2, cost: 35 },
        { min: 2.0001, max: 3, cost: 50 },
        { min: 3.0001, max: 4, cost: 65 },
        { min: 4.0001, max: 5, cost: 80 },
        { min: 5.0001, max: 6, cost: 95 },
        { min: 6.0001, max: 7, cost: 110 },
        { min: 7.0001, max: 8, cost: 125 },
        { min: 8.0001, max: 9, cost: 140 },
        { min: 9.0001, max: 10, cost: 155 },
        { min: 10.0001, max: 11, cost: 170 },
        { min: 11.0001, max: 12, cost: 185 },
        { min: 12.0001, max: 13, cost: 200 },
        { min: 13.0001, max: 14, cost: 215 },
        { min: 14.0001, max: 15, cost: 230 },
        { min: 15.0001, max: 16, cost: 245 },
        { min: 16.0001, max: 17, cost: 260 },
        { min: 17.0001, max: 18, cost: 275 },
        { min: 18.0001, max: 19, cost: 290 },
        { min: 19.0001, max: 20, cost: 305 },
        // เพิ่มข้อมูลที่เหลือ
    ]
};

// ฟังก์ชันนี้ต้องอยู่ในไฟล์ script.js ที่เชื่อมโยงในไฟล์ index.html

document.querySelectorAll('.service-button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove 'active' class from all buttons
        document.querySelectorAll('.service-button').forEach(btn => btn.classList.remove('active'));
        // Add 'active' class to the clicked button
        this.classList.add('active');
        // Set the selected service type
        document.getElementById('serviceType').value = this.dataset.service;
    });
});


function calculateCost() {
    const serviceType = document.getElementById("serviceType").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const length = parseFloat(document.getElementById("length").value);
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);

    if (isNaN(weight) || isNaN(length) || isNaN(width) || isNaN(height)) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
    }

    const dimensionalWeight = (length * width * height) / 6000;

    let actualCost = 0;
    let dimensionalCost = 0;
    const rates = rateData[serviceType];

    let sizeLimitMessage = "";
    let useDimensionalCost = false;

    // Check weight limits
    if (serviceType === "EMS" && weight > 30.01) {
        sizeLimitMessage = "ส่ง EMS ไม่ได้เนื่องจากน้ำหนักเกิน 30 กิโลกรัม";
    } else if (serviceType === "ECO" && weight > 10.01) {
        sizeLimitMessage = "ส่ง ECO POST ไม่ได้เนื่องจากน้ำหนักเกิน 10 กิโลกรัม";
    } else if (serviceType === "PA" && weight > 20.01) {
        sizeLimitMessage = "ส่ง พัสดุ ไม่ได้เนื่องจากน้ำหนักเกิน 20 กิโลกรัม";
    }

    if (sizeLimitMessage !== "") {
        document.getElementById("sizeLimitMessage").innerText = sizeLimitMessage;
        document.getElementById("actualCost").innerText = "";
        document.getElementById("dimensionalCost").innerText = "";
        document.getElementById("dimensionalWeight").innerText = "";
        document.getElementById("additionalCost").innerText = "";
        return;
    } else {
        document.getElementById("sizeLimitMessage").innerText = "";
    }

    // Check dimensions limits
    if (serviceType === "EMS" && (length + width + height > 240.01|| length > 120.01)) {
        sizeLimitMessage = "ไม่สามารถส่ง EMS ขนาดใหญ่ได้ เนื่องจากขนาดเกินกำหนด";
        useDimensionalCost = true;
    } else if (serviceType === "ECO" && (length + width + height > 120.01 || length > 60.01 || width > 60.01 || height > 60.01)) {
        sizeLimitMessage = "ไม่สามารถส่ง ECO POST ได้ เนื่องจากขนาดเกินกำหนด";
        useDimensionalCost = true;
    } else if (serviceType === "PA" && (length + 2 * width + 2 * height > 300 || length > 150.01 || width > 150.01 || height > 150.01)) {
        sizeLimitMessage = "ไม่สามารถส่งพัสดุได้ เนื่องจากขนาดเกินกำหนด";
        useDimensionalCost = true;
    }

    if (sizeLimitMessage !== "") {
        document.getElementById("sizeLimitMessage").innerText = sizeLimitMessage;
        document.getElementById("actualCost").innerText = "";
        document.getElementById("dimensionalCost").innerText = "";
        document.getElementById("dimensionalWeight").innerText = "";
        document.getElementById("additionalCost").innerText = "";
        return;
    } else {
        document.getElementById("sizeLimitMessage").innerText = "";
    }

    // Calculate actual cost based on weight
    for (let i = 0; i < rates.length; i++) {
        if (weight >= rates[i].min && weight <= rates[i].max) {
            actualCost = rates[i].cost;
            break;
        }
    }

    // Calculate dimensional cost
    for (let i = 0; i < rates.length; i++) {
        if (dimensionalWeight >= rates[i].min && dimensionalWeight <= rates[i].max) {
            dimensionalCost = rates[i].cost;
            break;
        }
    }

    // Calculate additional cost if dimensional cost is higher
    let additionalCost = 0;
    if (dimensionalCost > actualCost) {
        additionalCost = dimensionalCost - actualCost;
    }

    // Display results
    document.getElementById("actualCost").innerText = useDimensionalCost ? "" : `${actualCost} บาท`;
    document.getElementById("dimensionalCost").innerText = `${dimensionalCost} บาท`;
    document.getElementById("dimensionalWeight").innerText = `${dimensionalWeight.toFixed(2)} กิโลกรัม`; 
    document.getElementById("additionalCost").innerText = additionalCost > 0 ? `${additionalCost.toFixed(2)} บาท` : "ไม่ต้องเรียกเก็บเพิ่ม";
}
