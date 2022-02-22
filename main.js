particlesJS("particles-js", {
    particles: {
        number: { value: 160, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle", stroke: { width: 0, color: "#000000" }, polygon: { nb_sides: 5 }, image: { src: "img/github.svg", width: 100, height: 100 } },
        opacity: { value: 1, random: true, anim: { enable: true, speed: 1, opacity_min: 0, sync: false } },
        size: { value: 3, random: true, anim: { enable: false, speed: 4, size_min: 0.3, sync: false } },
        line_linked: { enable: false, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 1, direction: "none", random: true, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 600 } },
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: false, mode: "bubble" }, onclick: { enable: false, mode: "repulse" }, resize: true },
        modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 250, size: 0, duration: 2, opacity: 0, speed: 3 },
            repulse: { distance: 400, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
        },
    },
    retina_detect: true,
});

var playlistButton = document.getElementById("toPlaylist")
var viewPlaylist = document.getElementById("viewPlaylist")
var talkButton = document.getElementById("toTalk")
var themeButton = document.getElementById("toTheme")
var themeButton2 = document.getElementById("toTheme2")
var toSpeakers = document.getElementById("toSpeakers")
var viewPlaylist2 = document.getElementById("viewPlaylists")
var main = document.getElementById("main")

playlistButton.addEventListener("click", function(){
    main.style.marginLeft = "0%"
})

talkButton.addEventListener("click", function(){
    main.style.marginLeft = "-200%"
    sortSpeaker()
})

themeButton.addEventListener("click", function(){
    main.style.marginLeft = "-100%"
})

viewPlaylist.addEventListener("click", function(){
    main.style.marginLeft = "-300%"
})

themeButton2.addEventListener("click", function(){
    main.style.marginLeft = "-100%"
})

toSpeakers.addEventListener("click", function(){
    main.style.marginLeft = "-100%"
})

viewPlaylist2.addEventListener("click", function(){
    main.style.marginLeft = "0%"
})

function sortThemes() {
    console.log("themeSorted");

    var countTop = 0
    var countLeft = 0
    var top = [6, 24, 43, 64, 82]
    var left = [36.7, 43.4, 50.1, 56.8]

    d3.selectAll(".theme").each(function(d, i) {
        d3.select(this).transition().duration(500).style("top", top[countTop] + "%").style("left", left[countLeft] + "vw")
        countLeft++
        if(countLeft >= 4) {
            countLeft = 0 
            countTop++
        }
        if(countTop >= 2) {
            left = [30, 36.7, 56.8, 63.5]
        }
        if(countTop >= 3) {
            left = [36.7, 43.4, 50.1, 56.8]
        }
    })
}

sortThemes()

function sortSpeaker() {
    console.log("speakerSorted");

    var countTop = 0
    var countLeft = 0
    var top = [20.5, 31, 41.5, 10, 52]
    var left = [36.7, 43.4, 50.1, 56.8]

    d3.selectAll(".sorted").each(function(d, i) {
        d3.select(this).transition().duration(500).style("top", top[countTop] + "vh").style("left", left[countLeft] + "vw")
        countLeft++
        if(countLeft >= 4) {
            countLeft = 0 
            countTop++
        }
        if(countTop >= 1) {
            left = [30, 36.7, 56.8, 63.5]
        }
        if(countTop >= 2) {
            left = [36.7, 43.4, 50.1, 56.8]
        }
    })
}

var selectionNum = []
var selectionName = []
var selectedElements = []

var themeInfo = document.getElementById("themeInfo")
var themeBar = document.getElementById("themeSelection")

var speakerInfo = document.getElementById("speakerInfo")
var speakerBar = document.getElementById("speakerSelection")

var countSelect 
var countSelectTwo

countSelect = 0;
countSelectTwo = 0;

