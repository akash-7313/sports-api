function loadTeam() {
    const input = document.getElementById('input');
    const inputText = input.value;
    if(inputText==''){
        alert('plz type a team name to search')
    }
    else{
        input.value = '';
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputText}`;
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .then(data => displayTeam(data))
    }
}
function displayTeam(data){
    console.log(data);
    if(data.teams==null){
        alert('this team name did not exist');
    }
    else{
        const teams = data.teams[0];
        console.log(teams);
        const parentCall = document.getElementById('team-container');
        parentCall.textContent = '';
        const div1 = document.createElement('div');
        div1.classList.add('col');
        div1.innerHTML = 
        `
            <div class="card h-100">
                <img width="200px" height="180px" src="${teams.strTeamBadge} " class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title">${teams.strAlternate} </h3>
                    <h5 class="card-title">${teams.strCountry} </h5>
                    <p class="card-text">${teams.strDescriptionEN.slice(0,100)} . . .</p>
                    <button class="btn btn-primary btn-sm" onclick="loadMore('${teams.idTeam}')">Learn More</button>
                </div>
            </div>
        `;
        parentCall.appendChild(div1);

        const div2 = document.createElement('div');
        div2.classList.add('col');
        div2.innerHTML = 
        `
            <div class="card h-100">
                <img src="${teams.strStadiumThumb} " class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title">${teams.strStadium}</h3>
                    <h6 class="card-title">Location: ${teams.strStadiumLocation} </h6>
                    <h6 class="card-title">Capacity:
                    ${teams.intStadiumCapacity} </h6>
                    <p class="card-text">${teams.strStadiumDescription.slice(0,100)} . . . </p>
                </div>
            </div>
        `;
        parentCall.appendChild(div2);

        const div3 = document.createElement('div');
        div3.classList.add('col');
        div3.innerHTML = 
        `
            <div class="card h-100">
                <img src="${teams.strTeamFanart2} " class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title">Best Photo</h3>
                    <h5 class="card-title">${teams.strSport} </h5>
                    <p class="card-text">${teams.strDescriptionIT.slice(0,100)} . . . </p>
                </div>
            </div>
        `;
        parentCall.appendChild(div3);
    }
}


function loadMore(id){
    console.log(id);
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${id}`;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayMore(data))
}
function displayMore(data){
    console.log(data);
    const detail = data.teams[0];
    console.log(detail);
    const parentCall = document.getElementById('details');
    parentCall.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card h-100">
            <img width="100px" height="400px" src="${detail.strTeamBadge} " class="card-img-top" alt="...">
            <div class="card-body">
                <h1 class="card-title">${detail.strAlternate} </h1>
                <h6 class="card-title">Established in: ${detail.intFormedYear} </h6>
                <h6 class="card-title">Country:  ${detail.strCountry} </h6>
                <h6 class="card-title">Venue: ${detail.strStadium} </h6>
                <h6 class="card-title">Capacity: ${detail.intStadiumCapacity} </h6>
                <p class="card-title">Compete in: </p>
                <h6 class="card-title"> ${detail.strLeague} </h6>
                <h6 class="card-title"> ${detail.strLeague3} </h6>
                <h6 class="card-title"> ${detail.strLeague4} </h6>
                <img src="${detail.strTeamBanner} " class="card-img-top" alt="...">
                <h3>History:</h3>
                <p class="card-text">${detail.strDescriptionEN}</p>
                <a target="_blank" href="${detail.strYoutube}" class="btn btn-primary">See video </a>
            </div>
        </div>
    `
    parentCall.appendChild(div);
}



































