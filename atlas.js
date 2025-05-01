const countriesList = document.getElementById("countries-list");
const continent = document.getElementById("continent");
const modalBody = document.getElementById("modal-body-content");
const modalTitle = document.getElementById("modal-title-content");
const modal = new bootstrap.Modal(document.getElementById("one-country")); // nove modalni okno

function loadCountries(region) {
    countriesList.innerHTML = "";
    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(res => res.json())
        .then(data => {
            data.forEach((country) => {
                let blockCountry =
                    `<div class="col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 ">
                        <div class="card">
                            <img class="card-img-top" src="${country.flags.png}" alt="Vlajka ${country.name.common}"  style="width: 100%; height: 150px; object-fit: cover;" />
                            <div class="card-body">
                                <h4 class="card-title"><a href="#">${country.translations.ces.common}</a></h4>
                                <p class="card-text">Hlavní město: <b>${country.capital[0]}</b></p>
                                <p><button class="btn btn-info" 
                                    data-name="${country.name.common}"
                                    >Informace</button></p>
                            </div>
                        </div>
                    </div>`; //data-name vlastni atribut pro modalni okno
                countriesList.innerHTML += blockCountry; // vlozeni do seznamu
            })
            document.querySelectorAll("button[data-name]").forEach(button => {
                button.addEventListener("click", () => {
                    const countryName = button.getAttribute("data-name");
                    modal.show();
                    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
                        .then(res => res.json())
                        .then(data => {
                            const country = data[0];
                            modalTitle.innerHTML = `<h2>${country.translations.ces.common}</h2>`;
                            modalBody.innerHTML = `
                            <img class="card-img-top" src="${country.flags.png}" alt="Vlajka ${country.name.common}" />
                            <h4>Oficiální název: ${country.name.official}</h4>
                            <h4>Hlavní město: ${country.capital[0]}</h4>
                            <h4>Počet obyvatel: ${country.population}</h4>
                            <h4>Sousedi: ${country.borders}</h4>
                            <h4>Jazyk(y): ${Object.values(country.languages).join(', ')}</h4>
                            <h4>Měna: ${Object.values(country.currencies).map(cur => cur.name + ' (' + cur.symbol + ')').join(', ')}</h4>
                            <h4>Rozloha: ${country.area.toLocaleString()} km²</h4>
                            <h4><a href="${country.maps.googleMaps}" target="_blank">Zobrazit na mapě</a></h4>`;
                        })
                        .catch(err => {
                            console.log(`Nastala chyba: ${err}`);
                        });
                });
            });
        })
        .catch(err => {
            console.log(err);
        });
}



continent.addEventListener("change", function (event) {
    loadCountries(event.target.value); // ziska hodnotu z vyberu
})