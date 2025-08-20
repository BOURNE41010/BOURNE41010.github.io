/**
 * PSO Route Optimization - Google Apps Script
 * Backend functions for Web App
 *
 * @author Jules
 * @version 2.0 - Refactored and improved for macOS styling
 */

// --- CONFIGURATION ---

// ดึง ID จาก URL ของ Google Sheet โดยอัตโนมัติ
const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1BOkG475YO4N6O82AQzpyGv11dy9lAXkZ94EbBTUJCd4/edit';
const SPREADSHEET_ID = SPREADSHEET_URL.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)[1];

// ข้อมูลเมือง (City data)
const CITIES = {
  'A': { name: 'กรุงเทพฯ', lat: 13.7563, lng: 100.5018 },
  'B': { name: 'เชียงใหม่', lat: 18.7883, lng: 98.9853 },
  'C': { name: 'ภูเก็ต', lat: 7.8804, lng: 98.3923 },
  'D': { name: 'อุบลราชธานี', lat: 15.2286, lng: 104.8701 },
  'E': { name: 'ขอนแก่น', lat: 16.4419, lng: 102.8359 }
};

// ตารางระยะทางระหว่างเมือง (Distance Matrix)
const DISTANCE_MATRIX = [
  // A    B     C     D     E
  [    0, 700,  840,  630,  450 ], // A
  [  700,   0, 1200,  580,  350 ], // B
  [  840, 1200,    0,  950,  780 ], // C
  [  630,  580,  950,    0,  320 ], // D
  [  450,  350,  780,  320,    0 ]  // E
];


// --- WEB APP FUNCTIONS ---

/**
 * ให้บริการหน้าเว็บหลัก (Serve HTML page)
 * สร้างหน้าเว็บจาก Template และอนุญาตการแสดงผลใน iframe
 */
function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

/**
 * ฟังก์ชันสำหรับ include ไฟล์ CSS และ JavaScript เข้ามาใน HTML หลัก
 * @param {string} filename ชื่อไฟล์ที่ต้องการ include (ไม่ต้องมีนามสกุล)
 * @returns {string} เนื้อหาของไฟล์
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * ฟังก์ชันหลักในการรัน PSO Optimization (เรียกจากฝั่ง Client)
 * @param {object} params พารามิเตอร์ที่รับมาจากหน้าเว็บ
 * @returns {object} ผลลัพธ์การคำนวณ
 */
function runPSOOptimization(params = {}) {
  try {
    // ตั้งค่า Default และรับค่าจาก Client
    const config = {
      POPULATION_SIZE: parseInt(params.populationSize, 10) || 30,
      MAX_ITERATIONS: parseInt(params.maxIterations, 10) || 100,
      INERTIA_WEIGHT: parseFloat(params.inertiaWeight) || 0.9,
      C1: 2.0, // Cognitive parameter
      C2: 2.0  // Social parameter
    };

    Logger.log('Starting PSO with config: %s', JSON.stringify(config));

    const pso = new PSORouteOptimizer(Object.keys(CITIES).length, config);
    const result = pso.optimize();

    // แปลงเส้นทางเป็นชื่อเมืองที่อ่านได้
    const routeString = pso.routeToString(result.bestRoute);

    // บันทึกผลลัพธ์ลง Google Sheets
    saveResultsToSpreadsheet(result, routeString, config);

    return {
      bestRoute: result.bestRoute,
      bestDistance: result.bestDistance,
      iterations: result.iterations,
      history: result.history,
      routeString: routeString,
      success: true
    };

  } catch (error) {
    Logger.log('Error in PSO optimization: %s', error.toString());
    // ส่งข้อความ Error กลับไปให้ Client
    return {
      success: false,
      error: 'การคำนวณล้มเหลว: ' + error.message
    };
  }
}


// --- PSO ALGORITHM CLASSES ---

/**
 * คลาสสำหรับอนุภาค (Particle)
 */
