const d = document,
  form = d.getElementById('form'),
  content = d.getElementById('content'),
  weatherTitle = d.getElementById('tw'),
  setAlert = (alerting) => {
    const alert = d.getElementById(`${alerting}`);
    if (alert.classList.contains('show')) return;
    alert.classList.add('show');
    setTimeout(() => {
      alert.classList.remove('show');
    }, 4500);
  },
  turnC = (temp) => {
    const c = (temp - 273.15).toFixed(2);
    const text = c + ' °C';
    return text;
  };
showData = (info) => {
  const city = d.getElementById('city').value,
    spinner = d.querySelector('.spinner');
  spinner.remove();
  initialP = d.getElementById('p');
  if (initialP) initialP.remove();
  const {
      main: { temp, temp_max, temp_min, weather },
    } = info,
    c = turnC(temp),
    cMax = turnC(temp_max),
    cMin = turnC(temp_min),
    innerContent = d.createElement('p');
  innerContent.id = 'p';
  innerContent.innerHTML = `<span class="temps"><strong class="big">${c}</strong></span><span class="temps">TempMax: <strong>${cMax}</strong></span><span class="temps">TempMin: <strong>${cMin}</strong></span> `;
  content.append(innerContent);
  weatherTitle.innerHTML = `Weather from ${city}`;
};
handleSubmit = (country, city) => {
  const appId = 'ecc881b8a6a2186f7337b8bb0ec2d427';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

  //Query to API with Fetch API
  fetch(url)
    .then((respond) => {
      return respond.json();
    })
    .then((data) => {
      if (data.cod === '404') {
        setAlert('alert2');
        return;
      }
      showData(data);
    })
    .catch((error) => console.log(error));
};
('');
form.onsubmit = (e) => {
  e.preventDefault();
  const country = d.getElementById('country').value,
    city = d.getElementById('city').value;
  if (!country || !city) {
    setAlert('alert');
    return;
  }
  handleSubmit(country, city);
  Spinner();
};
//Spinner Loading
function Spinner() {
  const div = d.createElement('div');
  div.className = 'spinner';
  div.innerHTML = `<div class="lds-ripple">
          <div></div>
          <div></div>
        </div>`;
  content.append(div);
}
//Select
var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName('custom-select');
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName('select')[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement('DIV');
  a.setAttribute('class', 'select-selected');
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement('DIV');
  b.setAttribute('class', 'select-items select-hide');
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement('DIV');
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener('click', function (e) {
      /*when an item is clicked, update the original select box,
        and the selected item:*/
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName('select')[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName('same-as-selected');
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute('class');
          }
          this.setAttribute('class', 'same-as-selected');
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener('click', function (e) {
    /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle('select-hide');
    this.classList.toggle('select-arrow-active');
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName('select-items');
  y = document.getElementsByClassName('select-selected');
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove('select-arrow-active');
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('select-hide');
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener('click', closeAllSelect);
