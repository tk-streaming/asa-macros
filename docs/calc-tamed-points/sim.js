
function calcLevelAfterTame() {
    const eLevelBeforeTame = document.getElementById("levelBeforeTame");
    const eTameBonus = document.getElementById("tameBonus");
    const eLevelAfterTame = document.getElementById("levelAfterTame");
    const l = Math.ceil(Number(eLevelBeforeTame.value) + (0.5 * Number(eLevelBeforeTame.value) * (Number(eTameBonus.value) / 100)))
    eLevelAfterTame.value = l;
}


function calcPD() {
    const eDisableOxygen = document.getElementById("disableOxygen");

    const L = eDisableOxygen.checked ? 5 : 6;

    const ePointsBeforeTame = document.getElementById("pointsBeforeTame");
    const eLevelBeforeTame = document.getElementById("levelBeforeTame");
    const eLevelAfterTame = document.getElementById("levelAfterTame");
    const bonusPoint = (eLevelAfterTame.value - eLevelBeforeTame.value);
    
    const labels = Array.from(Array(bonusPoint)).map((_,k) => k + Number(ePointsBeforeTame.value));
    const pd = Array.from(Array(bonusPoint)).map((_, k) => binom(1.0/L, bonusPoint, k));
    let sd = [];
    let s = 0;
    for(let i = 0; i<pd.length; i++) {
      s = s + pd[pd.length-i-1];
      sd.push(s);
    }
    sd = sd.reverse();
    const chart = document.getElementById("chart");
    chart.innerHTML = "";
    const canv = document.createElement("canvas");
    chart.appendChild(canv);
    new Chart(canv, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Probability',
            data: pd,
            borderWidth: 1,
            yAxisID: "yAxis1",
          },
          {
            label: 'Probability',
            data: sd,
            borderWidth: 1,
            yAxisID: "yAxis2",
          },
        ]
      },
      options: {
        scales: {
          yAxis1: {
            beginAtZero: true,
            position: "left",
            max: 0.15,
            min: 0,
          },
          yAxis2: {
            beginAtZero: true,
            position: "right",
            max: 1,
            min: 0,
          },
          x: {
            max: 70,
            min: 0,
          },
        },
        plugins: {
          tooltip: {
              callbacks: {
                  label: function(context) {
                    const c = 100;
                    return `${context.dataset.label}: ${Math.round(context.parsed.y * 100 * c) / c}%`;
                  }
              }
          }
        }
      }
    });
    
    

}
//-------------------------------------------------

function binom(p, n, k) {
    return combinations(n, k) * (p**k) * ((1-p) ** (n-k));
}

function product_Range(a, b) {
    var p = 1;
    for(let x = a; x <= b; x++) {
        p = p * x;
    }
    return p;
}
  
function combinations(n, r) {
    if (n == r || r == 0) {
        return 1;
    } else {
        r = (r < n - r) ? n - r : r;
        return product_Range(r + 1, n) / product_Range(1, n - r);
    }
}