class Particle {
  constructor(numCities) {
    this.numCities = numCities;
    // สร้างเส้นทางสุ่มเริ่มต้น (ไม่รวมจุดเริ่มต้นและสิ้นสุด)
    const route = Array.from({ length: numCities - 1 }, (_, i) => i + 1);
    this.shuffleArray(route);

    // ตำแหน่งปัจจุบัน (เส้นทาง) เริ่มและจบที่เมือง 0
    this.position = [0, ...route];

    this.velocity = this.generateRandomVelocity(); // ความเร็วเริ่มต้น
    this.pbestPosition = [...this.position]; // ตำแหน่งที่ดีที่สุดของตัวเอง

    this.currentFitness = this.calculateFitness(this.position);
    this.pbestFitness = this.currentFitness;
  }

  // สลับลำดับสมาชิกใน Array (Fisher-Yates shuffle)
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // สร้างความเร็วเริ่มต้นแบบสุ่ม (เป็นชุดของการสลับตำแหน่ง)
  generateRandomVelocity() {
    const velocity = [];
    const numSwaps = Math.floor(Math.random() * (this.numCities / 2)) + 1;

    for (let i = 0; i < numSwaps; i++) {
      const pos1 = Math.floor(Math.random() * (this.numCities - 1)) + 1;
      let pos2 = Math.floor(Math.random() * (this.numCities - 1)) + 1;
      if (pos1 !== pos2) {
        velocity.push({ pos1, pos2 });
      }
    }
    return velocity;
  }

  // คำนวณค่า Fitness (ระยะทางรวม)
  calculateFitness(route) {
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      totalDistance += DISTANCE_MATRIX[route[i]][route[i+1]];
    }
    // เพิ่มระยะทางกลับมายังจุดเริ่มต้น
    totalDistance += DISTANCE_MATRIX[route[route.length - 1]][route[0]];
    return totalDistance;
  }

  // อัปเดตความเร็วของอนุภาค
  updateVelocity(gbestPosition, w, c1, c2) {
    // 1. Inertia part: ความเร็วเดิม
    const inertiaComponent = (Math.random() < w) ? this.velocity : [];

    // 2. Cognitive part: ความเร็วที่เคลื่อนที่เข้าหา pbest
    const cognitiveComponent = (Math.random() < c1) ? this.subtract(this.pbestPosition, this.position) : [];

    // 3. Social part: ความเร็วที่เคลื่อนที่เข้าหา gbest
    const socialComponent = (Math.random() < c2) ? this.subtract(gbestPosition, this.position) : [];

    // รวมความเร็วและจำกัดขนาด
    let newVelocity = [...inertiaComponent, ...cognitiveComponent, ...socialComponent];
    this.velocity = this.limitVelocity(newVelocity);
  }

  // "ลบ" เส้นทาง เพื่อหาชุดของการสลับตำแหน่ง (Swap Sequence)
  subtract(targetRoute, currentRoute) {
    const swaps = [];
    const tempRoute = [...currentRoute];
    const map = tempRoute.reduce((acc, city, index) => {
        acc[city] = index;
        return acc;
    }, {});

    for (let i = 1; i < tempRoute.length; i++) {
        if (tempRoute[i] !== targetRoute[i]) {
            const targetCity = targetRoute[i];
            const currentCity = tempRoute[i];
            const swapWithIndex = map[targetCity];

            swaps.push({ pos1: i, pos2: swapWithIndex });

            // Update tempRoute and map to reflect the swap
            tempRoute[swapWithIndex] = currentCity;
            map[currentCity] = swapWithIndex;
            tempRoute[i] = targetCity;
            map[targetCity] = i;
        }
    }
    return swaps;
  }

  // จำกัดขนาดของ Velocity (จำนวนการสลับ)
  limitVelocity(velocity) {
    const maxSize = this.numCities; // จำกัดจำนวนการสลับสูงสุด
    if (velocity.length > maxSize) {
      return velocity.slice(0, maxSize);
    }
    return velocity;
  }

  // อัปเดตตำแหน่ง (เส้นทาง)
  updatePosition() {
    const newPosition = [...this.position];

    // ใช้ Velocity (ชุดของการสลับ) เพื่อสร้างตำแหน่งใหม่
    for (const swap of this.velocity) {
      if (swap.pos1 > 0 && swap.pos1 < newPosition.length &&
          swap.pos2 > 0 && swap.pos2 < newPosition.length) {
        [newPosition[swap.pos1], newPosition[swap.pos2]] =
        [newPosition[swap.pos2], newPosition[swap.pos1]];
      }
    }

    this.position = newPosition;
    this.currentFitness = this.calculateFitness(this.position);

    // ถ้าตำแหน่งใหม่ดีกว่า pbest, อัปเดต pbest
    if (this.currentFitness < this.pbestFitness) {
      this.pbestPosition = [...this.position];
      this.pbestFitness = this.currentFitness;
    }
  }
}

