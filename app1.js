let a = connect();
if(a){
    console.log('a');
    console.log(a);
}

async function connect() {
    console.log('hello');
    const urlQlikServer = "https://qliksenseserver.exponentia.ai";
    const urlLoggedIn = "/api/v1/audits";//Use GET request to see if you are authenticated
    const urlLogin = "/login";
    const webIntegrationId = 'hWqekIjV4naqnzG_I3se3_M-ub9ORFj-';        

    //Check to see if logged in
    return await fetch(`${urlQlikServer}${urlLoggedIn}`, {
        credentials: 'include',
        headers: {                  
            'Qlik-Web-Integration-ID':webIntegrationId
        }
    })
    .then(async function(response)
    {
        //check if user is authenticated; if not, redirect to login page
		if(response.status===401){
            const url = new URL(`${urlQlikServer}/login`);
            url.searchParams.append('returnto', 'http://localhost:4200/mashup');
            url.searchParams.append('qlik-web-integration-id', webIntegrationId);
            window.location.href = url;
        }	
    })
    .catch(function(error)
    {
        console.error(error);
    });	
}