$(".theme").on("click", function() {
// $('.theme').on('click', function() {
    
    $(".open").each(function () {
        $(this).removeClass("open");
        $(this).children().hide()
        $(this).children(".shorthand").show()
        // hold = false
        // $(this).removeEventListener("click", function(){
        //     console.log("add");
        // })
    });

    $(this).children().hide()
    $(this).children(".longhand").show()
    // $('.theme').not(this).on('click');
    
    $(this).addClass("open");
    // $(this).off("click")
    
    themeInfo.innerHTML = this.children[1].innerHTML
    
    $(".open").on("click", function(){
    // $(".open").click(function() {
        
        $(this).children().hide()
        $(this).children(".shorthand").show()
        
        var selElements = this;
        var selection = this.children[1].textContent
        selection = selection.toLowerCase();
        
        if (selectionNum.length <= 3){
            if (selectionNum.includes(selection) === false) selectionNum.push(selection);
            if (selectedElements.includes(selElements) === false) selectedElements.push(selElements);
            // console.log(selectedElements)
            // console.log(selElements)
            $(selectedElements).removeClass("greyOverlay");
        } 
        if (selectionNum.length === 4){
            $("." + selectionNum[0]).removeClass("sorted");
            selectionNum.shift()
            selectedElements.shift()
            d3.selectAll("." + selectionNum[2]).each(function() {
                this.classList.add("sorted");
            })

            $(".theme").addClass("greyOverlay");
            $(selectedElements).removeClass("greyOverlay");
        }
        console.log(selectionNum)

        themeBar.innerHTML = ""

        for (var i = 0; i < selectionNum.length; i++) {
            var arti = document.createElement("article")
            // selectedElements[i].removeClass("greyOverlay")
            arti.innerHTML = selectionNum[i]
            themeBar.append(arti)
        }       
        // themeBar.append(selectionNum)

        d3.selectAll("." + selectionNum[countSelectTwo]).each(function() {
            this.classList.add("sorted");
            countSelect++
            // console.log(countSelect);
            // console.log(countSelect)
            if (countSelect === selectionNum[countSelectTwo].length) {
                countSelect = 0
                countSelectTwo++
                // console.log(countSelectTwo);
                d3.selectAll("." + selectionNum[countSelectTwo]).each(function() {
                // this.classList.add("sorted");
            // this.classList.toggle("sorted");
                })
                if (countSelectTwo == 3 ){
                    countSelectTwo = 0;
                    // console.log("adwa")
                }
            }
        });
        // console.log(selection)
        })
    })

    var audio = document.getElementById("audio")
    var isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended;
    
    $('.toBeSorted').on('click', function() {
        
        $(".open").each(function () {
            $(this).removeClass("open");
        });
        
        $(this).addClass("open");

        var selection = this.children[2].textContent
        // selection = selection.toLowerCase();

        console.log(selection)
  
        speakerInfo.innerHTML = ""
        var createBr = document.createElement("br")
        var speakerDetails = this.children[2].textContent
        speakerInfo.append(speakerDetails)
        speakerInfo.append(createBr)
        speakerDetails = this.children[4].textContent
        speakerInfo.append(speakerDetails)
        var createBr2 = document.createElement("br")
        speakerInfo.append(createBr2)
        var progressBar = document.createElement("progress")
        progressBar.value = 0
        progressBar.max = 1
        progressBar.id = "seekbar"
        speakerInfo.append(progressBar)

        speakerBar.innerHTML = ""
        speakerBar.append(selectionName)  

        var choice = this.children[4].textContent;
        choice = choice.toLowerCase();
        choice = choice.replace(/ /g, '');
        console.log(choice)

        audio.setAttribute('src', 'audio/' + choice + '.mp3');
        // audio.load()

        if (isPlaying) {
        audio.pause();
        } else if (!isPlaying) {
            audio.currentTime = 0
            audio.play();
        }

        $('#audio').on('timeupdate', function() {
            $('#seekbar').attr("value", this.currentTime / this.duration);
        });

    $(".open").click(function() {
        if (isPlaying) {
            audio.currentTime = 0
            audio.pause();
        }

        audio.pause();

        var selElements = this;
        
        if (selectionName.length <= 3){
            if (selectionName.includes(selection) === false) selectionName.push(selection);
            if (selectedElements.includes(selElements) === false) selectedElements.push(selElements);
            $(selectedElements).removeClass("greyOverlay");
        } 
        if (selectionNum.length === 4){
            selectionName.shift()
            selectedElements.shift()

            $(".toBeSorted").addClass("greyOverlay");
            $(selectedElements).removeClass("greyOverlay");
        }
        console.log(selectionName)

        speakerBar.innerHTML = ""

        console.log(selectionName);

        for (var i = 0; i < selectionName.length; i++) {
            var arti = document.createElement("article")
            arti.innerHTML = selectionName[i]
            speakerBar.append(arti)
        }      
    }
    )});