/**
 * คลาสหลักสำหรับ PSO Algorithm
 */
class PSORouteOptimizer {
  constructor(numCities, config) {
    this.numCities = numCities;
    this.config = config;
    this.particles = [];
    this.gbestPosition = null;
    this.gbestFitness = Infinity;
    this.iterationHistory = [];

    this.initializePopulation();
  }

  // สร้างประชากรเริ่มต้น
  initializePopulation() {
    for (let i = 0; i < this.config.POPULATION_SIZE; i++) {
      const particle = new Particle(this.numCities);
      this.particles.push(particle);

      // ตรวจสอบ gbest เริ่มต้น
      if (particle.pbestFitness < this.gbestFitness) {
        this.gbestPosition = [...particle.pbestPosition];
        this.gbestFitness = particle.pbestFitness;
      }
    }
  }

  // เริ่มกระบวนการ Optimization
  optimize() {
    for (let iter = 0; iter < this.config.MAX_ITERATIONS; iter++) {
      // อัปเดต gbest จากอนุภาคทั้งหมด
      for (const particle of this.particles) {
        if (particle.pbestFitness < this.gbestFitness) {
          this.gbestPosition = [...particle.pbestPosition];
          this.gbestFitness = particle.pbestFitness;
        }
      }

      // อัปเดตความเร็วและตำแหน่งของแต่ละอนุภาค
      for (const particle of this.particles) {
        particle.updateVelocity(
          this.gbestPosition,
          this.config.INERTIA_WEIGHT,
          this.config.C1,
          this.config.C2
        );
        particle.updatePosition();
      }

      // บันทึกประวัติ
      this.iterationHistory.push({
        iteration: iter + 1,
        bestFitness: this.gbestFitness,
        averageFitness: this.calculateAverageFitness(),
        route: this.routeToString(this.gbestPosition)
      });
    }

    // คืนค่าผลลัพธ์ที่ดีที่สุด
    return {
      bestRoute: this.gbestPosition,
      bestDistance: this.gbestFitness,
      iterations: this.config.MAX_ITERATIONS,
      history: this.iterationHistory
    };
  }

  // คำนวณ Fitness เฉลี่ยของประชากร
  calculateAverageFitness() {
    const total = this.particles.reduce((sum, p) => sum + p.currentFitness, 0);
    return total / this.particles.length;
  }

  // แปลงเส้นทาง (array of index) เป็น String ของชื่อเมือง
  routeToString(route) {
    const cityKeys = Object.keys(CITIES);
    // เพิ่มเมืองเริ่มต้นต่อท้ายเพื่อให้เป็นวงจร
    const displayRoute = [...route, route[0]];
    return displayRoute.map(index => CITIES[cityKeys[index]].name).join(' → ');
  }
}

// --- UTILITY FUNCTIONS ---

/**
 * บันทึกผลลัพธ์ลง Google Sheets
 */
function saveResultsToSpreadsheet(result, routeString, config) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName('PSO_Results');

    if (!sheet) {
      sheet = ss.insertSheet('PSO_Results');
      // สร้างหัวตาราง
      sheet.getRange('A1:F1').setValues([
        ['วันที่', 'เวลา', 'เส้นทางที่ดีที่สุด', 'ระยะทางรวม (km)', 'จำนวนรอบ', 'พารามิเตอร์ที่ใช้']
      ]).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const now = new Date();
    const paramsString = `Pop: ${config.POPULATION_SIZE}, Iter: ${config.MAX_ITERATIONS}, W: ${config.INERTIA_WEIGHT}`;

    const row = [
      Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd'),
      Utilities.formatDate(now, Session.getScriptTimeZone(), 'HH:mm:ss'),
      routeString,
      result.bestDistance.toFixed(2),
      result.iterations,
      paramsString
    ];

    sheet.appendRow(row);

  } catch (error) {
    Logger.log('Error saving to spreadsheet: %s', error.toString());
    // ไม่ต้อง throw error เพื่อไม่ให้กระทบการทำงานของ Client
  }
}
