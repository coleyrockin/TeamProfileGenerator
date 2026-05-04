const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};

const escapeHTML = value => {
    return String(value ?? '').replace(/[&<>"']/g, character => htmlEntities[character]);
};

const githubProfileUrl = username => {
    return `https://github.com/${encodeURIComponent(String(username ?? '').trim())}`;
};

const mailtoUrl = email => {
    return `mailto:${encodeURIComponent(String(email ?? '').trim())}`;
};

const renderEmail = email => {
    return `<a href="${escapeHTML(mailtoUrl(email)}">${escapeHTML(email)}</a>`;
};

const generateTeamPage = function (employeeCards) {   
    return`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <header>
            <nav class="navbar" id="navbar">
                <span class="navbar-brand mb-0 h1 w-100 text-center" id="navbar-text">Team Profile</span>
            </nav>
        </header>
        <main>
            <div class="container">
                <div class="row justify-content-center" id="team-cards">
                    <!--Team Cards-->
                    ${employeeCards}
                </div>
            </div>
        </main>
    </body>
    </html>
  `;
  }


const generateManager = function (manager) {
    return `
    <div class="col-4 mt-4">
        <div class="card h-100">
            <div class="card-header">
                <h3>${escapeHTML(manager.name)}</h3>
                <h4>Manager</h4>
            </div>
            <div class="card-body">
                <p class="id">ID: ${escapeHTML(manager.id)}</p>
                <p class="email">Email: ${renderEmail(manager.email)}</p>
                <p class="office">Office Number: ${escapeHTML(manager.officeNumber)}</p>
            </div>
        </div>
    </div>
    `;
}

// create Intern card 
const generateIntern = function (intern) {
    return `
    <div class="col-4 mt-4">
        <div class="card h-100">
            <div class="card-header">
                <h3>${escapeHTML(intern.name)}</h3>
                <h4>Intern</h4>
            </div>
            <div class="card-body">
                <p class="id">ID: ${escapeHTML(intern.id)}</p>
                <p class="email">Email: ${renderEmail(intern.email)}</p>
                <p class="school">School: ${escapeHTML(intern.school)}</p>
            </div>
    </div>
</div>
    `
};

// create Engineer card
const generateEngineer = function (engineer) {
    return `
    <div class="col-4 mt-4">
        <div class="card h-100">
            <div class="card-header">
                <h3>${escapeHTML(engineer.name)}</h3>
                <h4>Engineer</h4>
            </div>
            <div class="card-body">
                <p class="id">ID: ${escapeHTML(engineer.id)}</p>
                <p class="email">Email: ${renderEmail(engineer.email)}</p>
                <p class="github">Github: <a href="${escapeHTML(githubProfileUrl(engineer.github))}">${escapeHTML(engineer.github)}</a></p>
            </div>
        </div>
    </div>
    `
}

// push array to page 
const generateHTML = (data) => {

    // array for cards 
    const pageArray = []; 

    for (let i = 0; i < data.length; i++) {
        const employee = data[i];
        const role = employee.getRole(); 


        // call manager function
        if (role === 'Manager') {
            const managerCard = generateManager(employee);

            pageArray.push(managerCard);
        }

        // call engineer function
        if (role === 'Engineer') {
            const engineerCard = generateEngineer(employee);

            pageArray.push(engineerCard);
        }

        // call intern function 
        if (role === 'Intern') {
            const internCard = generateIntern(employee);

            pageArray.push(internCard);
        }
        
    }

    // joining strings 
    const employeeCards = pageArray.join('')

    // return to generated page
    const generateTeam = generateTeamPage(employeeCards); 
    return generateTeam;

}



// export to index
module.exports = generateHTML;