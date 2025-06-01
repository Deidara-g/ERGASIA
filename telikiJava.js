
const element = document.getElementById("getbtn");
element.addEventListener("click", getResults);


function artDetails(artwork) {
    const divNode = document.createElement("div");
    const divID = artwork.id + 'Div';
    divNode.setAttribute("id", divID);

    const titleNode = document.createElement("h4");
    titleNode.appendChild(document.createTextNode(artwork.title || "No Title"));
    divNode.appendChild(titleNode);

    const pNode = document.createElement("p");
    pNode.appendChild(document.createTextNode('Artist: ' + (artwork.artist_display || "Unknown")));
    divNode.appendChild(pNode);

    const btnNode = document.createElement("button");
    btnNode.setAttribute("class", "btn btn-outline-primary mt-2");

    const btnID = artwork.id + 'Btn';
    btnNode.setAttribute("id", btnID);
    btnNode.appendChild(document.createTextNode('Show Artwork'));
    btnNode.addEventListener("click", function () {
        showImg(divID, artwork.thumbnail ? artwork.thumbnail.lqip : null, btnID);
    });
    divNode.appendChild(btnNode);

    return divNode;
}


function showImg(id, imageUrl, btnID) {
    if (imageUrl) {
        $('#' + id).append("<img src='" + imageUrl + "' class='img-thumbnail mt-2'/>");
    } else {
        $('#' + id).append("<p>No image available.</p>");
    }
    $('#' + btnID).remove();
}


function showArtworks(artworks) {
    artworks.forEach(artwork => {
        const node = document.createElement("li");
        node.appendChild(artDetails(artwork));
        document.getElementById('artworksList').appendChild(node);
    });
}


function getResults() {
    fetch('https://api.artic.edu/api/v1/artworks?page=1&limit=10')
        .then(res => res.json())
        .then(json => {
            showArtworks(json.data);
            $("#getbtn").remove(); 
        })
   
        });
}
