// Making default api route
let apiRoot = "https://spotify-apii.herokuapp.com/songs/"

$(document).ready(function () {
    var scroll_pos = 0;
    $(document).scroll(function () {
        scroll_pos = $(this).scrollTop();
        if (scroll_pos > 280) {
            $("ul#inner_navbar").css('background-color', 'transparent');
            $("a.hvr-icon-fade").css('color', 'white');
        } else {
            $("ul#inner_navbar").css('background-color', 'transparent');
            $("a.hvr-icon-fade").css('color', 'black');
        }
    });
});

// Making a onclick event for my spotify button that puts the value of event.target inside a var called name
$("#spotify_button").on('click', (event) => {
    let name = $(event.target).attr("name")
    console.log(name)

    $("div#inner_music").empty()
    // append apiRoot URL + the name that is found in the attribute "name" with a limit of 10
    let url = apiRoot + name + "/10"

    // Making a get request to the api and saves the data inside response
    $.get(url, (response) => {
        console.log(response)
        console.log(response.length)

        for (let index = 0; index < response.length; index++) {
            let name = response[index].name
            let popularity = response[index].popularity
            let previewUrl = response[index].previewUrl
            let urlImage = response[index].url
            let artist = response[index].artist

            let card = $("<div>").attr({
                class: "card-body",
                style: "display:flex;flex-wrap:wrap;width:fit-content; height:auto;padding:0px 30px 20px 30px"
            }).html(`<img style="width:300px;height:auto;" src='${urlImage}'><h4 style='width:100%;margin-bottom:0px'>${name}</h4><p margin-top: 0px;><i class="em em-fire" aria-role="presentation" aria-label="FIRE"></i> ${popularity}</p><audio controls src="${previewUrl}" type="audio/mp3></audio">`)

            $("div#inner_music").attr({
                style: "border-top:3px red solid;padding-top:20px;display:flex;align-content:center;margin-top:225px;font-family:'circularBold';color:white;background: rgb(89,134,230); background-color: #2b4162;background-color: #000000;background-image: linear-gradient(147deg, #000000 0%, #04619f 74%);"
            }).append(card)

            $("#addHref").attr({
                href: "#artist_title"
            })
            $("#artist_title").html(`Songs Featuring ${artist}`)

            $([document.documentElement, document.body]).animate({
                scrollTop: $("#artist_title").offset().top
            }, 1);
        }
    })
})