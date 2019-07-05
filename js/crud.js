$(document).ready(function(){

    ទាញអត្ថបទ()
    $('#callModal').click(function(){
        $('#articleModal').modal('show')
    })
    $('#save').click(function(){
        addArticle()
        
    })
})
function addArticle(){
    let article = {
        TITLE: $('#title').val(),
        DESCRIPTION: $('#desc').val()
    }
    $.ajax({
        url: 'http://api-ams.me/v1/api/articles',
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        data: JSON.stringify(article),
        success: (res) =>{
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: res.MESSAGE,
                showConfirmButton: false,
                timer: 1500
              })
            ទាញអត្ថបទ()
        },
        error: (er) =>{
            console.log(er)
        }
    })

}

function ទាញអត្ថបទ(){
    $.ajax({
        url: 'http://api-ams.me/v1/api/articles?page=1&limit=15',
        method: "GET",
        success: (res) =>{
            console.log(res)
            appToCard(res.DATA)
        },
        error: (er) =>{
            console.log(er)
        }
    })
}
function appToCard(article){
    let content = ""
    for (a of article){
        content += `
            <div class="col-md-4">
                <!-- Card -->
                <div class="card">
                    <!-- Card image -->
                    <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Card image cap">

                    <!-- Card content -->
                    <div class="card-body">
                        <p class="aID">${a.ID}</p>
                        <!-- Title -->
                        <h4 class="card-title">
                            <a>${a.TITLE}</a>
                        </h4>
                        <!-- Text -->
                        <p class="card-text">${a.DESCRIPTION}</p>
                        <!-- Button -->
                        <button class="btn btn-danger" onclick="confirmAction(this)">DELETE</button>
                        <button class="btn btn-primary">EDIT</button>

                    </div>

                </div>
                <!-- Card -->
            </div>
        `
        $('.row').html(content)
    }
}

function confirmAction(btn){
    let id = $(btn).siblings('.aID').text()
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
            //true when user click delete button
            deleteArticle(id)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
}
function deleteArticle(id){
    $.ajax({
        url: 'http://api-ams.me/v1/api/articles/'+id,
        method: "DELETE",
        success: (res) => {
            ទាញអត្ថបទ()
        },
        error: (er) => {
            console.log(er)
        }
    })
}