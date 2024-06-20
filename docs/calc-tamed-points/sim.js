
function calcLevelAfterTame() {
    const eLevelBeforeTame = document.getElementById("levelBeforeTame");
    const eTameBonus = document.getElementById("tameBonus");
    const eLevelAfterTame = document.getElementById("levelAfterTame");
    const l = Math.round(Number(eLevelBeforeTame.value) + (0.5 * Number(eLevelBeforeTame.value) * (Number(eTameBonus.value) / 100)))
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
            label: 'そのポイントになる確率',
            data: pd,
            borderWidth: 1,
            yAxisID: "yAxis1",
          },
          {
            label: 'そのポイント以上になる確率',
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
            min: 0,
          },
          yAxis2: {
            beginAtZero: true,
            position: "right",
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
    
    
    const table = document.getElementById("table");
    table.innerHTML = "";
    const t = document.createElement("table");
    const htr = document.createElement("tr");
    const htd1 = document.createElement("th");
    htd1.innerHTML = "ステータスポイント";
    htr.appendChild(htd1);
    const htd2 = document.createElement("th");
    htd2.innerHTML = "そのポイントになる確率";
    htr.appendChild(htd2);
    const htd3 = document.createElement("th");
    htd3.innerHTML = "そのポイント以上になる確率";
    htr.appendChild(htd3);
    t.appendChild(htr);
    const c = 1000000;
    for(let i = 0; i < labels.length; i++) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.innerHTML = labels[i];
      tr.appendChild(td1);
      const td2 = document.createElement("td");
      td2.innerHTML = `${Math.round(pd[i] * 100 * c) / c}%`;
      tr.appendChild(td2);
      const td3 = document.createElement("td");
      td3.innerHTML = `${Math.round(sd[i] * 100 * c) / c}%`;
      tr.appendChild(td3);
      t.appendChild(tr);
    }
    table.append(t);

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
