getChirps();

$('#post-chirp').click(e => {
    e.preventDefault(); //keeps page from refreshing after a post
    let username = $('#username-input').val();
    let message = $('#message-input').val();
    let chirp = {
        username,
        message
    };
    postChirp(chirp);
    $('#username-input').val(''); //empties values
    $('#message-input').val('');
});



function postChirp(chirp) {
    $.ajax({
        type: 'POST',
        url: '/api/chirps',
        data: chirp
    })
        .then(() => getChirps())
        .catch(e => console.log(e));
}


function getChirps() {
    $.ajax({
        type: 'GET',
        url: '/api/chirps'
    })
        .then(chirps => displayChirps(chirps))
        .catch(e => console.log(e));
}


function displayChirps(chirps) {
    $('#timeline').empty(); //keeps from double posting 
    chirps.forEach(chirp => {
        $('#timeline').append(`
        <div class="card mb-1 shadow-sm">
            <div class="card-body text-center">
            <div class="d-flex justify-content-between align-items-center">
                    <button onclick="editChirp('${chirp.id}', '${chirp.username}', '${chirp.message}')" class="btn btn-sm btn-warning shadow-sm">Edit</button>
                    <button onclick="deleteChirp(${chirp.id})" class="btn btn-sm btn-danger shadow-sm">X</button>
                </div>
                <h5 class="card-title">${chirp.username} chirped:</h5>
                <p class="card-text">${chirp.message}</p>
            </div>
            <div class="card-footer text-muted">
                    id: ${chirp.id}
            </div>
         </div>  
        `);
    });
}

function editChirp(id, username, message) {
    Swal.fire({
        title: 'Edit Chirp # ' + id,
        text: 'Editing ' + username + '\'s chirp',
        input: 'textarea',
        inputValue: message,
        confirmButtonText: 'Save Edit',
        preConfirm: editedMessage => {
            $.ajax({
                type: 'PUT',
                url: '/api/chirps/' + id,
                data: { username, message: editedMessage }
            })
                .then(() => getChirps())
                .catch(e => Swal.showValidationMessage(
                    `Request failed: ${e}`
                ))
        }
    });
}

function deleteChirp(id) {
    $.ajax({
        type: 'DELETE',
        url: '/api/chirps/' + id
    })
        .then(() => getChirps())
        .catch(e => console.log(e))
}
