const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
        .catch(error => alert(error));

}




// phone id tracking
const loadPhoneDetails = phoneId => {
    // console.log(phoneId);
    const url = `
       https://openapi.programming-hero.com/api/phone/${phoneId}
    `;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}

// displaySearchResult
const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (data.length == 0) {
        console.log('NO RESULT FOUND');
        // alert("NO RESULT FOUND");
        const showError = document.getElementById('search-result');
        const errorSection = document.createElement('div');
        errorSection.innerHTML = `
          <div>
             <h2 class="text-amber-600">NO RESULT FOUND</h2>
          </div>`;
        showError.appendChild(errorSection);

    }
    data.forEach(data => {
        console.log(data);
        const section = document.createElement('div');
        section.innerHTML = `
          
        <div class="m-3  p-3 bg-gray-200 border-2 border-blue-600 rounded" 
          onclick="loadPhoneDetails('${data.slug}')">
                <img class="w-full" src="${data.image}" alt="">
                <h3 class="text-lg text-gray-800 py-2">
                    <a href="#"> ${data.brand} </a>
                </h3>
                <p class="text-lg font-semibold text-gray-900 pb-2">${data.phone_name}</p>
                <button class="bg-blue-500 text-white font-bold py-1 px-3 rounded"
                    onclick="loadPhoneDetails('${data.slug}')">Details</button>
            </div>
        

        `;
        searchResult.appendChild(section);


    });
}

// display phone details 
const displayPhoneDetails = details => {
    console.log(details);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const detailsSection = document.createElement('div');
    detailsSection.innerHTML = `
         
        <div class="m-5 p-5 sm:m-10 sm:p-10 ">
        <h2 class="text-3xl text-blue-500 ml-5 ">Phone Details</h2>
        <div class="flex flex-col-reverse md:flex-row ">
            <div class="w-3/5 m-5 border-2 border-blue-600 rounded">
                <dl>
                    <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4   sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Phone Name</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${details.name}</dd>
                    </div>

                    <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Release Date</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${details.releaseDate}</dd>
                    </div>
                    
                    <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Storage</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${details.mainFeatures.storage}</dd>
                    </div>

                    <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Display Size</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${details.mainFeatures.displaySize}</dd>
                    </div>

                    <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">ChipSet</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${details.mainFeatures.chipSet}</dd>
                    </div>

                    <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Memory</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${details.mainFeatures.memory}</dd>
                    </div>

                    <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Brand</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${details.brand}</dd>
                    </div>

                    <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Sensors</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${details.mainFeatures.sensors[0]}</dd>
                    </div>

                </dl>
            </div>
            <div class="w-2/5 m-5">
                <img class="w-full" src="${details.image}" alt="">
            </div>
        </div>
        </div>
          `;
    phoneDetails.appendChild(detailsSection);
}